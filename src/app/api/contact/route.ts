import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  topic: z.string().max(50).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().optional(), // honeypot — must stay empty
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field (message needs at least 10 characters)." },
      { status: 400 },
    );
  }

  // Honeypot tripped → pretend success so bots learn nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const forwardUrl = process.env.CONTACT_FORM_FORWARD_URL;
  if (forwardUrl) {
    // Forward to any form backend that accepts JSON (Formspree, Basin, a webhook…).
    try {
      const res = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          topic: parsed.data.topic,
          message: parsed.data.message,
        }),
      });
      if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] forward failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not deliver your message right now. Please try again later." },
        { status: 502 },
      );
    }
  }

  // No backend configured: log server-side so submissions are at least visible
  // in Vercel logs, and tell the visitor it worked. Set CONTACT_FORM_FORWARD_URL
  // in production — see README.
  console.info("[contact] submission (no CONTACT_FORM_FORWARD_URL configured):", {
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic,
    message: parsed.data.message.slice(0, 500),
  });
  return NextResponse.json({ ok: true });
}
