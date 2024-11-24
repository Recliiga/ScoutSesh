import Image from "next/image";
import React from "react";
import ScoutSeshStreak from "./ScoutSeshStreak";
import { getFullname } from "@/lib/utils";
import { UserType } from "@/db/models/User";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { DailyJournalType } from "@/db/models/DailyJournal";

export default function UserProfileCard({
  journalEntries,
  member,
  forCoach = false,
}: {
  member: UserType;
  forCoach?: boolean;
  journalEntries: DailyJournalType[] | null;
}) {
  return (
    <div className="flex flex-col flex-center items-center gap-2 w-full">
      <Image
        src={member.profilePicture}
        alt={`${getFullname(member)}'s profile`}
        width={150}
        height={150}
        priority
        className="mb-2 rounded-full w-28 sm:w-36 h-28 sm:h-36 object-cover"
      />
      <div className="flex flex-col justify-center">
        <p className="mb-1 w-full font-medium text-center truncate">
          {getFullname(member)}
        </p>
        <ScoutSeshStreak
          streakCount={0}
          journalEntries={journalEntries?.filter(
            (entry) => String(entry.user) === member._id
          )}
          className="px-[8px] sm:px-4 py-[4px] sm:py-2 text-[12px] text-center sm:text-sm"
        />
      </div>
      {forCoach && (
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 px-0 py-0 h-8 text-xs"
          >
            <Link href="#" className="px-4 py-2 w-full h-full">
              View Profile
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="p-0 w-8 h-8">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
