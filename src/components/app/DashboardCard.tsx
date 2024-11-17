import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardCard({
  title,
  description,
  href,
  action = "View Details",
}: {
  title: string;
  description: string;
  href: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col items-start bg-white shadow-lg p-6 rounded-lg">
      <h3 className="mb-2 font-semibold text-green-600 text-xl">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Button variant="outline" className="flex mt-auto px-0 py-0">
        <Link href={href} className="flex-1 px-4 py-2 h-full">
          {action}
        </Link>
      </Button>
    </div>
  );
}
