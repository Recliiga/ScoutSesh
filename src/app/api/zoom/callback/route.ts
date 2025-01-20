import User from "@/db/models/User";
import { getSession } from "@/services/authServices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  const redirectUri = process.env.BASE_URL + "/api/zoom/callback";

  const url = new URL("/dashboard/profile", process.env.BASE_URL);

  try {
    const response = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code || "",
        redirect_uri: redirectUri || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange authorization code");
    }

    const data = await response.json();

    //Save refresh token to user database
    const { user } = await getSession();
    if (user) {
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        zoomRefreshToken: data.refresh_token,
      });
      if (!updatedUser)
        throw new Error("An error occured saving refresh token to database");
    }

    return NextResponse.redirect(url);
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    return NextResponse.redirect(url);
  }
}
