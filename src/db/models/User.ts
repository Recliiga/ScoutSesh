import mongoose from "mongoose";
import { OrganizationType } from "./Organization";

export type PrimarySportType =
  | "volleyball"
  | "basketball"
  | "soccer"
  | "tennis"
  | "swimming"
  | "golf"
  | "baseball"
  | "football"
  | "hockey"
  | "rugby"
  | "cricket"
  | "track_and_field"
  | "gymnastics"
  | "boxing"
  | "martial_arts";

export type UserRoleType = "Athlete" | "Assistant Coach" | "Head Coach";
export type UserStatusType = "Active" | "Suspended" | "Banned";

export type BankInformationType = {
  _id: string;
  accountName: string;
  accountNumber: number;
  routingNumber: number;
  bankName: string;
  createdAt: Date;
  updatedAt: Date;
} & mongoose.Document;

export interface UserType extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: UserRoleType;
  DOB: Date;
  city: string;
  country: { name: string; iso2: string };
  primarySport: PrimarySportType;
  experience: number;
  bio: string;
  organization?: OrganizationType;
  status: UserStatusType;
  profileCompleted: boolean;
  emailVerified: boolean;
  zoomRefreshToken?: string;
  stripeAccountId?: string;
  googleTokens?: object;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: mongoose.Schema = new mongoose.Schema<UserType>(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: { type: String, required: [true, "Please enter your last name"] },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    profilePicture: {
      type: String,
      default: "/placeholder-profile-picture.png",
    },
    role: { type: String, required: [true, "Please select a valid role"] },
    DOB: { type: Date },
    city: { type: String },
    country: { name: String, iso2: String },
    primarySport: { type: String },
    experience: { type: Number },
    bio: { type: String },
    status: { type: String, default: "Active" },
    profileCompleted: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    zoomRefreshToken: { type: String },
    googleTokens: { type: Object },
    stripeAccountId: { type: String },
    organization: { type: mongoose.SchemaTypes.ObjectId, ref: "Organization" },
  },
  { timestamps: true },
);

const User =
  mongoose.models?.User || mongoose.model<UserType>("User", UserSchema);

export default User;
