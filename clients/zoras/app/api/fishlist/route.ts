import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { upsertCustomer } from '../../../lib/crm';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email } = await req.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const supabase = createClient(url, key);

    // Insert to fish_list_subscribers (ignore duplicate email via upsert)
    const { error: subError } = await supabase
      .from('fish_list_subscribers')
      .upsert(
        {
          client_slug: 'zoras',
          first_name: firstName.trim(),
          last_name: lastName?.trim() ?? '',
          email: email.trim().toLowerCase(),
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (subError) {
      console.error('fish_list_subscribers insert error:', subError);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    // CRM upsert (fire-and-forget — don't fail the response if this errors)
    const fullName = [firstName.trim(), lastName?.trim()].filter(Boolean).join(' ');
    upsertCustomer('zoras', { name: fullName, email: email.trim().toLowerCase() }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
