"use server";

import Message from "@/db/models/Message";
import { getSession } from "@/services/authServices";

export async function sendMessage({
  fromUserId,
  toUserId,
  message,
}: {
  fromUserId: string;
  toUserId: string;
  message: string;
}) {
  try {
    const { user, error } = await getSession();
    if (error !== null) throw new Error("User unauthenticated");

    if (user._id !== fromUserId) throw new Error("User unauthorzied");

    const createdMessage = await Message.create({
      fromUser: fromUserId,
      toUser: toUserId,
      message: message,
    });

    const newMessage = JSON.parse(
      JSON.stringify(
        await Message.findById(createdMessage._id).populate({
          path: "fromUser toUser",
          select: "firstName lastName profilePicture role",
        }),
      ),
    );

    return { newMessage, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error sending message: ", error.message);
    return { newMessage: null, error: "An error occured sending message" };
  }
}
