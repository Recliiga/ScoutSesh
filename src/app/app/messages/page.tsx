"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  VideoIcon,
  CalendarIcon,
  ViewIcon,
  SendIcon,
  ImageIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ChatType = {
  name: string;
  message: string;
  time: string;
  initials: string;
};

export default function ChatPage() {
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const chats = useMemo(() => {
    return [
      {
        name: "Brandon Peterson",
        message: "Can we review my scoring goals for the season?",
        time: "10:03 PM",
        initials: "BP",
      },
      {
        name: "Leanne Melissa",
        message: "I'd like to discuss improving my defensive skills.",
        time: "10:01 PM",
        initials: "LM",
      },
      {
        name: "Jordan Shayne",
        message: "Let's set up a player evaluation session for the team.",
        time: "9:01 PM",
        initials: "JS",
      },
      {
        name: "Darlene Jayne",
        message: "How can I work on my leadership goals?",
        time: "Friday",
        initials: "DJ",
      },
      {
        name: "Randy Dennis",
        message: "Need to discuss the rookies' performance evaluations.",
        time: "Thursday",
        initials: "RD",
      },
    ];
  }, []);

  const [selectedChat, setSelectedChat] = useState(chats[0]);

  useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [chats]);

  const handleChatSelect = (chat: ChatType) => {
    setSelectedChat((prevSelectedChat) => {
      if (prevSelectedChat !== chat) {
        setIsProfileVisible(true);
      }
      return chat;
    });
  };

  return (
    <main className="flex-1 mx-auto w-[90%] max-w-6xl">
      <TooltipProvider>
        <div className="flex space-x-4 p-4">
          <aside className="space-y-4 w-1/4">
            <h2 className="font-bold text-xl">Messages</h2>
            <div className="relative w-full">
              <SearchIcon className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search"
                className="pr-4 pl-10 w-full"
              />
            </div>
            <div className="space-y-2" key={selectedChat.name}>
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 space-x-2 rounded-md shadow cursor-pointer ${
                    chat.name === selectedChat.name
                      ? "bg-gray-100 border-l-4 border-green-600"
                      : "bg-white"
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <Avatar>
                    <AvatarFallback>{chat.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p
                      className={
                        chat.name === selectedChat.name ? "font-medium" : ""
                      }
                    >
                      {chat.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {chat.message}
                    </p>
                    <p className="text-muted-foreground text-xs">{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <section className={`flex-1 space-y-4 `}>
            {selectedChat && (
              <>
                <div className="flex justify-between items-center bg-green-50 shadow p-4 rounded-md">
                  <div>
                    <h3 className="font-bold text-lg">{selectedChat.name}</h3>
                    <p>Head Coach</p>
                  </div>
                  <TooltipProvider>
                    <div className="flex items-center space-x-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="hover:bg-gray-100 p-1 rounded-full transition-colors duration-200">
                            <VideoIcon className="w-6 h-6 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Create a Call</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="hover:bg-gray-100 p-1 rounded-full transition-colors duration-200">
                            <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Schedule a Meeting</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              setIsProfileVisible(!isProfileVisible)
                            }
                            className="hover:bg-gray-100 p-1 rounded-full transition-colors duration-200"
                          >
                            {isProfileVisible ? (
                              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                            ) : (
                              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
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
                <div className="space-y-4">
                  {[
                    {
                      name: selectedChat.name,
                      message:
                        "I think it's time we conduct a comprehensive player evaluation for the team. We need to assess everyone's progress towards their individual goals.",
                      time: "8:55 PM",
                      initials: selectedChat.initials,
                    },
                    {
                      name: "Karsen Jarryd",
                      message:
                        "That's a great idea, Coach. Should we focus on both performance metrics and personal development goals?",
                      time: "8:59 PM",
                      initials: "KJ",
                    },
                    {
                      name: selectedChat.name,
                      message:
                        "Absolutely. We'll look at on-ice performance, fitness levels, and how well they're meeting their personal development objectives.",
                      time: "9:01 PM",
                      initials: selectedChat.initials,
                    },
                    {
                      name: "Karsen Jarryd",
                      message:
                        "Sounds good. When do you want to start the evaluations? We should probably schedule them around our upcoming games and practices.",
                      time: "9:05 PM",
                      initials: "KJ",
                    },
                    {
                      name: selectedChat.name,
                      message:
                        "Let's aim to start next week. We can use the data from recent games and combine it with individual sessions. I'll draft an evaluation form that covers all aspects we want to assess.",
                      time: "9:10 PM",
                      initials: selectedChat.initials,
                    },
                  ].map((message, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Avatar>
                        <AvatarFallback>{message.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-base">
                          {message.name}{" "}
                          <span className="font-normal text-muted-foreground text-xs">
                            {message.time}
                          </span>
                        </p>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center bg-white shadow p-4 rounded-md">
                  <Input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-2 ml-2">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    <SendIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </>
            )}
          </section>
          <div
            className={`transition-all duration-300 ease-in-out ${
              isProfileVisible ? "w-1/4" : "w-0 overflow-hidden"
            }`}
          >
            {isProfileVisible && selectedChat && (
              <aside className="space-y-4 w-full">
                <div className="flex flex-col items-center bg-white shadow mt-4 p-4 rounded-md">
                  <Avatar className="mb-4 w-24 h-24">
                    <AvatarFallback className="text-2xl">
                      {selectedChat.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-8 text-center">
                    <h4 className="font-medium text-lg">{selectedChat.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      Head Coach | Victoria, BC
                    </p>
                    <p className="text-muted-foreground text-sm">
                      7:08 PM GMT+5
                      <br />
                      (12 h ahead)
                    </p>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button variant="outline" className="justify-start w-full">
                      <ViewIcon className="mr-2 w-4 h-4 text-green-600" />
                      View Profile
                    </Button>
                    <Button variant="outline" className="justify-start w-full">
                      <CalendarIcon className="mr-2 w-4 h-4 text-green-600" />
                      Schedule a Meeting
                    </Button>
                    <Button variant="outline" className="justify-start w-full">
                      <VideoIcon className="mr-2 w-4 h-4 text-green-600" />
                      Start a Video Call
                    </Button>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </TooltipProvider>
    </main>
  );
}
