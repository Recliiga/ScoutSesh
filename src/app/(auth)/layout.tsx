import AuthTabs from "@/components/AuthTabs";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 justify-center items-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6 border-accent-gray-200 bg-white shadow-sm p-3 sm:p-6 border rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl text-center tracking-tight">
            Welcome to ScoutSesh
          </h3>
          <p className="text-accent-gray-300 text-center text-sm">
            Elevate your game with expert coaching
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-2 w-full">
            <AuthTabs />
            {children}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <button className="font-medium text-accent-gray-300 text-xs">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
