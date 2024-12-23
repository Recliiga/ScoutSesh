"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDuration, getNotificationMessage } from "@/lib/utils";
import { NotificationEntryType } from "@/db/models/NotificationEntry";
import { Button } from "./ui/button";
import { markNotificationsAsRead } from "@/actions/notificationActions";

export default function NotificationList({
  notifications,
  userId,
}: {
  notifications: NotificationEntryType[];
  userId: string;
}) {
  const [filter, setFilter] = useState("all");
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.type === filter);

  const hasUnreadNotifications = notifications.some(
    (notif) => notif.read === false,
  );

  async function handleMarkAsRead() {
    setLoading(true);
    await markNotificationsAsRead(userId);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-x-4 border-b p-4 sm:p-6">
        <CardTitle className="w-fit">Recent Notifications</CardTitle>
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-sm">
            Filter:
          </label>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border p-2 py-1.5 text-sm"
          >
            <option value="all">All</option>
            <option value="goal">Goal Setting</option>
            <option value="evaluation">Athlete Evaluation</option>
            <option value="team">Team Members</option>
            <option value="liveClass">Live Classes</option>
            <option value="course">Video Courses</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Button
          variant={"outline"}
          className="m-4 flex-1 hover:border-green-600 hover:bg-green-600 hover:text-white"
          disabled={!hasUnreadNotifications || loading}
          onClick={handleMarkAsRead}
        >
          Mark all as read
        </Button>
        {notifications.length ? (
          filteredNotifications.map((notification) => (
            <Link
              href={notification.link}
              key={notification._id}
              className={`block px-4 py-2 hover:bg-muted sm:py-3`}
            >
              <div className="flex items-start space-x-4 overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={notification.fromUser.profilePicture}
                    alt={notification.fromUser.firstName + " profile picture"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {notification.fromUser.firstName[0]}
                    {notification.fromUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 space-y-1 ${notification.read ? "opacity-60" : ""}`}
                >
                  <p className="truncate text-sm">
                    {getNotificationMessage(notification, true)}
                  </p>
                  {domLoaded ? (
                    <p className="text-xs text-muted-foreground">
                      {getDuration(notification.createdAt)}
                    </p>
                  ) : (
                    <div className="h-3 w-20 animate-pulse rounded-full bg-zinc-300"></div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 pt-0 text-sm text-zinc-400">
            You&apos;re all set, no new notifications to check right now.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
