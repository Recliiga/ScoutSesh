"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";
import AthleteTable from "../dashboard/AthleteTable";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { getFullname } from "@/lib/utils";

export default function CoachGoalSubmissionsPage({
  teamGoalData,
}: {
  teamGoalData: GoalDataSchemaType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const allAthletesWithGoals = teamGoalData.map((gd, index) => ({
    _id: `${gd.user._id}-${index}`,
    goalId: gd._id as string,
    name: getFullname(gd.user),
    profilePicture: gd.user.profilePicture,
    lastGoalDate: new Date(),
    totalGoals: gd.goals.length,
    weeklyReflections: gd.goals.reduce(
      (prev, curr) => prev + curr.weeklyReflections.length,
      0
    ),
    latestUpdate: new Date(
      [...gd.goals].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0].updatedAt
    ),
  }));

  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const filtered = allAthletesWithGoals.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const activeAthletes = filtered.filter(
    (athlete) => new Date(athlete.latestUpdate) > fourWeeksAgo
  );
  const inactiveAthletes = filtered.filter(
    (athlete) => new Date(athlete.latestUpdate) <= fourWeeksAgo
  );

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
