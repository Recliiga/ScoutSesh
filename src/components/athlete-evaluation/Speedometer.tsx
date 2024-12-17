export default function Speedometer({ score }: { score: number | "N/A" }) {
  const getColor = (score: number | "N/A") => {
    if (typeof score !== "number") return "#10B981"; // Vibrant green
    if (score <= 3) return "#EF4444"; // Vibrant red
    if (score <= 7) return "#FBBF24"; // Vibrant yellow
    return "#10B981"; // Vibrant green
  };

  const color = getColor(score);

  const sections = Array.from({ length: 10 }, (_, i) => {
    const sectionAngle = 180 - i * 18;
    const filled = typeof score === "number" ? i < score : false;
    return { angle: sectionAngle, filled };
  });

  return (
    <div className="relative h-20 w-32">
      <svg className="h-full w-full" viewBox="0 0 120 70">
        {sections.map((section, index) => (
          <path
            key={index}
            d={`M60 60 L${60 + 50 * Math.cos((section.angle * Math.PI) / 180)} ${60 - 50 * Math.sin((section.angle * Math.PI) / 180)} A50 50 0 0 1 ${60 + 50 * Math.cos(((section.angle - 18) * Math.PI) / 180)} ${60 - 50 * Math.sin(((section.angle - 18) * Math.PI) / 180)} Z`}
            fill={section.filled ? color : "#E5E7EB"}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        <circle cx="60" cy="60" r="20" fill="white" opacity="0.8" />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#1F2937"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}
