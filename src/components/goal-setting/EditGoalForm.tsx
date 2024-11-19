"use client";
import React, { useState } from "react";
import GoalOverviewScreen, {
  GoalDetailsType,
} from "@/components/goal-setting/GoalOverviewScreen";
import GoalDetailsScreen, {
  GoalType,
} from "@/components/goal-setting/GoalDetailsScreen";
import SaveTemplateScreen from "@/components/goal-setting/SaveTemplateScreens";
import CongratulationsScreen from "@/components/goal-setting/CongratulationsScreen";
import { GoalDataSchemaType } from "@/db/models/Goal";

export type GoalSubmissionType = {
  name: string;
  details: GoalDetailsType;
  goals: GoalType[];
};

export default function EditGoalForm({
  goalDataToEdit,
}: {
  goalDataToEdit: GoalDataSchemaType;
}) {
  const [currentScreen, setCurrentScreen] = useState("goal-overview");
  const [goalName, setGoalName] = useState(goalDataToEdit.name);
  const [goalDetails, setGoalDetails] = useState<GoalDetailsType>(
    goalDataToEdit.details
  );
  const [goals, setGoals] = useState<GoalType[]>(goalDataToEdit.goals);

  const goalData: GoalSubmissionType = {
    name: goalName,
    details: goalDetails,
    goals,
  };

  return (
    <main className="flex flex-1">
      {currentScreen === "goal-overview" && (
        <GoalOverviewScreen
          setGoalDetails={setGoalDetails}
          goalDetails={goalDetails}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "goal-details" && (
        <GoalDetailsScreen
          setGoals={setGoals}
          goals={goals}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "save-template" && (
        <SaveTemplateScreen
          goalId={goalDataToEdit._id as string}
          goalData={goalData}
          goalName={goalName}
          setGoalName={setGoalName}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "congratulations" && <CongratulationsScreen />}
    </main>
  );
}
