import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { ChatType } from "@/context/chatContext";

export default function ChatList({
  handleChatSelect,
  selectedChat,
  chats,
}: {
  handleChatSelect(id: string): void;
  selectedChat?: ChatType;
  chats: ChatType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside
      className={`flex-1 space-y-4 ${selectedChat ? "hidden md:block" : ""}`}
    >
      <h2 className="text-xl font-bold">Messages</h2>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full pl-10 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {filteredChats.map((chat, index) => (
          <div
            key={index}
            className={`flex cursor-pointer items-start space-x-2 rounded-md p-2 shadow hover:bg-gray-50 ${
              chat._id === selectedChat?._id
                ? "border-l-4 border-green-600 bg-gray-100"
                : "bg-white"
            }`}
            onClick={() => handleChatSelect(chat._id)}
          >
            <Avatar>
              <AvatarImage
                src={chat.user.profilePicture}
                alt={chat.user.name}
                className="object-cover"
              />
              <AvatarFallback>{chat.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p
                className={` ${chat._id === selectedChat?._id ? "font-medium" : ""}`}
              >
                {chat.user.name}
              </p>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {chat.lastMessage?.message || chat.user.role}
              </p>
              <p className="text-xs text-muted-foreground">
                {chat.lastMessageTime}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="flex-center h-4 w-4 rounded-full bg-green-500 text-xs font-medium text-white">
                {chat.unreadCount}
              </span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
