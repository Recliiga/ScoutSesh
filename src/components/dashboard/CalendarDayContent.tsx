import { format } from "date-fns";
import { EntryType } from "./JournalEntryCard";
import Link from "next/link";

export default function CalendarDayContent({
  entries,
  date,
}: {
  entries: EntryType[];
  date: Date;
}) {
  return (
    <div className="h-fit">
      <div className="flex flex-col gap-2 mb-2 font-bold">
        {format(date, "MMMM d, yyyy")}
      </div>
      {entries.map((entry) => (
        <div key={entry.id} className="text-xs">
          <div className="font-semibold">Training & Competition:</div>
          <div>{entry.trainingAndCompetition.substring(0, 100)}...</div>
          <div className="mt-1 font-semibold">Mental State:</div>
          <div>{entry.mentalState}</div>
          <Link
            href={"/dashboard/daily-journal/123"}
            className="block bg-green-500 hover:bg-green-600 mt-2 py-1.5 p-2 rounded-md w-fit text-white duration-300"
          >
            View More
          </Link>
        </div>
      ))}
    </div>
  );
}
