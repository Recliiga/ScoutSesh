import mongoose from "mongoose";

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
  overviewDetails: OverviewDetailsType;
  physicalSkillAssessments: string[];
  mentalSkillAssessments: string[];
  sportSpecificSkillAssessments: string[];
  selectedSport: string;
  coachFeedback: CoachFeedbackType;
};

const AthleteEvaluationTemplateSchema =
  new mongoose.Schema<AthleteEvaluationTemplateType>(
    {
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
    },
    { timestamps: true }
  );

const AthleteEvaluationTemplate =
  mongoose.models.AthleteEvaluationTemplate ||
  mongoose.model("AthleteEvaluationTemplate", AthleteEvaluationTemplateSchema);

export default AthleteEvaluationTemplate;
