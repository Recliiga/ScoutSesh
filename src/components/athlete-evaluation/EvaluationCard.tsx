"use client";
import React from "react";
import Link from "next/link";

export default function EvaluationCard({
  title,
  description,
  icon,
  action,
  href,
}: {
  title: string;
  description: string;
  icon: React.JSX.Element;
  action: string;
  href: string;
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
      <Link
        href={href}
        className="self-start rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-700"
      >
        {action}
      </Link>
    </div>
  );
}
