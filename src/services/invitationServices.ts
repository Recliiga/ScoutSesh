import connectDB from "@/db/connectDB";
import InvitationCode, { InvitationCodeType } from "@/db/models/InvitationCode";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function fetchLatestInvitationCode() {
  try {
    const cookieStore = await cookies();
    const { userId } = getUserIdFromCookies(cookieStore);

    if (!userId)
      return { invitationCode: null, error: "User not authenticated" };

    await connectDB();
    const invitationCodes: InvitationCodeType[] | null = JSON.parse(
      JSON.stringify(await InvitationCode.find({ user: userId }))
    );

    const invitationCode =
      invitationCodes?.find(
        (code) => new Date(code.exp).getTime() > new Date().getTime()
      ) || null;

    return { invitationCode, error: null };
  } catch (err) {
    return { invitationCode: null, error: (err as Error).message };
  }
}

export async function fetchInvitationCode(code: string) {
  try {
    const cookieStore = await cookies();
    const { userId } = getUserIdFromCookies(cookieStore);

    if (!userId)
      return { invitationCodeData: null, error: "User not authenticated" };

    await connectDB();
    const invitationData: InvitationCodeType | null = JSON.parse(
      JSON.stringify(
        await InvitationCode.findOne({ code })
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "organization",
            select: "name logo",
          })
      )
    );

    if (!invitationData) throw new Error("Invalid code");

    if (new Date(invitationData.exp).getTime() < new Date().getTime())
      throw new Error("Code Expired");

    return { invitationData: invitationData, error: null };
  } catch (err) {
    return { invitationData: null, error: (err as Error).message };
  }
}
