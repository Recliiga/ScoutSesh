"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { addMonths, format, isBefore } from "date-fns";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Select from "../Select";
import Image from "next/image";
import { AEPricingPlanType } from "@/db/models/AthleteEvaluationPricingPlan";
import { OrganizationType } from "@/db/models/Organization";
import DatePicker from "../DatePicker";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";
import { purchaseEvaluation } from "@/actions/AthleteEvaluationActions";
import BackButton from "../dashboard/BackButton";

type PlanType =
  | "Monthly"
  | "Quarterly"
  | "Semi Annual"
  | "Yearly"
  | "custom"
  | "";

type ProgramType = { plan: AEPricingPlanType; organization: OrganizationType };

type FrequencyType = Exclude<PlanType, "custom" | "">;

function generateEvaluationDates(
  startDate: Date,
  numberOfDates: number,
  frequency: FrequencyType,
) {
  const dates = [];
  const currentDate = new Date(startDate);

  while (dates.length < numberOfDates) {
    dates.push(new Date(currentDate));

    switch (frequency) {
      case "Monthly":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "Quarterly":
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case "Semi Annual":
        currentDate.setMonth(currentDate.getMonth() + 6);
        break;
      case "Yearly":
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;

      default:
        break;
    }
  }
  return dates;
}

