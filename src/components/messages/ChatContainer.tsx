"use client";
import React, { useEffect, useState } from "react";
import { UserType } from "@/db/models/User";
import ChatList from "@/components/messages/ChatList";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageType } from "@/db/models/Message";
import AboutUser from "./AboutUser";
import MessagesView from "./MessagesView";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { markMessagesAsRead } from "@/actions/messageActions";

export type ChatType = {
  _id: string;
  user: {
    _id: string;
    name: string;
    role: string;
    profilePicture: string;
    initials: string;
  };
  lastMessageTime: string | null;
  lastMessage: MessageType;
  messages: MessageType[];
  unreadCount: number;
};

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

export default function ChatContainer({
  user,
  allMessages,
  chatUsers,
}: {
  user: UserType;
  chatUsers: UserType[];
  allMessages: MessageType[];
}) {
  const [messages, setMessages] = useState(allMessages);

  const chats = transformMessagesToChats(messages, user._id, chatUsers);

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const selectedChat = chats.find((chat) => chat._id === selectedChatId);

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

  useEffect(() => {
    (async () => {
      if (!selectedChatId) return;

      const selectedChatMessages = messages.filter(
        (m) =>
          m.fromUser._id === selectedChat?.user._id ||
          m.toUser._id === selectedChat?.user._id,
      );

      const unreadMessages = selectedChatMessages.filter(
        (m) => !m.isRead && m.toUser._id === user._id,
      );

      if (unreadMessages.length > 0) {
        await handleMarkMessagesAsRead(unreadMessages);
      }
    })();
  }, [messages, selectedChatId, selectedChat, user._id]);

  async function handleMarkMessagesAsRead(unreadMessages: MessageType[]) {
    setMessages((currentMessages) =>
      currentMessages.map((m) =>
        unreadMessages.some((um) => um._id === m._id)
          ? ({ ...m, isRead: true } as MessageType)
          : m,
      ),
    );

    await markMessagesAsRead(unreadMessages.map((msg) => msg._id));
  }

  async function handleChatSelect(chatId: string) {
    setSelectedChatId(chatId);

    const selectedChat = chats.find((chat) => chat._id === chatId);

    if (!selectedChat) return;

    const unreadMessages = selectedChat.messages.filter(
      (m) => !m.isRead && m.toUser._id === user._id,
    );

    if (unreadMessages.length > 0) {
      await handleMarkMessagesAsRead(unreadMessages);
    }
  }

  return (
    <main className="mx-auto flex w-[90%] max-w-6xl flex-1">
      <TooltipProvider>
        <div className="flex flex-1 gap-4 py-4">
          <ChatList
            handleChatSelect={handleChatSelect}
            chats={chats}
            selectedChat={selectedChat}
          />
          {selectedChat ? (
            <div className="flex flex-[2.5] lg:flex-[3]">
              <MessagesView
                isProfileVisible={isProfileVisible}
                selectedChat={selectedChat}
                selectedChatId={selectedChatId}
                setIsProfileVisible={setIsProfileVisible}
                user={user}
                setSelectedChatId={setSelectedChatId}
              />
              <div
                className={`relative overflow-hidden rounded-md border border-muted bg-white shadow transition-all duration-300 ease-in-out ${
                  isProfileVisible
                    ? "w-full lg:ml-4 lg:w-1/3"
                    : "ml-0 hidden w-full border-0 lg:block lg:w-0"
                }`}
              >
                <AboutUser selectedChat={selectedChat} />
                <Button
                  variant={"ghost"}
                  className="absolute left-2 top-2 lg:hidden"
                  onClick={() => setIsProfileVisible(false)}
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden flex-[3] items-center justify-center rounded-lg border text-muted-foreground md:flex">
              Click on a chat to start messaging
            </div>
          )}
        </div>
      </TooltipProvider>
    </main>
  );
}
