"use client";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import Button from "./LinkButton";
import DashboardNavUser from "./DashboardNavUser";
import { InvitationCodeType } from "@/db/models/InvitationCode";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "For Coaches", href: "/for-coaches" },
  { title: "For Athletes", href: "/for-athletes" },
  { title: "About", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export default function Header({
  user,
  invitationCode,
}: {
  user: UserType | null;
  invitationCode: InvitationCodeType | null;
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const [docWidth, setDocWidth] = useState(0);

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

  const isCompleteProfileRoute =
    pathname.includes("/complete-profile") ||
    pathname.includes("/create-organization");

  const isVerifyEmailRoute = pathname.startsWith("/verify-email");

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
    return null;

  return (
    <>
      <header className="flex items-center gap-4 border-b px-4 py-3 sm:gap-6 sm:py-4">
        <div className="mr-auto flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggleMobileNav}
            className="rounded-md border p-1 duration-200 hover:bg-accent-gray-100 min-[870px]:hidden"
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
            className="text-xl font-bold text-green-600 sm:text-2xl"
          >
            ScoutSesh.
          </Link>
          <nav className="hidden gap-6 min-[870px]:flex">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.title}
                href={navLink.href}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === navLink.href ? "text-green-600" : ""
                }`}
              >
                {navLink.title}
              </Link>
            ))}
          </nav>
        </div>
        {user ? (
          isCompleteProfileRoute || isVerifyEmailRoute ? (
            <DashboardNavUser
              user={user}
              profileCompleted={false}
              invitationCode={invitationCode}
            />
          ) : (
            <Button href={"/dashboard"} margin="none">
              Dashboard
            </Button>
          )
        ) : (
          <div className="flex items-center gap-4">
            <Button href={"/login"} variant="outline" margin="none">
              Login
            </Button>
            <Button
              href={"/signup"}
              className="hidden min-[400px]:block"
              margin="none"
            >
              Sign Up
            </Button>
          </div>
        )}
      </header>
      {docWidth < 870 && (
        <ModalContainer open={mobileNav} closeModal={() => setMobileNav(false)}>
          <MobileNav
            user={user}
            open={mobileNav}
            closeModal={() => setMobileNav(false)}
          />
        </ModalContainer>
      )}
    </>
  );
}
