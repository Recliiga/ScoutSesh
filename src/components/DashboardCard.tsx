import { Button } from "./ui/button";

export default function DashboardCard({
  title,
  description,
  action = "View Details",
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col items-start bg-white shadow-lg p-6 rounded-lg">
      <h3 className="mb-2 font-semibold text-green-600 text-xl">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Button variant="outline" className="mt-auto">
        {action}
      </Button>
    </div>
  );
}
