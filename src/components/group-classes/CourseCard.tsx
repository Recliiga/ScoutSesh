"use client";
import { GroupClassType, VideoType } from "@/db/models/GroupClass";
import Image from "next/image";
import React, { useState } from "react";
import { PersonIcon, TicketIcon } from "./CardIcons";
import Link from "next/link";
import { Button } from "../ui/button";
import ModalContainer from "../ModalContainer";
import DeleteGroupClassModal from "../DeleteGroupClassModal";
import { purchaseCourse } from "@/actions/groupClassOrderActions";
import { PlayCircle } from "lucide-react";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";

function getAverageVideoLength(videos: VideoType[]) {
  let suffix = "secs";
  const totalVideoLength = videos.reduce(
    (prev, curr) => prev + curr.duration,
    0,
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
  isPurchased,
  students,
}: {
  course: GroupClassType;
  forAthlete?: boolean;
  isPurchased?: boolean;
  students: UserType[];
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const averageVideoLength = getAverageVideoLength(course.videos);

  async function handlePurchaseCourse(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await purchaseCourse(course._id, course.price, course.user._id, false);
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border p-3 sm:p-4 md:flex-row">
        <div
          className={`relative aspect-video overflow-hidden rounded-md bg-zinc-300 md:w-[33%] ${
            imageLoaded ? "" : "animate-pulse"
          }`}
        >
          <Image
            src={course.thumbnail}
            alt={course.title + " thumbnail"}
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
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {course.description}
            </p>
            {!forAthlete && students.length > 0 && (
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {students
                    .slice(0, 3)
                    .map((student) => getFullname(student))
                    .join(", ")}
                </span>
              </div>
            )}
            {forAthlete && course.coaches.length > 0 && (
              <div className="flex items-start text-sm text-muted-foreground">
                <PersonIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  {course.coaches
                    .slice(0, 3)
                    .map((coach) => getFullname(coach))
                    .join(", ")}
                </span>
              </div>
            )}
            <div className="flex items-start text-sm text-muted-foreground">
              <TicketIcon className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
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
          <div className="mt-4 flex flex-col justify-between gap-2 min-[360px]:flex-row min-[360px]:items-center">
            <span className="text-xl font-bold">${course.price}</span>
            {forAthlete ? (
              isPurchased ? (
                <Link
                  href={`/dashboard/group-classes/my-classes/${course._id}`}
                  className="flex items-center whitespace-nowrap rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-600"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue Learning
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
                  href={`/dashboard/group-classes/courses/${course._id}/edit`}
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
          course={course}
        />
      </ModalContainer>
    </>
  );
}
