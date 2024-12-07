import { UserType } from "./User";

export type EvaluationOverviewDetailsType = {
  title: string;
  description: string;
  questions: { label: string; placeholder: string; response: string }[];
};

export type EvaluationCoachFeedbackType = EvaluationOverviewDetailsType;

export type SkillAssessmentType = { skill: string; currentLevel: number };

export type AthleteEvaluationDataType = {
  _id: string;
  name: string;
  overviewDetails: EvaluationOverviewDetailsType;
  physicalSkillAssessments: SkillAssessmentType[];
  mentalSkillAssessments: SkillAssessmentType[];
  sportSpecificSkillAssessments: SkillAssessmentType[];
  selectedSport: string;
  coachFeedback: EvaluationCoachFeedbackType;
  user: UserType;
  nextEvaluationDate: string;
  nextEvaluationTime: string;
  createdAt: string;
  updatedAt: string;
};
