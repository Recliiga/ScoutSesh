import mongoose from "mongoose";
import { UserType } from "./User";

export interface VerificationCodeType extends mongoose.Document {
  _id: string;
  code: string;
  user: UserType;
  exp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationCodeSchema = new mongoose.Schema<VerificationCodeType>(
  {
    code: {
      type: String,
      required: [true, "Please enter a verification code"],
      unique: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid User"],
      ref: "User",
    },
    exp: {
      type: Date,
      required: [true, "Please enter an expiry date"],
    },
  },
  { timestamps: true },
);

const VerificationCode =
  mongoose.models?.VerificationCode ||
  mongoose.model("VerificationCode", VerificationCodeSchema);

export default VerificationCode;
