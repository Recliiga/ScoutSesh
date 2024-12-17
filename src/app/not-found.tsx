import { getSessionFromHeaders } from "@/services/authServices";
import Link from "next/link";
import React from "react";

export default async function NotFoundPage() {
  const user = await getSessionFromHeaders();

  return (
    <main className="flex-center flex-1 text-accent-black">
      <div className="flex-center mx-auto w-[90%] max-w-sm flex-col gap-2 text-center sm:gap-3">
        <h2 className="text-2xl font-bold text-green-600 sm:text-3xl">OOPS!</h2>
        <h1 className="font-semibold">404 - PAGE NOT FOUND</h1>
        <p className="text-sm text-accent-gray-300 sm:text-base">
          The page you are looking for might have been removed, have it&apos;s
          name changed or is temporarily unavailable
        </p>
        {user ? (
          <Link
            href={"/dashboard"}
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white duration-300 hover:bg-green-700"
          >
            GO TO DASHBOARD
          </Link>
        ) : (
          <Link
            href={"/"}
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white duration-300 hover:bg-green-700"
          >
            GO HOME
          </Link>
        )}
      </div>
    </main>
  );
}
