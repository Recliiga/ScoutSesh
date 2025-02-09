import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChatContainer from "@/components/messages/ChatContainer";
import ChatProvider from "@/context/chatContext";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchLatestInvitationCode } from "@/services/invitationServices";
import { fetchChatUsers, fetchMessages } from "@/services/messageServices";
import { fetchNotifications } from "@/services/notificationEntryServices";
import React from "react";

export default async function MessagesPage() {
  const user = await getSessionFromHeaders();

  const { invitationCode } = await fetchLatestInvitationCode();

  const { notifications, error } = await fetchNotifications(user?._id);
  if (error !== null) throw new Error(error);

  if (!user.organization) {
    return (
      <main className="flex-center flex-1 text-accent-gray-300">
        You are not connected to any team
      </main>
    );
  }

  const { chatUsers, error: chatError } = await fetchChatUsers(
    user._id,
    user.organization._id,
    user.role,
  );

  if (chatError !== null)
    return (
      <p className="flex-center flex-1 text-center text-muted-foreground">
        There was an error fetching chat users. <br />
        Kindly reload the page to try again
      </p>
    );

  const { messages, error: messagesError } = await fetchMessages(
    user._id,
    user.role,
  );

  if (messagesError !== null)
    return (
      <p className="flex-center flex-1 text-center text-muted-foreground">
        There was an error fetching messages. <br />
        Kindly reload the page to try again
      </p>
    );

  return (
    <ChatProvider allMessages={messages} user={user} chatUsers={chatUsers}>
      <DashboardHeader
        user={user}
        invitationCode={invitationCode}
        notifications={notifications}
      />
      <ChatContainer user={user} />
    </ChatProvider>
  );
}
