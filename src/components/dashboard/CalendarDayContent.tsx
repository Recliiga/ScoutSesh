import { format } from "date-fns";
import { EntryType } from "./JournalEntryCard";

export default function CalendarDayContent({
  entries,
  date,
}: {
  entries: EntryType[];
  date: Date;
}) {
  return (
    <div className="p-2">
      <div className="mb-2 font-bold">{format(date, "MMMM d, yyyy")}</div>
      {entries.map((entry) => (
        <div key={entry.id} className="mb-2 text-xs">
          <div className="font-semibold">Training & Competition:</div>
          <div>{entry.trainingAndCompetition.substring(0, 100)}...</div>
          <div className="mt-1 font-semibold">Mental State:</div>
          <div>{entry.mentalState}</div>
        </div>
      ))}
    </div>
  );
}
