import Link from "next/link";
import React from "react";
import { StatusType } from "../goal-setting/GoalSettingNotificationSign";
import { Button } from "../ui/button";

export default function NoWeeklyReflectionPage({
  status,
  dueDate = "friday",
}: {
  status: StatusType;
  dueDate: string | null;
}) {
  if (status === "not_due")
    return (
      <main className="flex-1 flex-center text-accent-black">
        <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
          <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
            Weekly Assessment Not Yet Due
          </h1>
          <p className="text-accent-gray-300 text-sm sm:text-base">
            It looks like your weekly assessment is not quite due yet. Please
            check back on <strong>{dueDate}</strong>. In the meantime, feel free
            to review your progress. We&apos;ll notify you when it&apos;s time
            to begin!
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
  if (status === "no_goals")
    return (
      <main className="flex-1 flex-center text-accent-black">
        <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
          <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
            No Active Goals at the Moment
          </h1>
          <p className="text-accent-gray-300 text-sm sm:text-base">
            At this time, you do not have any active goals. If you would like to
            set new goals, you can create new goals at any time. We&apos;re here
            to help you track and achieve your aspirations whenever you&apos;re
            ready!
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

  return (
    <main className="flex-1 flex-center text-accent-black">
      <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
        <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
          No Goals Requiring Assessment
        </h1>
        <p className="text-accent-gray-300 text-sm sm:text-base">
          All of your goals have been successfully completed! If you&apos;d like
          to set new objectives, feel free to create new goals at any time.
        </p>
        <Link
          href={"/dashboard/goal-setting"}
          className="bg-green-600 hover:bg-green-700 mt-2 px-4 py-2 rounded-full font-bold text-sm text-white duration-300"
        >
          GO BACK
        </Link>
      </div>
    </main>
  );
}
