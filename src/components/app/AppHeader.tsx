"use client";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import AppMobileNav from "./AppMobileNav";
import { usePathname } from "next/navigation";
import { BellIcon, UserIcon } from "lucide-react";

const navLinks = [
  { title: "Athlete Evaluation", href: "/app/athlete-evaluation" },
  { title: "Goal Setting", href: "/app/goal-setting" },
  { title: "Daily Journal", href: "/app/daily-journal" },
  { title: "Group Classes", href: "/app/group-classes" },
  { title: "Messages", href: "/app/messages" },
  { title: "My Team Members", href: "/app/team-members" },
];

export default function AppHeader({ user }: { user: UserType | null }) {
  const [mobileNav, setMobileNav] = useState(false);

  const pathname = usePathname();

  function toggleMobileNav() {
    setMobileNav((curr) => !curr);
  }

  return (
    <>
      <header className="flex items-center gap-4 sm:gap-6 px-4 py-3 sm:py-4 border-b">
        <div className="flex items-center gap-4 sm:gap-6 mr-auto">
          <button
            onClick={toggleMobileNav}
            className="lg:hidden hover:bg-accent-gray-100 p-1 border rounded-md duration-200"
          >
            <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g id="Menu">
                    {" "}
                    <rect
                      id="Rectangle"
                      fillRule="nonzero"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      {" "}
                    </rect>{" "}
                    <line
                      x1="5"
                      y1="7"
                      x2="19"
                      y2="7"
                      id="Path"
                      stroke="#0C0310"
                      className="stroke-accent-black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {" "}
                    </line>{" "}
                    <line
                      x1="5"
                      y1="17"
                      x2="19"
                      y2="17"
                      id="Path"
                      stroke="#0C0310"
                      className="stroke-accent-black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {" "}
                    </line>{" "}
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      id="Path"
                      stroke="#0C0310"
                      className="stroke-accent-black"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      {" "}
                    </line>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
          <Link
            href="/"
            className="font-bold text-green-600 text-xl sm:text-2xl"
          >
            ScoutSesh.
          </Link>
          <nav className="lg:flex gap-6 hidden">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.title}
                href={navLink.href}
                className={`font-medium text-sm hover:text-green-600 whitespace-nowrap transition-colors ${
                  pathname === navLink.href ? "text-green-600" : ""
                }`}
              >
                {navLink.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-6 h-6 text-muted-foreground hover:text-green-600 cursor-pointer" />
          <UserIcon className="w-6 h-6 text-muted-foreground hover:text-green-600 cursor-pointer" />
        </div>
      </header>
      <ModalContainer
        open={mobileNav}
        closeModal={() => setMobileNav(false)}
        className="lg:hidden"
      >
        <AppMobileNav
          user={user}
          open={mobileNav}
          closeModal={() => setMobileNav(false)}
        />
      </ModalContainer>
    </>
  );
}