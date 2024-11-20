"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import CongratulationsScreen from "@/components/weekly-reflection/CongratulationsScreen";
import ReflectionOverviewScreen from "@/components/weekly-reflection/ReflectionOverviewScreen";
import ReflectionGoalScreen from "@/components/weekly-reflection/ReflectionGoalScreen";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { performWeeklyReflection } from "@/actions/goalActions";
import { notFound } from "next/navigation";

export type ReflectionType = {
  completion: "";
  improvement: "";
  isCompleted: boolean;
};

export type ReflectionDataType = {
  goalId: string;
  reflection: ReflectionType;
};

export default function WeeklyReflectionForm({
  goalData,
}: {
  goalData: GoalDataSchemaType;
}) {
  const goals = [...goalData.goals];
  const [loading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("reflection-overview");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [showError, setShowError] = useState(false);
  const [reflectionData, setReflectionData] = useState<ReflectionDataType[]>(
    goals.map((goal) => ({
      goalId: goal._id as string,
      reflection: {
        completion: "",
        improvement: "",
        isCompleted: false,
      },
    })) || []
  );

  function updateReflectionData(
    goalIndex: number,
    field: string,
    value: string | boolean
  ) {
    setReflectionData((prevData) => {
      const newData = [...prevData];
      newData[goalIndex].reflection = {
        ...newData[goalIndex].reflection,
        [field]: value,
      };
      return newData;
    });
    setShowError(false);
  }

  if (!goalData) notFound();

  const handleGoalCompletion = (goalIndex: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCurrentGoalIndex(goalIndex);
      setShowConfirmation(true);
    } else {
      updateReflectionData(goalIndex, "isCompleted", false);
    }
  };

  function confirmGoalCompletion() {
    updateReflectionData(currentGoalIndex, "isCompleted", true);
    setShowConfirmation(false);
  }

  async function handleSubmitReflection() {
    setLoading(true);
    if (isFormValid(currentGoalIndex)) {
      const { error } = await performWeeklyReflection(
        goalData._id as string,
        reflectionData
      );
      setLoading(false);
      if (error) return;
      setCurrentScreen("congratulations");
    } else {
      setShowError(true);
    }
    setLoading(false);
  }

  function isFormValid(goalIndex: number) {
    return (
      reflectionData[goalIndex].reflection.improvement.trim() !== "" &&
      reflectionData[goalIndex].reflection.completion.trim() !== ""
    );
  }

  return (
    <>
      <main className="flex-1 bg-background">
        {currentScreen === "reflection-overview" && (
          <ReflectionOverviewScreen
            setCurrentScreen={setCurrentScreen}
            goals={goals}
          />
        )}
        {goalData.goals
          .filter((goal) => goal.dateCompleted === null)
          .map(
            (goal, index) =>
              currentScreen === `reflection-goal-${index + 1}` && (
                <ReflectionGoalScreen
                  goals={goalData.goals.filter(
                    (goal) => goal.dateCompleted === null
                  )}
                  key={index}
                  goalIndex={index}
                  handleGoalCompletion={handleGoalCompletion}
                  handleSubmitReflection={handleSubmitReflection}
                  isFormValid={isFormValid}
                  reflectionData={reflectionData}
                  setCurrentScreen={setCurrentScreen}
                  setShowError={setShowError}
                  showError={showError}
                  updateReflectionData={updateReflectionData}
                  loading={loading}
                />
              )
          )}
        {currentScreen === "congratulations" && (
          <CongratulationsScreen
            reflectionData={reflectionData}
            goals={goals}
          />
        )}
      </main>
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Goal Completion</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this goal as complete?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={confirmGoalCompletion}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
