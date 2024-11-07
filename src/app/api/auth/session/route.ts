import connectDB from "@/db/connectDB";
import jwt from "jsonwebtoken";
import User from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) throw new Error("Invalid token");
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");

    const userId = payload.userId;
    await connectDB();
    const user = await User.findById(userId);
    if (!user) throw new Error("User dosen't exists");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
