import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";

export async function fetchGroupClassesByCoach(coachId: string) {
  try {
    await connectDB();
    const groupClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(await GroupClass.find({ user: coachId }))
    );
    return { groupClasses, error: null };
  } catch (err) {
    const error = err as Error;
    return { groupClasses: null, error: error.message };
  }
}
