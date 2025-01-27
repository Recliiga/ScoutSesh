"use client";
import React, { useState } from "react";
import { UserType } from "@/db/models/User";
import ChatList from "@/components/messages/ChatList";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageType } from "@/db/models/Message";
import AboutUser from "./AboutUser";
import MessagesView from "./MessagesView";

export type ChatType = {
  _id: string;
  user: {
    name: string;
    role: string;
    profilePicture: string;
    initials: string;
  };
  lastMessageTime: string | null;
  messages: MessageType[];
};

function transformMessagesToChats(
  messages: MessageType[],
  userId: string,
  chatUsers: UserType[],
): ChatType[] {
  return chatUsers.map((chatUser) => {
    const chatMessages = messages.filter(
      (m) => m.fromUser._id === chatUser._id || m.toUser._id === chatUser._id,
    );

    return {
      _id: chatUser._id,
      user: {
        name: `${chatUser.firstName} ${chatUser.lastName}`,
        role: chatUser.role,
        profilePicture: chatUser.profilePicture,
        initials: `${chatUser.firstName[0]}${chatUser.lastName[0]}`,
      },
      lastMessageTime: chatMessages.length
        ? new Date(chatMessages[0].createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        : null,
      messages: chatMessages,
    };
  });
}

export default function ChatContainer({
  user,
  messages,
  chatUsers,
}: {
  user: UserType;
  chatUsers: UserType[];
  messages: MessageType[];
}) {
  const chats = transformMessagesToChats(messages, user._id, chatUsers);

  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?._id);

  const selectedChat = chats.find((chat) => chat._id === selectedChatId);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId((prevSelectedChatId) => {
      if (prevSelectedChatId !== chatId) {
        setIsProfileVisible(true);
      }
      return chatId;
    });
  };

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
            <div className="flex flex-1 gap-4">
              <MessagesView
                isProfileVisible={isProfileVisible}
                selectedChat={selectedChat}
                selectedChatId={selectedChatId}
                setIsProfileVisible={setIsProfileVisible}
              />
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isProfileVisible ? "w-1/3" : "w-0"
                }`}
              >
                <AboutUser selectedChat={selectedChat} />
              </div>
            </div>
          ) : (
            <div className="flex-center flex-1 rounded-lg border text-muted-foreground">
              Click on a chat to start messaging
            </div>
          )}
        </div>
      </TooltipProvider>
    </main>
  );
}
