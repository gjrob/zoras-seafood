import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, vehicle, service, date, time, notes, party_size } = body

  if (!name || !phone || !service) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Reservations not configured' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      name,
      email,
      phone,
      party_size: party_size ?? 1,
      date: date || null,
      time: time || null,
      notes: notes || `Vehicle: ${vehicle ?? 'N/A'} | Service: ${service}`,
      client_slug: 'popcar',
    })
    .select()
    .single()

  if (error) {
    console.error('Reservation error:', error)
    return NextResponse.json({ error: 'Failed to save appointment' }, { status: 500 })
  }

  // Upsert customer in CRM
  try {
    const { createClient: createCrmClient } = await import('@supabase/supabase-js')
    const crm = createCrmClient(supabaseUrl, serviceKey)

    const { data: existing } = await crm
      .from('customers')
      .select('id, visit_count')
      .eq('client_slug', 'popcar')
      .eq('phone', phone)
      .single()

    if (existing) {
      await crm
        .from('customers')
        .update({ visit_count: existing.visit_count + 1, last_seen: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      await crm
        .from('customers')
        .insert({ client_slug: 'popcar', name, phone, email, visit_count: 1 })
    }
  } catch (e) {
    console.error('CRM upsert failed:', e)
  }

  return NextResponse.json({ success: true, id: data.id })
}
