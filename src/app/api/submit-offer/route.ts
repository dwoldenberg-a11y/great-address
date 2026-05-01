import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { domain, name, email, offer, message } = body;

  if (!domain || !name || !email || !offer) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // TODO: Replace with your preferred storage/notification method:
  // - Send an email notification
  // - Store in a database (e.g. Supabase, PlanetScale)
  // - Post to a Slack webhook
  // - Write to a Google Sheet via API
  console.log("New offer received:", {
    domain,
    name,
    email,
    offer,
    message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
