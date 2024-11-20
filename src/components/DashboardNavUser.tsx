import {
  CreditCardIcon,
  LockIcon,
  LogOutIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserType } from "@/db/models/User";

export default function DashboardNavUser({
  user,
  openLogoutModal,
}: {
  user: UserType;
  openLogoutModal(): void;
}) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const [userMenu, setUserMenu] = useState(false);

  const userName = user.firstName + " " + user.lastName;

  function handleClickOutside(e: MouseEvent) {
    if (
      userMenuRef.current &&
      userIconRef.current &&
      !userMenuRef.current.contains(e.target as Node) &&
      !userIconRef.current.contains(e.target as Node)
    ) {
      console.log("Closing...");
      setUserMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={userIconRef}>
      <UserIcon
        className="w-6 h-6 text-muted-foreground hover:text-green-600 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setUserMenu(!userMenu);
        }}
      />

      {userMenu && (
        <div
          ref={userMenuRef}
          className={"top-[calc(100%_+_.5rem)] right-0 z-10 absolute p-0 w-52"}
        >
          <div className="bg-background shadow-lg border rounded-lg">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.profilePicture} alt={userName} />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm">{userName}</h4>
                  <p className="text-muted-foreground text-xs">{user.role}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Button
                variant="ghost"
                className="justify-start px-2 sm:px-4 w-full text-left"
                asChild
              >
                <Link href="">
                  <UserIcon className="sm:mr-2 w-4 h-4" />
                  View/Edit Profile
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start px-2 sm:px-4 w-full text-left"
                asChild
              >
                <Link href="">
                  <UserPlusIcon className="sm:mr-2 w-4 h-4" />
                  Invite Team Members
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start px-2 sm:px-4 w-full text-left"
                asChild
              >
                <Link href="">
                  <CreditCardIcon className="sm:mr-2 w-4 h-4" />
                  Billings & Payments
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start px-2 sm:px-4 w-full text-left"
                asChild
              >
                <Link href="">
                  <LockIcon className="sm:mr-2 w-4 h-4" />
                  Password & Security
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start px-2 sm:px-4 w-full text-left"
                onClick={() => {
                  setUserMenu(false);
                  openLogoutModal();
                }}
              >
                <LogOutIcon className="sm:mr-2 w-4 h-4" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
