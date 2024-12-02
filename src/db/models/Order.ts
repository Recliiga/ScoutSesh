import mongoose from "mongoose";
import { GroupClassType } from "./GroupClass";
import { UserType } from "./User";

export interface OrderType extends mongoose.Document {
  _id: string;
  course: GroupClassType;
  user: UserType;
  completedLessons: number;
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
    type: Number,
    default: 0,
  },
});

const Order =
  mongoose.models?.Order || mongoose.model<OrderType>("Order", OrderSchema);

export default Order;
