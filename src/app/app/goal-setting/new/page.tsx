"use client";
import React, { useState, useCallback } from "react";
import GoalOverviewScreen from "@/components/goal-setting/GoalOverviewScreen";
import GoalDetailsScreen from "@/components/goal-setting/GoalDetailsScreen";
import SaveTemplateScreen from "@/components/goal-setting/SaveTemplateScreens";
import CongratulationsScreen from "@/components/goal-setting/CongratulationsScreen";

export default function PlayerGoalSetting() {
  const [currentScreen, setCurrentScreen] = useState("goal-overview");
  const [goalData, setGoalData] = useState({
    goalDetails: {
      aspiration: "",
      strengths: "",
      weaknesses: "",
    },
    goals: [
      {
        goal: "",
        actions: "",
        location: "",
        frequency: "",
        confidence: "",
      },
    ],
  });

  const updateGoalData = useCallback(
    (
      section: keyof typeof goalData,
      field: string,
      value: string,
      index: number | null = null
    ) => {
      setGoalData((prevData) => {
        if (index !== null) {
          const newGoals = [...prevData.goals];
          newGoals[index] = { ...newGoals[index], [field]: value };
          return { ...prevData, goals: newGoals };
        }
        return {
          ...prevData,
          [section]: { ...prevData[section], [field]: value },
        };
      });
    },
    []
  );

  const addGoal = useCallback(() => {
    setGoalData((prevData) => ({
      ...prevData,
      goals: [
        ...prevData.goals,
        {
          goal: "",
          actions: "",
          location: "",
          frequency: "",
          confidence: "",
        },
      ],
    }));
  }, []);

  return (
    <main className="flex flex-1">
      {currentScreen === "goal-overview" && (
        <GoalOverviewScreen
          updateGoalData={updateGoalData}
          goalData={goalData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "goal-details" && (
        <GoalDetailsScreen
          updateGoalData={updateGoalData}
          goalData={goalData}
          setCurrentScreen={setCurrentScreen}
          addGoal={addGoal}
        />
      )}
      {currentScreen === "save-template" && (
        <SaveTemplateScreen
          goalData={goalData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "congratulations" && <CongratulationsScreen />}
    </main>
  );
}
