import mongoose from "mongoose";
import { AEPricingPlanType } from "./AthleteEvaluationPricingPlan";

type AthleteEvaluationOrderType = {
  _id: string;
  plan: "Monthly" | "Quarterly" | "Semi Annual" | "Yearly" | "custom";
  evaluations: number;
  pricingPlan?: AEPricingPlanType;
  evaluationDates: Date[];
  addVirtualConsultation: boolean;
  discussionTopics?: {
    athleteEvaluation: boolean;
    goalSetting: boolean;
    dailyJournal: boolean;
    other: boolean;
  };
  virtualConsultationDuration?: number;
  totalPrice: number;
};

const AthleteEvaluationOrderSchema =
  new mongoose.Schema<AthleteEvaluationOrderType>(
    {
      plan: {
        type: String,
        required: [true, "Please select a plan"],
        enum: ["Monthly", "Quarterly", "Semi Annual", "Yearly", "custom"],
      },
      evaluations: {
        type: Number,
        required: [true, "Please provide the number of evaluations"],
      },
      pricingPlan: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please provide a valid pricing plan ID"],
        ref: "AthleteEvaluationPricingPlan",
      },
      evaluationDates: {
        type: [Date],
        required: [true, "Please select the evaluation date"],
      },
      addVirtualConsultation: { type: Boolean, required: true },
      discussionTopics: {
        athleteEvaluation: { type: Boolean },
        goalSetting: { type: Boolean },
        dailyJournal: { type: Boolean },
        other: { type: Boolean },
      },
      virtualConsultationDuration: {
        type: Number,
      },
      totalPrice: { type: Number, required: [true, "Invalid price"] },
    },
    { timestamps: true },
  );

const AthleteEvaluationOrder =
  mongoose.models.AthleteEvaluationOrder ||
  mongoose.model("AthleteEvaluationOrder", AthleteEvaluationOrderSchema);

export default AthleteEvaluationOrder;
