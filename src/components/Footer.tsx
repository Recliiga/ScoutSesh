"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="mx-auto w-[90%] max-w-6xl text-center text-sm text-gray-600">
        © 2024{" "}
        <Link href={"/"} className="hover:underline">
          ScoutSesh
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}
