import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";
import Order, { OrderType } from "@/db/models/Order";
import Organization, { OrganizationType } from "@/db/models/Organization";
import User, { UserType } from "@/db/models/User";

export async function fetchAdminData() {
  try {
    await connectDB();
    const organizations: OrganizationType[] = JSON.parse(
      JSON.stringify(
        await Organization.find().populate({
          path: "user",
          select: "firstName lastName profilePicture",
        }),
      ),
    );

    const users: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find().populate({
          path: "organization",
          select: "name logo",
        }),
      ),
    );

    const groupClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "coaches",
            select: "firstName lastName profilePicture",
            populate: { path: "organization", select: "name" },
          }),
      ),
    );

    const classOrders: OrderType[] = JSON.parse(
      JSON.stringify(
        await Order.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "_id",
          }),
      ),
    );

    const adminData = { users, organizations, groupClasses, classOrders };
    return { adminData, error: null };
  } catch (error) {
    return { adminData: null, error: (error as Error).message };
  }
}
