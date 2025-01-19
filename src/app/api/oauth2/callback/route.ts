import User from "@/db/models/User";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get("user_id");
  const code = searchParams.get("code");
  const redirectUrl = `${BASE_URL}/api/oauth2/callback?userId=${userId}`;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User unauthenticated");
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUrl,
    );

    if (!code) throw new Error("Invalid code");

    const { tokens } = await oauth2Client.getToken(code);
    user.googleTokens = tokens;
    await user.save();

    const url = new URL("/dashboard/profile", BASE_URL);
    return NextResponse.redirect(url);
  } catch (err) {
    const error = err as Error;
    console.log("Error connecting google account: ", error.message);

    const url = new URL("/dashboard/profile", BASE_URL);
    return NextResponse.redirect(url);
  }
}
