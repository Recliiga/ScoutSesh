import mongoose from "mongoose";
import { UserType } from "./User";

export interface OrganizationType extends mongoose.Document {
  _id: string;
  name: string;
  type: string;
  logo: string;
  memberCount: string;
  location: string;
  primarySport: string;
  yearFounded: number;
  bio: number;
  user: UserType;
}

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of your organization"],
    },
    type: {
      type: String,
      required: [true, "Please enter the organization type"],
    },
    logo: {
      type: String,
      required: [true, "Please upload your organization logo"],
    },
    memberCount: {
      type: String,
      required: [
        true,
        "Please enter the range of members in your organization",
      ],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "User is not authenticated"],
      ref: "User",
    },
    location: {
      type: String,
      required: [true, "Please enter your location"],
    },
    primarySport: {
      type: String,
      required: [true, "Please enter your primary sport"],
    },
    yearFounded: {
      type: Number,
      required: [true, "Please select the year your organization was founded"],
    },
    bio: {
      type: String,
      required: [true, "Please write something about your organization"],
    },
  },
  { timestamps: true }
);

const Organization =
  mongoose.models?.Organization ||
  mongoose.model<OrganizationType>("Organization", OrganizationSchema);

export default Organization;
