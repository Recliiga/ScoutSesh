import mongoose from "mongoose";
import { UserType } from "./User";

export type DailyJournalDetailsType = {
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  changeTomorrow: string;
  continueTomorrow: string;
};

export type DailyJournalType = {
  _id: string;
  user: UserType;
  details: DailyJournalDetailsType;
  createdAt: Date;
  updatedAt: Date;
};

const DailyJournalSchema: mongoose.Schema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    details: {
      trainingAndCompetition: {
        type: String,
        required: [true, "The field 'Training and Completion' is required"],
      },
      nutrition: {
        type: String,
        required: [true, "The field 'Nutrition' is required"],
      },
      sleep: {
        type: String,
        required: [true, "The field 'Sleep' is required"],
      },
      mentalState: {
        type: String,
        required: [true, "The field 'Mental State' is required"],
      },
      changeTomorrow: {
        type: String,
        required: [true, "The field 'Change Tomorrow' is required"],
      },
      continueTomorrow: {
        type: String,
        required: [true, "The field 'Continue Tomorrow' is required"],
      },
    },
  },
  { timestamps: true }
);

const DailyJournal =
  mongoose.models?.DailyJournal ||
  mongoose.model<DailyJournalType>("DailyJournal", DailyJournalSchema);

export default DailyJournal;
