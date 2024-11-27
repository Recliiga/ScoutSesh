import mongoose from "mongoose";
import { UserType } from "./User";

type RepeatFrequencyType =
  | "daily"
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "yearly";

type SkillLevelType = "beginner" | "intermediate" | "advanced";

export interface GroupClassType extends mongoose.Document {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  courseType: "live" | "video";
  students: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  }[];
  numberOfLessons: number;
  skillLevels: SkillLevelType[];
  price: number;
  spots: number;
  isRecurring: boolean;
  repeatFrequency: RepeatFrequencyType;
  startDate: Date;
  endDate: Date;
  time: { hours: number; mins: number };
  duration: number;
  videos: string[];
  coaches: UserType[];
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const GroupClassSchema = new mongoose.Schema<GroupClassType>(
  {
    title: { type: String, required: [true, "Please enter the course title"] },
    thumbnail: {
      type: String,
      required: [true, "Please upload a course thumbnail"],
    },
    description: {
      type: String,
      required: [true, "Please enter the course description"],
    },
    courseType: {
      type: String,
      required: [true, "Please enter the course type"],
    },
    students: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: [] },
    ],
    coaches: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Please provide a coaach"],
    },

    numberOfLessons: { type: Number },
    skillLevels: [
      { type: String, required: [true, "Pleas select the skill levels"] },
    ],
    price: { type: Number, required: [true, "Please enter the price"] },
    spots: { type: Number },
    isRecurring: {
      type: Boolean,
      required: [true, "Please specify if the class is recurring"],
    },
    repeatFrequency: { type: String },
    startDate: { type: Date },
    time: { hours: { type: Number }, mins: { type: Number } },
    duration: { type: Number },
    videos: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

const GroupClass =
  mongoose.models.GroupClass || mongoose.model("Group Class", GroupClassSchema);

export default GroupClass;
