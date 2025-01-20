"use server";

import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import User, { UserType } from "@/db/models/User";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import connectDB from "@/db/connectDB";
import { signToken } from "@/lib/utils";

export async function sendPasswordResetEmail(email: string) {
  try {
    await connectDB();

    const user: UserType | null = await User.findOne({ email });
    if (!user)
      return {
        error: "No account found with this email address.",
      };

    const BASE_URL = process.env.BASE_URL;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return { error: "Invalid JWT secret" };

    // Sign the user ID to a json web token
    const { token, error: tokenError } = signToken(
      { userId: user._id },
      {
        expiresIn: "1h",
      },
    );
    if (tokenError !== null) throw new Error(tokenError);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "noreply@scoutsesh.com",
      to: email,
      subject: "You're Invited to Join ScoutSesh",
      react: ResetPasswordEmail({
        userFirstname: user.firstName,
        resetPasswordLink: `${BASE_URL}/reset-password?tk=${token}`,
      }),
    });

    if (error) throw new Error("");

    return { error: null };
  } catch (err) {
    console.log("Password reset email error: ", (err as Error).message);
    return { error: "An unexpected error occured" };
  }
}

export async function setNewPassword(userId: string, password: string) {
  try {
    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    if (password.length < 8)
      return { error: "Password must be at least 8 characters" };

    // Update user
    await connectDB();
    await User.findByIdAndUpdate(userId, { password: encryptedPassword });

    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Set new password Error: ", error.message);
    return { error: "An unexpected error occured" };
  }
}
