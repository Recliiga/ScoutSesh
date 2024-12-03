import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGroupClassesPage from "@/components/dashboard-pages/CoachGroupClassesPage";
import AthleteGroupClassesPage from "@/components/dashboard-pages/AthleteGroupClassesPage";
import { fetchLiveClassesByCoach } from "@/services/groupClassServices";
import { getDatesBetween } from "@/lib/utils";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGroupClassesPage />;
  }

  const { groupClasses, error } = await fetchLiveClassesByCoach(user._id);
  if (error !== null) throw new Error(error);

  const courses = groupClasses.map((groupClass) => ({
    _id: groupClass._id,
    title: groupClass.title,
    coach: user,
    sessions: getDatesBetween(
      groupClass.startDate,
      groupClass.endDate,
      groupClass.repeatFrequency
    ),
    time: groupClass.startTime,
  }));

  return <CoachGroupClassesPage courses={courses} />;
}
