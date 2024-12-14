import { BellIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getFullname } from "@/lib/utils";
import { UserType } from "@/db/models/User";
import Link from "next/link";

type NotificationType = {
  _id: number;
  type: "goal" | "evaluation" | "team" | "session";
  time: string;
  read: boolean;
  fromUser: UserType;
  toUser: UserType;
  link: string;
};

const notifications: NotificationType[] = [
  {
    _id: 1,
    type: "team",
    time: "5m ago",
    read: false,
    fromUser: {
      firstName: "John",
      lastName: "Doe",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    toUser: {
      firstName: "David",
      lastName: "Smith",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    link: "/dashboard/team-members",
  },
  {
    _id: 2,
    type: "evaluation",
    time: "1h ago",
    read: false,
    fromUser: {
      firstName: "John",
      lastName: "Doe",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    toUser: {
      firstName: "David",
      lastName: "Smith",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    link: "/dashboard/athlete-evaluation",
  },
  {
    _id: 3,
    type: "goal",
    time: "2h ago",
    read: false,
    fromUser: {
      firstName: "John",
      lastName: "Doe",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    toUser: {
      firstName: "David",
      lastName: "Smith",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    link: "/dashboard/goal-setting",
  },
  {
    _id: 5,
    type: "session",
    time: "1d ago",
    read: true,
    fromUser: {
      firstName: "John",
      lastName: "Doe",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    toUser: {
      firstName: "David",
      lastName: "Smith",
      profilePicture: "/placeholder-profile-picture.png",
    } as UserType,
    link: "/dashboard/goal-setting",
  },
];

export default function DashboardNotificationIcon() {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const [notficationIconRef] = useClickOutside(() => setDropdownIsOpen(false));

  function getNotificationMessage(notification: NotificationType) {
    switch (notification.type) {
      case "goal":
        return `${getFullname(notification.fromUser)} achieved their goal`;

      case "evaluation":
        return `Evaluation due for ${getFullname(notification.fromUser)}`;

      case "team":
        return `${getFullname(notification.fromUser)} joined your team`;

      case "session":
        return `Upcoming session: Goal Setting`;

      default:
        break;
    }
  }

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
          <div className="border-b p-2 sm:p-4">
            <h4 className="text-lg font-semibold">Notifications</h4>
          </div>
          <div>
            {notifications.map((notification) => (
              <Link
                href={notification.link}
                key={notification._id}
                className={`block px-4 py-2 hover:bg-muted sm:py-3 ${notification.read ? "opacity-60" : ""}`}
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
                      {notification.time}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t p-2 sm:p-4">
            <Link
              href={"/dashboard/notifications"}
              className="block w-full rounded-md border px-4 py-2 text-center text-sm font-medium text-primary duration-200 hover:bg-primary/90 hover:text-primary-foreground"
            >
              See All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
