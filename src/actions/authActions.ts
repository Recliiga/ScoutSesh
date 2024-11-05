"use server";

import connectDB from "@/db/connectDB";
import User from "@/db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password") as string;

  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email and password combination");
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect)
      throw new Error("Invalid email and password combination");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function signup(formData: FormData) {
  const cookieStore = await cookies();

  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password") as string,
    role: formData.get("role"),
  };

  try {
    const encryptedPassword = await bcrypt.hash(userData.password, 10);
    await connectDB();
    const newUser = await User.create({
      ...userData,
      password: encryptedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
