import mongoose from "mongoose";
import { UserType } from "./User";
import { calendar_v3 } from "googleapis";

export type RepeatFrequencyType =
  | "daily"
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "yearly";

type SkillLevelType = "beginner" | "intermediate" | "advanced";

export interface VideoType extends mongoose.Document {
  _id: string;
  title: string;
  url: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export type MeetingType = {
  uuid: string;
  id: number;
  host_id: string;
  host_email: string;
  topic: string;
  type: number;
  status: string;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  start_url: string;
  join_url: string;
  password: string;
  h323_password: string;
  pstn_password: string;
  encrypted_password: string;
};

export interface GroupClassType extends mongoose.Document {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  courseType: "live" | "video";
  numberOfLessons: number;
  skillLevels: SkillLevelType[];
  price: number;
  totalSpots: number;
  isRecurring: boolean;
  repeatFrequency: RepeatFrequencyType;
  startDate: Date;
  endDate: Date;
  startTime: { hours: string; mins: string };
  duration: number;
  customDuration: number;
  videos: VideoType[];
  coaches: UserType[];
  user: UserType;
  meetingData?: calendar_v3.Schema$Event;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new mongoose.Schema<VideoType>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for your video lesson"],
    },
    url: {
      type: String,
      required: [true, "Please provide a url for your video lesson"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide the video duration"],
    },
  },
  { timestamps: true },
);

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
    totalSpots: { type: Number },
    isRecurring: {
      type: Boolean,
      required: [true, "Please specify if the class is recurring"],
    },
    repeatFrequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { hours: { type: String }, mins: { type: String } },
    duration: { type: Number },
    customDuration: { type: Number },
    videos: { type: [VideoSchema], default: [] },
    meetingData: { type: Object },
  },
  { timestamps: true },
);

const GroupClass =
  mongoose.models?.GroupClass ||
  mongoose.model<GroupClassType>("GroupClass", GroupClassSchema);

export default GroupClass;
