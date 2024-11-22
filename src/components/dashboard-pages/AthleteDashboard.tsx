import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";
import { UserType } from "@/db/models/User";
import ScoutSeshStreak from "../dashboard/ScoutSeshStreak";

export default function AthleteDashboard({ user }: { user: UserType }) {
  // Simulating a signed-in athlete who has not completed the journal
  const athlete = {
    name: "Alex",
    dayStreak: 7,
    upcomingSession: "Goal Setting Workshop",
    nextSessionDate: "Tomorrow",
    nextSessionStartTime: "2:00 PM",
    nextSessionEndTime: "3:30 PM",
    sport: "Track and Field",
    journalCompletedToday: false,
  };

  // Coach information
  const coach = {
    name: "Sarah Thompson",
    profilePhoto: "/placeholder.svg",
    association: "Riverside Basketball Club",
  };

  // Function to check if the session has started
  const isSessionStarted = () => {
    const now = new Date();
    const sessionStart = new Date(
      now.toDateString() + " " + athlete.nextSessionStartTime
    );
    return now >= sessionStart;
  };

  //   // State to trigger re-render
  //   const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  //   // Effect to update component every minute
  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       forceUpdate();
  //     }, 60000); // Update every minute

  //     return () => clearInterval(timer);
  //   }, []);

  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl text-black sm:text-4xl">
            Welcome back, {user.firstName}!
          </h1>
          <ScoutSeshStreak streakCount={7} />
        </div>
        <div className="bg-white shadow-lg mb-12 p-6 rounded-lg">
          <div className="flex md:flex-row flex-col items-start">
            <div className="mb-6 md:mb-0 md:pr-6 md:w-1/2">
              <h2 className="mb-4 font-semibold text-2xl">Your Next Session</h2>
              <p className="mb-2 text-xl">{athlete.upcomingSession}</p>
              <p className="mb-4 text-gray-600 text-lg">
                {athlete.nextSessionDate}, {athlete.nextSessionStartTime} -{" "}
                {athlete.nextSessionEndTime}
              </p>
              <div className="flex items-center mb-4">
                <Image
                  src={coach.profilePhoto}
                  alt={`Coach ${coach.name}`}
                  width={64}
                  height={64}
                  className="mr-4 rounded-full"
                />
                <div>
                  <p className="font-semibold">Coach {coach.name}</p>
                  <p className="text-gray-600 text-sm">{coach.association}</p>
                </div>
              </div>
            </div>
            <div className="pt-6 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l md:w-1/2">
              <h2 className="mb-4 font-semibold text-2xl">Daily Journal</h2>
              <div className="flex items-start mb-4 text-red-600">
                <AlertCircle className="mr-2" />
                <p>
                  Complete your journal to maintain your {athlete.dayStreak} day
                  streak!
                </p>
              </div>
              <p className="mb-4 text-gray-600">
                Reflect on your progress, set goals, and track your journey.
                Your daily journal is key to consistent improvement and keeping
                your streak alive.
              </p>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between gap-4 mt-6 pt-6 border-t">
            <Button
              disabled={!isSessionStarted()}
              //   onClick={() => console.log("Joining session...")}
            >
              {isSessionStarted() ? "Join Session" : "Session Not Started"}
            </Button>
            <Button
            //   onClick={() => console.log("Navigating to journal page...")}
            >
              Complete Today&apos;s Journal
            </Button>
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
