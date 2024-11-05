import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/db/connectDB";
import User from "@/db/models/User";

export async function getSession() {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid token");
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");

    const userId = payload.userId;
    await connectDB();
    const user = await User.findById(userId);
    if (!user) throw new Error("User dosen't exists");

    return { user, error: null };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}
