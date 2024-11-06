"use client";
import { UserType } from "@/db/models/User";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

export default function NavUser({ user }: { user: UserType }) {
  const [dropdown, setdropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setdropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 cursor-pointer group"
        onClick={() => setdropdown((curr) => !curr)}
      >
        <div className="relative bg-zinc-100 sm:mr-1 rounded-full w-10 h-10 overflow-hidden">
          <Image
            src={user.profilePicture}
            alt={user.firstName + " " + user.lastName}
            fill
            sizes="128px"
            className="object-cover"
          ></Image>
        </div>
        <p className="lg:block hidden text-sm">
          {user.firstName} {user.lastName}
        </p>
        <div
          className={`duration-300 lg:block hidden  ${
            dropdown ? "rotate-180" : ""
          }`}
        >
          <svg
            height={20}
            width={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Arrow / Caret_Down_MD">
                {" "}
                <path
                  id="Vector"
                  d="M16 10L12 14L8 10"
                  stroke="#999"
                  className={"group-hover:stroke-black duration-300"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
      </div>
      {/* <UserDropdownMenu
        user={user}
        dropdownIsOpen={dropdown}
        closeDropdown={() => setdropdown(false)}
      /> */}
    </div>
  );
}
