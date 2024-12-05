import mongoose from "mongoose";

export type StandardPlanType = {
  name: string;
  evaluations: number;
  price: number;
};

export type CustomPlanType = {
  type: "single" | "range";
  evaluations: { from: number; to: number };
  price: number;
};

type AECustomPlanType =
  | {
      offerCustomPlan: true;
      customPlanTiers: CustomPlanType[];
    }
  | {
      offerCustomPlan: false;
      customPlanTiers: undefined;
    };

type AEVirtualConsultationType =
  | {
      offerVirtualConsultation: true;
      virtualConsultationType: "addon" | "included";
      virtualConsultationDuration: number;
      virtualConsultationRate: number;
      discussionTopics: {
        athleteEvaluation: boolean;
        goalSetting: boolean;
        dailyJournal: boolean;
        other: boolean;
      };
    }
  | {
      offerVirtualConsultation: false;
      virtualConsultationType: undefined;
      virtualConsultationDuration: undefined;
      virtualConsultationRate: undefined;
      discussionTopics: undefined;
    };

interface BaseAthleteEvaluationPricingType extends mongoose.Document {
  standardPlans: StandardPlanType[];
  firstEvaluationDays: number;
}

export type AthleteEvaluationPricingType = BaseAthleteEvaluationPricingType &
  AECustomPlanType &
  AEVirtualConsultationType;

const AthleteEvaluationPricingSchema =
  new mongoose.Schema<AthleteEvaluationPricingType>({
    standardPlans: {
      name: { type: String, required: true },
      evaluations: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    firstEvaluationDays: { type: Number, required: true },
    offerCustomPlan: { type: Boolean, required: true },
    customPlanTiers: {
      type: [
        {
          type: String,
          evaluations: { from: Number, to: Number },
          price: Number,
        },
      ],
    },
    offerVirtualConsultation: { type: Boolean },
    virtualConsultationType: { type: String },
    virtualConsultationDuration: { type: Number },
    virtualConsultationRate: { type: Number },
    discussionTopics: {
      athleteEvaluation: { type: Boolean },
      goalSetting: { type: Boolean },
      dailyJournal: { type: Boolean },
      other: { type: Boolean },
    },
  });

const AthleteEvaluationPricing =
  mongoose.models.AthleteEvaluationPricing ||
  mongoose.model("AthleteEvaluationPricing", AthleteEvaluationPricingSchema);

export default AthleteEvaluationPricing;
