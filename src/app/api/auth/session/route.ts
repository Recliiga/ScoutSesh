import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import "@/db/models/Organization";
import { verifyJWT } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Invalid token");

    const payload = await verifyJWT(token);
    if (!payload) throw new Error("Invalid payload");

    const userId = payload.userId;

    await connectDB();
    const user: UserType | null = await User.findById(userId)
      .populate("organization")
      .select("-password");

    if (!user) throw new Error("User dosen't exists");
    if (user.status !== "Active") throw new Error("User account not active");

    return NextResponse.json({ user, error: null });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { user: null, error: error.message },
      { status: 401 },
    );
  }
}
