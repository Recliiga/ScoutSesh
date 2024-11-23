"use client";

import React, { useState } from "react";
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
  differenceInDays,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScoutSeshStreak from "../dashboard/ScoutSeshStreak";
import CalendarDay from "../dashboard/CalendarDay";
import JournalEntryCard from "../dashboard/JournalEntryCard";
import Link from "next/link";

// Mock data for journal entries
const journalEntries = [
  {
    id: 1,
    date: "2024-10-01",
    trainingAndCompetition:
      "Intense practice session focusing on stick handling.",
    nutrition: "Balanced meals, increased protein intake.",
    sleep: "8 hours, felt well-rested.",
    mentalState: "Confident and motivated.",
    reflection: {
      changeTomorrow: "Spend more time on cardio.",
      continueTomorrow: "Maintain focus during drills.",
    },
  },
  {
    id: 2,
    date: "2024-10-03",
    trainingAndCompetition: "Light training, recovery day.",
    nutrition: "Focused on hydration and lean proteins.",
    sleep: "7 hours, woke up once during the night.",
    mentalState: "Slightly tired but positive.",
    reflection: {
      changeTomorrow: "Go to bed earlier.",
      continueTomorrow: "Keep up with stretching routine.",
    },
  },
  {
    id: 3,
    date: "2024-10-05",
    trainingAndCompetition: "Team scrimmage, worked on defensive positioning.",
    nutrition: "Increased carb intake for energy.",
    sleep: "8.5 hours, woke up feeling refreshed.",
    mentalState: "Focused and determined.",
    reflection: {
      changeTomorrow: "Work on communication with teammates.",
      continueTomorrow: "Maintain high energy levels during practice.",
    },
  },
  {
    id: 4,
    date: "2024-10-07",
    trainingAndCompetition:
      "Individual skills training, emphasis on shooting accuracy.",
    nutrition: "Well-balanced meals, added more vegetables.",
    sleep: "7.5 hours, slight difficulty falling asleep.",
    mentalState: "Motivated to improve shooting skills.",
    reflection: {
      changeTomorrow: "Practice relaxation techniques before bed.",
      continueTomorrow: "Keep working on shooting accuracy.",
    },
  },
  {
    id: 5,
    date: "2024-10-09",
    trainingAndCompetition: "Conditioning day, focus on endurance.",
    nutrition: "Increased protein and complex carbs.",
    sleep: "8 hours, solid rest.",
    mentalState: "Challenged but resilient.",
    reflection: {
      changeTomorrow: "Incorporate more dynamic stretching.",
      continueTomorrow: "Maintain positive attitude during tough workouts.",
    },
  },
  {
    id: 6,
    date: "2024-10-11",
    trainingAndCompetition:
      "Speed and agility drills, focus on quick transitions.",
    nutrition: "High-energy meals, proper pre-workout fueling.",
    sleep: "8.5 hours, implemented new bedtime routine.",
    mentalState: "Energized and ready for challenges.",
    reflection: {
      changeTomorrow: "Incorporate more team-based exercises.",
      continueTomorrow: "Maintain the new sleep routine.",
    },
  },
  {
    id: 7,
    date: "2024-10-13",
    trainingAndCompetition:
      "Tactical session, worked on power play strategies.",
    nutrition: "Balanced macronutrients, focus on recovery foods.",
    sleep: "8 hours, consistent sleep schedule maintained.",
    mentalState: "Mentally sharp, good focus during tactical discussions.",
    reflection: {
      changeTomorrow: "Review game footage to identify areas for improvement.",
      continueTomorrow: "Apply tactical learnings in scrimmage situations.",
    },
  },
  {
    id: 8,
    date: "2024-10-15",
    trainingAndCompetition: "Full team practice, emphasis on game situations.",
    nutrition: "Increased complex carbs for sustained energy.",
    sleep: "9 hours, feeling fully recovered.",
    mentalState: "Confident and eager to apply new strategies.",
    reflection: {
      changeTomorrow:
        "Work on quick decision-making in high-pressure situations.",
      continueTomorrow: "Maintain positive team communication.",
    },
  },
  {
    id: 9,
    date: "2024-10-17",
    trainingAndCompetition: "Recovery day, light stretching and yoga session.",
    nutrition: "Focus on anti-inflammatory foods and hydration.",
    sleep: "8.5 hours, woke up feeling refreshed.",
    mentalState: "Relaxed and focused on recovery.",
    reflection: {
      changeTomorrow: "Incorporate more mindfulness exercises.",
      continueTomorrow: "Listen to body and prioritize recovery.",
    },
  },
  {
    id: 10,
    date: "2024-10-19",
    trainingAndCompetition: "Strength training session, focus on lower body.",
    nutrition: "High protein intake, balanced with complex carbs.",
    sleep: "8 hours, solid rest despite muscle soreness.",
    mentalState: "Determined and focused on long-term improvement.",
    reflection: {
      changeTomorrow: "Pay more attention to proper form during exercises.",
      continueTomorrow:
        "Maintain positive mindset during challenging workouts.",
    },
  },
  {
    id: 11,
    date: "2024-10-10",
    trainingAndCompetition:
      "Specialized goalie training session, focus on reaction time.",
    nutrition:
      "Increased complex carbs for sustained energy during long practice.",
    sleep: "8.5 hours, implemented new pre-sleep relaxation routine.",
    mentalState: "Focused and confident in skill improvements.",
    reflection: {
      changeTomorrow: "Work on communication with defensemen during drills.",
      continueTomorrow: "Maintain the effective pre-sleep routine.",
    },
  },
  {
    id: 12,
    date: "2024-10-12",
    trainingAndCompetition:
      "Team strategy session followed by on-ice application.",
    nutrition: "Balanced meals with emphasis on lean proteins for recovery.",
    sleep: "8 hours, consistent sleep schedule maintained.",
    mentalState: "Engaged and motivated to apply new strategies.",
    reflection: {
      changeTomorrow: "Spend extra time reviewing play diagrams.",
      continueTomorrow: "Active participation in team discussions.",
    },
  },
  {
    id: 13,
    date: "2024-10-14",
    trainingAndCompetition:
      "High-intensity interval training, focus on explosiveness.",
    nutrition: "Carefully timed pre and post-workout nutrition.",
    sleep: "9 hours, woke up feeling fully recovered and energized.",
    mentalState: "Determined and pushing physical limits.",
    reflection: {
      changeTomorrow: "Incorporate more dynamic stretching in warm-up.",
      continueTomorrow:
        "Maintain positive self-talk during challenging exercises.",
    },
  },
  {
    id: 14,
    date: "2024-10-16",
    trainingAndCompetition:
      "Skills competition within the team, focus on accuracy.",
    nutrition: "Well-balanced meals, added extra hydration throughout the day.",
    sleep: "8 hours, used visualization techniques before bed.",
    mentalState: "Competitive yet supportive of teammates.",
    reflection: {
      changeTomorrow: "Practice deep breathing exercises during breaks.",
      continueTomorrow: "Celebrate personal improvements and team successes.",
    },
  },
  {
    id: 15,
    date: "2024-10-18",
    trainingAndCompetition:
      "Video analysis session followed by targeted on-ice practice.",
    nutrition: "Focus on anti-inflammatory foods to support recovery.",
    sleep: "8.5 hours, consistent bedtime routine paying off.",
    mentalState: "Analytical and eager to apply insights from video session.",
    reflection: {
      changeTomorrow:
        "Set specific, measurable goals for next practice based on video analysis.",
      continueTomorrow:
        "Maintain the balance between self-critique and self-encouragement.",
    },
  },
];

export default function AthleteDailyJournalPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9, 1));
  const today = startOfDay(new Date(2024, 9, 20)); // Set today to October 20, 2024

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const currentMonthEntries = journalEntries
    .filter((entry) => {
      const entryDate = parseISO(entry.date);
      return entryDate >= monthStart && entryDate <= monthEnd;
    })
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

  const isTodayEntryCompleted = journalEntries.some((entry) =>
    isSameDay(parseISO(entry.date), today)
  );

  // Calculate the streak
  const calculateStreak = () => {
    const sortedEntries = [...journalEntries].sort(
      (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );
    let streak = 0;
    let currentDate = today;

    for (const entry of sortedEntries) {
      const entryDate = parseISO(entry.date);
      if (
        isSameDay(entryDate, currentDate) ||
        differenceInDays(currentDate, entryDate) === 1
      ) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }

    return streak;
  };

  const streakCount = calculateStreak();

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl">Journal Entry Records</h1>
          <ScoutSeshStreak streakCount={streakCount} />
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
                    entries={journalEntries}
                    today={today}
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
                  <JournalEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href={
              isTodayEntryCompleted
                ? "/dashboard/daily-journal"
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
