import mongoose from "mongoose";
import { UserType } from "./User";

export type NotificationEntryType = {
  _id: number;
  type: "goal" | "evaluation" | "team" | "liveClass" | "videoCourse";
  read: boolean;
  fromUser: UserType;
  toUser: UserType;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

const NotificationEntrySchema = new mongoose.Schema<NotificationEntryType>(
  {
    type: {
      type: String,
      required: [true, "Please provide a notification type"],
      enum: ["goal", "evaluation", "team", "liveClass", "videoCourse"],
    },
    read: { type: Boolean, default: false },
    fromUser: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Pleas provide a from user"],
      ref: "User",
    },
    toUser: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Pleas provide a to user"],
      ref: "User",
    },
    link: {
      type: String,
      required: [true, "Please provide the notification link"],
    },
  },
  { timestamps: true },
);

const NotificationEntry =
  mongoose.models.NotificationEntry ||
  mongoose.model("NotificationEntry", NotificationEntrySchema);

export default NotificationEntry;
