import mongoose from "mongoose";
import { UserType } from "./User";
import { OrganizationType } from "./Organization";

export interface InvitationCodeType extends mongoose.Document {
  _id: string;
  code: string;
  user: UserType;
  organization: OrganizationType;
  exp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InvitationCodeSchema = new mongoose.Schema<InvitationCodeType>(
  {
    code: {
      type: String,
      required: [true, "Please enter an invitation code"],
      unique: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid User"],
      ref: "User",
    },
    organization: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid Organization"],
      ref: "Organization",
    },
    exp: {
      type: Date,
      required: [true, "Please enter an expiry date"],
    },
  },
  { timestamps: true }
);

const InvitationCode =
  mongoose.models.InvitationCode ||
  mongoose.model("InvitationCode", InvitationCodeSchema);

export default InvitationCode;
