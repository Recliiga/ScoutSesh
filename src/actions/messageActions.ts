"use server";

import Message, { MessageType } from "@/db/models/Message";
import { UserType } from "@/db/models/User";
import { pusherServer } from "@/lib/pusher";
import { getSession } from "@/services/authServices";

export async function sendMessage(
  organizationId: string,
  {
    fromUser,
    toUser,
    message,
  }: {
    fromUser: UserType;
    toUser: {
      _id: string;
      name: string;
      role: string;
      profilePicture: string;
      initials: string;
    };
    message: string;
  },
) {
  try {
    const { user, error } = await getSession();
    if (error !== null) throw new Error("User unauthenticated");

    if (user._id !== fromUser._id) throw new Error("User unauthorzied");

    const newMessage: MessageType = new Message({
      fromUser: fromUser._id,
      toUser: toUser._id,
      message,
    });

    await pusherServer.trigger(organizationId, "incoming-message", {
      _id: newMessage._id,
      fromUser,
      toUser,
      message,
      createdAt: new Date(),
    });

    await newMessage.save();

    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error sending message: ", error.message);
    return { error: "An error occured sending message" };
  }
}

export async function markMessagesAsRead(messageIds: string[]) {
  try {
    await Message.updateMany({ _id: { $in: messageIds } }, { isRead: true });
  } catch (err) {
    const error = err as Error;
    console.log("Error marking message as read: ", error.message);
    return { error: "An error occured marking message as read" };
  }
}
