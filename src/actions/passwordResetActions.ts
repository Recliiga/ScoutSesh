"use server";

import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import User, { UserType } from "@/db/models/User";
import { Resend } from "resend";

export async function sendPasswordResetEmail(email: string) {
  try {
    const user: UserType | null = await User.findOne({ email });
    if (!user)
      return {
        error: "No account found with this email address.",
      };

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "noreply@scoutsesh.com",
      to: email,
      subject: "You're Invited to Join ScoutSesh",
      react: ResetPasswordEmail({
        userFirstname: user.firstName,
        resetPasswordLink: `http`,
      }),
    });

    if (error) throw new Error("");

    return { error: null };
  } catch {
    return { error: "An unexpected error occured" };
  }
}
