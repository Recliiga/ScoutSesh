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
import ModalContainer from "./ModalContainer";
import LogoutModal from "./LogoutModal";
import { getFullname } from "@/lib/utils";
import AddTeamMemberModal from "./AddTeamMemberModal";

export default function DashboardNavUser({
  user,
  profileCompleted = true,
}: {
  user: UserType;
  profileCompleted?: boolean;
}) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const [userMenu, setUserMenu] = useState(false);
  const [openModal, setOpenModal] = useState<
    "addTeamMember" | "signout" | null
  >(null);

  function closeModal() {
    setOpenModal(null);
  }

  const userName = getFullname(user);

  function handleClickOutside(e: MouseEvent) {
    if (
      userMenuRef.current &&
      userIconRef.current &&
      !userMenuRef.current.contains(e.target as Node) &&
      !userIconRef.current.contains(e.target as Node)
    ) {
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
    <>
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
            className={"top-[calc(100%_+_.5rem)] right-0 z-10 absolute"}
          >
            <div className="bg-background shadow-lg border rounded-lg">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={user.profilePicture}
                      alt={userName}
                      className="object-cover"
                    />
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
                {user.organization && (
                  <p className="mt-2 text-accent-gray-300 text-xs">
                    {user.organization._id}
                  </p>
                )}
              </div>
              <div className="p-2">
                {profileCompleted && (
                  <>
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
                    {user.role === "Head Coach" && (
                      <Button
                        onClick={() => {
                          setUserMenu(false);
                          setOpenModal("addTeamMember");
                        }}
                        variant="ghost"
                        className="justify-start px-2 sm:px-4 w-full text-left"
                        asChild
                      >
                        <Link href="">
                          <UserPlusIcon className="sm:mr-2 w-4 h-4" />
                          Invite Team Members
                        </Link>
                      </Button>
                    )}
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
                  </>
                )}
                <Button
                  variant="ghost"
                  className="justify-start px-2 sm:px-4 w-full text-left"
                  onClick={() => {
                    setUserMenu(false);
                    setOpenModal("signout");
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
      <ModalContainer open={openModal !== null} closeModal={closeModal}>
        <AddTeamMemberModal
          open={openModal === "addTeamMember"}
          closeModal={closeModal}
        />
        <LogoutModal open={openModal === "signout"} closeModal={closeModal} />
      </ModalContainer>
    </>
  );
}
