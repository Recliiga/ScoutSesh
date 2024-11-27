"use server";

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
    console.log(classData);

    return { error: "null" };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
