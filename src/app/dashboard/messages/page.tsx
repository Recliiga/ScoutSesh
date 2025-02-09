import ChatContainer from "@/components/messages/ChatContainer";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchChatUsers, fetchMessages } from "@/services/messageServices";
import React from "react";

export default async function MessagesPage() {
  const user = await getSessionFromHeaders();

  if (!user.organization) {
    return (
      <main className="flex-center flex-1 text-accent-gray-300">
        You are not connected to any team
      </main>
    );
  }

  const { error: chatError } = await fetchChatUsers(
    user._id,
    user.organization._id,
    user.role,
  );

  if (chatError !== null)
    return (
      <p className="flex-center flex-1 text-center text-muted-foreground">
        There was an error fetching chat. <br />
        Kindly reload the page to try again
      </p>
    );

  const { error: messagesError } = await fetchMessages(user._id, user.role);

  if (messagesError !== null)
    return (
      <p className="flex-center flex-1 text-center text-muted-foreground">
        There was an error fetching messages. <br />
        Kindly reload the page to try again
      </p>
    );

  return <ChatContainer user={user} />;
}
