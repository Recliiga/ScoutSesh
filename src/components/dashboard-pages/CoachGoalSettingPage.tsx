"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsersIcon, SearchIcon } from "lucide-react";
import GoalSettingCard from "../dashboard/GoalSettingCard";
import { GoalDataSchemaType } from "@/db/models/Goal";
import AthleteTable from "../dashboard/AthleteTable";
import { getFullname } from "@/lib/utils";

export default function CoachGoalSettingPage({
  teamGoalData = [],
}: {
  teamGoalData?: GoalDataSchemaType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const athletesWithGoals = teamGoalData.map((gd, index) => ({
    _id: `${gd.user._id}-${index}`,
    goalId: gd._id,
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

  const filteredAthletes = athletesWithGoals.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const sortedAthletes = filteredAthletes.sort(
    (a, b) =>
      new Date(b.latestUpdate).getTime() - new Date(a.latestUpdate).getTime()
  );

  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <h2 className="mb-4 font-semibold text-2xl">
            Goal Setting Submissions
          </h2>
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
          <div className="overflow-x-auto">
            {athletesWithGoals.length > 0 ? (
              <div className="max-h-96 overflow-y-auto">
                <AthleteTable athletes={sortedAthletes} />
              </div>
            ) : (
              <p className="text-accent-gray-300">
                You currently have to Goal Setting Submissions from your team
              </p>
            )}
          </div>
        </div>

        <div className="gap-6 grid grid-cols-1">
          <GoalSettingCard
            title="All Goal Setting Submissions"
            description="Access a comprehensive overview of all goal setting submissions. Review, analyze, and track progress across all athletes."
            icon={<UsersIcon className="w-8 h-8 text-green-600" />}
            action="View Submissions"
            href="/dashboard/goal-setting/submissions"
          />
        </div>
      </div>
    </main>
  );
}
