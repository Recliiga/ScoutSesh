import mongoose from "mongoose";
import { UserType } from "./User";

export interface CommentSchemaType extends mongoose.Document {
  text: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Please enter a comment"] },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid user"],
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
