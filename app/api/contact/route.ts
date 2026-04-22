import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 254 || message.length > 4000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["geddadaraviteja612@gmail.com"],
      subject: `[Portfolio] Message from ${safeName}`,
      reply_to: email,
      html: `
        <div style="font-family:sans-serif;max-width:600px;background:#09090B;color:#FAFAFA;padding:2rem;border-radius:0.75rem;">
          <h2 style="color:#2563EB;margin-bottom:1rem;">New message from your portfolio</h2>
          <p style="margin:0.5rem 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0.5rem 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#2563EB;">${safeEmail}</a></p>
          <hr style="border:1px solid #27272A;margin:1.25rem 0;" />
          <p style="margin:0 0 0.5rem;"><strong>Message:</strong></p>
          <p style="color:#A1A1AA;line-height:1.6;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
