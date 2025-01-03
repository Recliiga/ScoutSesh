"use client";

import React from "react";
import { format, isFuture } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, EditIcon } from "lucide-react";
import Image from "next/image";
import { PersonIcon } from "@/components/group-classes/CardIcons";
import { GroupClassType } from "@/db/models/GroupClass";
import { getDatesBetween, getFullname } from "@/lib/utils";
import { UserType } from "@/db/models/User";
import Link from "next/link";

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function LiveClassDetails({
  liveClass,
  user,
}: {
  liveClass: GroupClassType;
  user: UserType;
}) {
  const courseSessions = liveClass.isRecurring
    ? getDatesBetween(
        liveClass.startDate,
        liveClass.endDate,
        liveClass.repeatFrequency,
      )
    : [new Date(liveClass.startDate)];

  const pastSessions = courseSessions
    .filter((date) => date !== null && !isFuture(date))
    .sort((a, b) => a.getTime() - b.getTime());

  const upcomingSessions = courseSessions
    .filter((date) => date !== null && isFuture(date))
    .sort((a, b) => a.getTime() - b.getTime());

  const nextSession = upcomingSessions[0];
  const hasUpcomingSessions = upcomingSessions.length > 0;

  const startTime = new Date();
  startTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins),
  );
  const endTime = new Date();
  endTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins),
  );
  endTime.setMinutes(
    startTime.getMinutes() + (liveClass.duration || liveClass.customDuration),
  );

  function formatTime(date: Date) {
    const hours = Number(date.toTimeString().split(":")[0]);
    let suffix = "am";
    if (hours >= 12) suffix = "pm";
    return (
      date.toTimeString().split(":")[0] +
      ":" +
      date.toTimeString().split(":")[1] +
      suffix
    );
  }

  return (
    <main className="mx-auto w-[90%] max-w-5xl flex-1 py-6">
      <div className="mb-4 flex justify-between">
        {user._id === liveClass.user._id ? (
          <Link
            href={`/dashboard/group-classes/courses/${liveClass._id}/edit`}
            className="flex w-fit items-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100"
          >
            <EditIcon className="h-4 w-4" />
            Edit Course
          </Link>
        ) : null}
        <Button
          variant="outline"
          className="ml-auto text-black hover:bg-gray-100"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative aspect-video w-full md:h-auto md:w-1/3">
              <Image
                src={liveClass.thumbnail}
                alt={liveClass.title}
                fill
                className="h-full w-full rounded object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start gap-2">
                <h1 className="text-lg font-bold sm:text-xl">
                  {liveClass.title}
                </h1>

                <Badge
                  variant="secondary"
                  className="mt-1 whitespace-nowrap bg-red-500 text-white hover:bg-red-500"
                >
                  Live Class
                </Badge>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {liveClass.description}
              </p>
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {liveClass.coaches
                    .map((coach) => getFullname(coach))
                    .join(", ")}
                </span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <Clock className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {formatTime(startTime)}-{formatTime(endTime)}
                </span>
              </div>
              {nextSession && (
                <div className="flex items-start text-sm font-medium">
                  <CalendarIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>
                    Next session: {format(nextSession, "MMMM d")}
                    <sup>{getOrdinalSuffix(nextSession.getDate())}</sup>
                    {", "}
                    {format(nextSession, "yyyy")}
                  </span>
                </div>
              )}
              {hasUpcomingSessions ? (
                <Button className="mt-2 bg-green-500 text-white hover:bg-green-600">
                  Join Virtual Session
                </Button>
              ) : (
                <div className="text-red-500">
                  All live sessions for this course have passed.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 p-4 text-accent-black sm:p-6">
        <CardHeader className="mb-4 p-0">
          <CardTitle>All Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="space-y-2 text-sm">
            {pastSessions.map((session, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-gray-400`}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {format(session, "MMMM d")}
                  <sup>{getOrdinalSuffix(session.getDate())}</sup>
                  {", "}
                  {format(session, "yyyy")}
                  (Past)
                </span>
              </li>
            ))}
            {upcomingSessions.map((session, index) => (
              <li key={index} className={`flex items-center gap-2`}>
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {format(session, "MMMM d")}
                  <sup>{getOrdinalSuffix(session.getDate())}</sup>
                  {", "}
                  {format(session, "yyyy")}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
