import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { ChatType } from "./ChatContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";

export default function MessagesView({
  selectedChatId,
  selectedChat,
  isProfileVisible,
  setIsProfileVisible,
}: {
  selectedChatId: string;
  selectedChat: ChatType;
  isProfileVisible: boolean;
  setIsProfileVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section
      className={`flex flex-1 flex-col gap-4 rounded-lg border border-muted`}
    >
      {selectedChatId && (
        <>
          <div className="flex items-center justify-between rounded-md bg-green-50 p-4 shadow">
            <div>
              <h3 className="text-lg font-bold">{selectedChat.user.name}</h3>
              <p>{selectedChat.user.role}</p>
            </div>
            <TooltipProvider>
              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100">
                      <VideoIcon className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Create a Call</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100">
                      <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Schedule a Meeting</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsProfileVisible(!isProfileVisible)}
                      className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
                    >
                      {isProfileVisible ? (
                        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                      ) : (
                        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isProfileVisible ? "Hide Profile" : "See Profile"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          <div className="flex-1 space-y-4">
            {selectedChat.messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage
                    src={message.fromUser.profilePicture}
                    alt={`${message.fromUser.firstName}'s Profile Picture`}
                  />
                  <AvatarFallback>
                    {message.fromUser.firstName[0]}
                    {message.toUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">
                    {message.fromUser.firstName} {message.fromUser.lastName}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      {message.createdAt.toLocaleTimeString("en-US")}
                    </span>
                  </p>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center rounded-md bg-white p-4 shadow">
            <Input
              type="text"
              placeholder="Send a message..."
              className="flex-1"
            />
            <div className="ml-2 flex items-center space-x-2">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
              <SendIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
