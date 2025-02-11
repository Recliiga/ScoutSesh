import React from "react";
import { ViewIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LinkButton from "../LinkButton";
import { ChatType } from "@/context/chatContext";

export default function AboutUser({ user }: { user: ChatType["user"] }) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="mt-4 flex flex-col items-center p-4">
        <Avatar className="mb-4 h-24 w-24">
          <AvatarImage src={user.profilePicture} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
        </Avatar>
        <div className="mb-8 text-center">
          <h4 className="text-lg font-medium">{user.name}</h4>
          <p className="text-sm text-muted-foreground">
            {user.role} | {user.city}, {user.country.iso2}
          </p>
        </div>
        <div className="w-full space-y-2">
          <LinkButton
            href={`/dashboard/profile/${user._id}`}
            variant="outline"
            className="flex w-full items-center justify-center"
          >
            <ViewIcon className="mr-2 h-4 w-4 text-green-600" />
            View Profile
          </LinkButton>
          {/* <Button variant="outline" className="w-full">
            <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
            Schedule a Meeting
          </Button>
          <Button variant="outline" className="w-full">
            <VideoIcon className="mr-2 h-4 w-4 text-green-600" />
            Start a Video Call
          </Button> */}
        </div>
      </div>
    </aside>
  );
}
