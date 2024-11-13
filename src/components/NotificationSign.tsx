"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function NotificationSign() {
  const currentNotification = "Athlete Evaluation awaiting your action";

  const handleCompleteEvaluation = () => {
    console.log("Navigating to complete Athlete Evaluation...");
    // Implement navigation to complete Athlete Evaluation
  };

  return (
    <div className="border-green-600 mb-8 p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-6 h-6 text-green-600" />
        <h2 className="font-semibold text-green-600 text-xl">Athlete Update</h2>
      </div>
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-2">
        <p className="text-base text-gray-800 sm:text-lg">
          {currentNotification}
        </p>
        <Button
          onClick={handleCompleteEvaluation}
          className="border-green-600 bg-white hover:bg-green-600 border text-green-600 hover:text-white transition-colors"
        >
          Complete Athlete Evaluation
        </Button>
      </div>
    </div>
  );
}
