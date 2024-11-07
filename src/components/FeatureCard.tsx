export default function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-2 font-semibold text-green-600 text-xl">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
