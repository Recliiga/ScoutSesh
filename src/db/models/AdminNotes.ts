import mongoose from "mongoose";
import { UserType } from "./User";

export type AdminNoteType = mongoose.Document & {
  _id: string;
  user: UserType;
  note: string;
  createdAt: Date;
  updatedAt: Date;
};

const AdminNoteSchema = new mongoose.Schema<AdminNoteType>(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Please provide a valid user ID"],
      ref: "User",
    },
    note: { type: String, default: "" },
  },
  { timestamps: true },
);

const AdminNote =
  mongoose.models.AdminNote || mongoose.model("AdminNote", AdminNoteSchema);

export default AdminNote;
