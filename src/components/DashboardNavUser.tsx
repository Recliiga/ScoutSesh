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
import { InvitationCodeType } from "@/db/models/InvitationCode";

export default function DashboardNavUser({
  user,
  profileCompleted = true,
  invitationCode,
}: {
  user: UserType;
  profileCompleted?: boolean;
  invitationCode: InvitationCodeType | null;
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
          className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-green-600"
          onClick={(e) => {
            e.stopPropagation();
            setUserMenu(!userMenu);
          }}
        />

        {userMenu && (
          <div
            ref={userMenuRef}
            className={"absolute right-0 top-[calc(100%_+_.5rem)] z-10"}
          >
            <div className="rounded-lg border bg-background shadow-lg">
              <div className="border-b p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={user.profilePicture}
                      alt={userName}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">{userName}</h4>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {profileCompleted && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setUserMenu(false)}
                      className="w-full justify-start px-2 text-left sm:px-4"
                      asChild
                    >
                      <Link href={`/dashboard/profile/${user._id}`}>
                        <UserIcon className="h-4 w-4 sm:mr-2" />
                        View/Edit Profile
                      </Link>
                    </Button>
                    {user.role === "Head Coach" ? (
                      <Button
                        onClick={() => {
                          setUserMenu(false);
                          setOpenModal("addTeamMember");
                        }}
                        variant="ghost"
                        className="w-full cursor-pointer justify-start px-2 text-left sm:px-4"
                        asChild
                      >
                        <div className="flex gap-2">
                          <UserPlusIcon className="h-4 w-4 sm:mr-2" />
                          Invite Team Members
                        </div>
                      </Button>
                    ) : null}
                    <Button
                      variant="ghost"
                      onClick={() => setUserMenu(false)}
                      className="w-full justify-start px-2 text-left sm:px-4"
                      asChild
                    >
                      <Link href="/dashboard/billings-and-payments">
                        <CreditCardIcon className="h-4 w-4 sm:mr-2" />
                        Billings & Payments
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setUserMenu(false)}
                      className="w-full justify-start px-2 text-left sm:px-4"
                      asChild
                    >
                      <Link href="/dashboard/password-and-security">
                        <LockIcon className="h-4 w-4 sm:mr-2" />
                        Password & Security
                      </Link>
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2 text-left sm:px-4"
                  onClick={() => {
                    setUserMenu(false);
                    setOpenModal("signout");
                  }}
                >
                  <LogOutIcon className="h-4 w-4 sm:mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalContainer open={openModal !== null} closeModal={closeModal}>
        <AddTeamMemberModal
          invitationCode={invitationCode}
          open={openModal === "addTeamMember"}
          closeModal={closeModal}
        />
        <LogoutModal open={openModal === "signout"} closeModal={closeModal} />
      </ModalContainer>
    </>
  );
}
