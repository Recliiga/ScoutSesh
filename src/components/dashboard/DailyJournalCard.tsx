import React from "react";
import Link from "next/link";

export default function DailyJournalCard({
  title,
  href,
  description,
  icon,
  action,
}: {
  title: string;
  href: string;
  description: string;
  icon: React.ReactElement;
  action: string;
}) {
  return (
    <div className="flex flex-col bg-white shadow-lg p-6 rounded-lg h-full">
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, {
          className: "h-6 w-6 text-green-600 flex-shrink-0",
        })}
        <h3 className="ml-2 font-semibold text-xl leading-6">{title}</h3>
      </div>
      <p className="flex-grow mb-4 text-gray-600">{description}</p>
      <Link
        href={href}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm text-white self-start"
      >
        {action}
      </Link>
    </div>
  );
}
