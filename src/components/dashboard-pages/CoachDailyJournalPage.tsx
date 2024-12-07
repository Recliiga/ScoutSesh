"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpenIcon, SearchIcon } from "lucide-react";
import DailyJournalCard from "@/components/dashboard/DailyJournalCard";
import { DailyJournalType } from "@/db/models/DailyJournal";
import { calculateStreak } from "@/lib/utils";
import DailyJournalAthletesTable from "../daily-journal/DailyJournalAthletesTable";

const today = new Date();

export type DailyJournalAthleteType = {
  _id: string;
  name: string;
  profilePicture: string;
  scoutSeshStreak: number;
  submittedToday: boolean;
  lastUpdate: string;
};

export default function CoachDailyJournalPage({
  teamJournalEntries,
}: {
  teamJournalEntries: DailyJournalType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const athletesWithJournals = teamJournalEntries.map((entry) => {
    const athleteJournalEntries = teamJournalEntries.filter(
      (teamEntry) => teamEntry.user._id === entry.user._id
    );

    const latestEntry = athleteJournalEntries.reduce(
      (prev, curr) =>
        new Date(curr.createdAt).getTime() > new Date(prev.createdAt).getTime()
          ? curr
          : prev,
      athleteJournalEntries[0]
    );

    const latestEntryDate = new Date(latestEntry.createdAt);

    const submittedToday =
      latestEntryDate.toDateString() === today.toDateString();

    return {
      _id: entry.user._id,
      name: entry.user.firstName + " " + entry.user.lastName,
      profilePicture: entry.user.profilePicture,
      scoutSeshStreak: calculateStreak(athleteJournalEntries),
      submittedToday,
      lastUpdate: latestEntryDate.toDateString(),
    };
  });

  const sortedAndFilteredAthletes: DailyJournalAthleteType[] = useMemo(() => {
    return athletesWithJournals
      .filter(
        (athlete, index, self) =>
          athlete.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) &&
          athlete.scoutSeshStreak > 0 &&
          index === self.findIndex((ath) => ath._id === athlete._id)
      )
      .sort((a, b) => b.scoutSeshStreak - a.scoutSeshStreak);
  }, [athletesWithJournals, searchTerm]);

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">
            Active Daily Journal Records
          </h2>
          <div className="flex mb-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search athletes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 ml-4 text-white">
              <SearchIcon className="mr-2 w-4 h-4" />
              Search
            </Button>
          </div>
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <DailyJournalAthletesTable athletes={sortedAndFilteredAthletes} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DailyJournalCard
            href="/dashboard/daily-journal/submissions"
            title="Journal Entry Records"
            description="Access a comprehensive overview of all journal entries. Review and analyze athlete progress and well-being."
            icon={<BookOpenIcon className="w-8 h-8 text-green-600" />}
            action="View Records"
          />
        </div>
      </div>
    </main>
  );
}
