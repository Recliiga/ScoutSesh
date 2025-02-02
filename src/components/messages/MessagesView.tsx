import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChatType } from "./ChatContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { UserType } from "@/db/models/User";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { sendMessage } from "@/actions/messageActions";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export default function MessagesView({
  selectedChatId,
  selectedChat,
  isProfileVisible,
  setIsProfileVisible,
  user,
  setSelectedChatId,
}: {
  selectedChatId?: string;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedChat: ChatType;
  isProfileVisible: boolean;
  setIsProfileVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const messageViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageViewRef.current?.scroll({
      top: messageViewRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedChat.messages]);

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || !message.trim() || !user.organization) return;

    setLoading(true);

    const { error } = await sendMessage(user.organization._id, {
      fromUser: user,
      toUser: selectedChat.user,
      message,
    });

    if (error) {
      toast.error(error);
    } else {
      setMessage("");
    }

    setLoading(false);
  }

  return (
    <section
      key={selectedChatId}
      className={`h-[calc(100vh-10rem)] flex-1 flex-col gap-4 rounded-lg border border-muted sm:h-[calc(100vh-10.5rem)] ${isProfileVisible ? "hidden lg:flex" : "flex"} `}
    >
      {selectedChatId && (
        <>
          <div className="flex items-center gap-2 rounded-md bg-green-50 p-4 shadow">
            <Button
              variant={"ghost"}
              className="px-2 md:hidden"
              onClick={() => setSelectedChatId(undefined)}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
            <div className="mr-auto">
              <h3 className="font-bold sm:text-lg">{selectedChat.user.name}</h3>
              <p className="text-sm sm:text-base">{selectedChat.user.role}</p>
            </div>
            <TooltipProvider>
              <div className="flex items-center space-x-4">
                {/* <Tooltip>
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
                </Tooltip> */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsProfileVisible(!isProfileVisible)}
                      className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
                    >
                      {isProfileVisible ? (
                        <>
                          <ChevronRightIcon className="hidden h-6 w-6 text-gray-600 lg:block" />
                          <UserIcon className="h-6 w-6 text-gray-600 lg:hidden" />
                        </>
                      ) : (
                        <>
                          <ChevronLeftIcon className="hidden h-6 w-6 text-gray-600 lg:block" />
                          <UserIcon className="h-6 w-6 text-gray-600 lg:hidden" />
                        </>
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
          <div
            className="flex-1 space-y-4 overflow-y-auto px-4"
            ref={messageViewRef}
          >
            {selectedChat.messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Avatar>
                  <AvatarImage
                    src={message.fromUser.profilePicture}
                    alt={`${message.fromUser.firstName} 's Profile Picture`}
                  />
                  <AvatarFallback>
                    {message.fromUser.firstName[0]}
                    {message.fromUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">
                    {message.fromUser.firstName} {message.fromUser.lastName}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      {format(new Date(message.createdAt), "h:mm a")}
                    </span>
                  </p>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex items-center rounded-md bg-white p-4 shadow"
            onSubmit={handleSendMessage}
          >
            <Input
              type="text"
              placeholder="Send a message..."
              className="max-h-10 flex-1 resize-none"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              disabled={loading}
            />
            <div className="ml-2 flex items-center space-x-2">
              {/* <ImageIcon className="h-6 w-6 text-muted-foreground" /> */}
              <button
                disabled={loading}
                className={`rounded-md p-2 duration-300 ${loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-muted"}`}
              >
                <SendIcon
                  className={`h-6 w-6 ${loading ? "text-muted-foreground" : "text-accent-black"}`}
                />
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
