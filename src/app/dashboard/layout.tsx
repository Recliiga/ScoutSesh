import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChatProvider from "@/context/chatContext";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchLatestInvitationCode } from "@/services/invitationServices";
import { fetchChatUsers, fetchMessages } from "@/services/messageServices";
import { fetchNotifications } from "@/services/notificationEntryServices";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionFromHeaders();

  const { invitationCode } = await fetchLatestInvitationCode();

  const { notifications, error } = await fetchNotifications(user._id);
  if (error !== null) throw new Error(error);

  const { chatUsers } = await fetchChatUsers(
    user._id,
    user.organization?._id || "",
    user.role,
  );

  const { messages } = await fetchMessages(user._id, user.role);

  return (
    <ChatProvider
      allMessages={messages || []}
      user={user}
      chatUsers={chatUsers || []}
    >
      <DashboardHeader
        user={user}
        invitationCode={invitationCode}
        notifications={notifications}
      />
      {children}
    </ChatProvider>
  );
}
