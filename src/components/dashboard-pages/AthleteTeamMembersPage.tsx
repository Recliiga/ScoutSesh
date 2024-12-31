"use client";
import React from "react";
import { UserType } from "@/db/models/User";
import CoachProfileCard from "../dashboard/CoachProfileCard";
import UserProfileCard from "../dashboard/UserProfileCard";
import { DailyJournalType } from "@/db/models/DailyJournal";

type PropsType = {
  teamJournalEntries: DailyJournalType[] | null;
  organizationMembers: UserType[] | null;
  user: UserType;
};

export default function AthleteTeamMembersPage({
  teamJournalEntries,
  organizationMembers,
  user,
}: PropsType) {
  if (!organizationMembers)
    return (
      <main className="flex-center flex-1 text-accent-gray-300">
        You are not connected to any team
      </main>
    );

  const teamMembers = organizationMembers.filter(
    (teamMember) => teamMember.role === "Athlete",
  );

  const coaches = organizationMembers.filter(
    (teamMember) => teamMember.role !== "Athlete",
  );

  return (
    <main className="mx-auto w-[90%] max-w-6xl flex-1 py-6 sm:py-8">
      <div className="mb-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 items-start gap-2">
          <div className="w-full">
            <div
              className="relative h-full w-full rounded-lg border-2 border-gray-300 p-6"
              // style={{ minHeight: "300px" }}
            >
              <h2 className="mb-6 text-2xl font-bold">
                {user.organization?.name}
              </h2>
              <div className="right-4 top-4 w-fit whitespace-nowrap rounded-full bg-green-100 px-4 py-2 text-2xl font-bold text-green-800">
                {organizationMembers.length} Team Members 🏅
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 min-[540px]:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3">
                {coaches.map((coach) => (
                  <CoachProfileCard coach={coach} key={coach._id} user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-bold">Athletes</h3>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {teamMembers.map((member) => (
          <UserProfileCard
            initialsOnly
            member={member}
            key={member._id}
            journalEntries={
              teamJournalEntries &&
              teamJournalEntries.filter(
                (entry) => entry.user._id === member._id,
              )
            }
          />
        ))}
      </div>
    </main>
  );
}
