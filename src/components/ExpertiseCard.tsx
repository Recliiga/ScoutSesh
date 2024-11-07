export default function ExpertiseCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h3 className="mb-2 font-semibold text-green-600 text-xl">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
