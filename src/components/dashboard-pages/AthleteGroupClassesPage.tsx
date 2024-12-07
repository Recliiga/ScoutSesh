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

export default function AthleteGroupClassesPage({
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
    1
  );

  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
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
        .map((session) => ({ ...course, session }))
    )
    .sort(
      (a, b) => new Date(a.session).getTime() - new Date(b.session).getTime()
    );

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex min-[710px]:flex-row flex-col justify-between items-center gap-4 mb-6">
          <h1 className="font-bold text-3xl">My Class Sessions</h1>
          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/dashboard/group-classes/courses"
              className="border-green-600 hover:bg-green-600 duration-300 border font-medium text-green-600 hover:text-white transition-colors px-4 py-2 rounded-md text-sm"
            >
              View Class Library
            </Link>
            <Link
              href="/dashboard/group-classes/my-classes"
              className="border-green-600 hover:bg-green-600 duration-300 border font-medium text-green-600 hover:text-white transition-colors px-4 py-2 rounded-md text-sm"
            >
              My Video Courses
            </Link>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col items-start gap-8">
          <Card className="flex-1 lg:flex-[2] w-full">
            <CardHeader className="flex flex-row justify-between items-center p-4 sm:p-6">
              <CardTitle>{currentMonth.toDateString()}</CardTitle>
              <div>
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="ml-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="gap-2 grid grid-cols-7">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="font-bold text-center">
                      {day}
                    </div>
                  )
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

          <Card className="flex flex-col flex-1 w-full">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Sessions This Month</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow custom-scrollbar px-4 sm:px-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {currentMonthSessions.map((course, index) => {
                  const sessionDate = course.session;
                  const isPast = sessionDate < new Date();

                  return (
                    <Card key={index} className={isPast ? "past-session" : ""}>
                      <CardContent className="flex lg:flex-col items-center p-4 gap-2">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
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
                            <div className="flex items-center font-medium text-sm">
                              <CalendarIcon className="mr-1 w-4 h-4" />
                              {course.session.toDateString()}
                              <sup>
                                {getOrdinalSuffix(course.session.getDate())}
                              </sup>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {course.title}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {getCourseTimeString(course.time)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-auto lg:w-full">
                          <Link
                            href={`/dashboard/group-classes/live-classes/${course._id}`}
                            className={`flex-1 text-xs px-3 py-1.5 border flex-center rounded-md hover:bg-accent-gray-100 duration-200`}
                          >
                            Join
                          </Link>
                          <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
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
