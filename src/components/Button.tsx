import Link from "next/link";
import React from "react";

export default function Button({
  children,
  className,
  href,
  size = "normal",
  variant = "filled",
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  variant?: "outline" | "filled";
  size?: "lg" | "normal";
}) {
  return (
    <Link
      href={href}
      className={`p-2 block border rounded-md whitespace-nowrap w-fit font-medium transition-colors duration-200 cursor-pointer ${
        size === "lg" ? "px-8 py-3 text-lg" : "px-4 py-2 text-sm"
      } ${
        variant === "outline"
          ? "bg-white hover:bg-accent-gray-100 text-accent-black"
          : "bg-accent-black hover:bg-accent-black/90 text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
