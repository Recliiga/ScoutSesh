import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";
import { UserType } from "@/db/models/User";
import ScoutSeshStreak from "../dashboard/ScoutSeshStreak";
import { OrganizationType } from "@/db/models/Organization";
import { calculateStreak, getFullname } from "@/lib/utils";
import { DailyJournalType } from "@/db/models/DailyJournal";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AthleteDashboard({
  user,
  organization,
  journalEntries,
}: {
  user: UserType;
  organization: OrganizationType | null;
  journalEntries: DailyJournalType[];
}) {
  const today = new Date();
  const todaysJournal = journalEntries.find(
    (entry) =>
      new Date(entry.createdAt).toDateString() === today.toDateString(),
  );

  const isTodayEntryCompleted = Boolean(todaysJournal);

  const streakCount = calculateStreak(journalEntries);

  // Simulating a signed-in athlete who has not completed the journal
  const demoAthlete = {
    name: "Alex",
    dayStreak: calculateStreak(journalEntries),
    upcomingSession: "Goal Setting Workshop",
    nextSessionDate: "Tomorrow",
    nextSessionStartTime: "2:00 PM",
    nextSessionEndTime: "3:30 PM",
    sport: "Track and Field",
    journalCompletedToday: false,
  };

  // Function to check if the session has started
  const isSessionStarted = () => {
    const now = new Date();
    const sessionStart = new Date(
      now.toDateString() + " " + demoAthlete.nextSessionStartTime,
    );
    return now >= sessionStart;
  };

  return (
    <main className="flex-grow">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            Welcome back, {user.firstName}!
          </h1>
          <ScoutSeshStreak journalEntries={journalEntries} />
        </div>
        <div className="mb-12 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex flex-col items-start md:flex-row">
            <div className="mb-6 md:mb-0 md:w-1/2 md:pr-6">
              <h2 className="mb-4 text-2xl font-semibold">Your Next Session</h2>
              {organization ? (
                <>
                  <p className="mb-2 text-xl">{demoAthlete.upcomingSession}</p>
                  <p className="mb-4 text-lg text-gray-600">
                    {demoAthlete.nextSessionDate},{" "}
                    {demoAthlete.nextSessionStartTime} -{" "}
                    {demoAthlete.nextSessionEndTime}
                  </p>
                  <div className="mb-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={organization.user.profilePicture}
                        alt={getFullname(organization.user)}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {getFullname(organization.user)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        Coach {getFullname(organization.user)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {organization.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-accent-gray-300">
                  You are not connected to any team
                </p>
              )}
            </div>
            <div className="border-t pt-6 md:w-1/2 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <h2 className="mb-4 text-2xl font-semibold">Daily Journal</h2>
              {!isTodayEntryCompleted && streakCount > 0 && (
                <div className="mb-4 flex items-start text-red-600">
                  <AlertCircle className="mr-2" />
                  <p>
                    Complete your journal to maintain your {streakCount} day
                    streak!
                  </p>
                </div>
              )}
              <p className="mb-4 text-gray-600">
                Reflect on your progress, set goals, and track your journey.
                Your daily journal is key to consistent improvement and keeping
                your streak alive.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row">
            {!isSessionStarted() ? (
              <Button disabled>Session Not Started</Button>
            ) : (
              <Link
                href={"#"}
                className="rounded-md bg-accent-black px-4 py-2 text-center text-sm font-medium text-white duration-300 hover:bg-accent-black/90"
              >
                Join Session
              </Link>
            )}
            <Link
              href={
                isTodayEntryCompleted
                  ? `/dashboard/daily-journal/${todaysJournal?._id}`
                  : "/dashboard/daily-journal/submit-entry"
              }
              className="rounded-md bg-accent-black px-4 py-2 text-center text-sm font-medium text-white duration-300 hover:bg-accent-black/90 disabled:bg-accent-gray-300"
            >
              {isTodayEntryCompleted
                ? "View Latest Journal Entry"
                : "Complete Today's Journal"}
            </Link>
          </div>
        </div>
        <h2 className="mb-6 text-2xl font-bold">Your ScoutSesh Dashboard</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DashboardCard
            title="Athlete Evaluation"
            description="Track your progress and receive feedback from coaches to improve your performance."
            action="View Evaluations"
            href="/dashboard/athlete-evaluation"
          />
          <DashboardCard
            title="Goal Setting"
            description="Set and monitor your athletic goals, breaking them down into achievable milestones."
            action="Manage Goals"
            href="/dashboard/goal-setting"
          />
          <DashboardCard
            title="Group Classes"
            description="Join group training sessions and workshops to learn from peers and expert coaches."
            action="Browse Classes"
            href="/dashboard/group-classes"
          />
        </div>
      </div>
    </main>
  );
}
