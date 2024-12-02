"use server";

import connectDB from "@/db/connectDB";
import Order from "@/db/models/Order";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function purchaseCourse(courseId: string) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("Unauthenticated");
    await connectDB();
    await Order.create({ course: courseId, user: userId });
    redirectUrl = "/dashboard/group-classes/my-classes";
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
