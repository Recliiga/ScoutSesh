"use client";

import { ChatType } from "@/components/messages/ChatContainer";
import { MessageType } from "@/db/models/Message";
import { UserType } from "@/db/models/User";
import { pusherClient } from "@/lib/pusher";
import { format } from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";

function createChatId(userId: string, chatUserId: string) {
  return [chatUserId, userId].sort((a, b) => a.localeCompare(b)).join("-");
}

function transformMessagesToChats(
  messages: MessageType[],
  userId: string,
  chatUsers: UserType[],
): ChatType[] {
  function getLastMessageTime(chatMessages: MessageType[]) {
    const lastMessageDate = new Date(
      chatMessages[chatMessages.length - 1].createdAt,
    );
    const today = new Date();
    const isToday = lastMessageDate.toDateString() === today.toDateString();
    const isYesterday =
      lastMessageDate.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString();

    if (isToday) {
      return format(lastMessageDate, "h:mm a");
    } else if (isYesterday) {
      return `Yesterday at ${format(lastMessageDate, "h:mm a")}`;
    } else {
      return format(lastMessageDate, "MMM do 'at' h:mm a");
    }
  }

  return chatUsers
    .map((chatUser) => {
      const chatMessages = messages.filter(
        (m) => m.fromUser._id === chatUser._id || m.toUser._id === chatUser._id,
      );

      const unreadCount = chatMessages.filter(
        (m) => !m.isRead && m.toUser._id === userId,
      ).length;

      return {
        _id: createChatId(userId, chatUser._id),
        user: {
          _id: chatUser._id,
          name: `${chatUser.firstName} ${chatUser.lastName}`,
          role: chatUser.role,
          profilePicture: chatUser.profilePicture,
          initials: `${chatUser.firstName[0]}${chatUser.lastName[0]}`,
        },
        lastMessageTime: chatMessages.length
          ? getLastMessageTime(chatMessages)
          : null,
        lastMessage: chatMessages[chatMessages.length - 1],
        messages: chatMessages,
        unreadCount,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt).getTime() -
        new Date(a.lastMessage.createdAt).getTime(),
    );
}

const chatContext = createContext<{
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  chats: ChatType[];
  totalUnReadMessages: number;
}>({
  messages: [],
  setMessages: () => {},
  chats: [],
  totalUnReadMessages: 0,
});

export default function ChatProvider({
  user,
  allMessages,
  chatUsers,
  children,
}: {
  user: UserType;
  allMessages: MessageType[];
  chatUsers: UserType[];
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState(allMessages);

  const chats = transformMessagesToChats(messages, user._id, chatUsers);

  const totalUnReadMessages = chats.reduce(
    (acc, curr) => acc + curr.unreadCount,
    0,
  );

  useEffect(() => {
    if (!user.organization) return;

    pusherClient.subscribe(user.organization._id);

    pusherClient.bind("incoming-message", (newMessage: MessageType) => {
      setMessages((currentMessages) => [...currentMessages, newMessage]);
    });

    return () => {
      if (!user.organization) return;
      pusherClient.subscribe(user.organization._id);
    };
  }, [user.organization]);

  return (
    <chatContext.Provider
      value={{ messages, setMessages, chats, totalUnReadMessages }}
    >
      {children}
    </chatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(chatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
}
