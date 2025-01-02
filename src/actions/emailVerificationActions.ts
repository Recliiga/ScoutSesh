"use server";

import AccountVerificationEmail from "@/components/emails/AccountVerificationEmail";
import User, { UserType } from "@/db/models/User";
import VerificationCode from "@/db/models/VerificationCode";
import { customAlphabet } from "nanoid";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function verifyEmail(userId: string, code: string) {
  let redirectUrl: string = "";
  try {
    // Get all valid verification codes for user
    const validVerificationCodes = await VerificationCode.find({
      user: userId,
      exp: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    // Check if code entered is valid
    if (
      validVerificationCodes.some(
        (verificationCode) => verificationCode.code === code,
      )
    ) {
      // Set user email as verified
      await User.findByIdAndUpdate(userId, { emailVerified: true });

      redirectUrl = "/complete-profile";
    } else {
      return { error: "The code you entered is incorrect" };
    }
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export async function sendVerificationEmail(user: UserType) {
  try {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

    // Get all verification codes for user in the last 30 minutes
    const userCodes = await VerificationCode.find({
      user: user._id,
      createdAt: { $gte: thirtyMinutesAgo },
    }).sort({ createdAt: -1 });

    // Check if user has requested more than 3 verification emails in the last 30 minutes
    if (userCodes.length >= 3) {
      const lastEmail = userCodes[2];

      // Calculate time left before user can request another verification email
      if (lastEmail) {
        const nextAllowedTime = new Date(lastEmail.createdAt);
        nextAllowedTime.setMinutes(nextAllowedTime.getMinutes() + 30);
        const waitTime = Math.ceil(
          (nextAllowedTime.getTime() - new Date().getTime()) / 60000,
        );
        return {
          error: `Please wait ${waitTime} more minutes before requesting another verification email.`,
        };
      }
    }

    // Generate verification code and send email
    const characterSet = "0123456789";
    const customNanoId = customAlphabet(characterSet, 6);
    const code = customNanoId();
    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + 10);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "verify@scoutsesh.com",
      to: user.email,
      subject: "Verify your account on Scoutsesh",
      react: AccountVerificationEmail({
        name: user.firstName,
        verificationCode: code,
      }),
    });
    if (error) return { error: "An unexpected error occured" };

    // Create verification code in database
    await VerificationCode.create({
      code: code,
      user: user._id,
      exp: expDate,
    });

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
