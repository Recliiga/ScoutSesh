"use client";
import React from "react";
import { Target, ClipboardCheck, FileText } from "lucide-react";
import NotificationSign from "../app/NotificationSign";
import GoalCard from "../app/GoalCard";

export default function AthleteGoalSettingPage() {
  const currentStatus = "needs_reflection";

  const handleSetNewGoals = () => {
    console.log("Navigating to set new goals page...");
  };

  const handleWeeklyReflection = () => {
    console.log("Navigating to weekly reflection page...");
  };

  const handleViewSubmissions = () => {
    console.log("Navigating to view goal setting submissions page...");
  };

  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <h1 className="mb-6 font-bold text-4xl text-black">Goal Setting</h1>
        <p className="mb-8 text-gray-600 text-lg">
          Set meaningful goals, track your progress, and reflect on your
          achievements to continuously improve your performance.
        </p>
        <NotificationSign status={currentStatus} />
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          <GoalCard
            title="Set New Goals"
            description="Define new short-term and long-term goals to focus your training and development efforts. Set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals to enhance your athletic performance and personal growth."
            icon={<Target className="w-6 h-6 text-green-600" />}
            actionText="Set Goals"
            onClick={handleSetNewGoals}
          />
          <GoalCard
            title="Complete Weekly Reflection"
            description="Reflect on your progress, identify challenges, and adjust your goals as needed. Regular reflection helps you stay on track and make necessary improvements."
            icon={<ClipboardCheck className="w-6 h-6 text-green-600" />}
            actionText="Start Reflection"
            onClick={handleWeeklyReflection}
          />
          <GoalCard
            title="View Goal Setting Submissions"
            description="Review your past goal setting submissions and track your progress over time. Analyze your growth and celebrate your achievements."
            icon={<FileText className="w-6 h-6 text-green-600" />}
            actionText="View Submissions"
            onClick={handleViewSubmissions}
          />
        </div>
      </div>
    </main>
  );
}
