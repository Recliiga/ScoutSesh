import mongoose from "mongoose";
import { UserType } from "./User";

export type NotificationEntryType = {
  _id: number;
  type:
    | "goal"
    | "evaluation"
    | "evaluation-athlete"
    | "team"
    | "videoCourse"
    | "liveClass";
  read: boolean;
  fromUser: UserType;
  toUser?: UserType;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

const NotificationEntrySchema = new mongoose.Schema<NotificationEntryType>(
  {
    type: {
      type: String,
      required: [true, "Please provide the notification type"],
      enum: [
        "goal",
        "evaluation",
        "evaluation-athlete",
        "team",
        "videoCourse",
        "liveClass",
      ],
    },
    read: { type: Boolean, default: false },
    fromUser: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Please provide the fromUser"],
      ref: "User",
    },
    toUser: {
      type: mongoose.SchemaTypes.ObjectId,
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
