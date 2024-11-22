import React from "react";
import { Target, ClipboardCheck, FileText } from "lucide-react";
import GoalSettingNotificationSign from "../goal-setting/GoalSettingNotificationSign";
import GoalCard from "../dashboard/GoalCard";
import { getLatestGoalData } from "@/services/goalServices";
import { getGoalDueDate, getWeeklyReflectionStatus } from "@/lib/utils";

export default async function AthleteGoalSettingPage() {
  const { goalData, error } = await getLatestGoalData();

  if (error !== null) throw new Error(error);

  const status = await getWeeklyReflectionStatus(goalData);

  const canCreateNewGoals = status === "all_complete" || status === "no_goals";

  return (
    <main className="flex-1">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <h1 className="mb-6 font-bold text-4xl text-black">Goal Setting</h1>
        <p className="mb-8 text-gray-600 text-lg">
          Set meaningful goals, track your progress, and reflect on your
          achievements to continuously improve your performance.
        </p>
        <GoalSettingNotificationSign
          status={status}
          dueDate={goalData && getGoalDueDate(goalData)}
        />
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          {canCreateNewGoals ? (
            <GoalCard
              title="Set New Goals"
              description="Define new short-term and long-term goals to focus your training and development efforts. Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to enhance your athletic performance and personal growth."
              icon={<Target className="w-6 h-6 text-green-600" />}
              actionText="Set Goals"
              href={"/dashboard/goal-setting/new"}
            />
          ) : (
            <GoalCard
              title="Complete Existing Goals"
              description="You cannot create new goals until you have completed your current ones. Stay focused and finish your existing goals to make room for new challenges and achievements."
              icon={<Target className="w-6 h-6 text-green-600" />}
              actionText="View Latest Goal"
              href={`/dashboard/goal-setting/submissions/${goalData?._id}`}
            />
          )}
          <GoalCard
            title="Complete Weekly Reflection"
            description="Reflect on your progress, identify challenges, and adjust your goals as needed. Regular reflection helps you stay on track and make necessary improvements."
            icon={<ClipboardCheck className="w-6 h-6 text-green-600" />}
            actionText="Start Reflection"
            href={"/dashboard/goal-setting/weekly-reflection"}
          />
          <GoalCard
            title="View Goal Setting Submissions"
            description="Review your past goal setting submissions and track your progress over time. Analyze your growth and celebrate your achievements."
            icon={<FileText className="w-6 h-6 text-green-600" />}
            actionText="View Submissions"
            href={"/dashboard/goal-setting/submissions"}
          />
        </div>
      </div>
    </main>
  );
}
