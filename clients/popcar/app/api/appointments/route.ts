import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, vehicle, service, date, time, notes } = body as {
    name: string
    phone: string
    email?: string
    vehicle: { year?: string; make?: string; model?: string; mileage?: string }
    service: string
    date?: string
    time?: string
    notes?: string
  }

  if (!name || !phone || !service) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const vehicleStr = [vehicle?.year, vehicle?.make, vehicle?.model].filter(Boolean).join(' ')
  const notesStr = [
    service,
    vehicleStr || null,
    vehicle?.mileage ? `${vehicle.mileage}mi` : null,
    notes || null,
  ].filter(Boolean).join(' | ')

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      client_slug: 'popcar',
      name,
      phone,
      email: email || null,
      party_size: 1,
      date: date || null,
      time: time || null,
      notes: notesStr,
    })
    .select()
    .single()

  if (error) {
    console.error('Appointment insert error:', error)
    return NextResponse.json({ error: 'Failed to save appointment' }, { status: 500 })
  }

  // Upsert customer in CRM
  try {
    const { data: existing } = await supabase
      .from('customers')
      .select('id, visit_count')
      .eq('client_slug', 'popcar')
      .eq('phone', phone)
      .single()

    if (existing) {
      await supabase
        .from('customers')
        .update({ visit_count: existing.visit_count + 1, last_seen: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      await supabase
        .from('customers')
        .insert({ client_slug: 'popcar', name, phone, email: email || null, visit_count: 1 })
    }
  } catch (e) {
    console.error('CRM upsert failed:', e)
  }

  return NextResponse.json({ success: true, confirmationCode: `PC-${Date.now()}`, id: data.id })
}
