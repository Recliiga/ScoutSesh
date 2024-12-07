import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GoalSettingCard({
  title,
  description,
  icon,
  action,
  href = "#",
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
  action: string;
  href?: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center">
        {React.cloneElement(icon, {
          className: "h-6 w-6 text-green-600 flex-shrink-0",
        })}
        <h3 className="ml-2 text-xl font-semibold leading-6">{title}</h3>
      </div>
      <p className="mb-4 flex-grow text-sm text-gray-600 sm:text-base">
        {description}
      </p>
      <Button className="flex self-start bg-green-600 px-0 py-0 text-white hover:bg-green-700">
        <Link href={href} className="flex-1 px-4 py-2">
          {action}
        </Link>
      </Button>
    </div>
  );
}
