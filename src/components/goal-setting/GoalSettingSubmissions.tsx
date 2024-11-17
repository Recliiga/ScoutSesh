"use client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { GoalSchemaType } from "@/db/models/Goal";
import { UserType } from "@/db/models/User";

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
  goalSettingSubmissions: GoalSchemaType[];
  user: UserType;
}) {
  const mostRecentSubmission = goalSettingSubmissions.reduce((prev, current) =>
    new Date(current.createdAt) > new Date(prev.createdAt) ? current : prev
  );

  const [openSubmission, setOpenSubmission] = useState<string | null>(
    mostRecentSubmission._id as string
  );

  const sortedSubmissions = [...goalSettingSubmissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const athleteName = user.firstName + " " + user.lastName;

  return (
    <div className="space-y-4">
      {sortedSubmissions.map((submission) => (
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
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.profilePicture} alt={athleteName} />
                    <AvatarFallback>
                      {athleteName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
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
                <div
                  className="flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Goal Setting Session</DialogTitle>
                      </DialogHeader>
                      <div className="mt-2">
                        <p className="mb-2 text-gray-500 text-sm">
                          {new Date(submission.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-gray-700 text-sm">
                          {submission.goal}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{`Week${
                                index + 1
                              } Reflection`}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-2">
                              <p className="mb-2 text-gray-500 text-sm">
                                {new Date(
                                  reflection.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-gray-700 text-sm">
                                {reflection.improvement}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
