import React from "react";
import Link from "next/link";
import BackButton from "@/components/dashboard/BackButton";
import GoalSettingSubmissions from "@/components/goal-setting/GoalSettingSubmissions";
import { fetchAllAthleteGoalData } from "@/services/goalServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { GoalSchemaType } from "@/db/models/Goal";

type AthleteGoalType = GoalSchemaType & { goalDataId: string };

export default async function AthleteGoalSettingSubmissionsPage() {
  const { athleteGoalData, error } = await fetchAllAthleteGoalData();
  const user = await getSessionFromHeaders();

  if (error !== null) throw new Error(error);

  const athleteGoals: AthleteGoalType[] = [];
  athleteGoalData.forEach((goalD) => {
    const newAthleteGoals = goalD.goals.map((goal) => ({
      ...goal,
      goalDataId: goalD._id as string,
    }));
    athleteGoals.push(...(newAthleteGoals as AthleteGoalType[]));
  });

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-3xl">
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
