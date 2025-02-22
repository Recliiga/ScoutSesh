import { GoalDetailsType } from "@/components/goal-setting/GoalOverviewScreen";
import mongoose from "mongoose";
import { UserType } from "./User";

export interface WeeklyReflectionSchemaType extends mongoose.Document {
  _id: string;
  completion: string;
  improvement: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalSchemaType extends mongoose.Document {
  _id: string;
  goal: string;
  actions: string;
  location: string;
  frequency: string;
  confidence: number;
  dateCompleted: Date | null;
  weeklyReflections: WeeklyReflectionSchemaType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalDataSchemaType extends mongoose.Document {
  _id: string;
  name: string;
  details: GoalDetailsType;
  goals: GoalSchemaType[];
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const WeeklyReflectionSchema: mongoose.Schema = new mongoose.Schema(
  {
    completion: {
      type: String,
      required: [true, "Please enter an answer for completion"],
    },
    improvement: {
      type: String,
      required: [true, "Please enter an answer for improvement"],
    },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GoalSchema: mongoose.Schema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: [true, "Please enter your goal"],
    },
    actions: {
      type: String,
      required: [true, "Please enter your actions"],
    },
    location: {
      type: String,
      required: [true, "Please enter your location"],
    },
    frequency: {
      type: String,
      required: [true, "Please enter a frequency"],
    },
    confidence: {
      type: Number,
      required: [true, "Please enter your confidence level"],
    },
    dateCompleted: {
      type: String,
      default: null,
    },
    weeklyReflections: {
      type: [WeeklyReflectionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const GoalDataSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of your goal"],
    },
    details: {
      aspiration: {
        type: String,
        required: [true, "Please enter your aspiration"],
      },
      strengths: {
        type: String,
        required: [true, "Please enter your strengths"],
      },
      weaknesses: {
        type: String,
        required: [true, "Please enter your weaknesses"],
      },
    },
    goals: [GoalSchema],
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Goal =
  mongoose.models?.Goal ||
  mongoose.model<GoalSchemaType>("Goal", GoalDataSchema);

export default Goal;
