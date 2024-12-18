"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import {
  AEPricingPlanType,
  CustomPlanType,
  StandardPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";
import {
  createPricingPlan,
  updatePricingPlan,
} from "@/actions/athleteEvaluationActions";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../AuthError";
import Select from "../Select";
import BackButton from "../dashboard/BackButton";

const initialStandardPlans = [
  { _id: "", name: "Monthly", evaluations: 12, price: 70 },
  { _id: "", name: "Quarterly", evaluations: 4, price: 80 },
  { _id: "", name: "Semi Annual", evaluations: 2, price: 90 },
  { _id: "", name: "Yearly", evaluations: 1, price: 110 },
] as StandardPlanType[];

const initialCustomPlanTiers = [
  { _id: "", evaluations: { from: 1, to: 1 }, price: 0, type: "single" },
] as CustomPlanType[];

const initialDiscussionTopics = {
  athleteEvaluation: false,
  goalSetting: false,
  dailyJournal: false,
  other: false,
};

export default function AthleteEvaluationPricingForm({
  pricingPlan,
}: {
  pricingPlan: AEPricingPlanType | null;
}) {
  const [offerCustomPlan, setOfferCustomPlan] = useState(
    pricingPlan?.offerCustomPlan || false,
  );
  const [standardPlans, setStandardPlans] = useState<StandardPlanType[]>(
    pricingPlan?.standardPlans || initialStandardPlans,
  );
  const [customPlanTiers, setCustomPlanTiers] = useState<CustomPlanType[]>(
    (pricingPlan?.offerCustomPlan && pricingPlan.customPlanTiers) ||
      initialCustomPlanTiers,
  );
  const [offerVirtualConsultation, setOfferVirtualConsultation] = useState(
    pricingPlan?.offerVirtualConsultation || false,
  );
  const [virtualConsultationType, setVirtualConsultationType] = useState<
    "addon" | "included"
  >(
    (pricingPlan?.offerVirtualConsultation &&
      pricingPlan.virtualConsultationType) ||
      "included",
  );
  const [virtualConsultationDuration, setVirtualConsultationDuration] =
    useState(
      (pricingPlan?.offerVirtualConsultation &&
        pricingPlan.virtualConsultationDuration) ||
        30,
    );
  const [discussionTopics, setDiscussionTopics] = useState(
    (pricingPlan?.offerVirtualConsultation && pricingPlan.discussionTopics) ||
      initialDiscussionTopics,
  );
  const [firstEvaluationDays, setFirstEvaluationDays] = useState(
    pricingPlan?.firstEvaluationDays || 7,
  );
  const [virtualConsultationRate, setVirtualConsultationRate] = useState(
    (pricingPlan?.offerVirtualConsultation &&
      pricingPlan.virtualConsultationRate) ||
      0,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedTopicsCount =
      Object.values(discussionTopics).filter(Boolean).length;
    setVirtualConsultationDuration(selectedTopicsCount >= 3 ? 45 : 30);
  }, [discussionTopics]);

  function handleStandardPlanPriceChange(index: number, value: number) {
    const updatedPlans = [...standardPlans];
    updatedPlans[index].price = value;
    setStandardPlans(updatedPlans);
  }

  function handleCustomPlanEvaluationsChange(
    index: number,
    value: { from: number; to: number },
  ) {
    const updatedTiers = [...customPlanTiers];
    updatedTiers[index].evaluations = value;
    setCustomPlanTiers(updatedTiers);
  }

  function handleCustomPlanPriceChange(index: number, value: number) {
    const updatedTiers = [...customPlanTiers];
    updatedTiers[index].price = value;
    setCustomPlanTiers(updatedTiers);
  }

  function handleCustomPlanTypeChange(
    index: number,
    value: "single" | "range",
  ) {
    const updatedTiers = [...customPlanTiers];

    if (value === "single")
      updatedTiers[index].evaluations.to = updatedTiers[index].evaluations.from;
    else
      updatedTiers[index].evaluations.to =
        updatedTiers[index].evaluations.from + 1;
    updatedTiers[index].type = value;

    setCustomPlanTiers(updatedTiers);
  }

  function addCustomPlanTier() {
    const from = customPlanTiers.at(-1)?.evaluations.to || 0;
    setCustomPlanTiers([
      ...customPlanTiers,
      {
        _id: "",
        type: "single",
        evaluations: {
          from,
          to: from + 1,
        },
        price: 0,
      } as CustomPlanType,
    ]);
  }

  function removeCustomPlanTier(index: number) {
    const updatedTiers = customPlanTiers.filter((_, i) => i !== index);
    setCustomPlanTiers(updatedTiers);
  }

  function handleDiscussionTopicChange(topic: keyof typeof discussionTopics) {
    setDiscussionTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  }

  function handleVirtualConsultationRateChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const newValue = parseFloat(e.target.value);
    setVirtualConsultationRate(Math.round(newValue));
  }

  function handleVirtualConsultationRateStep(step: number) {
    setVirtualConsultationRate((prevRate) =>
      Math.max(0, Math.round(prevRate + step)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const pricingPlanData = {
      ...pricingPlan,
      offerCustomPlan,
      customPlanTiers: offerCustomPlan ? customPlanTiers : undefined,
      standardPlans,
      offerVirtualConsultation,
      virtualConsultationType: offerVirtualConsultation
        ? virtualConsultationType
        : undefined,
      virtualConsultationDuration: offerVirtualConsultation
        ? virtualConsultationDuration
        : undefined,
      virtualConsultationRate: offerVirtualConsultation
        ? virtualConsultationRate
        : undefined,
      discussionTopics: offerVirtualConsultation ? discussionTopics : undefined,
      firstEvaluationDays,
    } as AEPricingPlanType;

    setLoading(true);
    const data = pricingPlan
      ? await updatePricingPlan(pricingPlan._id, pricingPlanData)
      : await createPricingPlan(pricingPlanData);
    if (data?.error) setError(data?.error);
    setLoading(false);
  }

  const customPlanError = customPlanTiers.some((tier, index) => {
    if (tier.type === "range") {
      if (index === 0 && tier.evaluations.from <= 0) {
        return true;
      }

      if (tier.evaluations.to <= tier.evaluations.from) {
        return true;
      }
    }
    if (Number(tier.price) <= 0) {
      return true;
    }
    if (
      index > 0 &&
      tier.evaluations.from <= customPlanTiers[index - 1].evaluations.to
    ) {
      return true;
    }
    return false;
  });

  const cannotSubmit =
    (offerVirtualConsultation &&
      !Object.values(discussionTopics).some((value) => value)) ||
    customPlanError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Standard Plans</h3>
        <div className="mb-2 grid grid-cols-4 gap-4">
          <Label>Plan Type</Label>
          <Label>Sessions</Label>
          <Label>Rate</Label>
          <Label>Plan Total</Label>
        </div>
        {standardPlans.map((plan, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <Input value={plan.name} readOnly className="bg-gray-100" />
            <Input
              type="text"
              value={plan.evaluations}
              readOnly
              className="bg-gray-100"
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                $
              </span>
              <Input
                type="number"
                value={plan.price > 0 ? plan.price : ""}
                onChange={(e) =>
                  handleStandardPlanPriceChange(index, Number(e.target.value))
                }
                placeholder="Price per Session"
                className="pl-6 pr-24"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                /evaluation
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700">
                ${plan.evaluations * plan.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="offerCustomPlan"
          checked={offerCustomPlan}
          onCheckedChange={setOfferCustomPlan}
        />
        <Label htmlFor="offerCustomPlan">Offer Custom Plan</Label>
      </div>
      {offerCustomPlan && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Custom Plan Tiers</h3>
          <div className="mb-2 grid grid-cols-4 gap-4">
            <Label>Type</Label>
            <Label>Sessions</Label>
            <Label>Rate</Label>
            <Label>Plan Total</Label>
          </div>
          {customPlanTiers.map((tier, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Select
                  onChange={(value) =>
                    handleCustomPlanTypeChange(
                      index,
                      value as CustomPlanType["type"],
                    )
                  }
                  value={tier.type}
                  defaultChild={tier.type[0].toUpperCase() + tier.type.slice(1)}
                >
                  <Select.Content>
                    <Select.Option value={"single"}>Single</Select.Option>
                    <Select.Option value={"range"}>Range</Select.Option>
                  </Select.Content>
                </Select>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={
                      tier.evaluations.from > 0 ? tier.evaluations.from : ""
                    }
                    onChange={(e) => {
                      handleCustomPlanEvaluationsChange(index, {
                        ...customPlanTiers[index].evaluations,
                        from: Number(e.target.value),
                      });
                    }}
                    placeholder="Number of Sessions"
                    required
                  />
                  {tier.type === "range" && (
                    <>
                      -
                      <Input
                        type="number"
                        value={
                          tier.evaluations.to > 0 ? tier.evaluations.to : ""
                        }
                        onChange={(e) => {
                          handleCustomPlanEvaluationsChange(index, {
                            ...customPlanTiers[index].evaluations,
                            to: Number(e.target.value),
                          });
                        }}
                        placeholder="Number of Sessions"
                        required
                      />
                    </>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    value={tier.price > 0 ? tier.price : ""}
                    onChange={(e) =>
                      handleCustomPlanPriceChange(index, Number(e.target.value))
                    }
                    min={0}
                    placeholder="Price per Session"
                    className="pl-6 lg:pr-24"
                    required
                  />
                  <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 transform text-gray-500 lg:inline">
                    /evaluation
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    ${tier.evaluations.from * tier.price}{" "}
                    {tier.type === "range" &&
                      `- $${tier.evaluations.to * tier.price}`}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeCustomPlanTier(index)}
                    className="ml-2"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {index > 0 &&
                tier.evaluations.from <=
                  customPlanTiers[index - 1].evaluations.to ? (
                  <Error error="Please enter a number higher than the previous plan" />
                ) : null}

                {tier.type === "range" &&
                index === 0 &&
                tier.evaluations.from <= 0 ? (
                  <Error error="Please enter a valid 'from' range" />
                ) : null}

                {tier.type === "range" &&
                tier.evaluations.to <= tier.evaluations.from ? (
                  <Error error="Please enter a valid range" />
                ) : null}

                {Number(tier.price) <= 0 ? (
                  <Error error="Please enter a valid price" />
                ) : null}
              </div>
            </div>
          ))}
          <div>
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={addCustomPlanTier}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Custom Plan Tier
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-lg font-semibold">
          Online Virtual Athlete Evaluation Consultation Sessions
        </h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="offerVirtualConsultation"
            checked={offerVirtualConsultation}
            onCheckedChange={setOfferVirtualConsultation}
          />
          <Label htmlFor="offerVirtualConsultation">
            Offer Virtual Consultations along with Athlete Evaluation
          </Label>
        </div>
        {offerVirtualConsultation && (
          <div className="space-y-4">
            <RadioGroup
              value={virtualConsultationType}
              onValueChange={(value) =>
                setVirtualConsultationType(value as "addon" | "included")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="included" id="included" />
                <Label htmlFor="included">
                  Included with every Athlete Evaluation Session
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="addon" id="addon" />
                <Label htmlFor="addon">Add-on purchase</Label>
              </div>
            </RadioGroup>
            <div className="rounded-md border p-3">
              <Label className="mb-2 block text-base font-medium">
                Discussion Topics
              </Label>
              <div className="space-y-2">
                {Object.entries(discussionTopics).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-2"
                  >
                    <Label htmlFor={key} className="flex-grow">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={() =>
                        handleDiscussionTopicChange(
                          key as keyof typeof discussionTopics,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="virtualConsultationDuration">
                Virtual Consultation Duration:
              </Label>
              <div className="relative flex-grow">
                <Input
                  id="virtualConsultationDuration"
                  type="number"
                  value={
                    virtualConsultationDuration > 0
                      ? virtualConsultationDuration
                      : ""
                  }
                  onChange={(e) =>
                    setVirtualConsultationDuration(Number(e.target.value))
                  }
                  className="pr-12"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                  min
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="virtualConsultationRate">
                Rate per Virtual Consultation:
              </Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                    $
                  </span>
                  <Input
                    id="virtualConsultationRate"
                    type="number"
                    value={
                      virtualConsultationRate > 0 ? virtualConsultationRate : ""
                    }
                    onChange={handleVirtualConsultationRateChange}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        handleVirtualConsultationRateStep(1);
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        handleVirtualConsultationRateStep(-1);
                      }
                    }}
                    min={0}
                    step={1}
                    className="pl-6 pr-3"
                    required
                  />
                </div>
                <span className="text-gray-500">/consultation</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-lg font-semibold">
          First Athlete Evaluation Delivery Timeframe
        </h3>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="firstEvaluationDays">
            Days to deliver the first evaluation from the date of purchase by
            the athlete:
          </Label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                id="firstEvaluationDays"
                type="number"
                value={firstEvaluationDays > 0 ? firstEvaluationDays : ""}
                onChange={(e) => setFirstEvaluationDays(Number(e.target.value))}
                min={1}
                className="pr-12"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                days
              </span>
            </div>
          </div>

          {error && <Error error={error} />}
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <BackButton />
        <Button
          disabled={cannotSubmit || loading}
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          {loading ? (
            <>
              <LoadingIndicator /> Saving...
            </>
          ) : (
            "Save Athlete Evaluation Pricing Plans"
          )}
        </Button>
      </div>
    </form>
  );
}
