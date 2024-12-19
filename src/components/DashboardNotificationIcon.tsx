import { BellIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getDuration, getNotificationMessage } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { NotificationEntryType } from "@/db/models/NotificationEntry";

export default function DashboardNotificationIcon({
  notifications,
}: {
  notifications: NotificationEntryType[];
}) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const [notficationIconRef] = useClickOutside(() => setDropdownIsOpen(false));

  const hasUnreadNotifications = notifications.some(
    (notif) => notif.read === false,
  );

  return (
    <div className="relative" ref={notficationIconRef}>
      <BellIcon
        className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-green-600"
        onClick={(e) => {
          e.stopPropagation();
          setDropdownIsOpen(!dropdownIsOpen);
        }}
      />
      {hasUnreadNotifications ? (
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500"></div>
      ) : null}

      {dropdownIsOpen && (
        <div
          ref={userMenuRef}
          className={
            "absolute -right-10 top-[calc(100%_+_.5rem)] z-10 max-w-80 overflow-hidden rounded-lg border bg-white"
          }
        >
          <div className="border-b px-4 py-2 sm:py-4">
            <h4 className="text-lg font-semibold">Notifications</h4>
          </div>
          <div>
            {notifications.map((notification) => (
              <Link
                href={notification.link}
                key={notification._id}
                onClick={() => setDropdownIsOpen(false)}
                className={`block px-4 py-1.5 duration-200 hover:bg-muted sm:py-2 ${notification.read ? "opacity-60" : ""}`}
              >
                <div className="flex items-start space-x-4 overflow-hidden">
                  <Avatar>
                    <AvatarImage
                      src={notification.fromUser.profilePicture}
                      alt={notification.fromUser.firstName + " profile picture"}
                      className="object-cover"
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="truncate text-sm">
                      {getNotificationMessage(notification)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getDuration(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t p-2 sm:p-4">
            <Button
              variant={"outline"}
              className="flex-1 hover:border-green-600 hover:bg-green-600 hover:text-white"
            >
              Mark as read
            </Button>

            <Link
              href={"/dashboard/notifications"}
              onClick={() => setDropdownIsOpen(false)}
              className="block h-9 flex-1 rounded-md border px-4 py-2 text-center text-sm font-medium text-primary duration-200 hover:bg-primary/90 hover:text-primary-foreground"
            >
              See All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
