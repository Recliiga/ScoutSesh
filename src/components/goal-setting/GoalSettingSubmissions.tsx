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
import { getFullname } from "@/lib/utils";

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
    goalSettingSubmissions[0],
  );

  const [openSubmission, setOpenSubmission] = useState<string | null>(
    mostRecentSubmission?._id,
  );

  const sortedSubmissions = [...goalSettingSubmissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const athleteName = getFullname(user);

  return (
    <div className="space-y-4">
      {sortedSubmissions.length ? (
        sortedSubmissions.map((submission) => (
          <Collapsible
            key={submission._id}
            open={openSubmission === submission._id}
            onOpenChange={() =>
              setOpenSubmission(
                openSubmission === submission._id ? null : submission._id,
              )
            }
          >
            <CollapsibleTrigger asChild>
              <div className="cursor-pointer rounded-md bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.profilePicture}
                        alt={athleteName}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {athleteName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="hidden sm:block">{submission.goal}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {new Date(submission.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
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
                        className="h-full w-full px-4 py-2"
                      >
                        View
                      </Link>
                    </Button>
                    {openSubmission === submission._id ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    Weekly Reflections
                  </h3>
                  {submission.weeklyReflections.length ? (
                    <ul className="flex flex-col gap-3">
                      {submission.weeklyReflections.map((reflection, index) => (
                        <li
                          key={reflection._id}
                          className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {`Week${index + 1} Reflection`}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                              {new Date(
                                reflection.createdAt,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            <Button variant={"outline"} className="px-0 py-0">
                              <Link
                                href={`/dashboard/goal-setting/submissions/${submission.goalDataId}`}
                                className="h-full w-full px-4 py-2"
                              >
                                View
                              </Link>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-accent-gray-300">
                      You have not completed any weekly reflections for this
                      goal
                    </p>
                  )}
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-center text-accent-gray-300">
          You currently have no Goal setting submissions
        </p>
      )}
    </div>
  );
}
