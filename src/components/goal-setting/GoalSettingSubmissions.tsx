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
}: {
  goalSettingSubmissions: GoalSettingSubmissionType[];
}) {
  const mostRecentSubmission = goalSettingSubmissions.reduce((prev, current) =>
    new Date(current.date) > new Date(prev.date) ? current : prev
  );
  const [openSubmission, setOpenSubmission] = useState<number | null>(
    mostRecentSubmission.id
  );

  return (
    <div className="space-y-4">
      {goalSettingSubmissions.map((submission) => (
        <Collapsible
          key={submission.id}
          open={openSubmission === submission.id}
          onOpenChange={() =>
            setOpenSubmission(
              openSubmission === submission.id ? null : submission.id
            )
          }
        >
          <CollapsibleTrigger asChild>
            <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={submission.coachAvatar}
                      alt={submission.coachName}
                    />
                    <AvatarFallback>
                      {submission.coachName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(submission.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
                          {new Date(submission.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-gray-700 text-sm">
                          {submission.content}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {openSubmission === submission.id ? (
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
                  {submission.weeklyReflections.map((reflection) => (
                    <li
                      key={reflection.id}
                      className="flex justify-between items-center bg-white shadow-sm p-3 rounded-md"
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {reflection.title}
                      </span>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500 text-sm">
                          {new Date(reflection.date).toLocaleDateString(
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
                              <DialogTitle>{reflection.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-2">
                              <p className="mb-2 text-gray-500 text-sm">
                                {new Date(reflection.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-gray-700 text-sm">
                                {reflection.content}
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
