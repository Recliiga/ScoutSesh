import mongoose from "mongoose";
import { UserType } from "./User";
import { AthleteEvaluationTemplateType } from "./AthleteEvaluationTemplate";

type AthleteEvaluationQuestionType = {
  label: string;
  placeholder: string;
  response: string;
};

export type EvaluationOverviewDetailsType = {
  title: string;
  description: string;
  questions: AthleteEvaluationQuestionType[];
};

export type EvaluationCoachFeedbackType = EvaluationOverviewDetailsType;

export type SkillAssessmentType = { skill: string; currentLevel: number };

export type AthleteEvaluationType = mongoose.Document & {
  _id: string;
  overviewDetails: EvaluationOverviewDetailsType;
  physicalSkillAssessments: SkillAssessmentType[];
  mentalSkillAssessments: SkillAssessmentType[];
  sportSpecificSkillAssessments: SkillAssessmentType[];
  selectedSport: string;
  coachFeedback: EvaluationCoachFeedbackType;
  user: UserType;
  nextEvaluationDate: string;
  nextEvaluationTime: string;
  template?: AthleteEvaluationTemplateType;
  createdAt: string;
  updatedAt: string;
};

const AthleteEvaluationQuestionSchema =
  new mongoose.Schema<AthleteEvaluationQuestionType>({
    label: { type: String, required: [true, "Invalid question label"] },
    placeholder: {
      type: String,
      required: [true, "Invalid placeholder label"],
    },
    response: {
      type: String,
      required: [true, "Please provide a response to the label"],
    },
  });

const SkillAssessmentSchema = new mongoose.Schema<SkillAssessmentType>({
  skill: { type: String, required: [true, "Please provide the skill name"] },
  currentLevel: {
    type: Number,
    required: [true, "Please provide the skill level"],
  },
});

const AthleteEvaluationSchema = new mongoose.Schema<AthleteEvaluationType>(
  {
    overviewDetails: {
      title: {
        type: String,
        required: [true, "Please provide a title for the overview details"],
      },
      description: {
        type: String,
        required: [
          true,
          "Please provide a description for the overview details",
        ],
      },
      questions: [AthleteEvaluationQuestionSchema],
    },
    physicalSkillAssessments: [SkillAssessmentSchema],
    mentalSkillAssessments: [SkillAssessmentSchema],
    sportSpecificSkillAssessments: [SkillAssessmentSchema],
    selectedSport: {
      type: String,
      required: [true, "Please select a sport"],
    },
    coachFeedback: {
      title: {
        type: String,
        required: [true, "Please provide a title for the coach feedback"],
      },
      description: {
        type: String,
        required: [true, "Please provide a description for the coach feedback"],
      },
      questions: [AthleteEvaluationQuestionSchema],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Invalid user ID"],
      ref: "User",
    },
    template: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "AthleteEvaluationTemplate",
    },
    nextEvaluationDate: {
      type: String,
      required: [true, "Please provide the next evaluation date"],
    },
    nextEvaluationTime: {
      type: String,
      required: [true, "Please provide the next evaluation time"],
    },
  },
  { timestamps: true },
);

const AthleteEvaluation =
  mongoose.models.AthleteEvaluation ||
  mongoose.model("AthleteEvaluation", AthleteEvaluationSchema);

export default AthleteEvaluation;
