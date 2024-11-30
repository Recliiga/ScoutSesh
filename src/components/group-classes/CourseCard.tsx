"use client";
import { GroupClassType, VideoType } from "@/db/models/GroupClass";
import Image from "next/image";
import React, { useState } from "react";
import { PersonIcon, TicketIcon } from "./CardIcons";
import Link from "next/link";

function getAverageVideoLength(videos: VideoType[]) {
  let suffix = "secs";
  const totalVideoLength = videos.reduce(
    (prev, curr) => prev + curr.duration,
    0
  );
  let averageVideoLength = totalVideoLength / videos.length;
  if (averageVideoLength / 60 > 1) {
    suffix = "mins";
    averageVideoLength /= 60;
  }
  if (averageVideoLength / 60 > 1) {
    suffix = "hours";
    averageVideoLength /= 60;
  }

  return Math.round(averageVideoLength) + " " + suffix;
}

export default function CourseCard({
  course,
  forAthlete,
}: {
  course: GroupClassType;
  forAthlete?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const averageVideoLength = getAverageVideoLength(course.videos);

  return (
    <div className="flex flex-col md:flex-row gap-4 border rounded-lg p-3 sm:p-4">
      <div
        className={`relative overflow-hidden rounded-md md:w-[30%] aspect-video md:aspect-[1.5] bg-zinc-300 ${
          imageLoaded ? "" : "animate-pulse"
        }`}
      >
        <Image
          src={course.thumbnail}
          alt={course.title + " thumbnail"}
          className={`w-full h-full object-cover duration-200 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          fill
          sizes="(max-width: 768px) 720px, 240px"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-muted-foreground">{course.description}</p>
          {course.students.length > 0 && (
            <div className="flex items-start text-sm text-muted-foreground">
              <PersonIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
              <span>
                {course.students
                  .slice(0, 3)
                  .map((student) => student.firstName + " " + student.lastName)
                  .join(", ")}
              </span>
            </div>
          )}
          <div className="flex items-start text-sm text-muted-foreground">
            <TicketIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span>
              {course.videos.length} Lesson{course.videos.length > 1 && "s"} •{" "}
              {averageVideoLength} / Lesson •{" "}
              {course.skillLevels.length === 3
                ? "All Levels"
                : course.skillLevels
                    .map((level) => level[0].toUpperCase() + level.slice(1))
                    .join(" and ")}
            </span>
          </div>
          <div className="text-sm text-green-500">Available for Purchase</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">${course.price}</span>
          {forAthlete ? (
            <Link
              href={`#`}
              className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Buy Now
            </Link>
          ) : (
            <Link
              href={`/dashboard/group-classes/courses/${course._id}/edit`}
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
