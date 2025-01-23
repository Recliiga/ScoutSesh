import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

  const { userId } = await req.json();

  const redirectUrl = `${BASE_URL}/api/oauth2/callback`;

  try {
    if (!userId) throw new Error("Invalid user ID");

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUrl,
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.events"],
      state: encodeURIComponent(userId),
    });

    return NextResponse.json({ url: authUrl, error: null });
  } catch (err) {
    const error = err as Error;
    console.log("Error generating google oauth url: ", error.message);
    return NextResponse.json({ url: null, error: error.message });
  }
}
