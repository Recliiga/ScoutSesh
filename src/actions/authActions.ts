"use server";

import connectDB from "@/db/connectDB";
import Organization from "@/db/models/Organization";
import User, { UserType } from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    cookieStore.set("token", token, {
      httpOnly: true,
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
  country: { name: string; iso2: string };
};

export async function signup(userData: UserDataType, redirectUrl: string) {
  const cookieStore = await cookies();
  let canRedirect = false;

  try {
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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
    });

    let stripeAccount: Stripe.Response<Stripe.Account> | null = null;

    if (userData.role === "Head Coach") {
      // Create stripe account for user
      stripeAccount = await stripe.accounts.create({
        type: "express",
        country: userData.country.iso2,
        email: userData.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
    }

    if (!stripeAccount)
      return { error: "An error occurred creating stripe account" };

    // Create new user
    await connectDB();
    const newUser = await User.create({
      ...userData,
      password: encryptedPassword,
      stripeAccountId: stripeAccount.id,
    });

    // Create access token and store in cookie
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    canRedirect = true;
  } catch (err) {
    const error = err as Error;

    // Handle Error for duplicate Email
    if (error.name === "MongoServerError" && error.message.includes("E11000")) {
      return { error: "User with email already exists" };
    }
    console.log({ error: error.message });
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

export async function createOrganization(organizationData: {
  name: string;
  logo: string;
  type: string;
  memberCount: string;
  city: string;
  country: { name: string; iso2: string };
  primarySport: string;
  yearFounded: string;
  bio: string;
}) {
  try {
    const cookieStore = await cookies();

    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // Create new organization and bind to user's profile
    await connectDB();
    const newOrganization = await Organization.create({
      ...organizationData,
      user: userId,
    });
    const data = await User.findByIdAndUpdate(userId, {
      organization: newOrganization._id,
    });
    if (!data) throw new Error("An error occured");

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function completeProfile(userData: {
  firstName: string;
  lastName: string;
  role: string;
  DOB: string;
  profilePicture: string;
  city: string;
  country: { name: string; iso2: string };
  primarySport: string;
  experience: string;
  bio: string;
}) {
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
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/", "layout");
  redirect("/login");
}
