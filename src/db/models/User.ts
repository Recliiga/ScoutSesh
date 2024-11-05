import mongoose from "mongoose";

export interface UserType extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please enter your first name"] },
  lastName: { type: String, required: [true, "Please enter your last name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "User with email already exists"],
  },
  password: { type: String, required: [true, "Please enter a password"] },
  role: { type: String, required: [true, "Please select a valid role"] },
});

const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
