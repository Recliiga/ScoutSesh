import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import CalendarDayContent from "./CalendarDayContent";
import { DailyJournalType } from "@/db/models/DailyJournal";

export default function CalendarDay({
  day,
  entry,
  today,
}: {
  day: Date;
  entry: DailyJournalType | null;
  today: Date;
}) {
  const hasEntry = entry !== null;
  const isToday = day.getDate() === today.getDate();
  const isFuture = day.getDate() > today.getDate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`border p-2 h-32 overflow-hidden cursor-pointer ${
            hasEntry ? "bg-green-50" : ""
          }`}
        >
          <div className="font-bold">{format(day, "d")}</div>
          {!isFuture && (
            <div className="flex justify-center items-center mt-2">
              {hasEntry ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
          )}
          {isToday && !hasEntry && (
            <div className="mt-2 text-center">
              <Link
                href="/dashboard/daily-journal/submit-entry"
                className="text-blue-500 text-xs hover:underline"
              >
                <p>Submit Journal Entry</p>
              </Link>
            </div>
          )}
        </div>
      </PopoverTrigger>
      {(hasEntry || isToday) && (
        <PopoverContent className="w-80">
          {hasEntry ? (
            <CalendarDayContent entry={entry} date={day} />
          ) : isToday ? (
            <div className="p-2">
              <div className="mb-2 font-bold">
                {format(day, "MMMM d, yyyy")}
              </div>
              <Link
                href="/submit-journal-entry"
                className="text-blue-500 hover:underline"
              >
                Submit your journal entry for today
              </Link>
            </div>
          ) : null}
        </PopoverContent>
      )}
    </Popover>
  );
}
