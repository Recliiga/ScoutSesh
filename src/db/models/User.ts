import mongoose from "mongoose";

export interface UserType extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const User =
  mongoose.models?.User || mongoose.model<UserType>("User", UserSchema);

export default User;
