// supabase/functions/nurture-sender/index.ts
// Supabase Edge Function — runs on a cron schedule
// Deploy: supabase functions deploy nurture-sender
// Schedule: every 15 minutes via Supabase cron
// =====================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const TWILIO_SID   = Deno.env.get('TWILIO_ACCOUNT_SID')!
const TWILIO_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')!
const TWILIO_FROM  = Deno.env.get('TWILIO_PHONE_NUMBER')! // e.g. +19105551234

// Client sender numbers (optional — use one BTV number or per-client)
const CLIENT_PHONES: Record<string, string> = {
  cellphoneparadise: TWILIO_FROM,
  popcar:            TWILIO_FROM,
  queens:            TWILIO_FROM,
  kyoto:             TWILIO_FROM,
  lawnlads:          TWILIO_FROM,
  smt:               TWILIO_FROM,
}

async function sendSMS(to: string, body: string, from: string): Promise<boolean> {
  const auth = btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`)
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    }
  )
  const data = await res.json()
  if (!res.ok) {
    console.error(`Twilio error for ${to}:`, data)
  }
  return res.ok && !!data.sid
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 ? `+1${digits}` : `+${digits}`
}

Deno.serve(async () => {
  const now = new Date().toISOString()

  // Get all pending messages due to send
  const { data: messages, error } = await supabase
    .from('nurture_queue')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_at', now)
    .limit(50)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ sent: 0, message: 'No messages due' }))
  }

  let sent = 0
  let failed = 0

  for (const msg of messages) {
    // Check opt-out
    const { data: optout } = await supabase
      .from('nurture_optouts')
      .select('id')
      .or(`phone.eq.${msg.lead_phone},email.eq.${msg.lead_email}`)
      .maybeSingle()

    if (optout) {
      await supabase.from('nurture_queue').update({ status: 'opted_out' }).eq('id', msg.id)
      continue
    }

    // Send SMS
    if (msg.channel === 'sms' && msg.lead_phone) {
      const phone = normalizePhone(msg.lead_phone)
      const from = CLIENT_PHONES[msg.client_slug] || TWILIO_FROM
      const success = await sendSMS(phone, msg.message_body, from)

      await supabase.from('nurture_queue').update({
        status: success ? 'sent' : 'failed',
        sent_at: success ? now : null,
      }).eq('id', msg.id)

      success ? sent++ : failed++
    }
  }

  console.log(`Nurture run: ${sent} sent, ${failed} failed`)
  return new Response(JSON.stringify({ sent, failed, total: messages.length }))
})
