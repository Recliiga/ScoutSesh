"use client";
import React, { useState } from "react";
import { PlayCircle, CheckCircle, X, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

type CourseType = {
  id: number;
  title: string;
  instructor: string;
  image: string;
  videoUrl: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
};

const inProgressCourses = [
  {
    id: 1,
    title: "Mastering Ice Hockey: From Beginner to Pro",
    instructor: "John Doe",
    image: "/placeholder.svg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    progress: 60,
    completedLessons: 5,
    totalLessons: 8,
  },
  {
    id: 2,
    title: "Advanced Stick Handling Techniques",
    instructor: "Jane Smith",
    image: "/placeholder.svg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    progress: 30,
    completedLessons: 3,
    totalLessons: 10,
  },
];

const completedCourses = [
  {
    id: 3,
    title: "Ice Hockey Goaltending Fundamentals",
    instructor: "Mike Johnson",
    image: "/placeholder.svg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    progress: 100,
    completedLessons: 6,
    totalLessons: 6,
  },
];

export default function MyClassesPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);

  return (
    <div className="flex-1 w-[90%] max-w-7xl mx-auto flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Courses</h1>

          <Tabs defaultValue="in-progress" className="mb-6">
            <TabsList>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="in-progress">
              <CourseList
                courses={inProgressCourses}
                onSelectCourse={setSelectedCourse}
              />
            </TabsContent>
            <TabsContent value="completed">
              <CourseList
                courses={completedCourses}
                onSelectCourse={setSelectedCourse}
              />
            </TabsContent>
            <TabsContent value="all">
              <CourseList
                courses={[...inProgressCourses, ...completedCourses]}
                onSelectCourse={setSelectedCourse}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div className="mt-8 px-6">
        <Button variant="outline">Back</Button>
      </div>

      <VideoPlayer
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}

function CourseList({
  courses,
  onSelectCourse,
}: {
  courses: CourseType[];
  onSelectCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <VideoLibraryCourseCard
          key={course.id}
          course={course}
          onSelectCourse={onSelectCourse}
        />
      ))}
    </div>
  );
}

function VideoLibraryCourseCard({
  course,
  onSelectCourse,
}: {
  course: CourseType;
  onSelectCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="w-full h-48 overflow-hidden relative">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
        <Progress value={course.progress} className="mt-auto" />
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>{course.progress}% complete</span>
          <span>
            {course.completedLessons}/{course.totalLessons} lessons
          </span>
        </div>
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={() => onSelectCourse(course)}
        >
          {course.progress === 100 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Completed
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function VideoPlayer({
  course,
  onClose,
}: {
  course: CourseType | null;
  onClose(): void;
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!course) return null;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Dialog open={!!course} onOpenChange={() => onClose()}>
      <DialogContent
        className={`p-0 ${isFullScreen ? "max-w-full h-full" : "max-w-3xl"}`}
      >
        <div
          className={`relative ${
            isFullScreen ? "w-full h-full" : "w-full aspect-video"
          }`}
        >
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            src={course.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
              onClick={toggleFullScreen}
            >
              {isFullScreen ? (
                <Minimize className="h-6 w-6" />
              ) : (
                <Maximize className="h-6 w-6" />
              )}
            </Button>
            <Button
              className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {!isFullScreen && (
          <div className="p-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600">{course.instructor}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
