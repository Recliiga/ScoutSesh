import mongoose from "mongoose";

interface OrganizationType extends mongoose.Document {
  name: string;
  type: string;
  numberOfMembers: string;
  location: string;
  primarySport: string;
  yearFounded: number;
  bio: number;
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
    numberOfMembers: {
      type: String,
      required: [
        true,
        "Please enter the range of members in your organization",
      ],
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
