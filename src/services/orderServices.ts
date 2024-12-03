import connectDB from "@/db/connectDB";
import Order, { OrderType } from "@/db/models/Order";
import "@/db/models/GroupClass";
import { GroupClassType } from "@/db/models/GroupClass";

export async function fetchUserOrders(userId: string) {
  try {
    await connectDB();
    const userOrders: OrderType[] = JSON.parse(
      JSON.stringify(
        await Order.find({ user: userId })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "title videos thumbnail coaches",
            populate: { path: "coaches", select: "firstName lastName" },
          })
      )
    );
    return { userOrders, error: null };
  } catch (error) {
    return { userOrders: null, error: (error as Error).message };
  }
}

export async function fetchCourseOrders(courses: GroupClassType[]) {
  try {
    await connectDB();
    const groupClassOrders: OrderType[] = JSON.parse(
      JSON.stringify(
        await Order.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "title videos thumbnail coaches",
            populate: { path: "coaches", select: "firstName lastName" },
          })
      )
    );

    return {
      groupClassOrders: groupClassOrders.filter((order) =>
        courses.some((course) => course._id === order.course._id)
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
    const userOrder: OrderType = JSON.parse(
      JSON.stringify(
        await Order.findOne({ user: userId, course: courseId })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
          })
      )
    );
    return { userOrder, error: null };
  } catch (error) {
    return { userOrder: null, error: (error as Error).message };
  }
}
