export default function ConfidenceMeter({ score }: { score: number }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-full h-2.5">
      <div
        className="bg-green-500 rounded-full h-2.5"
        style={{ width: `${score * 10}%` }}
      ></div>
    </div>
  );
}
