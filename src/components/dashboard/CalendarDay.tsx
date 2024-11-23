import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format, isSameDay, parseISO, isAfter } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import CalendarDayContent from "./CalendarDayContent";
import { EntryType } from "./JournalEntryCard";

export default function CalendarDay({
  day,
  entries,
  today,
}: {
  day: Date;
  entries: EntryType[];
  today: Date;
}) {
  const dayEntries = entries.filter((entry) =>
    isSameDay(parseISO(entry.date), day)
  );
  const hasEntries = dayEntries.length > 0;
  const isToday = isSameDay(day, today);
  const isFuture = isAfter(day, today);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`border p-2 h-32 overflow-hidden cursor-pointer ${
            hasEntries ? "bg-green-50" : ""
          }`}
        >
          <div className="font-bold">{format(day, "d")}</div>
          {!isFuture && !isToday && (
            <div className="flex justify-center items-center mt-2">
              {hasEntries ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
          )}
          {isToday && !hasEntries && (
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
      {(hasEntries || isToday) && (
        <PopoverContent className="w-80">
          {hasEntries ? (
            <CalendarDayContent entries={dayEntries} date={day} />
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