export default function PurchaseEvaluationForm({
  programs: programs,
}: {
  programs: ProgramType[];
}) {
  const [planType, setPlanType] = useState<PlanType>("");
  const [evaluations, setEvaluations] = useState(0);
  const [pricingPlan, setPricingPlan] = useState<string>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [virtualConsultationsCount, setVirtualConsultationsCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedProgram = programs.find(
    (program) => program.plan._id === pricingPlan,
  );
  const [includeVirtualConsultation, setIncludeVirtualConsultation] =
    useState(false);

  const addVirtualConsultation =
    selectedProgram?.plan.offerVirtualConsultation &&
    selectedProgram.plan.virtualConsultationType === "included"
      ? true
      : includeVirtualConsultation;

  const selectedPlanType = selectedProgram?.plan.standardPlans.find(
    (plan) => plan.name === planType,
  );

  const selectedPlanEvaluations = selectedPlanType
    ? selectedPlanType.evaluations
    : evaluations;

  const customPlanPrices = selectedProgram?.plan.offerCustomPlan
    ? selectedProgram.plan.customPlanTiers?.flatMap((plan) =>
        new Array(plan.evaluations.to - plan.evaluations.from + 1)
          .fill(0)
          .map((_, index) => ({
            evaluations: index + plan.evaluations.from,
            price: plan.price,
          })),
      )
    : [];

  const maxCustomEvaluations = Math.max(
    ...customPlanPrices.map((plan) => plan.evaluations),
  );

  const selectedPlanPrice =
    planType === "custom"
      ? customPlanPrices.find(
          (plan) => plan.evaluations === selectedPlanEvaluations,
        )?.price || 0
      : selectedPlanType
        ? selectedPlanType.price
        : 0;

  const virtualConsultationDuration = selectedProgram?.plan
    .offerVirtualConsultation
    ? selectedProgram.plan.virtualConsultationDuration
    : 30;
  const virtualConsultationRate = selectedProgram?.plan.offerVirtualConsultation
    ? selectedProgram.plan.virtualConsultationRate
    : 0;

  const virtualConsultationPrice = addVirtualConsultation
    ? virtualConsultationRate * virtualConsultationsCount
    : 0;

  const firstEvaluationDate = [...selectedDates].sort(
    (a, b) => b.getTime() - a.getTime(),
  )[0];

  const evaluationDates =
    planType === "custom"
      ? selectedDates
      : generateEvaluationDates(
          selectedDates[0]!,
          selectedPlanEvaluations,
          planType as FrequencyType,
        );

  const totalPrice =
    selectedPlanPrice * selectedPlanEvaluations + virtualConsultationPrice;

  const cannotSubmit = !selectedProgram || !planType || !firstEvaluationDate;

  function handlePlanTypeChange(value: PlanType) {
    setPlanType(value);
    if (value === "custom" || "") setSelectedDates([]);

    if (value === "custom") {
      setEvaluations(1);
    }

    setVirtualConsultationsCount(1);
  }

  function toggleAddVirtualConsultation(value: boolean) {
    setIncludeVirtualConsultation(value);
    if (!value) setVirtualConsultationsCount(1);
  }

  const handleCustomSubscriptionsChange = (value: number) => {
    setEvaluations(value);
    setSelectedDates([]);
    if (value < virtualConsultationsCount) setVirtualConsultationsCount(value);
  };

  function handleDateSelect(dates: Date[] | undefined) {
    if (!dates?.length) return;

    if (planType === "custom") {
      setSelectedDates(
        dates
          .sort((a, b) => a.getTime() - b.getTime())
          .slice(0, selectedPlanEvaluations),
      );
      if (dates.length >= selectedPlanEvaluations) setCalendarOpen(false);
    } else {
      setSelectedDates([dates.at(-1)!]);
      setCalendarOpen(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (selectedProgram && pricingPlan) {
      if (
        planType === "custom" &&
        selectedDates.length !== selectedPlanEvaluations
      ) {
        setError(
          `Please select exactly ${selectedPlanEvaluations} date${selectedPlanEvaluations > 1 ? "s" : ""} for your evaluations.`,
        );
        setLoading(false);
        return;
      }
      if (planType !== "custom" && !firstEvaluationDate) {
        setLoading(false);
        setError("Please select your first evaluation date.");
        return;
      }

      if (cannotSubmit) {
        setLoading(false);
        return;
      }
      const evaluationPurchaseData = {
        plan: planType,
        evaluations: selectedPlanEvaluations,
        pricingPlan: selectedProgram.plan,
        pricingPlanId: selectedProgram.plan._id,
        evaluationDates: evaluationDates.map((date) => ({
          date,
          dateCoachEvaluated: undefined,
          dateAthleteEvaluated: undefined,
        })),
        addVirtualConsultation,
        discussionTopics:
          addVirtualConsultation &&
          selectedProgram.plan.offerVirtualConsultation
            ? selectedProgram.plan.discussionTopics
            : undefined,
        virtualConsultationDuration: addVirtualConsultation
          ? virtualConsultationDuration
          : undefined,
        totalPrice,
      };

      const data = await purchaseEvaluation(
        evaluationPurchaseData,
        String(selectedProgram.organization.user),
      );
      if (data?.error) setError(data.error);
    }
    setLoading(false);
  }

  return (
    <main className="mx-auto w-[90%] max-w-4xl flex-1 py-8">
      <Card className="p-4 sm:p-6">
        <CardHeader className="p-0">
          <CardTitle className="mb-4 text-center text-2xl font-bold">
            Purchase an Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Select your club/program you want to be evaluated by
              </label>
              <Select
                placeholder="Select your club/program"
                value={pricingPlan}
                onChange={setPricingPlan}
              >
                <Select.Content>
                  {programs.map((program) => (
                    <Select.Option
                      key={program.plan._id}
                      value={program.plan._id}
                    >
                      <div className="flex items-center">
                        <div className="relative mr-2 flex h-6 w-6 items-center overflow-hidden rounded-full">
                          <Image
                            src={program.organization.logo}
                            alt={program.organization.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {program.organization.name}
                      </div>
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </div>
            {selectedProgram && (
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  {selectedProgram.organization.name} Pricing
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-gray-700">
                      Standard Plans
                    </h4>
                    {selectedProgram.plan.standardPlans.map((plan) => (
                      <div key={plan._id} className="flex items-center">
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
                    {selectedProgram.plan.offerCustomPlan
                      ? selectedProgram.plan.customPlanTiers.map((tier) => (
                          <div key={tier._id} className="flex items-center">
                            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                            <span className="text-gray-600">
                              <span className="font-medium">
                                {tier.evaluations.from}{" "}
                                {tier.evaluations.to !== tier.evaluations.from
                                  ? `- ${tier.evaluations.to}`
                                  : ""}{" "}
                                evaluation
                                {tier.evaluations.from !== 1 && "s"}:
                              </span>{" "}
                              ${tier.price}/each
                            </span>
                          </div>
                        ))
                      : null}
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
                disabled={!selectedProgram}
              >
                <Select.Content>
                  {selectedProgram?.plan.standardPlans.map((plan) => (
                    <Select.Option key={plan._id} value={plan.name}>
                      {plan.name}
                    </Select.Option>
                  ))}
                  {selectedProgram?.plan.offerCustomPlan && (
                    <Select.Option value="custom">Custom</Select.Option>
                  )}
                </Select.Content>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="evaluations"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Evaluations
              </label>
              <Input
                id="evaluations"
                type="number"
                min={1}
                max={maxCustomEvaluations}
                value={selectedPlanEvaluations}
                onChange={(e) => {
                  if (Number(e.target.value) > maxCustomEvaluations) return;

                  if (planType === "custom") {
                    handleCustomSubscriptionsChange(
                      parseInt(e.target.value) || 1,
                    );
                  }
                }}
                readOnly={planType !== "custom"}
                className={planType !== "custom" ? "bg-gray-100" : ""}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {planType === "custom"
                  ? "Select Evaluation Dates"
                  : "Select First Evaluation Date"}
              </label>
              <DatePicker
                pickerDisabled={
                  !selectedPlanType && selectedPlanEvaluations <= 0
                }
                closeCalendar={() => setCalendarOpen(false)}
                calendarOpen={calendarOpen}
                toggleCalendar={() => setCalendarOpen((prev) => !prev)}
                selected={selectedDates}
                onSelect={handleDateSelect}
                disabled={(date) => isBefore(date, new Date())}
                max={
                  planType === "custom" ? selectedPlanEvaluations : undefined
                }
                fromMonth={new Date()}
                toMonth={addMonths(new Date(), 12)}
                mode="multiple"
              >
                {planType === "custom"
                  ? selectedDates.length > 0
                    ? `${selectedDates.length} date${selectedDates.length > 1 ? "s" : ""} selected`
                    : "Select dates"
                  : firstEvaluationDate
                    ? format(firstEvaluationDate, "MMMM d, yyyy")
                    : "Select first evaluation date"}
              </DatePicker>
              {selectedDates.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    Evaluation Dates:
                  </p>
                  <ul className="grid list-inside list-disc grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-2 lg:grid-cols-4">
                    {evaluationDates.map((date, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {format(date, "MMMM d, yyyy")}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedProgram &&
              selectedProgram.plan.offerVirtualConsultation &&
              selectedPlanType && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <h3 className="text-lg font-semibold">
                    Online Virtual Athlete Evaluation Consultation Session
                  </h3>
                  <p className="text-sm text-gray-600">
                    You have the option to add up to{" "}
                    <span className="font-bold">{selectedPlanEvaluations}</span>
                    , {virtualConsultationDuration}
                    -minute online consultations for an additional $
                    {virtualConsultationRate} each.
                  </p>
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold">
                      Discussion Topics:
                    </h4>
                    <ul className="list-inside list-disc text-sm text-gray-600">
                      {Object.entries(
                        selectedProgram.plan.discussionTopics,
                      ).map(
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
                    {selectedProgram.plan.virtualConsultationType ===
                    "addon" ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="addVirtualConsultation"
                          checked={addVirtualConsultation}
                          onCheckedChange={toggleAddVirtualConsultation}
                        />
                        <Label htmlFor="addVirtualConsultation">
                          Add Virtual Consultation to my purchase
                        </Label>
                      </div>
                    ) : null}
                    {addVirtualConsultation && (
                      <div className="space-y-2">
                        <Label htmlFor="virtualConsultationsCount">
                          Number of Virtual Consultations
                        </Label>
                        <Input
                          id="virtualConsultationsCount"
                          type="number"
                          min={1}
                          max={selectedPlanEvaluations}
                          value={virtualConsultationsCount}
                          onChange={(e) =>
                            setVirtualConsultationsCount(Number(e.target.value))
                          }
                          className="w-full"
                        />
                        <p className="text-sm text-gray-600">
                          Total for Virtual Consultations: $
                          {virtualConsultationPrice}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            <div className="text-lg font-bold sm:text-xl">
              Total Price: ${totalPrice}
            </div>

            {error && <Error error={error} />}

            <div className="flex gap-4">
              <BackButton />

              <Button
                disabled={loading || cannotSubmit}
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <LoadingIndicator />
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      {selectedProgram
                        ? `Purchase an Evaluation from ${selectedProgram.organization.name}`
                        : "Purchase Evaluation"}
                    </span>
                    <span className="sm:hidden">Purchase Evaluation</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
