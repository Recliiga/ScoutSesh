import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";
import { UserType } from "@/db/models/User";
import ScoutSeshStreak from "../dashboard/ScoutSeshStreak";
import { OrganizationType } from "@/db/models/Organization";
import { calculateStreak, getFullname } from "@/lib/utils";
import { DailyJournalType } from "@/db/models/DailyJournal";
import Link from "next/link";

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
    (entry) => new Date(entry.createdAt).toDateString() === today.toDateString()
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
      now.toDateString() + " " + demoAthlete.nextSessionStartTime
    );
    return now >= sessionStart;
  };

  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl text-black sm:text-4xl">
            Welcome back, {user.firstName}!
          </h1>
          <ScoutSeshStreak journalEntries={journalEntries} />
        </div>
        <div className="bg-white shadow-lg mb-12 p-6 rounded-lg">
          <div className="flex md:flex-row flex-col items-start">
            <div className="mb-6 md:mb-0 md:pr-6 md:w-1/2">
              <h2 className="mb-4 font-semibold text-2xl">Your Next Session</h2>
              {organization ? (
                <>
                  <p className="mb-2 text-xl">{demoAthlete.upcomingSession}</p>
                  <p className="mb-4 text-gray-600 text-lg">
                    {demoAthlete.nextSessionDate},{" "}
                    {demoAthlete.nextSessionStartTime} -{" "}
                    {demoAthlete.nextSessionEndTime}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative bg-accent-gray-100 rounded-full w-16 h-16 overflow-hidden">
                      <Image
                        src={organization.user.profilePicture}
                        alt={`Coach ${getFullname(organization.user)}`}
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        Coach {getFullname(organization.user)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {organization.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-accent-gray-200">
                  You are not connected to any team
                </p>
              )}
            </div>
            <div className="pt-6 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l md:w-1/2">
              <h2 className="mb-4 font-semibold text-2xl">Daily Journal</h2>
              {!isTodayEntryCompleted && streakCount > 0 && (
                <div className="flex items-start mb-4 text-red-600">
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
          <div className="flex sm:flex-row flex-col justify-between gap-4 mt-6 pt-6 border-t">
            {!isSessionStarted() ? (
              <Button disabled>Session Not Started</Button>
            ) : (
              <Link
                href={"#"}
                className="bg-accent-black hover:bg-accent-black/90 px-4 py-2 rounded-md font-medium text-center text-sm text-white duration-300"
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
              className="bg-accent-black hover:bg-accent-black/90 disabled:bg-accent-gray-300 px-4 py-2 rounded-md font-medium text-center text-sm text-white duration-300"
            >
              {isTodayEntryCompleted
                ? "View Latest Journal Entry"
                : "Complete Today's Journal"}
            </Link>
          </div>
        </div>
        <h2 className="mb-6 font-bold text-2xl">Your ScoutSesh Dashboard</h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
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
