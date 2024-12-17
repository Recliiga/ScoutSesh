"use server";
import connectDB from "@/db/connectDB";
import User, { PrimarySportType, UserType } from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function joinTeam(organizationId: string) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("User is unauthenticated");

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(userId, {
      organization: organizationId,
    });
    if (!updatedUser) throw new Error("An error occured while joining team");

    redirectUrl = "/dashboard";
  } catch (err) {
    return { error: (err as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export async function updateUser(
  userDataId: string,
  userData: {
    firstName: string;
    lastName: string;
    location: string;
    primarySport: PrimarySportType;
    profilePicture: string;
    experience: number;
    bio: string;
  },
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) return { error: "User is unauthenticated" };

    if (userId !== userDataId)
      return { updatedUser: null, error: "Unauthorized" };

    await connectDB();
    const updatedUser: UserType | null = JSON.parse(
      JSON.stringify(
        await User.findByIdAndUpdate(userId, userData, { new: true }),
      ),
    );
    if (!updatedUser)
      return { updatedUser: null, error: "Unable to update user" };

    revalidatePath("/dashboard", "layout");
    return { updatedUser, error: null };
  } catch {
    return { updatedUser: null, error: "An error occured updating user" };
  }
}
