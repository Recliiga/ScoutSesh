"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScoutSeshStreak from "../dashboard/ScoutSeshStreak";
import CalendarDay from "../dashboard/CalendarDay";
import JournalEntryCard from "../dashboard/JournalEntryCard";
import Link from "next/link";
import { DailyJournalType } from "@/db/models/DailyJournal";

export default function AthleteDailyJournalPage({
  journalEntries,
}: {
  journalEntries: DailyJournalType[];
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const currentMonthEntries = journalEntries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    const entryMonth = entryDate.getMonth();
    const entryYear = entryDate.getFullYear();

    return (
      entryMonth === monthStart.getMonth() &&
      entryYear === monthStart.getFullYear()
    );
  });

  const todaysJournal = journalEntries.find(
    (entry) => new Date(entry.createdAt).toDateString() === today.toDateString()
  );

  const isTodayEntryCompleted = Boolean(todaysJournal);

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex md:flex-row flex-col justify-between items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl">Journal Entry Records</h1>
          <ScoutSeshStreak journalEntries={journalEntries} />
        </div>
        <div className="flex lg:flex-row flex-col gap-8">
          <Card className="flex-1 lg:flex-[2]">
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
                    entry={
                      journalEntries.find(
                        (journalEntry) =>
                          new Date(journalEntry.createdAt).toDateString() ===
                          day.toDateString()
                      ) || null
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col flex-1 h-[calc(5*8rem+2rem)]">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Completed Entries</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4 sm:px-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {currentMonthEntries.map((entry) => (
                  <JournalEntryCard key={entry._id} entry={entry} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href={
              isTodayEntryCompleted
                ? `/dashboard/daily-journal/${todaysJournal?._id}`
                : "/dashboard/daily-journal/submit-entry"
            }
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium text-sm text-white duration-300"
          >
            {isTodayEntryCompleted
              ? "View Latest Journal Entry"
              : "Complete Journal Entry"}
          </Link>
        </div>
      </div>
    </main>
  );
}
