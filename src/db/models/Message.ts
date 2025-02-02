import mongoose from "mongoose";
import { UserType } from "./User";

export type MessageType = {
  _id: string;
  fromUser: UserType;
  toUser: UserType;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const MessageSchema = new mongoose.Schema<MessageType>(
  {
    fromUser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    toUser: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Message =
  mongoose.models?.Message ||
  mongoose.model<MessageType>("Message", MessageSchema);

export default Message;
