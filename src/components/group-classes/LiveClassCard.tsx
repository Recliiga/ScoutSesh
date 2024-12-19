"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { CalendarIcon, PersonIcon, TicketIcon } from "./CardIcons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { GroupClassType } from "@/db/models/GroupClass";
import Link from "next/link";
import ModalContainer from "../ModalContainer";
import DeleteGroupClassModal from "../DeleteGroupClassModal";
import { purchaseCourse } from "@/actions/OrderActions";
import { TvMinimalPlay } from "lucide-react";
import { UserType } from "@/db/models/User";
import { getDatesBetween, getFullname } from "@/lib/utils";

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
  isPurchased,
  students,
}: {
  liveClass: GroupClassType;
  forAthlete?: boolean;
  isPurchased?: boolean;
  students: UserType[];
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const remainingSpots = liveClass.totalSpots - students.length;

  const startTime = new Date();
  startTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins),
  );
  const endTime = new Date();
  endTime.setHours(
    Number(liveClass.startTime.hours),
    Number(liveClass.startTime.mins),
  );
  endTime.setMinutes(
    startTime.getMinutes() + (liveClass.duration || liveClass.customDuration),
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
    const lastDigit = monthDate % 10;
    switch (lastDigit) {
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

  async function handlePurchaseCourse(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = await purchaseCourse(
      liveClass._id,
      liveClass.price,
      true,
      liveClass.user._id,
    );
    if (data?.error) {
      console.log(data?.error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border p-3 sm:p-4 md:flex-row">
        <div
          className={`relative aspect-video overflow-hidden rounded-md bg-zinc-300 md:w-[33%] md:min-w-[250px] ${
            imageLoaded ? "" : "animate-pulse"
          }`}
        >
          <Image
            src={liveClass.thumbnail}
            alt={liveClass.title + " thumbnail"}
            className={`h-full w-full object-cover duration-200 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            fill
            sizes="(max-width: 768px) 720px, 320px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-2">
            <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
              <h2 className="text-xl font-bold">{liveClass.title}</h2>
              <Badge
                variant="secondary"
                className="whitespace-nowrap bg-red-500 px-2 text-white hover:bg-red-500"
              >
                Live Class
              </Badge>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {liveClass.description}
            </p>

            {!forAthlete && students.length > 0 && (
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">
                  {students
                    .slice(0, 3)
                    .map((student) => getFullname(student))
                    .join(", ")}
                </span>
              </div>
            )}

            {forAthlete && liveClass.coaches.length > 0 && (
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">
                  {liveClass.coaches
                    .slice(0, 3)
                    .map((coach) => getFullname(coach))
                    .join(", ")}
                </span>
              </div>
            )}

            <div className="flex items-start text-sm text-muted-foreground">
              <TicketIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                {liveClass.isRecurring &&
                  getDatesBetween(
                    liveClass.startDate,
                    liveClass.endDate,
                    liveClass.repeatFrequency,
                  ).length + " Lessons •"}{" "}
                {liveClass.skillLevels.length === 3
                  ? "All Levels"
                  : liveClass.skillLevels
                      .map((level) => level[0].toUpperCase() + level.slice(1))
                      .join(" and ")}
              </span>
            </div>

            {liveClass.isRecurring && (
              <div className="flex items-start text-sm text-muted-foreground">
                <CalendarIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  Every {getDay(liveClass.createdAt)} at {formatTime(startTime)}
                  -{formatTime(endTime)} from {formatDate(startDate)} to{" "}
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
              {!forAthlete && (
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {students.length} enrolled
                  </span>
                  <div className="flex -space-x-2">
                    {students.slice(0, 3).map((student) => (
                      <Avatar
                        key={student._id}
                        className="h-8 w-8 rounded-full border-2 border-white"
                      >
                        <AvatarImage
                          src={student.profilePicture}
                          alt="Participant 1"
                          className="object-cover"
                          sizes="64px"
                        />
                        <AvatarFallback>
                          {student.firstName[0] + student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-2 min-[360px]:flex-row min-[360px]:items-center">
            <span className="text-xl font-bold">${liveClass.price}</span>
            {forAthlete ? (
              isPurchased ? (
                <Link
                  href={`/dashboard/group-classes/live-classes/${liveClass._id}`}
                  className="flex items-center gap-0 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-600"
                >
                  <TvMinimalPlay className="mr-2 h-4 w-4" />
                  Join Now
                </Link>
              ) : (
                <form onSubmit={handlePurchaseCourse}>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="bg-green-500 text-white duration-200 hover:bg-green-600"
                  >
                    {loading ? "Processing..." : "Buy Now"}
                  </Button>
                </form>
              )
            ) : (
              <div className="flex items-center gap-4 max-[360px]:w-full">
                <Link
                  href={`/dashboard/group-classes/courses/${liveClass._id}/edit`}
                  className="flex-1 whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-600"
                >
                  Edit Course
                </Link>
                <Button
                  variant={"outline"}
                  className="flex-1"
                  onClick={() => setDeleteModal(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalContainer
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
      >
        <DeleteGroupClassModal
          open={deleteModal}
          closeModal={() => setDeleteModal(false)}
          course={liveClass}
        />
      </ModalContainer>
    </>
  );
}
