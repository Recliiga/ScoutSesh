import React from "react";
import { Button } from "../ui/button";
import { CalendarIcon, VideoIcon, ViewIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChatType } from "./ChatContainer";

export default function AboutUser({
  selectedChat,
}: {
  selectedChat: ChatType;
}) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col items-center rounded-md bg-white p-4 shadow">
        <Avatar className="mb-4 h-24 w-24">
          <AvatarFallback className="text-2xl">
            {selectedChat.user.initials}
          </AvatarFallback>
        </Avatar>
        <div className="mb-8 text-center">
          <h4 className="text-lg font-medium">{selectedChat.user.name}</h4>
          <p className="text-sm text-muted-foreground">
            Head Coach | Victoria, BC
          </p>
          <p className="text-sm text-muted-foreground">
            7:08 PM GMT+5
            <br />
            (12 h ahead)
          </p>
        </div>
        <div className="w-full space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <ViewIcon className="mr-2 h-4 w-4 text-green-600" />
            View Profile
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
            Schedule a Meeting
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <VideoIcon className="mr-2 h-4 w-4 text-green-600" />
            Start a Video Call
          </Button>
        </div>
      </div>
    </aside>
  );
}
