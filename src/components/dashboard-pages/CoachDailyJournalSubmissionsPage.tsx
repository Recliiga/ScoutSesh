"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { DailyJournalType } from "@/db/models/DailyJournal";
import { calculateStreak } from "@/lib/utils";
import DailyJournalAthletesTable from "../daily-journal/DailyJournalAthletesTable";
import DailyJournalInactiveAthletesTable from "../daily-journal/DailyJournalInactiveAthletesTable";

export default function CoachDailyJournalSubmissionsPage({
  teamJournalEntries,
}: {
  teamJournalEntries: DailyJournalType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const athletesWithJournals = useMemo(() => {
    return teamJournalEntries.map((entry) => {
      const athleteJournalEntries = teamJournalEntries.filter(
        (teamEntry) => teamEntry.user._id === entry.user._id
      );

      const latestEntry = athleteJournalEntries.reduce(
        (prev, curr) =>
          new Date(curr.createdAt).getTime() >
          new Date(prev.createdAt).getTime()
            ? curr
            : prev,
        athleteJournalEntries[0]
      );

      const latestEntryDate = new Date(latestEntry.createdAt);

      const submittedToday =
        latestEntryDate.toDateString() === new Date().toDateString();

      return {
        _id: entry.user._id,
        name: entry.user.firstName + " " + entry.user.lastName,
        profilePicture: entry.user.profilePicture,
        scoutSeshStreak: calculateStreak(athleteJournalEntries),
        submittedToday,
        lastUpdate: latestEntryDate.toDateString(),
      };
    });
  }, [teamJournalEntries]);

  const { activeAthletes, inactiveAthletes } = useMemo(() => {
    const filtered = athletesWithJournals.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeAthletes = filtered
      .filter((athlete) => athlete.scoutSeshStreak > 0)
      .sort((a, b) => b.scoutSeshStreak - a.scoutSeshStreak);

    const inactiveAthletes = filtered
      .filter((athlete) => athlete.scoutSeshStreak === 0)
      .map((athlete) => ({
        ...athlete,
        daysSinceLastUpdate: Math.floor(
          (new Date().getTime() - new Date(athlete.lastUpdate).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      }))
      .sort((a, b) => a.daysSinceLastUpdate - b.daysSinceLastUpdate);

    return {
      activeAthletes,
      inactiveAthletes,
    };
  }, [athletesWithJournals, searchTerm]);

  return (
    <main className="flex-1 mx-auto w-[90%] max-w-6xl">
      <div className="mx-auto px-4 py-8 container">
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">Daily Journal Records</h2>
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
              <DailyJournalAthletesTable athletes={activeAthletes} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-2xl">
            Inactive Daily Journal Submissions
          </h2>
          <p className="mb-4 text-gray-600 text-sm">
            Athletes who have missed one or more days of their daily journal
            entries.
          </p>
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <DailyJournalInactiveAthletesTable athletes={inactiveAthletes} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
