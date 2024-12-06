import mongoose from "mongoose";
import { UserType } from "./User";

export type OverviewDetailsType = {
  title: string;
  description: string;
  questions: {
    label: string;
    placeholder: string;
  }[];
};

export type CoachFeedbackType = OverviewDetailsType;

export type AthleteEvaluationTemplateType = {
  _id: string;
  name: string;
  overviewDetails: OverviewDetailsType;
  physicalSkillAssessments: string[];
  mentalSkillAssessments: string[];
  sportSpecificSkillAssessments: string[];
  selectedSport: string;
  coachFeedback: CoachFeedbackType;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};

const AthleteEvaluationTemplateSchema =
  new mongoose.Schema<AthleteEvaluationTemplateType>(
    {
      name: {
        type: String,
        required: [true, "Please provide a name for your template"],
      },
      overviewDetails: {
        title: { type: String },
        description: { type: String },
        questions: [
          {
            label: { type: String },
            placeholder: { type: String },
          },
        ],
      },
      physicalSkillAssessments: [{ type: String }],
      mentalSkillAssessments: [{ type: String }],
      sportSpecificSkillAssessments: [{ type: String }],
      selectedSport: [{ type: String }],
      coachFeedback: {
        title: { type: String },
        description: { type: String },
        questions: [
          {
            label: { type: String },
            placeholder: { type: String },
          },
        ],
      },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
      },
    },
    { timestamps: true }
  );

const AthleteEvaluationTemplate =
  mongoose.models.AthleteEvaluationTemplate ||
  mongoose.model("AthleteEvaluationTemplate", AthleteEvaluationTemplateSchema);

export default AthleteEvaluationTemplate;
