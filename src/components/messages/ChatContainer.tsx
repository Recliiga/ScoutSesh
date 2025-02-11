"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UserType } from "@/db/models/User";
import ChatList from "@/components/messages/ChatList";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageType } from "@/db/models/Message";
import AboutUser from "./AboutUser";
import MessagesView from "./MessagesView";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { markMessagesAsRead } from "@/actions/messageActions";
import { useChatContext } from "@/context/chatContext";

export default function ChatContainer({ user }: { user: UserType }) {
  const { messages, setMessages, chats } = useChatContext();

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const selectedChat = chats.find((chat) => chat._id === selectedChatId);

  const handleMarkMessagesAsRead = useCallback(
    async (unreadMessages: MessageType[]) => {
      setMessages((currentMessages) =>
        currentMessages.map((m) =>
          unreadMessages.some((um) => um._id === m._id)
            ? ({ ...m, isRead: true } as MessageType)
            : m,
        ),
      );

      await markMessagesAsRead(unreadMessages.map((msg) => msg._id));
    },
    [setMessages],
  );

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
  }, [
    messages,
    selectedChatId,
    selectedChat,
    user._id,
    handleMarkMessagesAsRead,
  ]);

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
                <AboutUser user={selectedChat.user} />
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
