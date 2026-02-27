import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are Max, the friendly virtual assistant at Pop Car Auto Center in Wilmington, NC.
You're knowledgeable, helpful, and straight-talking — like a mechanic you can actually trust.

## PERSONALITY
- Friendly and honest — no upselling, no BS
- Keep answers brief and clear — 2-3 sentences unless more detail is needed
- Use a wrench or car emoji occasionally (🔧 🚗 🛑) but don't overdo it
- If you don't know something specific, say so and suggest calling (910) 834-3607

## BILINGUAL
- If the customer writes in Spanish, respond entirely in Spanish
- Default to English

## SHOP INFO
- Name: Pop Car Auto Center
- Address: 1301 Dawson Street, Wilmington, NC 28401
- Phone: (910) 834-3607
- Email: popcarllc@gmail.com
- Instagram: @popcarauto (10.4K followers)
- Hours: Mon–Fri 8am–6pm | Sat 8am–4pm | Sun Closed
- Appointments: Book online or call (910) 834-3607
- We confirm appointments within 2 hours

## SERVICES
Oil Change · Tire Service · Brake Service · Engine Repair · Transmission
Check Engine Diagnostics · Suspension · Paint & Body Restoration
Insurance Claims · General Auto Service

## PRICING
- For specific pricing, always say "Call us at (910) 834-3607 for a quote"
- Oil changes start around $40–$80 depending on oil type
- We work with most insurance companies for body/paint claims

## RESPONSE GUIDELINES
- For hours: Mon–Fri 8am–6pm, Sat 8am–4pm, Sun Closed
- For appointments: direct to the Book button on the site or call (910) 834-3607
- For pricing: give general ranges if known, otherwise direct to call
- For insurance claims: confirm we work with insurance and suggest calling
- Never make up specific prices you're not sure about`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Fire-and-forget: log chat touchpoint
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceKey) {
      const firstMsg = (messages as { role: string; content: string }[])
        .find(m => m.role === 'user')?.content ?? ''
      fetch(`${supabaseUrl}/rest/v1/customer_touchpoints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ client_slug: 'popcar', type: 'chat', message: firstMsg.substring(0, 200) }),
      }).catch(() => {})
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response("Chat isn't set up yet — call us at (910) 834-3607 and we'll answer any questions!", {
        status: 200, headers: { 'Content-Type': 'text/plain' },
      })
    }

    const anthropic = new Anthropic({ apiKey })
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta') {
              const delta = event.delta as { type: string; text?: string }
              if (delta.type === 'text_delta' && delta.text) controller.enqueue(encoder.encode(delta.text))
            }
          }
          controller.close()
        } catch { controller.close() }
      },
    })

    return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' } })
  } catch {
    return new Response('Sorry, having trouble. Call us at (910) 834-3607!', {
      status: 200, headers: { 'Content-Type': 'text/plain' },
    })
  }
}
