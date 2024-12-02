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
}: {
  liveClass: GroupClassType;
  forAthlete?: boolean;
  isPurchased?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const data = await purchaseCourse(liveClass._id);
    if (data?.error) {
      console.log(data?.error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row border rounded-lg p-3 sm:p-4">
        <div
          className={`relative overflow-hidden rounded-md md:w-[33%] aspect-video md:aspect-[1.5] bg-zinc-300 ${
            imageLoaded ? "" : "animate-pulse"
          }`}
        >
          <Image
            src={liveClass.thumbnail}
            alt={liveClass.title + " thumbnail"}
            className={`w-full h-full object-cover duration-200 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            fill
            sizes="(max-width: 768px) 720px, 320px"
          />
        </div>
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
                    .map(
                      (student) => student.firstName + " " + student.lastName
                    )
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
                  : liveClass.skillLevels
                      .map((level) => level[0].toUpperCase() + level.slice(1))
                      .join(" and ")}
              </span>
            </div>
            {liveClass.isRecurring && (
              <div className="flex items-start text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
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
          <div className="flex flex-col min-[360px]:flex-row min-[360px]:items-center justify-between mt-4 gap-2">
            <span className="text-xl font-bold">${liveClass.price}</span>
            {forAthlete ? (
              isPurchased ? (
                <Link
                  href={`/dashboard/group-classes`}
                  className="bg-green-500 hover:bg-green-600 duration-200 whitespace-nowrap text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  View Schedule
                </Link>
              ) : (
                <form onSubmit={handlePurchaseCourse}>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 duration-200 text-white"
                  >
                    {loading ? "Processing..." : "Buy Now"}
                  </Button>
                </form>
              )
            ) : (
              <div className="flex items-center gap-4 max-[360px]:w-full">
                <Link
                  href={`/dashboard/group-classes/courses/${liveClass._id}/edit`}
                  className="bg-green-500 hover:bg-green-600 duration-200 flex-1 whitespace-nowrap text-white px-4 py-2 rounded-md text-sm font-medium"
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
