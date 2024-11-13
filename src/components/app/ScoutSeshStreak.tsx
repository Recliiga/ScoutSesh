export default function ScoutSeshStreak({ streakCount }: { streakCount: number }) {
  return (
    <div className="inline-block bg-green-100 px-4 py-2 rounded-full font-semibold text-green-800 text-lg">
      {streakCount} Day ScoutSesh Streak 🔥
    </div>
  );
}
