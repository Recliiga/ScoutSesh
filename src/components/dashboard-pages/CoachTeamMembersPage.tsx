"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, UserPlus } from "lucide-react";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import CoachProfileCard from "../dashboard/CoachProfileCard";
import UserProfileCard from "../dashboard/UserProfileCard";
import { DailyJournalType } from "@/db/models/DailyJournal";

export default function CoachTeamMembersPage({
  teamJournalEntries,
  organizationMembers,
}: {
  teamJournalEntries: DailyJournalType[] | null;
  organizationMembers: UserType[];
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const teamMembers = organizationMembers.filter(
    (teamMember) => teamMember.role === "Athlete"
  );

  const coaches = organizationMembers.filter(
    (teamMember) => teamMember.role !== "Athlete"
  );

  const filteredMembers = teamMembers.filter((member) =>
    getFullname(member).toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  function handleMessageAll() {
    return;
  }

  return (
    <main className="flex-grow mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex lg:flex-row flex-col items-start gap-4">
          <div className="flex flex-col flex-1 items-start gap-4 w-full">
            <h2 className="font-bold text-2xl">All Team Members</h2>
            <div className="relative w-full md:w-48">
              <Search className="top-1/2 left-2 absolute w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Find Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Button
              onClick={handleMessageAll}
              variant="outline"
              className="hover:bg-green-700 w-full md:w-48 hover:text-white whitespace-nowrap transition-colors"
            >
              <Send className="mr-2 w-4 h-4" />
              Message All Members
            </Button>
            <Button
              variant="outline"
              className="hover:bg-green-700 w-full md:w-48 hover:text-white whitespace-nowrap transition-colors"
            >
              <UserPlus className="mr-2 w-4 h-4" />
              Add Team Members
            </Button>
          </div>
          <div className="flex-1 lg:flex-[3] w-full">
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
              <div className="gap-4 grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] mt-8">
                {coaches.map((coach) => (
                  <CoachProfileCard key={coach._id} coach={coach} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mb-4 font-bold text-2xl text-center">Athletes</h3>
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMembers.map((member) => (
          <UserProfileCard
            key={member._id}
            member={member}
            forCoach
            journalEntries={
              teamJournalEntries &&
              teamJournalEntries.filter(
                (entry) => entry.user._id === member._id
              )
            }
          />
        ))}
      </div>
    </main>
  );
}
