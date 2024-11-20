"use client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { GoalSchemaType } from "@/db/models/Goal";
import { UserType } from "@/db/models/User";
import Link from "next/link";

export type GoalSettingSubmissionType = {
  id: number;
  date: string;
  coachName: string;
  coachAvatar: string;
  content: string;
  weeklyReflections: {
    id: number;
    date: string;
    title: string;
    content: string;
  }[];
};

export default function GoalSettingSubmissions({
  goalSettingSubmissions,
  user,
}: {
  goalSettingSubmissions: (GoalSchemaType & { goalDataId: string })[];
  user: UserType;
}) {
  const mostRecentSubmission = goalSettingSubmissions.reduce(
    (prev, current) =>
      new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev,
    goalSettingSubmissions[0]
  );

  const [openSubmission, setOpenSubmission] = useState<string | null>(
    mostRecentSubmission?._id as string
  );

  const sortedSubmissions = [...goalSettingSubmissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const athleteName = user.firstName + " " + user.lastName;

  return (
    <div className="space-y-4">
      {sortedSubmissions.length ? (
        sortedSubmissions.map((submission) => (
          <Collapsible
            key={submission._id as string}
            open={openSubmission === submission._id}
            onOpenChange={() =>
              setOpenSubmission(
                openSubmission === (submission._id as string)
                  ? null
                  : (submission._id as string)
              )
            }
          >
            <CollapsibleTrigger asChild>
              <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={user.profilePicture}
                        alt={athleteName}
                      />
                      <AvatarFallback>
                        {athleteName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="sm:block hidden">{submission.goal}</h3>
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {new Date(submission.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant={"outline"} className="px-0 py-0">
                      <Link
                        href={`/dashboard/goal-setting/submissions/${submission.goalDataId}`}
                        className="px-4 py-2 w-full h-full"
                      >
                        View
                      </Link>
                    </Button>
                    {openSubmission === submission._id ? (
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-4 font-medium text-gray-900 text-lg">
                    Weekly Reflections
                  </h3>
                  <ul className="space-y-3">
                    {submission.weeklyReflections.map((reflection, index) => (
                      <li
                        key={reflection._id as string}
                        className="flex justify-between items-center bg-white shadow-sm p-3 rounded-md"
                      >
                        <span className="font-medium text-gray-900 text-sm">
                          {`Week${index + 1} Reflection`}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500 text-sm">
                            {new Date(reflection.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <Button variant={"outline"} className="px-0 py-0">
                            <Link
                              href={`/dashboard/goal-setting/weekly-reflection/${submission.goalDataId}`}
                              className="px-4 py-2 w-full h-full"
                            >
                              View
                            </Link>
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-accent-gray-300 text-center">
          You currently have no Goal setting submissions
        </p>
      )}
    </div>
  );
}
