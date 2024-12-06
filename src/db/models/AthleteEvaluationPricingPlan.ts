import mongoose from "mongoose";

export type StandardPlanType = {
  name: "Monthly" | "Quarterly" | "Semi Annual" | "Yearly";
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

interface BaseAEPricingPlanType extends mongoose.Document {
  _id: string;
  standardPlans: StandardPlanType[];
  firstEvaluationDays: number;
}

export type AEPricingPlanType = BaseAEPricingPlanType &
  AECustomPlanType &
  AEVirtualConsultationType;

const StandardPlanSchema = new mongoose.Schema<StandardPlanType>({
  name: {
    type: String,
    enum: ["Monthly", "Quarterly", "Semi Annual", "Yearly"],
    required: true,
  },
  evaluations: { type: Number, required: true },
  price: { type: Number, required: true },
});

const CustomPlanTierSchema = new mongoose.Schema<CustomPlanType>({
  type: {
    type: String,
    enum: ["single", "range"], // Only allow "single" or "range"
  },
  evaluations: {
    from: {
      type: Number,
    },
    to: {
      type: Number,
    },
  },
  price: {
    type: Number,
  },
});
const AthleteEvaluationPricingPlanSchema =
  new mongoose.Schema<AEPricingPlanType>(
    {
      standardPlans: [StandardPlanSchema],
      firstEvaluationDays: { type: Number, required: true },
      offerCustomPlan: { type: Boolean, required: true },
      customPlanTiers: [CustomPlanTierSchema],
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
    },
    { timestamps: true }
  );

const AthleteEvaluationPricingPlan =
  mongoose.models.AthleteEvaluationPricingPlan ||
  mongoose.model(
    "AthleteEvaluationPricingPlan",
    AthleteEvaluationPricingPlanSchema
  );

export default AthleteEvaluationPricingPlan;
