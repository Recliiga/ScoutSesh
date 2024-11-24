"use client";
import React from "react";
import { UserType } from "@/db/models/User";
import CoachProfileCard from "../dashboard/CoachProfileCard";
import UserProfileCard from "../dashboard/UserProfileCard";
import { DailyJournalType } from "@/db/models/DailyJournal";

type PropsType = {
  teamJournalEntries: DailyJournalType[] | null;
  organizationMembers: UserType[] | null;
};

export default function AthleteTeamMembersPage({
  teamJournalEntries,
  organizationMembers,
}: PropsType) {
  if (!organizationMembers)
    return (
      <main className="flex-1 flex-center text-accent-gray-300">
        You are not connected to any team
      </main>
    );

  const teamMembers = organizationMembers.filter(
    (teamMember) => teamMember.role === "Athlete"
  );

  const coaches = organizationMembers.filter(
    (teamMember) => teamMember.role !== "Athlete"
  );

  return (
    <main className="flex-1 mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex flex-col gap-6 mb-8">
        <div className="items-start gap-2 grid grid-cols-1">
          <div className="w-full">
            <div
              className="relative border-2 border-gray-300 p-6 rounded-lg w-full h-full"
              style={{ minHeight: "300px" }}
            >
              <h2 className="mb-6 font-bold text-2xl">
                Riverside Basketball Club
              </h2>
              <div className="top-4 right-4 bg-green-100 px-4 py-2 rounded-full w-fit font-bold text-2xl text-green-800 whitespace-nowrap">
                {teamMembers.length + coaches.length} Team Members 🏅
              </div>
              <div className="gap-4 grid grid-cols-2 min-[540px]:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {coaches.map((coach) => (
                  <CoachProfileCard coach={coach} key={coach._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mb-4 font-bold text-2xl">Athletes</h3>
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {teamMembers.map((member) => (
          <UserProfileCard
            member={member}
            key={member._id}
            journalEntries={teamJournalEntries}
          />
        ))}
      </div>
    </main>
  );
}
