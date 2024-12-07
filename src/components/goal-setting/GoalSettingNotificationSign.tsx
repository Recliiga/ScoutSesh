"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export type StatusType =
  | "no_goals"
  | "needs_reflection"
  | "all_complete"
  | "not_due";

export default function GoalSettingNotificationSign({
  status,
  dueDate = "friday",
}: {
  status: StatusType;
  dueDate: string | null;
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
    actionText = "Set New Goals";

    href = "/dashboard/goal-setting/new";
  } else if (status === "not_due") {
    message = `It looks like your weekly assessment is not quite due yet. Please check back on <span style="font-weight:600">${dueDate}</span>. In the meantime, feel free to review your progress. We'll notify you when it's time to begin!`;
    actionText = "View Goal Setting Submissions";

    href = "/dashboard/goal-setting/submissions";
  } else {
    message =
      "Keep up the great work! Check out your goals and see what's next.";
    actionText = "View Goals";
    href = "/dashboard/goal-setting/submissions";
  }

  return (
    <div className="mb-8 rounded-lg border border-green-600 p-4">
      <div className="mb-2 flex items-center space-x-2">
        <AlertCircle className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-green-600">
          Goal Setting Update
        </h2>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
        <p
          className="text-sm text-gray-800 sm:text-base"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <Button className="border border-green-600 bg-white px-0 py-0 text-green-600 transition-colors hover:bg-green-600 hover:text-white">
          <Link href={href} className="flex-center h-full w-full px-4 py-2">
            {actionText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
