import React from "react";
import { GroupClassType } from "@/db/models/GroupClass";
import CoachCoursesView from "@/components/group-classes/CoachCoursesViewPage";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchGroupClassesByCoach } from "@/services/groupClassServices";
import { notFound } from "next/navigation";

const courses: GroupClassType[] = [
  {
    _id: "1",
    title: "Mastering Ice Hockey: From Beginner to Pro",
    thumbnail: "/placeholder.svg",
    description:
      "Comprehensive guide to developing essential ice hockey skills, tactics, and strategies. Suitable for all levels.",
    students: [
      {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        profilePicture: "placeholder-profile-picture.png",
      },
      {
        _id: "2",
        firstName: "Jane",
        lastName: "Smith",
        profilePicture: "placeholder-profile-picture.png",
      },
    ],
    numberOfLessons: 8,
    skillLevels: ["beginner", "intermediate", "advanced"],
    price: 49.99,
    spots: 8,
    createdAt: new Date("2024 11 24"),
    updatedAt: new Date("2024 11 24"),
    isRecurring: false,
  },
  {
    _id: "2",
    title: "Mastering Ice Hockey: From Beginner to Pro",
    thumbnail: "/placeholder.svg",
    description:
      "Elevate your puck control and stick handling skills to dominate on the ice. Suitable for all positions.",
    students: [
      {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        profilePicture: "placeholder-profile-picture.png",
      },
      {
        _id: "2",
        firstName: "Alex",
        lastName: "Nguyen",
        profilePicture: "placeholder-profile-picture.png",
      },
      {
        _id: "3",
        firstName: "Emily",
        lastName: "Chen",
        profilePicture: "placeholder-profile-picture.png",
      },
    ],
    numberOfLessons: 12,
    skillLevels: ["beginner", "intermediate"],
    price: 59.99,
    spots: 8,
    createdAt: new Date("2024 11 24"),
    updatedAt: new Date("2024 11 24"),
    isRecurring: false,
  },
] as GroupClassType[];

const liveClasses: GroupClassType[] = [
  {
    _id: "1",
    title: "Mastering Ice Hockey Goaltending",
    thumbnail: "/placeholder.svg",
    description:
      "Dive deep into the art of goaltending, from positioning and reflexes to puck-handling and mental preparation.",
    students: [
      {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        profilePicture: "placeholder-profile-picture.png",
      },
      {
        _id: "2",
        firstName: "Sarah",
        lastName: "Lee",
        profilePicture: "placeholder-profile-picture.png",
      },
      {
        _id: "3",
        firstName: "Mike",
        lastName: "Johnson",
        profilePicture: "placeholder-profile-picture.png",
      },
    ],
    numberOfLessons: 10,
    skillLevels: ["beginner", "intermediate", "advanced"],
    isRecurring: true,
    repeatFrequency: "weekly",
    duration: 15,
    startDate: new Date("2024 11 24"),
    endDate: new Date("2024 12 01"),
    time: { hours: 11, mins: 0 },
    createdAt: new Date("2024 11 24"),
    updatedAt: new Date("2024 11 24"),
    price: 49.99,
    spots: 7,
  },
] as GroupClassType[];

export default async function CourseViewPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    const { groupClasses, error } = await fetchGroupClassesByCoach(user._id);
    if (error !== null) notFound();

    return (
      <CoachCoursesView
        courses={groupClasses.filter((course) => course.courseType === "video")}
        liveClasses={groupClasses.filter(
          (course) => course.courseType === "live"
        )}
      />
    );
  }
}
