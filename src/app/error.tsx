"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

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
    <main className="flex-1 flex-center text-accent-black">
      <div className="flex-col flex-center gap-4 mx-auto w-[90%] max-w-lg text-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-green-600 sm:text-3xl">
            Oops! Something Went Wrong
          </h2>
          <p className="text-accent-gray-300 text-sm">
            We couldn&apos;t find the page you were looking for or something
            unexpected happened.
          </p>
          {showError === "true" && (
            <p className="text-red-500 text-sm">Error: {error.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold">💡 What can you do?</h3>
          <ul>
            <li className="list-disc list-inside">
              Go back to the{" "}
              <Link
                href={"/"}
                className="font-semibold text-green-600 hover:underline"
              >
                homepage
              </Link>
              .
            </li>
            <li className="list-disc list-inside">
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
          className="bg-green-600 hover:bg-green-600/90 rounded-full font-semibold text-white"
        >
          <RefreshCcw />
          Refresh
        </Button>
      </div>
    </main>
  );
}
