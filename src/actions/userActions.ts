"use server";
import connectDB from "@/db/connectDB";
import NotificationEntry from "@/db/models/NotificationEntry";
import User, { PrimarySportType, UserType } from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function joinTeam(organizationId: string, coachId: string) {
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

    await NotificationEntry.create({
      type: "team",
      fromUser: userId,
      toUser: coachId,
      link: "/dashboard/team-members",
    });

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
    city: string;
    country: { name: string; iso2: string };
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

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) return { error: "Unauthenticated" };

    await connectDB();
    const user = await User.findById(userId);

    // Compare raw password and hashed password
    const passwordIsCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!passwordIsCorrect) return { error: "Incorrect password" };

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    user.password = encryptedPassword;
    await user.save();

    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Update password error", error.message);
    return { error: "Something went wrong: Unable to update password" };
  }
}

export async function disconnectZoom(userId: string) {
  try {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(userId, {
      zoomRefreshToken: null,
    });
    if (!updatedUser) throw new Error("Error updating user ");

    revalidatePath("/dashboard", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error disconnecting zoom: ", error.message);
    return { error: error.message };
  }
}

export async function saveAccountInformation(
  userId: string,
  accountInformation: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  },
) {
  console.log({ userId, accountInformation });
  try {
    // await connectDB();
    // const updatedUser = await User.findByIdAndUpdate(userId, {
    //   accountInformation,
    // });
    // if (!updatedUser) throw new Error("Error updating account information");

    // revalidatePath("/dashboard/billings-and-payments");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error saving account information: ", error.message);
    return { error: error.message };
  }
}
