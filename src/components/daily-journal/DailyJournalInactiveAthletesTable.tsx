import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DailyJournalAthleteType } from "../dashboard-pages/CoachDailyJournalPage";
import { formatDate } from "@/lib/utils";

export default function DailyJournalInactiveAthletesTable({
  athletes,
}: {
  athletes: (DailyJournalAthleteType & { daysSinceLastUpdate: number })[];
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="sticky top-0 bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Athlete
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Last Entry Date
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
            <span className="whitespace-nowrap">Days Since</span>{" "}
            <span className="whitespace-nowrap">Last Update</span>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {athletes.map((athlete) => (
          <tr key={athlete._id}>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={athlete.profilePicture}
                      alt={athlete.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {athlete.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {athlete.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm text-gray-900">
                {formatDate(athlete.lastUpdate)}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
              <div className="text-sm text-gray-900">
                {athlete.daysSinceLastUpdate}
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex space-x-2">
                <Link
                  className="rounded-md border border-green-600 bg-white px-3 py-1.5 text-xs text-green-600 duration-300 hover:bg-green-600 hover:text-white"
                  href={`/dashboard/daily-journal/entries/${athlete._id}`}
                >
                  View Entries
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
