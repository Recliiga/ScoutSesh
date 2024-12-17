"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOutIcon, Users } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import ModalContainer from "../ModalContainer";
import AdminLogoutModal from "./AdminLogoutModal";

export default function AdminNavUser({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [userMenu, setUserMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [userMenuRef] = useClickOutside(() => setUserMenu(false));

  return (
    <>
      <div ref={userMenuRef} className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setUserMenu((prev) => !prev)}
        >
          <Users className="h-5 w-5" />
          <span className="sr-only">Users</span>
        </Button>
        {isAuthenticated && userMenu && (
          <div className={"absolute right-0 top-[calc(100%_+_.5rem)] z-10"}>
            <div className="rounded-lg border bg-background shadow-lg">
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-2 text-left sm:px-4"
                  onClick={() => {
                    setUserMenu(false);
                    setOpenModal(true);
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
      <ModalContainer open={openModal} closeModal={() => setOpenModal(false)}>
        <AdminLogoutModal
          open={openModal}
          closeModal={() => setOpenModal(false)}
        />
      </ModalContainer>
    </>
  );
}
