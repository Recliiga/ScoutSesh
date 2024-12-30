"use server";

import InvitationEmail from "@/components/emails/InvitationEmail";
import connectDB from "@/db/connectDB";
import InvitationCode, { InvitationCodeType } from "@/db/models/InvitationCode";
import { OrganizationType } from "@/db/models/Organization";
import User, { UserType } from "@/db/models/User";
import { getSessionFromHeaders } from "@/services/authServices";
import { Resend } from "resend";

export async function generateInvitationCode(code: string) {
  try {
    const user = await getSessionFromHeaders();
    if (user.role !== "Head Coach")
      return { invitationCode: null, error: "User is not Head Coach" };

    const exp = new Date();
    exp.setDate(exp.getDate() + 7);

    const invitationData = {
      code,
      user: user._id,
      organization: user.organization!._id,
      exp,
    };

    await connectDB();
    const invitationCode: InvitationCodeType = JSON.parse(
      JSON.stringify(await InvitationCode.create(invitationData)),
    );
    return { invitationCode, error: null };
  } catch (err) {
    return { invitationCode: null, error: (err as Error).message };
  }
}

export async function sendInvitationEmail(
  toEmail: string,
  invitationCode: string,
  organization: OrganizationType,
  coachFirstName: string,
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const user: UserType | null = await User.findOne({ email: toEmail });

  try {
    const { error } = await resend.emails.send({
      from: "noreply@scoutsesh.com",
      to: toEmail,
      subject: "You're Invited to Join ScoutSesh",
      react: InvitationEmail({
        coachFirstName,
        invitationLink: invitationCode,
        teamImage: organization.logo,
        teamName: organization.name,
        userImage: user ? user.profilePicture : undefined,
        username: user ? user.firstName : undefined,
      }),
    });
    if (error) throw new Error(error.message);

    return { error: null };
  } catch {
    return { error: "An error occured sending email" };
  }
}
