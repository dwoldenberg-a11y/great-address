import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { domain, name, email, offer, message } = body;

  if (!domain || !name || !email || !offer) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Great Address <onboarding@resend.dev>",
      to: "david@woldenberg.com",
      subject: `New Offer: ${domain} — ${offer}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #111; margin-bottom: 4px;">New Domain Offer</h2>
          <p style="color: #666; margin-top: 0;">Someone wants to buy <strong>${domain}</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <table style="width: 100%; font-size: 14px; color: #333;">
            <tr><td style="padding: 6px 0; color: #888; width: 120px;">Domain</td><td style="padding: 6px 0; font-weight: 600;">${domain}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Offer</td><td style="padding: 6px 0; font-weight: 600; color: #059669;">${offer}</td></tr>
            ${message ? `<tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Message</td><td style="padding: 6px 0;">${message}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Sent from Great Address</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send offer email:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
