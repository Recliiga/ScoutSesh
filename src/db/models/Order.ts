import mongoose from "mongoose";
import { GroupClassType } from "./GroupClass";
import { UserType } from "./User";

export interface OrderType extends mongoose.Document {
  _id: string;
  course: GroupClassType;
  user: UserType;
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
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
