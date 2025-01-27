import PusherServer from "pusher";
import PusherClient from "pusher-js";

const PUSHER_API_KEY = process.env.NEXT_PUBLIC_PUSHER_API_KEY || "";
const PUSHER_SECRET_KEY = process.env.PUSHER_SECRET_KEY || "";
const PUSHER_APP_ID = process.env.PUSHER_APP_ID || "";

export const pusherServer = new PusherServer({
  appId: PUSHER_APP_ID,
  key: PUSHER_API_KEY,
  secret: PUSHER_SECRET_KEY,
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient(PUSHER_API_KEY, {
  cluster: "eu",
});
