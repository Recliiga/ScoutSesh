import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";
import { fetchUserOrders } from "./groupClassOrderServices";
import { getDatesBetween } from "@/lib/utils";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import { UserType } from "@/db/models/User";

export async function fetchGroupClassesByCoach(coachId: string) {
  try {
    await connectDB();
    const groupClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({ user: coachId })
          .populate("coaches user")
          .sort({ createdAt: -1 }),
      ),
    );

    return {
      groupClasses: groupClasses.filter(
        (groupClass) => groupClass.user.status === "Active",
      ),
      error: null,
    };
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
          .sort({ createdAt: -1 }),
      ),
    );
    return { liveClasses, error: null };
  } catch (err) {
    const error = err as Error;
    return { liveClasses: null, error: error.message };
  }
}

export async function fetchNextCoachingSession(coachId: string) {
  try {
    await connectDB();
    const liveClasses: GroupClassType[] = await GroupClass.find({
      user: coachId,
      courseType: "live",
    }).populate("coaches user");

    const liveClassesWithDates = liveClasses
      .map((liveClass) => {
        const dates = getDatesBetween(
          liveClass.startDate,
          liveClass.isRecurring ? liveClass.endDate : liveClass.startDate,
          liveClass.repeatFrequency,
        );

        const sortedDates = dates.sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime(),
        );

        const nextSessionStartDate = sortedDates.reduce<Date | null>(
          (nextDate, currentDate) => {
            if (nextDate) return nextDate;
            if (new Date(currentDate).getTime() > new Date().getTime()) {
              return new Date(currentDate);
            }
            return null;
          },
          null,
        );

        if (!nextSessionStartDate) {
          return null;
        }

        nextSessionStartDate.setHours(liveClass.startTime.hours);
        nextSessionStartDate.setMinutes(liveClass.startTime.mins);
        const nextSessionEndDate = new Date(nextSessionStartDate);
        nextSessionEndDate.setMinutes(
          nextSessionStartDate.getMinutes() + liveClass.duration,
        );

        return {
          _id: liveClass._id,
          title: liveClass.title,
          nextSessionStartDate,
          nextSessionEndDate,
          attendingAthletes: [] as UserType[],
        };
      })
      .filter((liveClass) => liveClass !== null);

    const nextCoachingSession = liveClassesWithDates.reduce(
      (prev, curr) =>
        new Date(curr.nextSessionStartDate).getTime() >
        new Date(prev.nextSessionStartDate).getTime()
          ? curr
          : prev,
      liveClassesWithDates[0],
    );

    if (!nextCoachingSession) return { nextCoachingSession: null, error: null };

    const liveClassOrders: GroupClassOrderType[] = await GroupClassOrder.find({
      course: nextCoachingSession._id,
    }).populate({
      path: "user",
      select: "firstName lastName profilePicture",
    });

    nextCoachingSession.attendingAthletes = liveClassOrders.map(
      (order) => order.user,
    );

    return { nextCoachingSession, error: null };
  } catch (err) {
    const error = err as Error;
    return { nextCoachingSession: null, error: error.message };
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
          .sort({ createdAt: -1 }),
      ),
    );

    const liveClasses = allLiveClasses.filter((liveClass) =>
      userOrders.some((order) => order.course?._id === liveClass._id),
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
        await GroupClass.findById(classId).populate("coaches user"),
      ),
    );
    return { groupClass, error: null };
  } catch (err) {
    const error = err as Error;
    return { groupClass: null, error: error.message };
  }
}
