import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import "@/db/models/Organization";

export async function fetchUser(userId: string) {
  try {
    await connectDB();
    const user: UserType | null = JSON.parse(
      JSON.stringify(
        await User.findById(userId).populate({
          path: "organization",
          select: "name logo",
        }),
      ),
    );

    if (!user) return { user: null, error: "Invalid user ID" };
    if (user.status !== "Active")
      return { user: null, error: "User is not active" };

    return { user, error: null };
  } catch (err) {
    const error = err as Error;
    return { user: null, error: error.message };
  }
}

export async function fetchTeamMembers(organizationId: string) {
  try {
    await connectDB();
    const teamMembers: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find({
          organization: organizationId,
          status: "Active",
        }),
      ),
    );
    return { teamMembers, error: null };
  } catch (err) {
    const error = err as Error;
    return { teamMembers: null, error: error.message };
  }
}
