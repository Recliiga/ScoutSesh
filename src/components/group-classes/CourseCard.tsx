import { CourseType } from "@/app/dashboard/group-classes/courses/page";
import Image from "next/image";
import React from "react";
import { PersonIcon, TicketIcon } from "./CardIcons";
import { Button } from "../ui/button";

export default function CourseCard({ course }: { course: CourseType }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
      <Image
        src={course.thumbnail}
        alt="Course Image"
        className="w-full md:w-48 aspect-video md:aspect-[1.5] object-cover rounded"
        width="200"
        height="150"
      />
      <div className=" flex flex-col justify-between flex-grow">
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
              {course.numberOfLessons} Lessons • {course.averageDuration} mins /
              Lesson •{" "}
              {course.skillLevels.length === 3
                ? "All Levels"
                : course.skillLevels.join(" and ")}
            </span>
          </div>
          <div className="text-sm text-green-500">Available for Purchase</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">${course.price}</span>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Edit Course
          </Button>
        </div>
      </div>
    </div>
  );
}
