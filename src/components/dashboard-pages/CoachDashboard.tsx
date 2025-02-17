import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import UpcomingEvaluations from "@/components/dashboard/UpcomingEvaluations";
import { UserType } from "@/db/models/User";
import { fetchTeamMembers } from "@/services/userServices";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { fetchNextCoachingSession } from "@/services/groupClassServices";
import NextCoachingSession from "../dashboard/NextCoachingSession";

export default async function CoachDashboard({
  user,
  orders,
}: {
  user: UserType;
  orders: AthleteEvaluationOrderType[];
}) {
  const { teamMembers } = await fetchTeamMembers(user.organization!._id);

  const { nextCoachingSession } = await fetchNextCoachingSession(user._id);

  return (
    <main className="flex-grow">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Welcome, {user.firstName}!
          </h1>
          {teamMembers ? (
            <div className="rounded-full bg-green-100 px-4 py-2 text-lg font-semibold text-green-800">
              {teamMembers.length} Team Member
              {teamMembers.length > 1 ? "s" : ""} 🏅
            </div>
          ) : null}
        </div>

        <div className="mb-12 flex flex-col gap-y-8 rounded-lg bg-white p-4 shadow-[0_1.5px_6px_2px_#eee] sm:p-6 md:flex-row md:gap-x-4 md:gap-y-0">
          <NextCoachingSession nextCoachingSession={nextCoachingSession} />
          <UpcomingEvaluations orders={orders} />
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
