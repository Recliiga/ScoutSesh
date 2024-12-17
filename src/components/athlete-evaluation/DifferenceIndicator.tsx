export default function DifferenceIndicator({
  difference,
}: {
  difference: number | "N/A";
}) {
  const boxColor =
    typeof difference === "number" && difference > 0
      ? "bg-green-100 border-green-500 text-green-700"
      : typeof difference === "number" && difference < 0
        ? "bg-red-100 border-red-500 text-red-700"
        : "bg-gray-100 border-gray-500 text-gray-700";

  const arrow =
    typeof difference === "number"
      ? difference > 0
        ? "↑"
        : difference < 0
          ? "↓"
          : "-"
      : "";

  const displayValue =
    typeof difference === "number"
      ? difference === 0
        ? "-"
        : Math.abs(difference)
      : "N/A";

  return (
    <div
      className={`flex items-center justify-center rounded border px-1 py-0.5 ${boxColor}`}
    >
      <span className="mr-0.5 text-xs font-medium">{arrow}</span>
      <span className="text-xs font-medium">{displayValue}</span>
    </div>
  );
}
