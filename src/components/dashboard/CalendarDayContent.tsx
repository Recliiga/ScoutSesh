import { DailyJournalType } from "@/db/models/DailyJournal";
import { format } from "date-fns";
import Link from "next/link";

export default function CalendarDayContent({
  entry,
  date,
}: {
  entry: DailyJournalType;
  date: Date;
}) {
  return (
    <div className="h-fit">
      <div className="flex flex-col gap-2 mb-2 font-bold">
        {format(date, "MMMM d, yyyy")}
      </div>
      <div key={entry._id} className="text-xs">
        <div className="font-semibold">Training & Competition:</div>
        <div>{entry.details.trainingAndCompetition.substring(0, 100)}...</div>
        <div className="mt-1 font-semibold">Mental State:</div>
        <div>{entry.details.mentalState}</div>
        <Link
          href={`/dashboard/daily-journal/${entry._id}`}
          className="block bg-green-500 hover:bg-green-600 mt-2 py-1.5 p-2 rounded-md w-fit text-white duration-300"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
