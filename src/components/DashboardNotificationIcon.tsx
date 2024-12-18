import { BellIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getDuration, getNotificationMessage } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { NotificationEntryType } from "@/db/models/NotificationEntry";
import { markAllNotificationAsRead } from "@/actions/notificationActions";

export default function DashboardNotificationIcon({
  notifications,
}: {
  notifications: NotificationEntryType[];
}) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notficationIconRef] = useClickOutside(() => setDropdownIsOpen(false));

  const hasUnreadNotifications = notifications.some(
    (notif) => notif.read === false,
  );

  async function handleMarkAllAsRead() {
    setLoading(true);
    await markAllNotificationAsRead();
    setLoading(false);
  }

  return (
    <div
      className="relative"
      ref={notficationIconRef}
      onClick={(e) => e.stopPropagation()}
    >
      <BellIcon
        className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-green-600"
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
      />
      {hasUnreadNotifications ? (
        <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500"></div>
      ) : null}

      {dropdownIsOpen && (
        <div
          ref={userMenuRef}
          className={
            "absolute -right-10 top-[calc(100%_+_.5rem)] z-10 w-72 overflow-hidden rounded-lg border bg-white"
          }
        >
          <div className="border-b px-4 py-2 sm:py-4">
            <h4 className="text-lg font-semibold">Notifications</h4>
          </div>
          <div>
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <Link
                  href={notification.link}
                  key={notification._id}
                  onClick={() => setDropdownIsOpen(false)}
                  className={`block px-4 py-1.5 duration-200 hover:bg-muted sm:py-2`}
                >
                  <div className="flex items-start space-x-4 overflow-hidden">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={notification.fromUser.profilePicture}
                        alt={
                          notification.fromUser.firstName + " profile picture"
                        }
                        className="object-cover"
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 space-y-1 ${notification.read ? "opacity-60" : ""}`}
                    >
                      <p className="truncate text-sm">
                        {getNotificationMessage(notification)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getDuration(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-4 text-accent-gray-300">
                You don&apos;t have any notifications yet. When something comes
                up, you&apos;ll see it here!
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t p-2 sm:p-4">
            <Button
              variant={"outline"}
              onClick={handleMarkAllAsRead}
              disabled={loading || !hasUnreadNotifications}
              className={`flex-1 hover:border-green-600 hover:bg-green-600 hover:text-white ${loading ? "bg-accent-gray-100" : ""}`}
            >
              Mark as read
            </Button>

            <Link
              onClick={() => setDropdownIsOpen(false)}
              href={"/dashboard/notifications"}
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
