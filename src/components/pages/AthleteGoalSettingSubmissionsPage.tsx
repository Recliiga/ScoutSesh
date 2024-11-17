import React from "react";
import Link from "next/link";
import BackButton from "@/components/app/BackButton";
import GoalSettingSubmissions from "@/components/goal-setting/GoalSettingSubmissions";
import { getAthleteGoals } from "@/services/goalServices";
import { getSession } from "@/services/authServices";
import { notFound } from "next/navigation";

export default async function AthleteGoalSettingSubmissionsPage() {
  const { athleteGoals } = await getAthleteGoals();
  const { user } = await getSession();

  if (!athleteGoals) notFound();
  if (!user) return;

  return (
    <main className="flex-1 py-10">
      <div className="mx-auto sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="mb-6 font-extrabold text-3xl text-gray-900">
          Goal Setting Submissions
        </h1>
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-5">
            <h2 className="font-medium text-gray-900 text-lg">
              Past Goal Setting and Weekly Reflection Records
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <GoalSettingSubmissions
              goalSettingSubmissions={athleteGoals}
              user={user}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <BackButton />
          <Link
            href={"/dashboard/goal-setting/new"}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm text-white"
          >
            Create New Goal Setting
          </Link>
        </div>
      </div>
    </main>
  );
}
