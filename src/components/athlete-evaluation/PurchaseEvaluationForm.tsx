"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format, addMonths, addDays } from "date-fns";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Select from "../Select";
import Image from "next/image";

type PlanType =
  | "monthly"
  | "quarterly"
  | "semi-annual"
  | "yearly"
  | "custom"
  | "";

interface PlanDetails {
  subscriptions: number;
  interval: number;
}

interface StandardPlan {
  id: PlanType;
  name: string;
  evaluations: number;
  price: number;
  total: number;
}

interface CustomPlanTier {
  evaluations: number | string;
  price: number;
  total: number | string;
}

const planDetails: Record<Exclude<PlanType, "custom" | "">, PlanDetails> = {
  monthly: { subscriptions: 12, interval: 1 },
  quarterly: { subscriptions: 4, interval: 3 },
  "semi-annual": { subscriptions: 2, interval: 6 },
  yearly: { subscriptions: 1, interval: 12 },
};

const clubNames: Record<string, string> = {
  riverside: "Riverside Basketball Club",
};

const standardPlans: StandardPlan[] = [
  { id: "monthly", name: "Monthly", evaluations: 12, price: 70, total: 840 },
  { id: "quarterly", name: "Quarterly", evaluations: 4, price: 80, total: 320 },
  {
    id: "semi-annual",
    name: "Semi Annual",
    evaluations: 2,
    price: 90,
    total: 180,
  },
  { id: "yearly", name: "Yearly", evaluations: 1, price: 110, total: 110 },
];

const customPlanTiers: CustomPlanTier[] = [
  { evaluations: 1, price: 110, total: 110 },
  { evaluations: 2, price: 90, total: 180 },
  { evaluations: 3, price: 85, total: 255 },
  { evaluations: "4-6", price: 80, total: "320-480" },
  { evaluations: "7-11", price: 75, total: "525-825" },
  { evaluations: "12+", price: 70, total: "840+" },
];

