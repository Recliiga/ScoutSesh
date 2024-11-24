import { DailyJournalType } from "@/db/models/DailyJournal";
import { calculateStreak } from "@/lib/utils";

type PropsType = {
  className?: string;
  journalEntries?: DailyJournalType[] | null;
};

export default function ScoutSeshStreak({
  className,
  journalEntries,
}: PropsType) {
  const streakCount = journalEntries ? calculateStreak(journalEntries) : 0;

  if (streakCount < 1) return null;

  return (
    <div
      className={`block leading-6 bg-green-100 sm:whitespace-nowrap px-4 py-2 rounded-full font-semibold text-green-800 text-lg ${className}`}
    >
      {streakCount} Day ScoutSesh{" "}
      <span className="whitespace-nowrap">Streak 🔥</span>
    </div>
  );
}
