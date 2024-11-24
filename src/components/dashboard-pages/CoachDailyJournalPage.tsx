"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpenIcon, SearchIcon, MessageSquare } from "lucide-react";
import DailyJournalCard from "@/components/dashboard/DailyJournalCard";
import { DailyJournalType } from "@/db/models/DailyJournal";
import { calculateStreak } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const today = new Date();

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

  const sortedAndFilteredAthletes = useMemo(() => {
    return athletesWithJournals
      .filter(
        (athlete) =>
          athlete.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) &&
          athlete.scoutSeshStreak > 0
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
              <table className="divide-y divide-gray-200 min-w-full">
                <thead className="top-0 sticky bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Athlete
                    </th>
                    <th className="px-6 py-3 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                      ScoutSesh Streak
                    </th>
                    <th className="px-6 py-3 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                      Today&apos;s Submission
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredAthletes.map((athlete) => (
                    <tr key={athlete._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={athlete.profilePicture}
                                alt={athlete.name}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {athlete.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 text-sm">
                              {athlete.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.scoutSeshStreak}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {athlete.submittedToday ? (
                          <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                            Submitted
                          </span>
                        ) : (
                          <span className="inline-flex bg-red-100 px-2 rounded-full font-semibold text-red-800 text-xs leading-5">
                            Not Submitted
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                              >
                                View Entries
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {athlete.name}&apos;s Journal Entries
                                </DialogTitle>
                              </DialogHeader>
                              <div className="mt-2">
                                <p className="text-gray-500 text-sm">
                                  ScoutSesh Streak: {athlete.scoutSeshStreak}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Today&apos;s Submission:{" "}
                                  {athlete.submittedToday
                                    ? "Submitted"
                                    : "Not Submitted"}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                          >
                            <MessageSquare className="mr-2 w-4 h-4" />
                            Message
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <DailyJournalCard
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
