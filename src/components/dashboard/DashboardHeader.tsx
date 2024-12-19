"use client";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import DashboardMobileNav from "./DashboardMobileNav";
import { usePathname } from "next/navigation";
import DashboardNavUser from "../DashboardNavUser";
import { InvitationCodeType } from "@/db/models/InvitationCode";
import DashboardNotificationIcon from "../DashboardNotificationIcon";
import { NotificationEntryType } from "@/db/models/NotificationEntry";

const navLinks = [
  { title: "Goal Setting", href: "/dashboard/goal-setting" },
  { title: "Daily Journal", href: "/dashboard/daily-journal" },
  { title: "Group Classes", href: "/dashboard/group-classes" },
  { title: "Athlete Evaluation", href: "/dashboard/athlete-evaluation" },
  // { title: "Messages", href: "/dashboard/messages" },
  { title: "My Team Members", href: "/dashboard/team-members" },
];

export default function DashboardHeader({
  user,
  invitationCode,
  notifications,
}: {
  user: UserType;
  invitationCode: InvitationCodeType | null;
  notifications: NotificationEntryType[];
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const [docWidth, setDocWidth] = useState(900);

  useEffect(() => {
    function handleResize() {
      setDocWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  function toggleMobileNav() {
    setMobileNav((curr) => !curr);
  }

  return (
    <>
      <header className="flex items-center gap-4 border-b px-4 py-3 sm:gap-6 sm:py-4">
        <div className="mr-auto flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggleMobileNav}
            className="rounded-md border p-1 duration-200 hover:bg-accent-gray-100 lg:hidden"
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
            href="/dashboard"
            className="text-xl font-bold text-green-600 sm:text-2xl"
          >
            ScoutSesh.
          </Link>
          <nav className="hidden gap-6 lg:flex">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.title}
                href={navLink.href}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname.startsWith(navLink.href) ? "text-green-600" : ""
                }`}
              >
                {navLink.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <DashboardNotificationIcon notifications={notifications} />
          <DashboardNavUser user={user} invitationCode={invitationCode} />
        </div>
      </header>
      {docWidth < 1024 && (
        <ModalContainer
          open={mobileNav}
          closeModal={() => setMobileNav(false)}
          className="lg:hidden"
        >
          <DashboardMobileNav
            open={mobileNav}
            closeModal={() => setMobileNav(false)}
          />
        </ModalContainer>
      )}
    </>
  );
}
