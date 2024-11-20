import mongoose from "mongoose";
import { UserType } from "./User";

export interface CommentSchemaType extends mongoose.Document {
  text: string;
  goalId: string;
  sectionKey: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
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

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
