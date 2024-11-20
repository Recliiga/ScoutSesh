"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";
import AthleteTable from "../app/AthleteTable";

const allAthletesWithGoals = [
  {
    id: 1,
    name: "John Doe",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-10-15",
    totalGoals: 2,
    weeklyReflections: 3,
    latestUpdate: "2024-11-22T14:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-09-01",
    totalGoals: 1,
    weeklyReflections: 2,
    latestUpdate: "2024-12-08T09:15:00",
  },
  {
    id: 3,
    name: "Mike Johnson",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-08-15",
    totalGoals: 3,
    weeklyReflections: 3,
    latestUpdate: "2024-08-29T11:45:00",
  },
  {
    id: 4,
    name: "Emily Brown",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-07-22",
    totalGoals: 3,
    weeklyReflections: 5,
    latestUpdate: "2024-08-26T16:20:00",
  },
  {
    id: 5,
    name: "Alex Lee",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-06-30",
    totalGoals: 2,
    weeklyReflections: 4,
    latestUpdate: "2024-07-28T10:00:00",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-05-18",
    totalGoals: 3,
    weeklyReflections: 6,
    latestUpdate: "2024-06-29T13:50:00",
  },
  {
    id: 7,
    name: "Tom Davis",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-04-05",
    totalGoals: 1,
    weeklyReflections: 2,
    latestUpdate: "2024-04-19T08:30:00",
  },
  {
    id: 8,
    name: "Lisa Chen",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-03-12",
    totalGoals: 3,
    weeklyReflections: 4,
    latestUpdate: "2024-04-09T15:10:00",
  },
  {
    id: 9,
    name: "Ryan Taylor",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-02-28",
    totalGoals: 2,
    weeklyReflections: 3,
    latestUpdate: "2024-03-21T12:00:00",
  },
  {
    id: 10,
    name: "Emma White",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-01-15",
    totalGoals: 3,
    weeklyReflections: 7,
    latestUpdate: "2024-03-04T17:45:00",
  },
];

export default function CoachGoalSubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { activeAthletes, inactiveAthletes } = useMemo(() => {
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const filtered = allAthletesWithGoals.filter((athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      activeAthletes: filtered.filter(
        (athlete) => new Date(athlete.latestUpdate) > fourWeeksAgo
      ),
      inactiveAthletes: filtered.filter(
        (athlete) => new Date(athlete.latestUpdate) <= fourWeeksAgo
      ),
    };
  }, [searchTerm]);

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <h1 className="mb-6 font-bold text-3xl">
          All Goal Setting Submissions
        </h1>
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button className="bg-green-600 hover:bg-green-700 ml-2 text-white">
              <SearchIcon className="mr-2 w-4 h-4" />
              Search
            </Button>
          </div>
          <h2 className="mb-4 font-semibold text-2xl">
            Active Goal Setting Submissions
          </h2>
          <AthleteTable athletes={activeAthletes} />

          <h2 className="mt-8 mb-4 font-semibold text-2xl">
            Inactive Goal Setting Submissions
          </h2>
          <p className="mb-4 text-gray-600 text-sm">
            Athletes who have not submitted or updated their goals within the
            last 4 weeks.
          </p>
          <AthleteTable athletes={inactiveAthletes} />
        </div>
      </div>
    </main>
  );
}
