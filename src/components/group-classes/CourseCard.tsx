import { GroupClassType } from "@/db/models/GroupClass";
import Image from "next/image";
import React from "react";
import { PersonIcon, TicketIcon } from "./CardIcons";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CourseCard({ course }: { course: GroupClassType }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
      <div className="relative overflow-hidden rounded-md md:w-[30%] aspect-video md:aspect-[1.5]">
        <Image
          src={course.thumbnail}
          alt="Course Image"
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-muted-foreground">{course.description}</p>
          <div className="flex items-start text-sm text-muted-foreground">
            <PersonIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span>
              {course.students
                .map((student) => student.firstName + " " + student.lastName)
                .join(", ")}
            </span>
          </div>
          <div className="flex items-start text-sm text-muted-foreground">
            <TicketIcon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
            <span>
              {course.numberOfLessons} Lessons • {45} mins / Lesson •{" "}
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
          <Link
            href={`/dashboard/group-classes/${course._id}/edit`}
            className="bg-green-600 hover:bg-green-700 duration-200 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Edit Course
          </Link>
        </div>
      </div>
    </div>
  );
}
