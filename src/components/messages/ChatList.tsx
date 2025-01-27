import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { ChatType } from "./ChatContainer";

export default function ChatList({
  handleChatSelect,
  selectedChat,
  chats,
}: {
  handleChatSelect(id: string): void;
  selectedChat?: ChatType;
  chats: ChatType[];
}) {
  return (
    <aside className="w-1/4 space-y-4">
      <h2 className="text-xl font-bold">Messages</h2>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full pl-10 pr-4"
        />
      </div>
      <div className="space-y-2" key={selectedChat?._id || "1"}>
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex cursor-pointer items-start space-x-2 rounded-md p-2 shadow ${
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
              />
              <AvatarFallback>{chat.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p
                className={chat._id === selectedChat?._id ? "font-medium" : ""}
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
          </div>
        ))}
      </div>
    </aside>
  );
}
