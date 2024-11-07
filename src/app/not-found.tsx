import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <main className="flex-1 flex-center text-accent-black">
      <div className="flex-col flex-center gap-2 sm:gap-3 mx-auto w-[90%] max-w-sm text-center">
        <h2 className="font-bold text-2xl text-green-600 sm:text-3xl">OOPS!</h2>
        <h1 className="font-semibold">404 - PAGE NOT FOUND</h1>
        <p className="text-accent-gray-300 text-sm">
          The page you are looking for might have been removed, have it&apos;s
          name changed or is temporarily unavailable
        </p>
        <Link
          href={"/"}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-bold text-sm text-white duration-300"
        >
          GO HOME
        </Link>
      </div>
    </main>
  );
}
