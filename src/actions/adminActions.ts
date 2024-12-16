"use server";
import connectDB from "@/db/connectDB";
import AdminNote, { AdminNoteType } from "@/db/models/AdminNotes";
import User, { UserStatusType, UserType } from "@/db/models/User";

type UpdateDataType = {
  status: UserStatusType;
  note: string;
};

export async function updateTeamMember(
  userId: string,
  updateData: UpdateDataType,
) {
  try {
    await connectDB();

    const updatedUser: UserType | null = await User.findById(userId);
    if (!updatedUser) throw new Error("Invalid User");

    updatedUser.status = updateData.status;

    await updatedUser.save();

    const updatedAdminNote: AdminNoteType | null = await AdminNote.findOne({
      user: userId,
    });
    if (updatedAdminNote) {
      updatedAdminNote.note = updateData.note;
      await updatedAdminNote.save();
    } else {
      await AdminNote.create({ user: userId, note: updateData.note });
    }

    return {
      updatedUser: JSON.parse(JSON.stringify(updatedUser)),
      error: null,
    };
  } catch (error) {
    return { updatedUser: null, error: (error as Error).message };
  }
}
