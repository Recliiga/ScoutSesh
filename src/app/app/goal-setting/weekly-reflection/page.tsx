"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { GoalDataType } from "../new/page";
import CongratulationsScreen from "@/components/weekly-reflection/CongratulationsScreen";
import ReflectionOverviewScreen from "@/components/weekly-reflection/ReflectionOverviewScreen";
import ReflectionGoalScreen from "@/components/weekly-reflection/ReflectionGoalScreen";

const goalData: GoalDataType = {
  name: "New goal",
  details: { aspiration: "string", strengths: "string", weaknesses: "string" },
  goals: [
    {
      goal: "Increase shot accuracy from 70% to 85% for wrist shots within 20 feet of the goal in the next 3 months",
      actions:
        "Practice 100 wrist shots daily, focusing on technique and consistency. Use shot tracking technology to measure progress.",
      location: "Home rink shooting area and backyard practice net",
      frequency: "6 days per week, 30 minutes per session",
      confidence: "8",
      dateCompleted: null,
    },
    {
      goal: "Improve defensive positioning by reducing opponent scoring chances by 25% when on ice within 4 months",
      actions:
        "Study game footage of top defensemen for 2 hours weekly. Participate in 3 focused defensive drills each practice. Track on-ice defensive statistics.",
      location: "Team video room and practice rink",
      frequency:
        "Video study 2 times per week, defensive drills 4 times per week",
      confidence: "7",
      dateCompleted: null,
    },
    {
      goal: "Increase upper body strength by adding 15 lbs to bench press max and 5 pull-ups to current max in 2 months",
      actions:
        "Follow a structured weightlifting program designed by the team's strength coach. Log all workouts and track progress weekly.",
      location: "Team gym and home workout area",
      frequency: "3 times per week, 45-minute sessions",
      confidence: "9",
      dateCompleted: null,
    },
  ],
};

export type ReflectionType = {
  completion: "";
  improvement: "";
  isCompleted: false;
};

export default function WeeklyReflectionForm() {
  const [currentScreen, setCurrentScreen] = useState("reflection-overview");
  const [reflectionData, setReflectionData] = useState<ReflectionType[]>(
    goalData.goals.map(() => ({
      completion: "",
      improvement: "",
      isCompleted: false,
    }))
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [showError, setShowError] = useState(false);

  const updateReflectionData = useCallback(
    (goalIndex: number, field: string, value: string | boolean) => {
      setReflectionData((prevData) => {
        const newData = [...prevData];
        newData[goalIndex] = { ...newData[goalIndex], [field]: value };
        return newData;
      });
      setShowError(false);
    },
    []
  );

  const handleGoalCompletion = (goalIndex: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCurrentGoalIndex(goalIndex);
      setShowConfirmation(true);
    } else {
      updateReflectionData(goalIndex, "isCompleted", false);
    }
  };

  const confirmGoalCompletion = () => {
    updateReflectionData(currentGoalIndex, "isCompleted", true);
    goalData.goals[currentGoalIndex].dateCompleted = new Date().toISOString();
    setShowConfirmation(false);
  };

  const handleSubmitReflection = () => {
    if (isFormValid(currentGoalIndex)) {
      setCurrentScreen("congratulations");
    } else {
      setShowError(true);
    }
  };

  function isFormValid(goalIndex: number) {
    return (
      reflectionData[goalIndex].improvement.trim() !== "" &&
      reflectionData[goalIndex].completion.trim() !== ""
    );
  }

  return (
    <>
      <main className="flex-1 bg-background">
        {currentScreen === "reflection-overview" && (
          <ReflectionOverviewScreen
            setCurrentScreen={setCurrentScreen}
            goalData={goalData}
          />
        )}
        {goalData.goals.map(
          (goal, index) =>
            currentScreen === `reflection-goal-${index + 1}` && (
              <ReflectionGoalScreen
                goalData={goalData}
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
              />
            )
        )}
        {currentScreen === "congratulations" && (
          <CongratulationsScreen
            reflectionData={reflectionData}
            goalData={goalData}
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
