"use server";

import connectDB from "@/db/connectDB";
import InvitationCode, { InvitationCodeType } from "@/db/models/InvitationCode";
import { getSessionFromHeaders } from "@/services/authServices";

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
      JSON.stringify(await InvitationCode.create(invitationData))
    );
    return { invitationCode, error: null };
  } catch (err) {
    return { invitationCode: null, error: (err as Error).message };
  }
}
