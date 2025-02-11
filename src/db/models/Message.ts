import mongoose from "mongoose";
import { UserType } from "./User";

export type AttachmentType = {
  file: { name: string; size: number; isImage: boolean };
  url: string;
};

export type MessageType = {
  _id: string;
  fromUser: UserType;
  toUser: UserType;
  message: string;
  isRead: boolean;
  attachments: AttachmentType[];
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

const MessageSchema = new mongoose.Schema<MessageType>(
  {
    fromUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, default: "" },
    attachments: {
      type: [
        {
          file: {
            name: { type: String, required: true },
            size: { type: Number, required: true },
            isImage: { type: Boolean, required: true },
          },
          url: { type: String },
        },
      ],
      default: [],
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Message =
  mongoose.models?.Message ||
  mongoose.model<MessageType>("Message", MessageSchema);

export default Message;
