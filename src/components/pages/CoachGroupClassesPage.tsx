"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  startOfDay,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  ChevronRightIcon,
} from "lucide-react";
import CalendarDay from "../group-classes/CalendarDay";
import { formatTime, getOrdinalSuffix } from "@/lib/utils";

const courses = [
  {
    id: 1,
    title: "Mastering Ice Hockey Goaltending",
    instructors: "Sarah Lee, Mike Johnson",
    sessions: [
      "2024-10-01",
      "2024-10-08",
      "2024-10-15",
      "2024-10-22",
      "2024-10-29",
      "2024-11-05",
      "2024-11-12",
      "2024-11-19",
      "2024-11-26",
      "2024-12-03",
    ],
    time: "8:00 PM - 9:00 PM",
  },
  {
    id: 2,
    title: "Mastering Ice Hockey: From Beginner to Pro",
    instructors: "John Doe, Jane Smith",
    sessions: [
      "2024-10-03",
      "2024-10-10",
      "2024-10-17",
      "2024-10-24",
      "2024-10-31",
      "2024-11-07",
      "2024-11-14",
      "2024-11-21",
    ],
    time: "7:00 PM - 7:45 PM",
  },
  {
    id: 3,
    title: "Mastering Ice Hockey Stick Handling",
    instructors: "Alex Nguyen, Emily Chen",
    sessions: [
      "2024-10-07",
      "2024-10-09",
      "2024-10-14",
      "2024-10-16",
      "2024-10-21",
      "2024-10-23",
      "2024-10-28",
      "2024-10-30",
      "2024-11-04",
      "2024-11-06",
      "2024-11-11",
      "2024-11-13",
    ],
    time: "6:00 PM - 6:30 PM",
  },
  {
    id: 4,
    title: "Power Skating Techniques",
    instructors: "Lisa Wong, Tom Baker",
    sessions: [
      "2024-10-05",
      "2024-10-12",
      "2024-10-19",
      "2024-10-26",
      "2024-11-02",
      "2024-11-09",
    ],
    time: "10:00 AM - 11:30 AM",
  },
  {
    id: 5,
    title: "Hockey Strategy and Teamwork",
    instructors: "Coach Mark Stevens",
    sessions: [
      "2024-10-04",
      "2024-10-11",
      "2024-10-18",
      "2024-10-25",
      "2024-11-01",
      "2024-11-08",
      "2024-11-15",
      "2024-11-22",
    ],
    time: "7:00 PM - 8:00 PM",
  },
  {
    id: 6,
    title: "Off-Ice Training for Hockey Players",
    instructors: "Fitness Coach Sarah Johnson",
    sessions: [
      "2024-10-01",
      "2024-10-03",
      "2024-10-08",
      "2024-10-10",
      "2024-10-15",
      "2024-10-17",
      "2024-10-22",
      "2024-10-24",
      "2024-10-29",
      "2024-10-31",
      "2024-11-05",
      "2024-11-07",
    ],
    time: "5:00 PM - 5:45 PM",
  },
];

const handleJoin = (e: React.MouseEvent, courseId: number) => {
  e.preventDefault(); // Prevent the link from being followed
  // Add your join logic here
  console.log(`Joining session for course ${courseId}`);
};

export default function CoachGroupClassesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const currentMonthSessions = courses
    .flatMap((course) =>
      course.sessions
        .filter((session) => {
          const sessionDate = parseISO(session);
          return (
            isSameDay(sessionDate, currentMonth) ||
            (sessionDate > monthStart && sessionDate < monthEnd)
          );
        })
        .map((session) => ({ ...course, session }))
    )
    .sort((a, b) => {
      const dateA = parseISO(a.session);
      const dateB = parseISO(b.session);
      const oct31 = new Date(2024, 9, 31); // October 31, 2024

      // If one of the dates is October 31, prioritize it
      if (isSameDay(dateA, oct31)) return -1;
      if (isSameDay(dateB, oct31)) return 1;

      // Otherwise, sort chronologically
      return dateA.getTime() - dateB.getTime();
    });

  const handleCreateNewClass = () => {
    // Add logic for creating a new class
    console.log("Creating a new class");
  };

  const handleViewClassLibrary = () => {
    // Add logic for viewing class library
    console.log("Viewing class library");
  };

  return (
    <main className="flex-1 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-6">
          <h1 className="font-bold text-3xl">My Class Sessions</h1>
          <div className="flex gap-2 sm:gap-4">
            <Button
              variant="outline"
              className="border-green-600 hover:bg-green-600 text-green-600 hover:text-white transition-colors"
              onClick={handleViewClassLibrary}
            >
              View Class Library
            </Button>
            <Button
              variant="outline"
              className="border-green-600 hover:bg-green-600 text-green-600 hover:text-white transition-colors"
              onClick={handleCreateNewClass}
            >
              Create New Class
            </Button>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col items-start gap-8">
          <Card className="flex-1 lg:flex-[2] w-full">
            <CardHeader className="flex flex-row justify-between items-center p-4 sm:p-6">
              <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
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

          <Card className="flex flex-col flex-1 w-full h-full">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Sessions This Month</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow custom-scrollbar px-4 sm:px-6 pr-4 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {currentMonthSessions.map((course, index) => {
                  const sessionDate = parseISO(course.session);
                  const isPast = sessionDate < new Date();

                  return (
                    <Link
                      key={`${course.id}-${index}`}
                      href={`/sessions/${course.id}`}
                      onClick={(e) => !isPast && handleJoin(e, course.id)}
                    >
                      <Card
                        className={`hover:bg-gray-100 transition-colors ${
                          isPast ? "past-session" : ""
                        }`}
                      >
                        <CardContent className="flex justify-between items-center p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src="/placeholder.svg?height=40&width=40"
                                alt={course.instructors}
                              />

                              <AvatarFallback>
                                {course.instructors
                                  .split(",")[0]
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center font-medium text-sm">
                                <CalendarIcon className="mr-1 w-4 h-4" />
                                {format(parseISO(course.session), "MMMM d")}
                                <sup>
                                  {getOrdinalSuffix(
                                    parseISO(course.session).getDate()
                                  )}
                                </sup>
                              </div>
                              <p className="text-muted-foreground text-sm">
                                {course.title}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {formatTime(course.time)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className={`${
                                isPast ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              disabled={isPast}
                            >
                              Join
                            </Button>
                            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
