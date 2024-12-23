import React from "react";
import BackButton from "@/components/dashboard/BackButton";
import NotificationList from "@/components/NotificationList";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchNotifications } from "@/services/notificationEntryServices";

export default async function NotificationsPage() {
  const user = await getSessionFromHeaders();

  const { notifications, error } = await fetchNotifications(user._id);
  if (error !== null) throw new Error(error);

  return (
    <div className="flex-1 bg-gray-100">
      <div className="mx-auto w-[90%] max-w-7xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-600 sm:text-3xl">
            All Notifications
          </h1>
          <BackButton className="hover:bg-white hover:text-green-600" />
        </div>
        <NotificationList notifications={notifications} userId={user._id} />
      </div>
    </div>
  );
}
