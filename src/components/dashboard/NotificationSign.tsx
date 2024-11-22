"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NotificationSign() {
  const message = "Athlete Evaluation awaiting your action";
  const href = "#";
  const actionText = "Complete Athlete Evaluation";

  return (
    <div className="border-green-600 mb-8 p-4 border rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <AlertCircle className="w-6 h-6 text-green-600" />
        <h2 className="font-semibold text-green-600 text-xl">
          Goal Setting Update
        </h2>
      </div>
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
        <p className="text-base text-gray-800 sm:text-lg">{message}</p>
        <Button className="border-green-600 bg-white hover:bg-green-600 px-0 py-0 border text-green-600 hover:text-white transition-colors">
          <Link href={href} className="flex-center px-4 py-2 w-full h-full">
            {actionText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
