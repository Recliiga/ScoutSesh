"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthTabs() {
  const pathname = usePathname();

  return (
    <div className="flex bg-accent-gray-100 p-1 rounded-md w-full font-medium text-sm">
      <Link
        href={"/login"}
        className={`flex-1 flex-center px-3 py-1.5 rounded-sm ${
          pathname === "/login" ? "bg-white" : "text-accent-gray-300"
        }`}
      >
        Log In
      </Link>
      <Link
        href={"/signup"}
        className={`flex-1 flex-center px-3 py-1.5 rounded-sm ${
          pathname === "/signup" ? "bg-white" : "text-accent-gray-300"
        }`}
      >
        Sign Up
      </Link>
    </div>
  );
}
