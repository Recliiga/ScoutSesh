import React from "react";
import CoachCoursesView from "@/components/group-classes/CoachCoursesViewPage";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchGroupClassesByCoach } from "@/services/groupClassServices";
import { notFound } from "next/navigation";
import AthleteCoursesView from "@/components/group-classes/AthleteCoursesViewPage";
import {
  fetchCourseOrders,
  fetchUserOrders,
} from "@/services/groupClassOrderServices";

export default async function CourseViewPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    const { groupClasses, error } = await fetchGroupClassesByCoach(user._id);
    if (error !== null) notFound();

    const { groupClassOrders, error: orderError } =
      await fetchCourseOrders(groupClasses);
    if (orderError !== null) notFound();

    return (
      <CoachCoursesView
        groupClassOrders={groupClassOrders}
        courses={groupClasses.filter((course) => course.courseType === "video")}
        liveClasses={groupClasses.filter(
          (course) => course.courseType === "live",
        )}
      />
    );
  }

  if (user.role === "Athlete") {
    if (!user.organization)
      return (
        <div className="flex-center flex-1">
          You are not connected to an organization yet
        </div>
      );

    const { groupClasses, error } = await fetchGroupClassesByCoach(
      String(user.organization.user),
    );
    if (error !== null) throw new Error(error);

    const { groupClassOrders, error: groupClassOrderError } =
      await fetchCourseOrders(groupClasses);
    if (groupClassOrderError !== null) notFound();

    const { userOrders, error: orderError } = await fetchUserOrders(user._id);
    if (orderError !== null) throw new Error(orderError);

    return (
      <AthleteCoursesView
        groupClassOrders={groupClassOrders}
        userId={user._id}
        userOrders={userOrders}
        courses={groupClasses.filter((course) => course.courseType === "video")}
        liveClasses={groupClasses.filter(
          (course) => course.courseType === "live",
        )}
      />
    );
  }
}
