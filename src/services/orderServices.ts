import connectDB from "@/db/connectDB";
import Order, { OrderType } from "@/db/models/Order";

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
