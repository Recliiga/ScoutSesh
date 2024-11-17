"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export type StatusType =
  | "no_goals"
  | "needs_reflection"
  | "all_complete"
  | "not_due";

export default function NotificationSign({
  status,
  dueDate = "friday",
}: {
  status?: StatusType;
  dueDate?: string;
}) {
  let message = "";
  let href = "";
  let actionText = "";

  if (status === "no_goals") {
    message =
      "You haven't set any goals yet. Start setting your goals to track your progress!";
    actionText = "Set New Goals";
    href = "/dashboard/goal-setting/new";
  } else if (status === "needs_reflection") {
    message =
      "It's time for your weekly reflection. Review your progress and update your goals.";
    actionText = "Complete Weekly Reflection";
    href = "/dashboard/goal-setting/weekly-reflection";
  } else if (status === "all_complete") {
    message =
      "Great job keeping up with your goals! Keep working towards achieving them.";
    actionText = "View Goal Setting Submissions";

    href = "/dashboard/goal-setting/submissions";
  } else if (status === "not_due") {
    message = `It looks like your weekly assessment is not quite due yet. Please check back on ${dueDate}. In the meantime, feel free to review your progress. We'll notify you when it's time to begin!`;
    actionText = "View Goal Setting Submissions";

    href = "/dashboard/goal-setting/submissions";
  } else {
    message = "Athlete Evaluation awaiting your action";
    actionText = "Complete Athlete Evaluation";
    href = "/dashboard/athlete-evaluation";
  }

  return (
    <div className="border-green-600 mb-8 p-4 border rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <AlertCircle className="w-6 h-6 text-green-600" />
        <h2 className="font-semibold text-green-600 text-xl">
          Goal Setting Update
        </h2>
      </div>
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
        <p className="text-gray-800 text-lg">{message}</p>
        <Button className="border-green-600 bg-white hover:bg-green-600 px-0 py-0 border text-green-600 hover:text-white transition-colors">
          <Link href={href} className="flex-center px-4 py-2 w-full h-full">
            {actionText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
