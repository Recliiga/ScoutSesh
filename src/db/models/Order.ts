import mongoose from "mongoose";
import { GroupClassType, VideoType } from "./GroupClass";
import { UserType } from "./User";

export interface OrderType extends mongoose.Document {
  _id: string;
  course: GroupClassType;
  user: UserType;
  completedLessons: VideoType[];
}

const OrderSchema = new mongoose.Schema<OrderType>({
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
});

const Order =
  mongoose.models?.Order || mongoose.model<OrderType>("Order", OrderSchema);

export default Order;
