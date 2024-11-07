import { CheckCircle } from "lucide-react";

export async function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <CheckCircle className="flex-shrink-0 mt-1 mr-3 w-6 h-6 text-green-600" />
      <div>
        <h3 className="mb-2 font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
