import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGroupClassesPage from "@/components/dashboard-pages/CoachGroupClassesPage";
import {
  fetchAthleteLiveClasses,
  fetchCoachLiveClasses,
} from "@/services/groupClassServices";
import { getDatesBetween } from "@/lib/utils";
import AthleteGroupClassesPage from "@/components/dashboard-pages/AthleteGroupClassesPage";

export default async function GroupClassesPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    const { liveClasses, error } = await fetchAthleteLiveClasses(user._id);
    if (error !== null) throw new Error(error);

    const courses = liveClasses.map((liveClass) => ({
      _id: liveClass._id,
      title: liveClass.title,
      coach: user,
      sessions: getDatesBetween(
        liveClass.startDate,
        liveClass.endDate,
        liveClass.repeatFrequency
      ),
      time: liveClass.startTime,
    }));

    return <AthleteGroupClassesPage courses={courses} />;
  }

  const { liveClasses, error } = await fetchCoachLiveClasses(user._id);
  if (error !== null) throw new Error(error);

  const courses = liveClasses.map((liveClass) => ({
    _id: liveClass._id,
    title: liveClass.title,
    coach: user,
    sessions: getDatesBetween(
      liveClass.startDate,
      liveClass.endDate,
      liveClass.repeatFrequency
    ),
    time: liveClass.startTime,
  }));

  return <CoachGroupClassesPage courses={courses} />;
}
