import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CoachProfileCard({
  coach,
  user,
}: {
  coach: UserType;
  user: UserType;
}) {
  return (
    <div className="flex items-center">
      <div className="flex h-full w-full flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={coach.profilePicture}
            alt={getFullname(coach)}
            className="object-cover"
          />
          <AvatarFallback>
            {coach.firstName[0]}
            {coach.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="cursor-pointer text-lg font-semibold">
            {getFullname(coach)}
          </h3>
          <p className="text-sm text-gray-600">{coach.role}</p>
          <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-0 py-0 text-xs"
            >
              <Link
                href={
                  user._id === coach._id
                    ? "/dashboard/profile"
                    : `/dashboard/profile/${coach._id}`
                }
                className="h-full w-full px-4 py-2"
              >
                View Profile
              </Link>
            </Button>
            {user._id !== coach._id ? (
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
