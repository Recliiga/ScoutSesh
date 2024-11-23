import mongoose from "mongoose";
import { UserType } from "./User";

export type DailyJournalDataType = {
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  changeTomorrow: string;
  continueTomorrow: string;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
};

const DailyJournalDataType: mongoose.Schema = new mongoose.Schema(
  {
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
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DailyJournal =
  mongoose.models?.DailyJournal ||
  mongoose.model<DailyJournalDataType>("DailyJournal", DailyJournalDataType);

export default DailyJournal;
