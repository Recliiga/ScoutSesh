"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, UserPlus } from "lucide-react";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import CoachProfileCard from "../dashboard/CoachProfileCard";
import UserProfileCard from "../dashboard/UserProfileCard";
import { DailyJournalType } from "@/db/models/DailyJournal";
import ModalContainer from "../ModalContainer";
import AddTeamMemberModal from "../AddTeamMemberModal";
import { InvitationCodeType } from "@/db/models/InvitationCode";

export default function CoachTeamMembersPage({
  teamJournalEntries,
  organizationMembers,
  invitationCode,
  user,
}: {
  teamJournalEntries: DailyJournalType[] | null;
  organizationMembers: UserType[];
  invitationCode: InvitationCodeType | null;
  user: UserType;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const teamMembers = organizationMembers.filter(
    (teamMember) => teamMember.role === "Athlete",
  );

  const coaches = organizationMembers.filter(
    (teamMember) => teamMember.role !== "Athlete",
  );

  const filteredMembers = teamMembers.filter((member) =>
    getFullname(member).toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  function handleMessageAll() {
    return;
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <main className="mx-auto w-[90%] max-w-6xl flex-grow py-6 sm:py-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <div className="flex w-full flex-1 flex-col items-start gap-4">
              <h2 className="text-2xl font-bold">All Team Members</h2>
              <div className="relative w-full md:w-48">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="search"
                  placeholder="Find Members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8"
                />
              </div>
              <Button
                onClick={handleMessageAll}
                variant="outline"
                className="w-full whitespace-nowrap transition-colors hover:bg-green-700 hover:text-white md:w-48"
              >
                <Send className="mr-2 h-4 w-4" />
                Message All Members
              </Button>
              <Button
                onClick={() => setModalIsOpen(true)}
                variant="outline"
                className="w-full whitespace-nowrap transition-colors hover:bg-green-700 hover:text-white md:w-48"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Team Members
              </Button>
            </div>
            <div className="w-full flex-1 lg:flex-[3]">
              <div
                className="relative h-full w-full rounded-lg border-2 border-gray-300 p-6"
                style={{ minHeight: "300px" }}
              >
                <h2 className="mb-6 text-2xl font-bold">
                  {user.organization?.name}
                </h2>
                <div className="right-4 top-4 w-fit whitespace-nowrap rounded-full bg-green-100 px-4 py-2 text-xl font-bold text-green-800 sm:text-2xl">
                  {organizationMembers.length} Team Members 🏅
                </div>
                <div className="mt-8 grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]">
                  {coaches.map((coach) => (
                    <CoachProfileCard
                      key={coach._id}
                      coach={coach}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="mb-4 text-center text-2xl font-bold">Athletes</h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredMembers.map((member) => (
            <UserProfileCard
              key={member._id}
              member={member}
              forCoach
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
      <ModalContainer open={modalIsOpen} closeModal={closeModal}>
        <AddTeamMemberModal
          invitationCode={invitationCode}
          open={modalIsOpen}
          closeModal={closeModal}
          user={user}
        />
      </ModalContainer>
    </>
  );
}
