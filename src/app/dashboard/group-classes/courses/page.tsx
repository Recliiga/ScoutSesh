import React from "react";
import { Button } from "@/components/ui/button";
import LiveClassCard from "@/components/group-classes/LiveClassCard";
import CourseCard from "@/components/group-classes/CourseCard";

export type CourseType = {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  students: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  }[];
  numberOfLessons: number;
  averageDuration: number;
  skillLevels: string[];
  price: number;
  spots: number;
  createdAt: string;
  isRecurring: boolean;
};

const courses: CourseType[] = [
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
    averageDuration: 45,
    skillLevels: ["beginner", "intermediate", "advanced"],
    price: 49.99,
    spots: 8,
    createdAt: "2024 11 24",
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
    averageDuration: 30,
    skillLevels: ["beginner", "intermediate"],
    price: 59.99,
    spots: 8,
    createdAt: "2024 11 24",
    isRecurring: false,
  },
];

type RepeatFrequencyType =
  | "daily"
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "yearly";

export type LiveClassType = CourseType & {
  repeatFrequency: RepeatFrequencyType;
  startDate: string;
  endDate: string;
  time: { hours: number; mins: number };
  duration: number;
};

const liveClass: LiveClassType = {
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
  averageDuration: 60,
  skillLevels: ["beginner", "intermediate", "advanced"],
  isRecurring: true,
  repeatFrequency: "weekly",
  duration: 15,
  startDate: "2024 11 24",
  endDate: "2024 12 01",
  time: { hours: 11, mins: 0 },
  createdAt: "2024 11 24",
  price: 49.99,
  spots: 7,
};

export default function CoachCoursesView() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Classes</h2>
        <div className="grid gap-4">
          <LiveClassCard liveClass={liveClass} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Course Library</h2>
        <div className="grid gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <Button variant="outline">Back</Button>
        <Button className="bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white transition-colors">
          Create New Class
        </Button>
      </div>
    </div>
  );
}
