import Link from "next/link";
import React from "react";

export default function Button({
  children,
  className,
  href,
  size = "normal",
  type = "filled",
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  type?: "border" | "filled";
  size?: "lg" | "normal";
}) {
  return (
    <Link
      href={href}
      className={`p-2 border rounded-md w-fit font-medium transition-colors duration-200 cursor-pointer ${
        size === "lg" ? "px-8 py-3 text-lg" : "px-4 py-2 text-sm"
      } ${
        type === "filled"
          ? "bg-accent-black hover:bg-accent-black/90 text-white"
          : "bg-white hover:bg-accent-gray-100 text-accent-black"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
