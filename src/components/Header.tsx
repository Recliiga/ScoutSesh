import { UserType } from "@/db/models/User";
import Link from "next/link";
import React from "react";
import NavUser from "./NavUser";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "For Coaches", href: "/for-coaches" },
  { title: "For Athletes", href: "/for-athletes" },
  { title: "About", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export default function Header({ user }: { user: UserType | null }) {
  return (
    <header className="flex justify-between items-center px-4 py-3 sm:py-4 border-b">
      <Link href="/" className="font-bold text-2xl text-green-600">
        ScoutSesh.
      </Link>
      <nav className="md:flex gap-4 hidden">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.title}
            href={navLink.href}
            className="font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors"
          >
            {navLink.title}
          </Link>
        ))}
      </nav>
      {user ? (
        <NavUser user={user} />
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href={"/auth?page=login"}
            className="bg-white hover:bg-accent-gray-100 mx-auto px-4 p-2 border rounded-md w-fit font-medium text-accent-black text-sm transition-colors duration-200 cursor-pointer"
          >
            Login
          </Link>
          <Link
            href={"/auth?page=sign-up"}
            className="bg-accent-black hover:bg-accent-black/90 mx-auto px-4 p-2 border rounded-md w-fit font-medium text-sm text-white transition-colors duration-200 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
