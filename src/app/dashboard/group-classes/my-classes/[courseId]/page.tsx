import CourseVideoPage from "@/components/group-classes/CourseVideoPage";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUserOrderCourse } from "@/services/groupClassOrderServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function CourseViewPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  const { courseId } = await params;
  const { userOrder, error: orderError } = await fetchUserOrderCourse(
    user._id,
    courseId,
  );
  if (orderError !== null) throw new Error(orderError);

  return (
    <CourseVideoPage
      course={userOrder.course}
      completedLessons={userOrder.completedLessons}
    />
  );
}
