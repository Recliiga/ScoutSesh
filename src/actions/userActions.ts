"use server";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";
import connectDB from "@/db/connectDB";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import "@/db/models/GroupClass";
import NotificationEntry from "@/db/models/NotificationEntry";
import User, { PrimarySportType, UserType } from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function completeProfile(
  userData: {
    firstName: string;
    lastName: string;
    role: string;
    DOB: string;
    profilePicture: string;
    city: string;
    primarySport: string;
    experience: string;
    bio: string;
  },
  redirectUrl: string,
) {
  let canRedirect = false;
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // Update user's profile
    await connectDB();
    const data = await User.findByIdAndUpdate(userId, {
      ...userData,
      profileCompleted: true,
    });
    if (!data) throw new Error("An error occured");
    canRedirect = true;
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (canRedirect) redirect(redirectUrl);
  }
}

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

export async function fetchAllTransactions(userId: string) {
  try {
    await connectDB();
    const allEvaluationOrders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find({ coach: userId })
          .populate({
            path: "athlete",
            select: "firstName lastName profilePicture",
          })
          .sort({
            createdAt: -1,
          }),
      ),
    );

    const evaluationOrders = allEvaluationOrders.filter(
      (order) => order.stripeSessionId,
    );

    const allGroupClassOrders: GroupClassOrderType[] = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.find().populate({
          path: "course",
          select: "_id coaches",
          populate: { path: "coaches", select: "_id" },
        }),
      ),
    );

    const groupClassOrders = allGroupClassOrders.filter((order) =>
      order.course?.coaches.some((coach) => coach._id === userId),
    );

    const transactions: TransactionType[] = [
      ...evaluationOrders.map((order) => ({
        _id: order._id,
        price: order.totalPrice,
        purchaseDate: order.createdAt,
        platformPercentage: order.platformPercentage,
        referrerPercentage: order.referrerPercentage,
      })),
      ...groupClassOrders.map((order) => ({
        _id: order._id,
        price: order.price,
        purchaseDate: order.createdAt,
        platformPercentage: order.platformPercentage,
        referrerPercentage: order.referrerPercentage,
      })),
    ];

    return { transactions, error: null };
  } catch (err) {
    const error = err as Error;
    return { transactions: [], error: error.message };
  }
}
