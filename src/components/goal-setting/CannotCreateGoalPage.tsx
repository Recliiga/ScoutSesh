import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function CannotCreateGoalPage() {
  return (
    <main className="flex-1 flex-center text-accent-black">
      <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
        <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
          Complete Your Current Goals Before Setting New Ones
        </h1>
        <p className="text-accent-gray-300 text-sm sm:text-base">
          You currently have unfinished goals. Please complete your existing
          goals before creating new ones to ensure steady progress and focus.
        </p>
        <Button variant={"outline"} className="px-0 py-0">
          <Link
            href={"/dashboard/goal-setting"}
            className="px-4 py-2 w-full h-full"
          >
            Back
          </Link>
        </Button>
      </div>
    </main>
  );
}
