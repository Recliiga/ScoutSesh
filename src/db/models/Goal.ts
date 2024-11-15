import { GoalType } from "@/components/goal-setting/GoalDetailsScreen";
import { GoalDetailsType } from "@/components/goal-setting/GoalOverviewScreen";
import mongoose from "mongoose";

export interface GoalSchemaType extends mongoose.Document {
  name: string;
  details: GoalDetailsType;
  goals: GoalType[];
}

const GoalSchema: mongoose.Schema = new mongoose.Schema(
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
    goals: [
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
          type: String,
          required: [true, "Please enter your confidence level"],
        },
      },
    ],
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Goal =
  mongoose.models?.Goal || mongoose.model<GoalSchemaType>("Goal", GoalSchema);

export default Goal;
