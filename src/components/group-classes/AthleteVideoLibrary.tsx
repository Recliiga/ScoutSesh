"use client";
import React from "react";
import { PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { OrderType } from "@/db/models/Order";

export default function AthleteVideoLibrary({
  orders,
}: {
  orders: OrderType[];
}) {
  console.log(orders);
  return (
    <main className="flex-1 w-[90%] max-w-7xl mx-auto flex flex-col justify-between py-4">
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold mb-4 sm:mb-6">My Courses</h1>

        <Tabs defaultValue="in-progress" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="in-progress" tabIndex={undefined}>
            <CourseList
              orders={orders.filter(
                (order) => order.completedLessons < order.course.videos.length
              )}
            />
          </TabsContent>
          <TabsContent value="completed" tabIndex={undefined}>
            <CourseList
              orders={orders.filter(
                (order) => order.completedLessons >= order.course.videos.length
              )}
            />
          </TabsContent>
          <TabsContent value="all" tabIndex={undefined}>
            <CourseList orders={orders} />
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <Button variant="outline">Back</Button>
      </div>
    </main>
  );
}

function CourseList({ orders: courses }: { orders: OrderType[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
      {courses.map((order) => (
        <VideoLibraryCourseCard key={order._id} order={order} />
      ))}
    </div>
  );
}

function VideoLibraryCourseCard({ order }: { order: OrderType }) {
  const course = order.course;
  const totalLessons = course.videos.length;
  const completedLessons = order.completedLessons;
  const progress = Math.floor(
    (order.completedLessons / course.videos.length) * 100
  );

  const coaches = course.coaches.map(
    (coach) => coach.firstName + " " + coach.lastName
  );

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="w-full h-48 overflow-hidden relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="480px"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {coaches.join(", ")}
        </p>
        <Progress value={progress} className="mt-auto" />
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>{progress}% complete</span>
          <span>
            {completedLessons}/{totalLessons} lessons
          </span>
        </div>
        <Link
          href={`/dashboard/group-classes/my-classes/${course._id}`}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center rounded-md px-4 py-2 text-sm font-medium"
        >
          {progress === 100 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Completed
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
