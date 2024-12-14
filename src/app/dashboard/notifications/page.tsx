import React from "react";
import { UserType } from "@/db/models/User";
import { NotificationType } from "@/components/DashboardNotificationIcon";
import BackButton from "@/components/dashboard/BackButton";
import NotificationList from "@/components/NotificationList";

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
    createdAt: new Date("2022-12-23"),
    updatedAt: new Date("2022-12-23"),
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
    createdAt: new Date("2022-12-23"),
    updatedAt: new Date("2022-12-23"),
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
    createdAt: new Date("2022-12-23"),
    updatedAt: new Date("2022-12-23"),
  },
  {
    _id: 5,
    type: "class",
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
    createdAt: new Date("2022-12-23"),
    updatedAt: new Date("2022-12-23"),
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 bg-gray-100">
      <div className="mx-auto w-[90%] max-w-7xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600 sm:text-3xl">
            All Notifications
          </h1>
          <BackButton className="hover:bg-white hover:text-green-600" />
        </div>
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
