import connectDB from "@/db/connectDB";
import Order, { OrderType } from "@/db/models/Order";
import "@/db/models/GroupClass";

export async function fetchUserOrders(userId: string) {
  try {
    await connectDB();
    const userOrders: OrderType[] = JSON.parse(
      JSON.stringify(
        await Order.find({ user: userId })
          .populate({ path: "user", select: "_id" })
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

export async function fetchUserOrderCourse(userId: string, courseId: string) {
  try {
    await connectDB();
    const userOrder: OrderType = JSON.parse(
      JSON.stringify(
        await Order.findOne({ user: userId, course: courseId })
          .populate({ path: "user", select: "_id" })
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
