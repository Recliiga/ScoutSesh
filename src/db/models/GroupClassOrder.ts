import mongoose from "mongoose";
import { GroupClassType, VideoType } from "./GroupClass";
import { UserType } from "./User";

export interface GroupClassOrderType extends mongoose.Document {
  _id: string;
  course: GroupClassType;
  user: UserType;
  completedLessons: VideoType[];
  price: number;
  stripeSessionId: string;
  stripePaymentIntent: string;
  platformPercentage: number;
  referrerPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

const GroupClassOrderSchema = new mongoose.Schema<GroupClassOrderType>(
  {
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Please provide the courseId"],
      ref: "GroupClass",
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Please provide the userId"],
      ref: "User",
    },
    completedLessons: {
      type: [{ _id: String, title: String, url: String, duration: Number }],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Please provide the amount for the course"],
    },
    platformPercentage: {
      type: Number,
      required: [true, "Please provide the platform percentage for the course"],
    },
    referrerPercentage: {
      type: Number,
      default: 0,
    },
    stripeSessionId: {
      type: String,
      required: [true, "Please provide the stripe checkout session id"],
      unique: true,
    },
  },
  { timestamps: true },
);

const GroupClassOrder =
  mongoose.models?.GroupClassOrder ||
  mongoose.model<GroupClassOrderType>("GroupClassOrder", GroupClassOrderSchema);

export default GroupClassOrder;
