import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";

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
