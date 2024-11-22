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
    <div className="flex flex-col bg-white shadow-lg p-6 rounded-lg h-full">
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, {
          className: "h-6 w-6 text-green-600 flex-shrink-0",
        })}
        <h3 className="ml-2 font-semibold text-xl leading-6">{title}</h3>
      </div>
      <p className="flex-grow mb-4 text-gray-600">{description}</p>
      <Button className="flex bg-green-600 hover:bg-green-700 px-0 py-0 text-white self-start">
        <Link href={href} className="flex-1 px-4 py-2">
          {action}
        </Link>
      </Button>
    </div>
  );
}
