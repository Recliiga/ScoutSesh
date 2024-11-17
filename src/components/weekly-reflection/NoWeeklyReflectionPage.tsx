import Link from "next/link";
import React from "react";

export default function NoWeeklyReflectionPage({
  type,
  dueDate = "friday",
}: {
  type: "pending" | "unavailable";
  dueDate?: string;
}) {
  if (type === "pending")
    return (
      <main className="flex-1 flex-center text-accent-black">
        <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
          <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
            Weekly Assessment Pending
          </h1>
          <p className="text-accent-gray-300 text-sm sm:text-base">
            It looks like your weekly assessment is not quite due yet. Please
            check back on <strong>{dueDate}</strong>. In the meantime, feel free
            to review your progress. We&apos;ll notify you when it&apos;s time
            to begin!
          </p>
          <Link
            href={"/app/goal-setting"}
            className="bg-green-600 hover:bg-green-700 mt-2 px-4 py-2 rounded-full font-bold text-sm text-white sm:text-base duration-300"
          >
            GO BACK
          </Link>
        </div>
      </main>
    );

  if (type === "unavailable")
    return (
      <main className="flex-1 flex-center text-accent-black">
        <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-lg text-center">
          <h1 className="font-bold text-green-600 text-xl sm:text-2xl">
            No Goals Requiring Assessment
          </h1>
          <p className="text-accent-gray-300 text-sm sm:text-base">
            At this time, you do not have any active goals that require an
            assessment. If you have recently completed a goal or if you would
            like to set new objectives, you can update your progress or create
            new goals at any time. We&apos;re here to help you track and achieve
            your aspirations whenever you&apos;re ready!
          </p>
          <Link
            href={"/app/goal-setting"}
            className="bg-green-600 hover:bg-green-700 mt-2 px-4 py-2 rounded-full font-bold text-sm text-white sm:text-base duration-300"
          >
            GO BACK
          </Link>
        </div>
      </main>
    );
}
