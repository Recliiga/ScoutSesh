import React from "react";
import DashboardCard from "@/components/app/DashboardCard";
import UpcomingEvaluations from "@/components/app/UpcomingEvaluations";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserType } from "@/db/models/User";

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

export default function CoachDashboard({ user }: { user: UserType }) {
  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mb-6">
          <h1 className="font-bold text-3xl text-black sm:text-4xl">
            Welcome, {user.firstName}!
          </h1>
          <div className="bg-green-100 px-4 py-2 rounded-full font-semibold text-green-800 text-lg">
            {coach.teamMembers} Team Members 🏅
          </div>
        </div>
        <div className="bg-white shadow-lg mb-12 p-4 sm:p-6 rounded-lg">
          <div className="flex md:flex-row flex-col items-start gap-y-6 md:gap-x-4 md:gap-y-0">
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 font-semibold text-xl">
                Your Next Coaching Session
              </h2>
              <p className="mb-2 text-lg">{coach.upcomingSession}</p>
              <p className="mb-4 text-gray-600 text-md">
                {coach.nextSessionDate}, {coach.nextSessionStartTime} -{" "}
                {coach.nextSessionEndTime}
              </p>
              <h3 className="mb-2 font-semibold text-lg">Attending Athletes</h3>
              <div className="w-full">
                <div className="gap-1 grid grid-cols-5">
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
            <div className="w-full md:w-1/2">
              <UpcomingEvaluations />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-between gap-4 mt-4">
            <Button variant="outline">All Group Classes</Button>
            <Button variant="outline">See All Evaluations</Button>
          </div>
        </div>
        <h2 className="mb-6 font-bold text-2xl">Your Coaching Dashboard</h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
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
