import { UserType } from "@/db/models/User";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type NextCoachingSessionType = {
  _id: string;
  title: string;
  nextSessionStartDate: Date;
  nextSessionEndDate: Date;
  attendingAthletes: UserType[];
} | null;

export default function NextCoachingSession({
  nextCoachingSession,
}: {
  nextCoachingSession: NextCoachingSessionType;
}) {
  return (
    <div className="w-full flex-1">
      <h2 className="mb-4 text-xl font-semibold">Your Next Coaching Session</h2>
      {nextCoachingSession ? (
        <>
          <p className="mb-2 text-lg">{nextCoachingSession.title}</p>
          <p className="text-md mb-4 text-gray-600">
            {format(nextCoachingSession.nextSessionStartDate, "LLLL do")},{" "}
            {format(nextCoachingSession.nextSessionStartDate, "p")}-{" "}
            {format(nextCoachingSession.nextSessionEndDate, "p")}
          </p>
          <h3 className="mb-2 text-lg font-semibold">Attending Athletes</h3>
          <div className="w-full">
            {nextCoachingSession.attendingAthletes.length > 0 ? (
              <div className="grid grid-cols-5 gap-1">
                {nextCoachingSession.attendingAthletes.map((athlete, index) => (
                  <Image
                    key={index}
                    src={athlete.profilePicture}
                    alt={`${athlete.firstName}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full"
                    title={athlete.firstName}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No athletes attending</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-muted-foreground">
          You do not have an upcomming coaching session
        </p>
      )}
      <Link
        href={"/dashboard/group-classes"}
        className="mt-4 block w-full rounded-md border px-4 py-2 text-center text-sm font-medium duration-200 hover:bg-accent-gray-100 md:w-fit"
      >
        All Group Classes
      </Link>
    </div>
  );
}
