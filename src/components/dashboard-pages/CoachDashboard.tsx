import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import UpcomingEvaluations from "@/components/dashboard/UpcomingEvaluations";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserType } from "@/db/models/User";
import { fetchTeamMembers } from "@/services/userServices";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import Link from "next/link";

const attendingPlayers = [
  { name: "Alex", photo: "/placeholder-profile-picture.png" },
  { name: "Sam", photo: "/placeholder-profile-picture.png" },
  { name: "Jordan", photo: "/placeholder-profile-picture.png" },
  { name: "Taylor", photo: "/placeholder-profile-picture.png" },
  { name: "Casey", photo: "/placeholder-profile-picture.png" },
  { name: "Morgan", photo: "/placeholder-profile-picture.png" },
  { name: "Jamie", photo: "/placeholder-profile-picture.png" },
  { name: "Riley", photo: "/placeholder-profile-picture.png" },
  { name: "Avery", photo: "/placeholder-profile-picture.png" },
  { name: "Quinn", photo: "/placeholder-profile-picture.png" },
  { name: "Charlie", photo: "/placeholder-profile-picture.png" },
  { name: "Skyler", photo: "/placeholder-profile-picture.png" },
  { name: "Frankie", photo: "/placeholder-profile-picture.png" },
  { name: "Jessie", photo: "/placeholder-profile-picture.png" },
  { name: "Arin", photo: "/placeholder-profile-picture.png" },
  { name: "Blake", photo: "/placeholder-profile-picture.png" },
  { name: "Cameron", photo: "/placeholder-profile-picture.png" },
  { name: "Drew", photo: "/placeholder-profile-picture.png" },
  { name: "Emerson", photo: "/placeholder-profile-picture.png" },
  { name: "Finley", photo: "/placeholder-profile-picture.png" },
];

const coach = {
  name: "Coach Sarah",
  teamMembers: 45,
  upcomingSession: "Goal Setting Workshop",
  nextSessionDate: "Tomorrow",
  nextSessionStartTime: "2:00 PM",
  nextSessionEndTime: "3:30 PM",
};

export default async function CoachDashboard({
  user,
  orders,
}: {
  user: UserType;
  orders: AthleteEvaluationOrderType[];
}) {
  const { teamMembers, error } = await fetchTeamMembers(user.organization!._id);

  if (error !== null) throw new Error(error);

  return (
    <main className="flex-grow">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Welcome, {user.firstName}!
          </h1>
          <div className="rounded-full bg-green-100 px-4 py-2 text-lg font-semibold text-green-800">
            {teamMembers.length} Team Member{teamMembers.length > 1 ? "s" : ""}{" "}
            🏅
          </div>
        </div>
        <div className="mb-12 rounded-lg bg-white p-4 shadow-lg sm:p-6">
          <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-4 md:gap-y-0">
            <div className="w-full flex-1 md:w-1/2">
              <h2 className="mb-4 text-xl font-semibold">
                Your Next Coaching Session
              </h2>
              <p className="mb-2 text-lg">{coach.upcomingSession}</p>
              <p className="text-md mb-4 text-gray-600">
                {coach.nextSessionDate}, {coach.nextSessionStartTime} -{" "}
                {coach.nextSessionEndTime}
              </p>
              <h3 className="mb-2 text-lg font-semibold">Attending Athletes</h3>
              <div className="w-full">
                <div className="grid grid-cols-5 gap-1">
                  {attendingPlayers.map((player, index) => (
                    <Image
                      key={index}
                      src={player.photo}
                      alt={`${player.name}'s profile`}
                      width={40}
                      height={40}
                      className="rounded-full"
                      title={player.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 md:w-1/2">
              <UpcomingEvaluations orders={orders} />
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row">
            <Button variant="outline">All Group Classes</Button>
            <Link
              href={"/dashboard/athlete-evaluation"}
              className="rounded-md border px-4 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100"
            >
              See All Evaluations
            </Link>
          </div>
        </div>
        <h2 className="mb-6 text-2xl font-bold">Your Coaching Dashboard</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DashboardCard
            title="Athlete Evaluation"
            description="Review and update your latest athlete performance assessments. Track progress and identify areas for improvement."
            href="/dashboard/athlete-evaluation"
          />
          <DashboardCard
            title="Goal Setting"
            description="Set and manage individual and team goals. Monitor progress and adjust strategies for optimal performance."
            href="/dashboard/goal-setting"
          />
          <DashboardCard
            title="Team Members"
            description="View and manage your team roster. Access detailed profiles and performance metrics for each player."
            href="/dashboard/team-members"
          />
        </div>
      </div>
    </main>
  );
}
