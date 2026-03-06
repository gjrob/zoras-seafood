-- ============================================================
-- Progressive Lead Nurturing Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- nurture_queue: holds every scheduled SMS per lead
CREATE TABLE IF NOT EXISTS nurture_queue (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug    text NOT NULL,
  lead_id        text NOT NULL,
  lead_name      text NOT NULL,
  phone          text NOT NULL,
  sequence_step  int  NOT NULL CHECK (sequence_step BETWEEN 1 AND 4),
  message_body   text NOT NULL,
  channel        text NOT NULL DEFAULT 'sms',
  status         text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','sent','failed','opted_out')),
  scheduled_at   timestamptz NOT NULL,
  sent_at        timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS nurture_queue_pending_idx
  ON nurture_queue (status, scheduled_at)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS nurture_queue_client_idx
  ON nurture_queue (client_slug, created_at DESC);

-- nurture_optouts: phones that replied STOP
CREATE TABLE IF NOT EXISTS nurture_optouts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone      text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- enqueue_nurture_sequence()
-- Called by each client trigger on INSERT
-- Params injected via TG_ARGV: client_slug, phone_col, name_col
-- ============================================================
CREATE OR REPLACE FUNCTION enqueue_nurture_sequence()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_client  text := TG_ARGV[0];
  v_phone   text;
  v_name    text;
  v_msgs    text[4];
BEGIN
  -- dynamically pull phone/name from the new row
  EXECUTE format('SELECT ($1).%I::text', TG_ARGV[1]) INTO v_phone USING NEW;
  EXECUTE format('SELECT ($1).%I::text', TG_ARGV[2]) INTO v_name  USING NEW;

  -- skip if no phone
  IF v_phone IS NULL OR v_phone = '' THEN
    RETURN NEW;
  END IF;

  -- client-specific message sequences
  IF v_client = 'cellphoneparadise' THEN
    v_msgs[1] := 'Hi ' || v_name || '! Cell Phone Paradise received your drop-off request. We''ll call when it''s ready. Questions? (910) 772-5599';
    v_msgs[2] := 'Hi ' || v_name || ', this is Mr. Harry at Cell Phone Paradise. How is your device working? Let us know if you need anything!';
    v_msgs[3] := 'Hi ' || v_name || '! Enjoying your repaired device? A quick Google review means the world to us: g.page/cellphoneparadise';
    v_msgs[4] := 'Hi ' || v_name || ', it''s been a month! Remember Cell Phone Paradise for all repairs — screens, batteries, water damage. (910) 772-5599';

  ELSIF v_client = 'popcar' THEN
    v_msgs[1] := 'Hi ' || v_name || '! Pop Car Auto received your booking. We''ll confirm your appointment shortly. (910) 834-3607';
    v_msgs[2] := 'Hi ' || v_name || ', how did your service go? Our team wants to make sure everything is running smooth!';
    v_msgs[3] := 'Hi ' || v_name || '! If your car is running great, we''d love a Google review. It helps Wilmington drivers find us!';
    v_msgs[4] := 'Hi ' || v_name || ', it''s been a month since your last service. Time for a checkup? Book at popcar-auto.vercel.app';

  ELSIF v_client = 'queens' THEN
    v_msgs[1] := 'Hi ' || v_name || '! Queen''s Mediterranean received your message. Call us to order: (910) 769-8000';
    v_msgs[2] := 'Hi ' || v_name || ', did you get a chance to try our food? We''d love to know what you thought!';
    v_msgs[3] := 'Hi ' || v_name || '! Enjoyed your meal? A quick Google review helps our small kitchen so much. Thank you!';
    v_msgs[4] := 'Hi ' || v_name || ', we miss you at Queen''s! Come back for our lamb gyro or beef shawarma bowl. (910) 769-8000';

  ELSIF v_client = 'smt' THEN
    v_msgs[1] := 'Hi ' || v_name || '! SMT Services received your cleaning request. Stefanie will be in touch shortly to confirm. (910) 620-0937';
    v_msgs[2] := 'Hi ' || v_name || ', this is Stefanie at SMT Services! How did everything go? We hope your space is sparkling!';
    v_msgs[3] := 'Hi ' || v_name || '! If you loved your clean, a quick Google review would mean the world to our small team. Thank you!';
    v_msgs[4] := 'Hi ' || v_name || ', it''s been a month! Ready for another clean? SMT Services is here — call Stefanie at (910) 620-0937.';

  ELSIF v_client = 'kyoto' THEN
    v_msgs[1] := 'Hi ' || v_name || '! Kyoto Asian Grille received your reservation request. We''ll confirm your table shortly.';
    v_msgs[2] := 'Hi ' || v_name || ', thank you for dining with us! We hope you enjoyed your experience at Kyoto.';
    v_msgs[3] := 'Hi ' || v_name || '! We''d love your feedback. A quick review on Google helps our restaurant grow. Arigatou!';
    v_msgs[4] := 'Hi ' || v_name || ', it''s been a month — we''d love to welcome you back to Kyoto. Reserve your table anytime!';

  ELSE
    RETURN NEW;
  END IF;

  -- opt-out suffix on every message
  FOR i IN 1..4 LOOP
    v_msgs[i] := v_msgs[i] || ' Reply STOP to opt out.';
  END LOOP;

  INSERT INTO nurture_queue
    (client_slug, lead_id, lead_name, phone, sequence_step, message_body, scheduled_at)
  VALUES
    (v_client, NEW.id::text, v_name, v_phone, 1, v_msgs[1], now()),
    (v_client, NEW.id::text, v_name, v_phone, 2, v_msgs[2], now() + interval '2 days'),
    (v_client, NEW.id::text, v_name, v_phone, 3, v_msgs[3], now() + interval '7 days'),
    (v_client, NEW.id::text, v_name, v_phone, 4, v_msgs[4], now() + interval '30 days');

  RETURN NEW;
END;
$$;

-- ============================================================
-- Triggers — one per client table
-- ============================================================

DROP TRIGGER IF EXISTS nurture_cellphoneparadise ON cellphoneparadise_bookings;
CREATE TRIGGER nurture_cellphoneparadise
  AFTER INSERT ON cellphoneparadise_bookings
  FOR EACH ROW EXECUTE FUNCTION enqueue_nurture_sequence('cellphoneparadise', 'phone', 'name');

DROP TRIGGER IF EXISTS nurture_popcar ON popcar_bookings;
CREATE TRIGGER nurture_popcar
  AFTER INSERT ON popcar_bookings
  FOR EACH ROW EXECUTE FUNCTION enqueue_nurture_sequence('popcar', 'phone', 'name');

DROP TRIGGER IF EXISTS nurture_queens ON queens_inquiries;
CREATE TRIGGER nurture_queens
  AFTER INSERT ON queens_inquiries
  FOR EACH ROW EXECUTE FUNCTION enqueue_nurture_sequence('queens', 'phone', 'name');

DROP TRIGGER IF EXISTS nurture_kyoto ON kyoto_reservations;
CREATE TRIGGER nurture_kyoto
  AFTER INSERT ON kyoto_reservations
  FOR EACH ROW EXECUTE FUNCTION enqueue_nurture_sequence('kyoto', 'phone', 'name');

DROP TRIGGER IF EXISTS nurture_smt ON smt_bookings;
CREATE TRIGGER nurture_smt
  AFTER INSERT ON smt_bookings
  FOR EACH ROW EXECUTE FUNCTION enqueue_nurture_sequence('smt', 'phone', 'name');
