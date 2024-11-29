import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { CalendarIcon, PersonIcon, TicketIcon } from "./CardIcons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { GroupClassType } from "@/db/models/GroupClass";
import Link from "next/link";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDay(date: Date) {
  const dayNum = new Date(date).getDay();
  return daysOfTheWeek[dayNum];
}

export default function LiveClassCard({
  liveClass,
  forAthlete,
}: {
  liveClass: GroupClassType;
  forAthlete?: boolean;
}) {
  const remainingSpots = liveClass.totalSpots - liveClass.students.length;

  const startTime = new Date();
  startTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins)
  );
  const endTime = new Date();
  endTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins)
  );
  endTime.setMinutes(
    startTime.getMinutes() + (liveClass.duration || liveClass.customDuration)
  );

  const startDate = new Date(liveClass.startDate);
  const endDate = new Date(liveClass.endDate);

  function formatTime(date: Date) {
    const hours = Number(date.toTimeString().split(":")[0]);
    let suffix = "am";
    if (hours >= 12) suffix = "pm";
    return (
      date.toTimeString().split(":")[0] +
      ":" +
      date.toTimeString().split(":")[1] +
      suffix
    );
  }

  function formatDate(date: Date) {
    let suffix = "st";
    const monthDate = date.getDate();
    switch (monthDate) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;

      default:
        suffix = "th";
        break;
    }

    return monthsOfTheYear[date.getMonth()] + " " + monthDate + suffix;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row border rounded-lg p-4">
      <Image
        src={liveClass.thumbnail}
        alt="Course Image"
        className="w-full md:w-48 aspect-video md:aspect-[1.5] object-cover rounded"
        width="200"
        height="150"
      />
      <div className=" flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-2">
            <h2 className="text-xl font-bold">{liveClass.title}</h2>
            <Badge
              variant="secondary"
              className="bg-red-500 text-white hover:bg-red-500 px-2 "
            >
              Live Class
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {liveClass.description}
          </p>
          {liveClass.students.length > 0 && (
            <div className="flex items-start text-sm text-muted-foreground">
              <PersonIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {liveClass.students
                  .slice(0, 3)
                  .map((student) => student.firstName + " " + student.lastName)
                  .join(", ")}
              </span>
            </div>
          )}
          <div className="flex items-start text-sm text-muted-foreground">
            <TicketIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span>
              {/* {liveClass.numberOfLessons} Lessons • {liveClass.averageDuration}{" "}
              mins / Lesson •{" "} */}
              {liveClass.skillLevels.length === 3
                ? "All Levels"
                : liveClass.skillLevels.join(" and ")}
            </span>
          </div>
          {liveClass.isRecurring && (
            <div className="flex items-start text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
              <span>
                Every {getDay(liveClass.createdAt)} at {formatTime(startTime)}-
                {formatTime(endTime)} from {formatDate(startDate)} to{" "}
                {formatDate(endDate)}
              </span>
            </div>
          )}
          <div>
            <div
              className={`text-sm ${
                remainingSpots > 5 ? "text-green-500" : "text-red-500"
              }`}
            >
              {remainingSpots} Spots Remaining
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground">
                {liveClass.students.length} enrolled
              </span>
              <div className="flex -space-x-2">
                {liveClass.students.map((student) => (
                  <Avatar
                    key={student._id}
                    className="w-6 h-6 border-2 border-white rounded-full"
                  >
                    <AvatarImage
                      src="/placeholder-profile-picture.png"
                      alt="Participant 1"
                    />
                    <AvatarFallback>P1</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">$99.99</span>
          {forAthlete ? (
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Join Now
            </Button>
          ) : (
            <Link
              href={`/dashboard/group-classes/courses/${liveClass._id}/edit`}
              className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Edit Course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
