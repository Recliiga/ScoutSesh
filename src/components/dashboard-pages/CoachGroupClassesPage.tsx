"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  ChevronRightIcon,
} from "lucide-react";
import CalendarDay, { CourseType } from "../group-classes/CalendarDay";
import {
  getCourseTimeString,
  getDatesBetween,
  getFullname,
  getOrdinalSuffix,
} from "@/lib/utils";

export default function CoachGroupClassesPage({
  courses,
}: {
  courses: CourseType[];
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );

  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );

  const monthDays = getDatesBetween(monthStart, monthEnd, "daily");

  function nextMonth() {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  }
  function prevMonth() {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  }

  const currentMonthSessions = courses
    .flatMap((course) =>
      course.sessions
        .filter((session) => {
          return (
            session.getMonth() === currentMonth.getMonth() ||
            (session > monthStart && session < monthEnd)
          );
        })
        .map((session) => ({ ...course, session })),
    )
    .sort(
      (a, b) => new Date(b.session).getTime() - new Date(a.session).getTime(),
    );

  return (
    <main className="flex-1">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 min-[710px]:flex-row">
          <h1 className="text-3xl font-bold">My Class Sessions</h1>
          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/dashboard/group-classes/courses"
              className="rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-300 hover:bg-green-600 hover:text-white"
            >
              View Class Library
            </Link>
            <Link
              href="/dashboard/group-classes/create"
              className="rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-colors duration-300 hover:bg-green-600 hover:text-white"
            >
              Create New Class
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <Card className="w-full flex-1 lg:flex-[2]">
            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
              <CardTitle>{currentMonth.toDateString()}</CardTitle>
              <div>
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="ml-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-center font-bold">
                      {day}
                    </div>
                  ),
                )}
                {monthDays.map((day) => (
                  <CalendarDay
                    key={day.toString()}
                    day={day}
                    courses={courses}
                    today={today}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex w-full flex-1 flex-col">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Sessions This Month</CardTitle>
            </CardHeader>
            <CardContent className="custom-scrollbar flex-grow overflow-y-auto px-4 sm:px-6">
              <div className="flex flex-col gap-4">
                {currentMonthSessions.map((course, index) => {
                  const sessionDate = course.session;
                  const isPast = sessionDate < new Date();

                  return (
                    <Card
                      key={index}
                      className={`transition-colors ${
                        isPast ? "past-session" : ""
                      }`}
                    >
                      <CardContent className="flex items-center gap-2 p-4 lg:flex-col">
                        <div className="flex w-full items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={course.coach.profilePicture}
                              alt={getFullname(course.coach)}
                              className="object-cover"
                            />

                            <AvatarFallback>
                              {getFullname(course.coach)
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center text-sm font-medium">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {course.session.toDateString()}
                              <sup>
                                {getOrdinalSuffix(course.session.getDate())}
                              </sup>
                            </div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {course.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {getCourseTimeString(course.time)}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto flex items-center space-x-2 lg:w-full">
                          <Link
                            href={`/dashboard/group-classes/live-classes/${course._id}`}
                            className={`flex-center flex-1 rounded-md border px-3 py-1.5 text-xs duration-200 hover:bg-accent-gray-100`}
                          >
                            View Schedule
                          </Link>
                          <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
