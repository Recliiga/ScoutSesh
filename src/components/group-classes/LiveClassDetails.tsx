"use client";

import React from "react";
import { format, isFuture } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import Image from "next/image";
import { PersonIcon } from "@/components/group-classes/CardIcons";
import { GroupClassType } from "@/db/models/GroupClass";
import { getDatesBetween, getFullname } from "@/lib/utils";

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
}: {
  liveClass: GroupClassType;
}) {
  const courseSessions = getDatesBetween(
    liveClass.startDate,
    liveClass.endDate,
    liveClass.repeatFrequency
  );
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
    Number(liveClass.startTime.mins)
  );
  const endTime = new Date();
  endTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins)
  );
  endTime.setMinutes(
    startTime.getMinutes() + (liveClass.duration || liveClass.customDuration)
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
    <main className="flex-1 w-[90%] max-w-5xl mx-auto py-6">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          className="text-black hover:bg-gray-100"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3 aspect-video md:h-auto">
              <Image
                src={liveClass.thumbnail}
                alt={liveClass.title}
                fill
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <h1 className="text-lg sm:text-xl font-bold">
                  {liveClass.title}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-red-500 text-white whitespace-nowrap"
                >
                  Live Class
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {liveClass.description}
              </p>
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  {liveClass.coaches
                    .map((coach) => getFullname(coach))
                    .join(", ")}
                </span>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  {formatTime(startTime)}-{formatTime(endTime)}
                </span>
              </div>
              {nextSession && (
                <div className="flex items-start text-sm font-medium">
                  <CalendarIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>
                    Next session: {format(nextSession, "MMMM d")}
                    <sup>{getOrdinalSuffix(nextSession.getDate())}</sup>
                    {", "}
                    {format(nextSession, "yyyy")}
                  </span>
                </div>
              )}
              {hasUpcomingSessions ? (
                <Button className="bg-green-500 hover:bg-green-600 text-white mt-2">
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
      <Card className="mt-6 p-4 sm:p-6 text-accent-black">
        <CardHeader className="p-0 mb-4">
          <CardTitle>All Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="space-y-2 text-sm">
            {pastSessions.map((session, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 text-gray-400`}
              >
                <CalendarIcon className="w-4 h-4" />
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
                <CalendarIcon className="w-4 h-4" />
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
