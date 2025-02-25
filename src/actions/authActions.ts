"use server";

import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import { signJWT } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const errorMessages = {
  firstName: "Please enter your First name",
  lastName: "Please enter your Last name",
  email: "Please enter a valid Email",
  password: "Please enter a Password",
  role: "Please select a Role",
};

export async function login(formData: FormData, redirectUrl: string) {
  const cookieStore = await cookies();

  const email = formData.get("email");
  const password = formData.get("password") as string;

  let canRedirect = false;

  try {
    await connectDB();

    if (!email) return { error: "Please enter a valid Email" };
    if (!password) return { error: "Please enter your Password" };

    // Check if user exists and is active
    const user: UserType | null = await User.findOne({ email });
    if (!user) return { error: "Invalid email and password combination" };
    if (user.status === "Banned")
      return {
        error:
          "Your account has been banned. Please contact support if you believe this is a mistake.",
      };
    if (user.status === "Suspended")
      return {
        error:
          "Your account has been suspended. Please contact support for more information or assistance.",
      };

    // Compare raw password and hashed password
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect)
      return { error: "Invalid email and password combination" };

    // Create access token and store in cookie
    const token = await signJWT({ userId: user._id });
    if (!token) throw new Error("Error creating token");

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    canRedirect = true;
  } catch (error) {
    console.log({ error: (error as Error).message });
    return { error: "An unexpected error occured" };
  } finally {
    if (canRedirect) redirect(redirectUrl);
  }
}

type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export async function signup(userData: UserDataType, redirectUrl: string) {
  const cookieStore = await cookies();
  let canRedirect = false;

  try {
    await connectDB();

    // Run validation
    Object.entries(userData).forEach(([key, value]) => {
      if (!value) {
        return { error: errorMessages[key as keyof typeof errorMessages] };
      }
    });

    // Check if password is at least 8 characters
    if (userData.password.length < 8)
      return { error: "Password must be at least 8 characters" };

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    // Check if user exists
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) return { error: "User with email already exists" };

    // Create new user
    const newUser = await User.create({
      ...userData,
      password: encryptedPassword,
    });

    // Create access token and store in cookie
    const token = await signJWT({ userId: newUser._id });
    if (!token) throw new Error("Error creating token");

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    canRedirect = true;
  } catch (err) {
    const error = err as Error;

    return { error: error.message };
  } finally {
    if (canRedirect)
      redirect(
        redirectUrl === "/dashboard"
          ? "/verify-email"
          : `/verify-email?redirect=${redirectUrl}`,
      );
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/", "layout");
  redirect("/login");
}
