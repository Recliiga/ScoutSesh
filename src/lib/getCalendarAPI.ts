import User, { UserType } from "@/db/models/User";
import { google } from "googleapis";

async function saveTokensToDatabase(userId: string, tokens: object) {
  await User.findByIdAndUpdate(userId, { googleTokens: tokens });
}

async function getUserTokensFromDatabase(userId: string) {
  const user: UserType | null = await User.findById(userId);
  return user?.googleTokens;
}

export async function getCalendarAPI(userId: string) {
  try {
    // Retrieve the user's access and refresh tokens from the database
    const userTokens = await getUserTokensFromDatabase(userId);

    if (!userTokens) {
      throw new Error("User unauthenticated");
    }
    const { access_token, refresh_token } = userTokens;

    // Set up the Google OAuth2 client
    const redirectUrl = `${process.env.BASE_URL}/api/oauth2/callback`;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl,
    );

    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });

    // Refresh the access token if needed
    oauth2Client.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        saveTokensToDatabase(userId, tokens);
      }
    });

    // Set up the Calendar API
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    return { calendar, error: null };
  } catch (err) {
    const error = err as Error;
    return { calendar: null, error: error.message };
  }
}
