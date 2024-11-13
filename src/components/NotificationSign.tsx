"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function NotificationSign({
  status,
}: {
  status?: "no_goals" | "needs_reflection" | "all_complete";
}) {
  let message = "";
  let actionText = "";
  let action = () => {};

  if (status === "no_goals") {
    message =
      "You haven't set any goals yet. Start setting your goals to track your progress!";
    actionText = "Set New Goals";
    action = () => console.log("Navigating to set new goals...");
  } else if (status === "needs_reflection") {
    message =
      "It's time for your weekly reflection. Review your progress and update your goals.";
    actionText = "Complete Weekly Reflection";
    action = () => console.log("Navigating to complete weekly reflection...");
  } else if (status === "all_complete") {
    message =
      "Great job keeping up with your goals! Keep working towards achieving them.";
    actionText = "View Goal Setting Submissions";
    action = () =>
      console.log("Navigating to view goal setting submissions...");
  } else {
    message = "Athlete Evaluation awaiting your action";
    actionText = "Complete Athlete Evaluation";
    action = () => console.log("Navigating to complete Athlete Evaluation...");
  }

  return (
    <div className="border-green-600 mb-8 p-4 border rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <AlertCircle className="w-6 h-6 text-green-600" />
        <h2 className="font-semibold text-green-600 text-xl">
          Goal Setting Update
        </h2>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-800 text-lg">{message}</p>
        <Button
          onClick={action}
          className="border-green-600 bg-white hover:bg-green-600 border text-green-600 hover:text-white transition-colors"
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
}
