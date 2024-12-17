import mongoose from "mongoose";
import {
  AEPricingPlanType,
  AthleteEvaluationPricingPlanSchema,
} from "./AthleteEvaluationPricingPlan";
import { UserType } from "./User";
import {
  AthleteEvaluationTemplateSchema,
  AthleteEvaluationTemplateType,
} from "./AthleteEvaluationTemplate";

type AthleteEvaluationDateType = {
  date: Date;
  dateCoachEvaluated?: Date;
  dateAthleteEvaluated?: Date;
};

export type AthleteEvaluationOrderType = {
  _id: string;
  plan: "Monthly" | "Quarterly" | "Semi Annual" | "Yearly" | "custom";
  evaluations: number;
  pricingPlanId: string;
  pricingPlan: AEPricingPlanType;
  evaluationDates: AthleteEvaluationDateType[];
  template?: AthleteEvaluationTemplateType;
  totalPrice: number;
  athlete: UserType;
  coach: UserType;
  createdAt: Date;
  updatedAt: Date;
};

const EvaluationDateSchema = new mongoose.Schema<AthleteEvaluationDateType>({
  date: { type: Date, required: true },
  dateCoachEvaluated: { type: Date },
  dateAthleteEvaluated: { type: Date },
});

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
      pricingPlanId: {
        type: String,
        required: [true, "Please provide a valid pricing plan ID"],
      },
      template: {
        type: AthleteEvaluationTemplateSchema,
      },
      pricingPlan: {
        type: AthleteEvaluationPricingPlanSchema,
        required: [true, "Please provide a valid pricing plan"],
      },
      evaluationDates: {
        type: [EvaluationDateSchema],
        required: [true, "Please select the evaluation date"],
      },
      totalPrice: { type: Number, required: [true, "Invalid price"] },
      athlete: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please provide a valid athlete ID"],
        ref: "User",
      },
      coach: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please provide a valid coach ID"],
        ref: "User",
      },
    },
    { timestamps: true },
  );

const AthleteEvaluationOrder =
  mongoose.models?.AthleteEvaluationOrder ||
  mongoose.model("AthleteEvaluationOrder", AthleteEvaluationOrderSchema);

export default AthleteEvaluationOrder;
