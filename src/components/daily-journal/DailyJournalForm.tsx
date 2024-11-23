"use client";
"use client";
import React, { useState, useCallback, useMemo } from "react";
import CongratulationsScreen from "@/components/daily-journal/CongratulationsScreen";
import JournalOverviewScreen from "@/components/daily-journal/JournalOverviewScreen";
import JournalDetailsScreen from "@/components/daily-journal/JournalDetailsScreen";

export type ScreenType =
  | "congratulations"
  | "journal-details"
  | "journal-overview";

export type JournalDataType = {
  date: string;
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  reflection: {
    changeTomorrow: string;
    continueTomorrow: string;
  };
};

const initialJournalData = {
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  trainingAndCompetition: "",
  nutrition: "",
  sleep: "",
  mentalState: "",
  reflection: {
    changeTomorrow: "",
    continueTomorrow: "",
  },
};

export default function DailyJournalForm() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>("journal-overview");
  const [journalData, setJournalData] =
    useState<JournalDataType>(initialJournalData);

  const updateJournalData = useCallback(
    (
      field: keyof JournalDataType,
      value: string,
      nestedField: "changeTomorrow" | "continueTomorrow" | null = null
    ) => {
      setJournalData((prevData) => {
        if (typeof prevData[field] === "object" && nestedField) {
          return {
            ...prevData,
            [field]: {
              ...prevData[field],
              [nestedField]: value,
            },
          };
        }
        return {
          ...prevData,
          [field]: value,
        };
      });
    },
    []
  );

  const isFormValid = useMemo(() => {
    return (
      journalData.trainingAndCompetition.trim() !== "" &&
      journalData.nutrition.trim() !== "" &&
      journalData.sleep.trim() !== "" &&
      journalData.mentalState.trim() !== "" &&
      journalData.reflection.changeTomorrow.trim() !== "" &&
      journalData.reflection.continueTomorrow.trim() !== ""
    );
  }, [journalData]);

  function handleSubmitJournal() {
    if (isFormValid) {
      setCurrentScreen("congratulations");
    }
  }

  return (
    <main className="flex flex-1">
      {currentScreen === "journal-overview" && (
        <JournalOverviewScreen
          journalData={journalData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "journal-details" && (
        <JournalDetailsScreen
          journalData={journalData}
          setCurrentScreen={setCurrentScreen}
          updateJournalData={updateJournalData}
          handleSubmitJournal={handleSubmitJournal}
          isFormValid={isFormValid}
        />
      )}
      {currentScreen === "congratulations" && <CongratulationsScreen />}
    </main>
  );
}
