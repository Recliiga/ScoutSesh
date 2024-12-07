import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";
import { fetchUserOrders } from "./orderServices";

export async function fetchGroupClassesByCoach(coachId: string) {
  try {
    await connectDB();
    const groupClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({ user: coachId })
          .populate("coaches user")
          .sort({ createdAt: -1 })
      )
    );
    return { groupClasses, error: null };
  } catch (err) {
    const error = err as Error;
    return { groupClasses: null, error: error.message };
  }
}

export async function fetchCoachLiveClasses(coachId: string) {
  try {
    await connectDB();
    const liveClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({ user: coachId, courseType: "live" })
          .populate("coaches user")
          .sort({ createdAt: -1 })
      )
    );
    return { liveClasses, error: null };
  } catch (err) {
    const error = err as Error;
    return { liveClasses: null, error: error.message };
  }
}

export async function fetchAthleteLiveClasses(athleteId: string) {
  try {
    await connectDB();
    const { userOrders, error: orderError } = await fetchUserOrders(athleteId);
    if (orderError !== null) throw new Error(orderError);

    const allLiveClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({
          courseType: "live",
        })
          .populate("coaches user")
          .sort({ createdAt: -1 })
      )
    );

    const liveClasses = allLiveClasses.filter((liveClass) =>
      userOrders.some((order) => order.course._id === liveClass._id)
    );

    return { liveClasses, error: null };
  } catch (err) {
    const error = err as Error;
    return { liveClasses: null, error: error.message };
  }
}

export async function fetchGroupClass(classId: string) {
  try {
    await connectDB();
    const groupClass: GroupClassType | null = JSON.parse(
      JSON.stringify(
        await GroupClass.findById(classId).populate("coaches user")
      )
    );
    return { groupClass, error: null };
  } catch (err) {
    const error = err as Error;
    return { groupClass: null, error: error.message };
  }
}
