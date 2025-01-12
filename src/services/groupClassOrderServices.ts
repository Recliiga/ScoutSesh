import connectDB from "@/db/connectDB";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import "@/db/models/GroupClass";
import { GroupClassType } from "@/db/models/GroupClass";

export async function fetchUserOrders(userId: string) {
  try {
    await connectDB();
    const userOrders: GroupClassOrderType[] = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.find({ user: userId })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "title videos thumbnail coaches",
            populate: { path: "coaches", select: "firstName lastName" },
          })
          .populate("completedLessons"),
      ),
    );
    return { userOrders, error: null };
  } catch (error) {
    return { userOrders: null, error: (error as Error).message };
  }
}

export async function fetchUserLiveClassOrders(userId: string) {
  try {
    await connectDB();
    const userOrders: GroupClassOrderType[] = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.find({ user: userId })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "title videos thumbnail coaches courseType",
            populate: { path: "coaches", select: "firstName lastName" },
          })
          .populate("completedLessons"),
      ),
    );

    const liveClassOrders = userOrders.filter(
      (order) => order.course.courseType === "video",
    );
    return { liveClassOrders, error: null };
  } catch (error) {
    return { liveClassOrders: null, error: (error as Error).message };
  }
}

export async function fetchCourseOrders(courses: GroupClassType[]) {
  try {
    await connectDB();
    const groupClassOrders: GroupClassOrderType[] = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "title videos thumbnail coaches",
            populate: { path: "coaches", select: "firstName lastName" },
          })
          .populate("completedLessons"),
      ),
    );

    return {
      groupClassOrders: groupClassOrders.filter((order) =>
        courses.some((course) => course._id === order.course?._id),
      ),
      error: null,
    };
  } catch (error) {
    return { groupClassOrders: null, error: (error as Error).message };
  }
}

export async function fetchUserOrderCourse(userId: string, courseId: string) {
  try {
    await connectDB();
    const userOrder: GroupClassOrderType = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.findOne({ user: userId, course: courseId })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
          })
          .populate("completedLessons"),
      ),
    );
    return { userOrder, error: null };
  } catch (error) {
    return { userOrder: null, error: (error as Error).message };
  }
}
