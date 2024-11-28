"use server";

import GroupClass from "@/db/models/GroupClass";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

type ClassDataType = {
  title: string;
  description: string;
  thumbnail: string;
  coaches: string[];
  courseType?: string;
  startDate?: Date;
  endDate?: Date;
  startTime: { hours: string; mins: string };
  duration?: string;
  isRecurring?: boolean;
  totalSpots?: string;
  skillLevels: string[];
  videoLessons?: string[];
  price: string;
};

export async function createClass(classData: ClassDataType) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    const newGroupClass = JSON.parse(
      JSON.stringify(await GroupClass.create({ ...classData, user: userId }))
    );
    return { newGroupClass, error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
