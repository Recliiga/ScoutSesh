import AuthTabs from "@/components/AuthTabs";
import Link from "next/link";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-lg border border-accent-gray-200 bg-white p-3 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-2xl font-bold tracking-tight">
            Welcome to ScoutSesh
          </h3>
          <p className="text-center text-sm text-accent-gray-300">
            Elevate your game with expert coaching
          </p>
        </div>
        <div>
          <div className="flex w-full flex-col gap-2">
            <AuthTabs />
            {children}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Link
            href={"/forgot-password"}
            className="text-xs font-medium text-accent-gray-300 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
