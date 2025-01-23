export default function ClassSessions({ dates }: { dates: Date[] }) {
  return (
    <div>
      <h3 className="mb-2 font-medium">Class Sessions</h3>
      <ul className="grid grid-cols-2 gap-4 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-4">
        {dates.map((date) => (
          <li
            key={date.getTime()}
            className="list-inside list-disc text-zinc-700"
          >
            {date.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
