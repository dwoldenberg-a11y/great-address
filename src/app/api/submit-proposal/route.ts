import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { domain, name, email, company, plan, equityRange, website } = body;

  if (!name || !email || !plan) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set in this environment.");
    return NextResponse.json(
      { error: "Email service not configured. Please contact the site owner." },
      { status: 500 },
    );
  }
  const resend = new Resend(apiKey);

  const domainLine = domain || "(from homepage form)";

  try {
    const result = await resend.emails.send({
      from: "Great Address <onboarding@resend.dev>",
      to: "dwoldenberg@visualogyx.com",
      subject: `New Business Plan: ${company || name} — ${domainLine}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #111; margin-bottom: 4px;">New Business Plan Submission</h2>
          <p style="color: #666; margin-top: 0;">Someone wants to partner on <strong>${domainLine}</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <table style="width: 100%; font-size: 14px; color: #333;">
            <tr><td style="padding: 6px 0; color: #888; width: 140px;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 6px 0; color: #888;">Company</td><td style="padding: 6px 0; font-weight: 600;">${company}</td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #888;">Domain</td><td style="padding: 6px 0; font-weight: 600;">${domainLine}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Equity Range</td><td style="padding: 6px 0; font-weight: 600; color: #059669;">${equityRange || "Not specified"}</td></tr>
            ${website ? `<tr><td style="padding: 6px 0; color: #888;">Website</td><td style="padding: 6px 0;"><a href="${website}" style="color: #0066cc;">${website}</a></td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #111; font-size: 14px; margin-bottom: 8px;">Business Plan</h3>
          <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #333; white-space: pre-wrap;">${plan}</div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Sent from Great Address</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend rejected proposal email:", result.error);
      return NextResponse.json(
        { error: `Email service error: ${result.error.message}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send proposal email:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
