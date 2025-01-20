import mongoose from "mongoose";
import { UserType } from "./User";

export type WithdrawalType = mongoose.Document & {
  _id: string;
  stripeAccountId: string;
  stripeTransferId: string;
  amount: number;
  user: UserType;
  createAt: Date;
  updatedAt: Date;
};

const WithdrawalSchema = new mongoose.Schema<WithdrawalType>({
  amount: {
    type: Number,
    required: [true, "Please enter an amount"],
  },
  stripeAccountId: {
    type: String,
    required: [true, "Invalid stripe account ID"],
  },
  stripeTransferId: {
    type: String,
    required: [true, "Invalid stripe transfer ID"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "Please provide a user ID"],
    ref: "User",
  },
});

const Withdrawal =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);

export default Withdrawal;
