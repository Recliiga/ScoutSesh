import React from "react";
import CoachCoursesView from "@/components/group-classes/CoachCoursesViewPage";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchGroupClassesByCoach } from "@/services/groupClassServices";
import { notFound } from "next/navigation";
import AthleteCoursesView from "@/components/group-classes/AthleteCoursesViewPage";
import { fetchUserOrders } from "@/services/orderServices";

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

  if (user.role === "Athlete") {
    const { groupClasses, error } = await fetchGroupClassesByCoach(
      String(user.organization!.user)
    );
    if (error !== null) throw new Error(error);

    const { userOrders, error: orderError } = await fetchUserOrders(user._id);
    if (orderError !== null) throw new Error(orderError);

    return (
      <AthleteCoursesView
        userId={user._id}
        userOrders={userOrders}
        courses={groupClasses.filter((course) => course.courseType === "video")}
        liveClasses={groupClasses.filter(
          (course) => course.courseType === "live"
        )}
      />
    );
  }
}