export default function PurchaseEvaluationForm() {
  const [planType, setPlanType] = useState<PlanType>("");
  const [subscriptions, setSubscriptions] = useState(0);
  const [template, setTemplate] = useState("");
  const [club, setClub] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [firstEvaluationDate, setFirstEvaluationDate] = useState<
    Date | undefined
  >(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Virtual Consultation states
  const [virtualConsultationOffered, setVirtualConsultationOffered] =
    useState(false);
  const [virtualConsultationType, setVirtualConsultationType] = useState<
    "included" | "addon" | "not-offered"
  >("not-offered");
  const [virtualConsultationDuration, setVirtualConsultationDuration] =
    useState(30);
  const [virtualConsultationRate, setVirtualConsultationRate] = useState(0);
  const [addVirtualConsultation, setAddVirtualConsultation] = useState(false);
  const [virtualConsultationsCount, setVirtualConsultationsCount] = useState(0);
  const [discussionTopics, setDiscussionTopics] = useState({
    athleteEvaluation: true,
    goalSetting: true,
    dailyJournal: true,
    other: true,
  });

  const handlePlanTypeChange = (value: PlanType) => {
    setPlanType(value);
    setSelectedDates([]);
    setFirstEvaluationDate(undefined);

    const selectedPlan = standardPlans.find((plan) => plan.id === value);
    if (selectedPlan) {
      setSubscriptions(selectedPlan.evaluations);
    } else if (value === "custom") {
      setSubscriptions(1);
    } else {
      setSubscriptions(0);
    }
    setVirtualConsultationsCount(0);
  };

  const handleCustomSubscriptionsChange = (value: number) => {
    setSubscriptions(value);
    setSelectedDates([]);
    setVirtualConsultationsCount(0);
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (planType === "custom") {
      const customTier = customPlanTiers.find((tier) => {
        if (typeof tier.evaluations === "number") {
          return tier.evaluations === subscriptions;
        } else {
          const [min, max] = tier.evaluations.split("-").map(Number);
          return subscriptions >= min && (!max || subscriptions <= max);
        }
      });
      if (customTier) {
        price =
          typeof customTier.total === "number"
            ? customTier.total
            : parseInt(customTier.total);
      }
    } else {
      const selectedPlan = standardPlans.find((plan) => plan.id === planType);
      if (selectedPlan) {
        price = selectedPlan.total;
      }
    }

    if (addVirtualConsultation) {
      price += virtualConsultationRate * virtualConsultationsCount;
    }

    setTotalPrice(price);
  };

  const handleDateSelect = (dates: Date | Date[] | undefined) => {
    if (planType === "custom" && Array.isArray(dates)) {
      setSelectedDates(
        dates.slice(0, subscriptions).sort((a, b) => a.getTime() - b.getTime()),
      );
    } else if (planType !== "custom" && dates instanceof Date) {
      setFirstEvaluationDate(dates);
      const selectedPlan = standardPlans.find((plan) => plan.id === planType);
      if (selectedPlan) {
        const newDates = [dates];
        for (let i = 1; i < selectedPlan.evaluations; i++) {
          newDates.push(addMonths(dates, i * (12 / selectedPlan.evaluations)));
        }
        setSelectedDates(newDates);
      }
    }
    setCalendarOpen(false); // Close the calendar after selection
  };

  const handleVirtualConsultationsCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= subscriptions) {
      setVirtualConsultationsCount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!club) {
      alert("Please select a club/program before purchasing.");
      return;
    }
    if (planType === "custom" && selectedDates.length !== subscriptions) {
      alert(
        `Please select exactly ${subscriptions} date${subscriptions > 1 ? "s" : ""} for your evaluations.`,
      );
      return;
    }
    if (planType !== "custom" && !firstEvaluationDate) {
      alert("Please select your first evaluation date.");
      return;
    }
    console.log({
      club,
      planType,
      subscriptions,
      totalPrice,
      selectedDates,
      firstEvaluationDate,
      virtualConsultationOffered,
      virtualConsultationType,
      virtualConsultationDuration,
      virtualConsultationRate,
      addVirtualConsultation,
      virtualConsultationsCount,
      discussionTopics,
    });
  };

  const minDate = addDays(new Date(), 7);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow px-4 py-8">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Purchase an Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select your club/program you want to be evaluated by
                </label>
                <Select
                  placeholder="Select your club/program"
                  value={template}
                  onChange={setTemplate}
                >
                  <Select.Content>
                    <Select.Option value="riverside">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg"
                          alt="Riverside Basketball Club"
                          width={24}
                          height={24}
                          className="mr-2 rounded-full"
                        />
                        Riverside Basketball Club
                      </div>
                    </Select.Option>
                  </Select.Content>
                </Select>
              </div>
              {club === "riverside" && (
                <div className="mt-6 rounded-lg bg-gray-50 p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Riverside Basketball Club Pricing
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-gray-700">
                        Standard Plans
                      </h4>
                      {standardPlans.map((plan) => (
                        <div key={plan.id} className="flex items-center">
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                          <span className="text-gray-600">
                            <span className="font-medium">{plan.name}:</span> $
                            {plan.price}/evaluation
                            {plan.evaluations > 1 &&
                              ` (${plan.evaluations} evaluations)`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-medium text-gray-700">
                        Custom Plan
                      </h4>
                      {customPlanTiers.map((tier) => (
                        <div
                          key={tier.evaluations.toString()}
                          className="flex items-center"
                        >
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                          <span className="text-gray-600">
                            <span className="font-medium">
                              {tier.evaluations} evaluation
                              {tier.evaluations !== 1 && "s"}:
                            </span>{" "}
                            ${tier.price}/each
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Plan Type
                </label>
                <Select
                  placeholder="Select a plan type"
                  value={planType}
                  onChange={handlePlanTypeChange}
                >
                  <Select.Content>
                    <Select.Option value="monthly">Monthly</Select.Option>
                    <Select.Option value="quarterly">Quarterly</Select.Option>
                    <Select.Option value="semi-annual">
                      Semi Annual
                    </Select.Option>
                    <Select.Option value="yearly">Yearly</Select.Option>
                    <Select.Option value="custom">Custom</Select.Option>
                  </Select.Content>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subscriptions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Evaluations
                </label>
                <Input
                  id="subscriptions"
                  type="number"
                  value={subscriptions}
                  onChange={(e) =>
                    planType === "custom"
                      ? handleCustomSubscriptionsChange(
                          parseInt(e.target.value) || 1,
                        )
                      : null
                  }
                  readOnly={planType !== "custom"}
                  className={planType !== "custom" ? "bg-gray-100" : ""}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Evaluation Dates
                </label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {planType === "custom"
                        ? selectedDates.length > 0
                          ? `${selectedDates.length} date${selectedDates.length > 1 ? "s" : ""} selected`
                          : "Select dates"
                        : firstEvaluationDate
                          ? format(firstEvaluationDate, "MMMM d, yyyy")
                          : "Select first evaluation date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    {/* <Calendar
                      // mode={planType === "custom" ? "multiple" : "single"}
                      mode={planType === "custom" ? "multiple" : "single"}
                      selected={
                        planType === "custom"
                          ? selectedDates
                          : firstEvaluationDate
                      }
                      onSelect={handleDateSelect}
                      disabled={(date) => isBefore(date, minDate)}
                      max={planType === "custom" ? subscriptions : undefined}
                      fromMonth={new Date()}
                      toMonth={addMonths(new Date(), 12)}
                    /> */}
                  </PopoverContent>
                </Popover>
                {selectedDates.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">
                      Evaluation Dates:
                    </p>
                    <ul className="list-inside list-disc">
                      {selectedDates.map((date, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {format(date, "MMMM d, yyyy")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {club && virtualConsultationOffered && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <h3 className="text-lg font-semibold">
                    Online Virtual Athlete Evaluation Consultation Session
                  </h3>
                  <p className="text-sm text-gray-600">
                    You have the option to add {virtualConsultationDuration}
                    -minute online consultations for an additional $
                    {virtualConsultationRate} each.
                  </p>
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold">
                      Discussion Topics:
                    </h4>
                    <ul className="list-inside list-disc text-sm text-gray-600">
                      {Object.entries(discussionTopics).map(
                        ([key, value]) =>
                          value && (
                            <li key={key}>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="addVirtualConsultation"
                        checked={addVirtualConsultation}
                        onCheckedChange={setAddVirtualConsultation}
                      />
                      <Label htmlFor="addVirtualConsultation">
                        Add Virtual Consultation to my purchase
                      </Label>
                    </div>
                    {addVirtualConsultation && (
                      <div className="space-y-2">
                        <Label htmlFor="virtualConsultationsCount">
                          Number of Virtual Consultations
                        </Label>
                        <Input
                          id="virtualConsultationsCount"
                          type="number"
                          min={0}
                          max={subscriptions}
                          value={virtualConsultationsCount}
                          onChange={handleVirtualConsultationsCountChange}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600">
                          Total for Virtual Consultations: $
                          {virtualConsultationRate * virtualConsultationsCount}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="text-lg font-bold sm:text-xl">
                Total Price: ${totalPrice}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Purchase an Evaluation from{" "}
                {club ? clubNames[club] : "Selected Club"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
