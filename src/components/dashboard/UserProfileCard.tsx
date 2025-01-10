import React from "react";
import ScoutSeshStreak from "./ScoutSeshStreak";
import { getFullname } from "@/lib/utils";
import { UserType } from "@/db/models/User";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { DailyJournalType } from "@/db/models/DailyJournal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserProfileCard({
  member,
  forCoach = false,
  initialsOnly = false,
  journalEntries,
}: {
  member: UserType;
  forCoach?: boolean;
  initialsOnly?: boolean;
  journalEntries: DailyJournalType[] | null;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
        <AvatarImage
          src={member.profilePicture}
          alt={getFullname(member)}
          className="object-cover"
        />
        <AvatarFallback>
          {member.firstName[0]}
          {member.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <p className="mb-1 w-full truncate text-center font-medium">
          {initialsOnly
            ? `${member.firstName} ${member.lastName[0]}.`
            : getFullname(member)}
        </p>
        <ScoutSeshStreak
          journalEntries={journalEntries?.filter(
            (entry) => entry.user._id === member._id,
          )}
          className="px-[8px] py-[4px] text-center text-[12px] sm:px-4 sm:py-2 sm:text-sm"
        />
      </div>
      {forCoach && (
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 flex-1 px-0 py-0 text-xs"
          >
            <Link
              href={`/dashboard/profile/${member._id}`}
              className="h-full w-full px-4 py-2"
            >
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
