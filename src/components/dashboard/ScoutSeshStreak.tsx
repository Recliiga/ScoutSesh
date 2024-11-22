export default function ScoutSeshStreak({
  streakCount,
  className,
}: {
  streakCount: number | null;
  className?: string;
}) {
  if (streakCount === null) return null;

  return (
    <div
      className={`inline-block bg-green-100 px-4 py-2 rounded-full font-semibold text-green-800 text-lg ${className}`}
    >
      {streakCount} Day ScoutSesh Streak 🔥
    </div>
  );
}
