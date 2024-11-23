import mongoose from "mongoose";
import { UserType } from "./User";

export interface DailyJournalCommentType extends mongoose.Document {
  _id: string;
  text: string;
  dailyJournal: string;
  sectionKey: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const dailyJournalCommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please enter a comment"] },
    sectionKey: { type: String, required: [true, "Invalid section key"] },
    dailyJournal: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid goal ID"],
      ref: "Goal",
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid user"],
      ref: "User",
    },
  },
  { timestamps: true }
);

const DailyJournalComment =
  mongoose.models?.DailyJournalComment ||
  mongoose.model("DailyJournalComment", dailyJournalCommentSchema);

export default DailyJournalComment;
