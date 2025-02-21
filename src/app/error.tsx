"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Error",
  description:
    "An unexpected error occurred. Please try refreshing the page or go back to the homepage.",
};

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  const showError = searchParams.get("showError");

  return (
    <main className="flex-center flex-1 text-accent-black">
      <div className="flex-center mx-auto w-[90%] max-w-lg flex-col gap-4 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-green-600 sm:text-3xl">
            Oops! Something Went Wrong
          </h2>
          <p className="text-sm text-accent-gray-300">
            We couldn&apos;t find the page you were looking for or something
            unexpected happened.
          </p>
          {showError === "true" && (
            <p className="text-sm text-red-500">Error: {error.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">💡 What can you do?</h3>
          <ul>
            <li className="list-inside list-disc">
              Go back to the{" "}
              <Link
                href={"/"}
                className="font-semibold text-green-600 hover:underline"
              >
                homepage
              </Link>
              .
            </li>
            <li className="list-inside list-disc">
              Contact support if the problem persists.
            </li>
          </ul>
        </div>
        {/* <Link
          href={"/"}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-bold text-sm text-white duration-300"
        >
          GO HOME
        </Link> */}
        <Button
          onClick={reset}
          className="rounded-full bg-green-600 font-semibold text-white hover:bg-green-600/90"
        >
          <RefreshCcw />
          Refresh
        </Button>
      </div>
    </main>
  );
}
