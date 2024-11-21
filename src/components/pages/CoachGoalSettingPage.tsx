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
import { UsersIcon, SearchIcon } from "lucide-react";
import GoalSettingCard from "../app/GoalSettingCard";
import { GoalDataSchemaType } from "@/db/models/Goal";

const athletesWithGoals2 = [
  {
    id: 1,
    name: "John Doe",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-10-15",
    totalGoals: 2,
    weeklyReflections: 3,
    latestUpdate: "2024-10-22T14:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "/placeholder-profile-picture.png",
    lastGoalDate: "2024-09-01",
    totalGoals: 1,
    weeklyReflections: 2,
    latestUpdate: "2024-09-08T09:15:00",
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

type AthleteWithGoals = {
  _id: string;
  name: string;
  profilePicture: string;
  lastGoalDate: string;
  totalGoals: number;
  weeklyReflections: number;
  latestUpdate: string;
};

export default function CoachGoalSettingPage({
  goalData = [],
}: {
  goalData: GoalDataSchemaType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const athletesWithGoals: AthleteWithGoals[] = useMemo(() => [], []);

  goalData.forEach((gd) => {
    const athleteWithGoals = {
      _id: gd.user._id as string,
      name: gd.user.firstName + " " + gd.user.lastName,
      profilePicture: gd.user.profilePicture,
      lastGoalDate: "",
      totalGoals: goalData
        .filter((g) => g.user._id === gd.user._id)
        .reduce((prev, curr) => prev + curr.goals.length, 0),
      weeklyReflections: 5,
      latestUpdate: new Date(
        goalData
          .filter((g) => g.user._id === gd.user._id)
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0].updatedAt
      ).toDateString(),
    };
    if (!athletesWithGoals.find((awg) => awg._id === gd.user._id)) {
      athletesWithGoals.push(athleteWithGoals);
    }
  });

  const sortedAndFilteredAthletes = useMemo(() => {
    return athletesWithGoals
      .filter((athlete) =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.latestUpdate).getTime() -
          new Date(a.latestUpdate).getTime()
      );
  }, [athletesWithGoals, searchTerm]);

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
            <div className="max-h-96 overflow-y-auto">
              <table className="divide-y divide-gray-200 min-w-full">
                <thead className="top-0 sticky bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Athlete
                    </th>
                    <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 w-1/12 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                      Goals Set
                    </th>
                    <th className="px-6 py-3 w-1/12 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                      Weekly Reflections
                    </th>
                    <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Latest Update
                    </th>
                    <th className="px-6 py-3 w-2/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Action
                    </th>
                    {/* Updated width */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredAthletes.map((athlete) => (
                    <tr key={athlete._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              className="rounded-full w-10 h-10"
                              src={athlete.profilePicture}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {new Date(athlete.lastGoalDate).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.totalGoals}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.weeklyReflections}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {new Date(athlete.latestUpdate).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </div>
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
                                View Goals
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {athlete.name}&apos;s Goals
                                </DialogTitle>
                              </DialogHeader>
                              <div className="mt-2">
                                <p className="text-gray-500 text-sm">
                                  Goals Set: {athlete.totalGoals}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Weekly Reflections:{" "}
                                  {athlete.weeklyReflections}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Submission Date:{" "}
                                  {new Date(
                                    athlete.lastGoalDate
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Latest Update:{" "}
                                  {new Date(
                                    athlete.latestUpdate
                                  ).toLocaleString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                          >
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
