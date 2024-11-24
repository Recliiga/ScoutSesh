"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
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

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const athletesWithJournals = [
  {
    id: 1,
    name: "John Doe",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 15,
    submittedToday: false,
    lastUpdate: yesterday,
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 0,
    submittedToday: false,
    lastUpdate: new Date("2024-10-21T09:15:00"),
  },
  {
    id: 3,
    name: "Mike Johnson",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 18,
    submittedToday: true,
    lastUpdate: today,
  },
  {
    id: 4,
    name: "Emily Brown",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 0,
    submittedToday: false,
    lastUpdate: new Date("2024-10-19T16:20:00"),
  },
  {
    id: 5,
    name: "Alex Lee",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 10,
    submittedToday: true,
    lastUpdate: today,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 0,
    submittedToday: false,
    lastUpdate: new Date("2024-10-17T13:30:00"),
  },
  {
    id: 7,
    name: "Tom Davis",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 5,
    submittedToday: false,
    lastUpdate: yesterday,
  },
  {
    id: 8,
    name: "Lisa Chen",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 0,
    submittedToday: false,
    lastUpdate: new Date("2024-10-15T11:20:00"),
  },
  {
    id: 9,
    name: "Ryan Taylor",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 3,
    submittedToday: true,
    lastUpdate: today,
  },
  {
    id: 10,
    name: "Emma White",
    photo: "/placeholder-profile-picture.png",
    scoutSeshStreak: 0,
    submittedToday: false,
    lastUpdate: new Date("2024-10-13T09:50:00"),
  },
];

export default function CoachDailyJournalPage() {
  const [searchTerm, setSearchTerm] = useState("");

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
  }, [searchTerm]);

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
                    <tr key={athlete.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              className="rounded-full w-10 h-10"
                              src={athlete.photo}
                              alt=""
                              width={40}
                              height={40}
                            />
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
