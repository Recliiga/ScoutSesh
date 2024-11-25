import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DailyJournalAthleteType } from "../dashboard-pages/CoachDailyJournalPage";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function DailyJournalInactiveAthletesTable({
  athletes,
}: {
  athletes: (DailyJournalAthleteType & { daysSinceLastUpdate: number })[];
}) {
  return (
    <table className="divide-y divide-gray-200 min-w-full">
      <thead className="top-0 sticky bg-gray-50">
        <tr>
          <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
            Athlete
          </th>
          <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
            Last Entry Date
          </th>
          <th className="px-6 py-3 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
            <span className="whitespace-nowrap">Days Since</span>{" "}
            <span className="whitespace-nowrap">Last Update</span>
          </th>
          <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {athletes.map((athlete) => (
          <tr key={athlete._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <Avatar className="w-10 h-10">
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
                  <div className="font-medium text-gray-900 text-sm">
                    {athlete.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-gray-900 text-sm">
                {formatDate(new Date(athlete.lastUpdate))}
              </div>
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              <div className="text-gray-900 text-sm">
                {athlete.daysSinceLastUpdate}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <Link
                  className="border-green-600 bg-white hover:bg-green-600 px-3 py-1.5 border rounded-md text-green-600 text-xs hover:text-white duration-300"
                  href={`/dashboard/daily-journal/entries/${athlete._id}`}
                >
                  View Entries
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                >
                  <MessageSquare className="mr-2 w-4 h-4" />
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
