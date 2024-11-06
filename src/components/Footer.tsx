"use client";
import Link from "next/link";
import React from "react";

const footerLinks = [
  { title: "About", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-accent-black sm:py-6 p-4 text-white">
      <div className="flex sm:flex-row flex-col justify-center sm:justify-between items-center gap-2 mx-auto max-w-6xl">
        <Link href="/" className="font-bold text-green-600 text-xl">
          ScoutSesh.
        </Link>
        <div className="flex items-center gap-6">
          {footerLinks.map((navLink) => (
            <Link
              key={navLink.title}
              href={navLink.href}
              className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
            >
              {navLink.title}
            </Link>
          ))}
        </div>
        <p className="text-accent-gray-300 text-sm">
          Copyright &copy; {new Date(Date.now()).getFullYear()}
        </p>
      </div>
    </footer>
  );
}
