import mongoose from "mongoose";
import { UserType } from "./User";

export interface GoalCommentType extends mongoose.Document {
  _id: string;
  text: string;
  goal: string;
  sectionKey: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const goalCommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please enter a comment"] },
    sectionKey: { type: String, required: [true, "Invalid section key"] },
    goal: {
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

const GoalComment =
  mongoose.models?.GoalComment ||
  mongoose.model("GoalComment", goalCommentSchema);

export default GoalComment;
