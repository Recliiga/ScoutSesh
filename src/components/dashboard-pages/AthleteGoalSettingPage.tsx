import React from "react";
import { Target, ClipboardCheck, FileText } from "lucide-react";
import GoalSettingNotificationSign from "../goal-setting/GoalSettingNotificationSign";
import GoalCard from "../dashboard/GoalCard";
import { fetchAthleteLatestGoalData } from "@/services/goalServices";
import { getGoalDueDate, getWeeklyReflectionStatus } from "@/lib/utils";

export default async function AthleteGoalSettingPage() {
  const { goalData } = await fetchAthleteLatestGoalData();

  const status = await getWeeklyReflectionStatus(goalData);

  const canCreateNewGoals = status === "all_complete" || status === "no_goals";

  return (
    <main className="flex-1">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <h1 className="mb-4 text-3xl font-bold text-black md:text-4xl">
          Goal Setting
        </h1>
        <p className="mb-8 text-gray-600">
          Set meaningful goals, track your progress, and reflect on your
          achievements to continuously improve your performance.
        </p>
        <GoalSettingNotificationSign
          status={status}
          dueDate={goalData ? getGoalDueDate(goalData) : null}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {canCreateNewGoals ? (
            <GoalCard
              title="Set New Goals"
              description="Define new short-term and long-term goals to focus your training and development efforts. Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to enhance your athletic performance and personal growth."
              icon={<Target className="h-6 w-6 text-green-600" />}
              actionText="Set Goals"
              href={"/dashboard/goal-setting/new"}
            />
          ) : (
            <GoalCard
              title="Complete Existing Goals"
              description="You cannot create new goals until you have completed your current ones. Stay focused and finish your existing goals to make room for new challenges and achievements."
              icon={<Target className="h-6 w-6 text-green-600" />}
              actionText="View Latest Goal"
              href={`/dashboard/goal-setting/submissions/${goalData!._id}`}
            />
          )}
          <GoalCard
            title="Complete Weekly Reflection"
            description={
              goalData
                ? status === "needs_reflection"
                  ? "Reflect on your progress, identify challenges, and adjust your goals as needed. Regular reflection helps you stay on track and make necessary improvements."
                  : `Weekly reflection isn't quite due yet. Please hold off until ${getGoalDueDate(goalData)} to assess your progress. Stay focused and keep pushing forward until then!`
                : "No goals available at the moment. Setting a goal will help you track your progress, stay motivated, and make meaningful improvements over time. Start by defining a clear objective, and you'll be on your way to success!"
            }
            icon={<ClipboardCheck className="h-6 w-6 text-green-600" />}
            actionText="Start Reflection"
            href={"/dashboard/goal-setting/weekly-reflection"}
            disabled={status !== "needs_reflection"}
          />
          <GoalCard
            title="View Goal Setting Submissions"
            description="Review your past goal setting submissions and track your progress over time. Analyze your growth and celebrate your achievements."
            icon={<FileText className="h-6 w-6 text-green-600" />}
            actionText="View Submissions"
            href={"/dashboard/goal-setting/submissions"}
          />
        </div>
      </div>
    </main>
  );
}
