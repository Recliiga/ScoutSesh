import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MinusCircle, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  CustomPlanType,
  StandardPlanType,
} from "@/db/models/AthleteEvaluationPricing";

export default function AthleteEvaluationPricingForm() {
  const [offerCustomPlan, setOfferCustomPlan] = useState(false);
  const [standardPlans, setStandardPlans] = useState<StandardPlanType[]>([
    { name: "Monthly", evaluations: 12, price: 70 },
    { name: "Quarterly", evaluations: 4, price: 80 },
    { name: "Semi Annual", evaluations: 2, price: 90 },
    { name: "Yearly", evaluations: 1, price: 110 },
  ]);
  const [customPlanTiers, setCustomPlanTiers] = useState<CustomPlanType[]>([
    { evaluations: { from: 1, to: 1 }, price: 0, type: "single" },
  ]);
  const [offerVirtualConsultation, setOfferVirtualConsultation] =
    useState(false);
  const [virtualConsultationType, setVirtualConsultationType] = useState<
    "addon" | "included"
  >("included");
  const [virtualConsultationDuration, setVirtualConsultationDuration] =
    useState(30);
  const [discussionTopics, setDiscussionTopics] = useState({
    athleteEvaluation: false,
    goalSetting: false,
    dailyJournal: false,
    other: false,
  });
  const [firstEvaluationDays, setFirstEvaluationDays] = useState(7);
  const [virtualConsultationRate, setVirtualConsultationRate] = useState(0);

  useEffect(() => {
    const selectedTopicsCount =
      Object.values(discussionTopics).filter(Boolean).length;
    setVirtualConsultationDuration(selectedTopicsCount >= 3 ? 45 : 30);
  }, [discussionTopics]);

  const handleStandardPlanPriceChange = (index: number, value: number) => {
    const updatedPlans = [...standardPlans];
    updatedPlans[index].price = value;
    setStandardPlans(updatedPlans);
  };

  const handleCustomPlanEvaluationsChange = (
    index: number,
    value: { from: number; to: number }
  ) => {
    const updatedTiers = [...customPlanTiers];
    updatedTiers[index].evaluations = value;
    setCustomPlanTiers(updatedTiers);
  };

  const handleCustomPlanPriceChange = (index: number, value: number) => {
    const updatedTiers = [...customPlanTiers];
    updatedTiers[index].price = value;
    setCustomPlanTiers(updatedTiers);
  };

  const handleCustomPlanTypeChange = (
    index: number,
    value: "single" | "range"
  ) => {
    const updatedTiers = [...customPlanTiers];

    if (value === "single")
      updatedTiers[index].evaluations.to = updatedTiers[index].evaluations.from;
    else
      updatedTiers[index].evaluations.to =
        updatedTiers[index].evaluations.from + 1;
    updatedTiers[index].type = value;

    setCustomPlanTiers(updatedTiers);
  };

  const addCustomPlanTier = () => {
    setCustomPlanTiers([
      ...customPlanTiers,
      { type: "single", evaluations: { from: 0, to: 0 }, price: 0 },
    ]);
  };

  const removeCustomPlanTier = (index: number) => {
    const updatedTiers = customPlanTiers.filter((_, i) => i !== index);
    setCustomPlanTiers(updatedTiers);
  };

  const handleDiscussionTopicChange = (
    topic: keyof typeof discussionTopics
  ) => {
    setDiscussionTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleVirtualConsultationRateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseFloat(e.target.value);
    setVirtualConsultationRate(Math.round(newValue));
  };

  const handleVirtualConsultationRateStep = (step: number) => {
    setVirtualConsultationRate((prevRate) =>
      Math.max(0, Math.round(prevRate + step))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    const data = {
      offerCustomPlan,
      standardPlans,
      customPlanTiers: offerCustomPlan ? customPlanTiers : undefined,
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
    };
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Standard Plans</h3>
        <div className="grid grid-cols-4 gap-4 mb-2">
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                type="number"
                value={plan.price}
                onChange={(e) =>
                  handleStandardPlanPriceChange(index, Number(e.target.value))
                }
                placeholder="Price per Session"
                className="pl-6 pr-24"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                /evaluation
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 font-medium">
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Plan Tiers</h3>
          <div className="grid grid-cols-4 gap-4 mb-2">
            <Label>Type</Label>
            <Label>Sessions</Label>
            <Label>Rate</Label>
            <Label>Plan Total</Label>
          </div>
          {customPlanTiers.map((tier, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <Select
                value={tier.type}
                onValueChange={(value) =>
                  handleCustomPlanTypeChange(
                    index,
                    value as CustomPlanType["type"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="range">Range</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={tier.evaluations.from > 0 ? tier.evaluations.from : ""}
                  onChange={(e) => {
                    if (
                      Number(e.target.value) <=
                      customPlanTiers[index - 1].evaluations.to
                    )
                      return;

                    if (Number(e.target.value) <= tier.evaluations.to) {
                      handleCustomPlanEvaluationsChange(index, {
                        ...customPlanTiers[index].evaluations,
                        from: Number(e.target.value),
                      });
                    } else {
                      handleCustomPlanEvaluationsChange(index, {
                        to: Number(e.target.value),
                        from: Number(e.target.value),
                      });
                    }
                  }}
                  placeholder="Number of Sessions"
                />
                {tier.type === "range" && (
                  <>
                    -
                    <Input
                      type="number"
                      value={tier.evaluations.to > 0 ? tier.evaluations.to : ""}
                      onChange={(e) => {
                        if (Number(e.target.value) > tier.evaluations.from)
                          handleCustomPlanEvaluationsChange(index, {
                            ...customPlanTiers[index].evaluations,
                            to: Number(e.target.value),
                          });
                      }}
                      placeholder="Number of Sessions"
                    />
                  </>
                )}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  value={tier.price > 0 ? tier.price : ""}
                  onChange={(e) =>
                    handleCustomPlanPriceChange(index, Number(e.target.value))
                  }
                  placeholder="Price per Session"
                  className="pl-6 pr-24"
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  /evaluation
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">
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
          ))}
          <div>
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={addCustomPlanTier}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
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
            <div className="border rounded-md p-3">
              <Label className="text-base font-medium mb-2 block">
                Discussion Topics
              </Label>
              <div className="space-y-2">
                {Object.entries(discussionTopics).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
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
                          key as keyof typeof discussionTopics
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
                  value={virtualConsultationDuration}
                  onChange={(e) =>
                    setVirtualConsultationDuration(Number(e.target.value))
                  }
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="virtualConsultationRate"
                    type="number"
                    value={virtualConsultationRate}
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
                value={firstEvaluationDays}
                onChange={(e) => setFirstEvaluationDays(Number(e.target.value))}
                min={1}
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                days
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
      >
        Save Athlete Evaluation Pricing Plans
      </Button>
    </form>
  );
}
