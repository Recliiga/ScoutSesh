import connectDB from "@/db/connectDB";
import jwt from "jsonwebtoken";
import User, { UserType } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Invalid token");
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");

    const userId = payload.userId;
    await connectDB();
    const user: UserType | null =
      await User.findById(userId).populate("organization");

    if (!user) throw new Error("User dosen't exists");
    if (user.status !== "Active") throw new Error("User account not active");

    return NextResponse.json({ user, error: null });
  } catch (error) {
    console.log("Error from route handler: ", (error as Error).message);
    return NextResponse.json(
      { user: null, error: (error as Error).message },
      { status: 401 },
    );
  }
}
