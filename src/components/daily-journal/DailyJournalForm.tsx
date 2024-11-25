"use client";
"use client";
import React, { useState, useCallback, useMemo } from "react";
import CongratulationsScreen from "@/components/daily-journal/CongratulationsScreen";
import JournalOverviewScreen from "@/components/daily-journal/JournalOverviewScreen";
import JournalDetailsScreen from "@/components/daily-journal/JournalDetailsScreen";
import {
  DailyJournalDetailsType,
  DailyJournalType,
} from "@/db/models/DailyJournal";

export type ScreenType =
  | "congratulations"
  | "journal-details"
  | "journal-overview";

const initialJournalData = {
  details: {
    trainingAndCompetition: "",
    nutrition: "",
    sleep: "",
    mentalState: "",
    changeTomorrow: "",
    continueTomorrow: "",
  },
};

export default function DailyJournalForm() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>("journal-overview");
  const [journalData, setJournalData] = useState<DailyJournalType>(
    initialJournalData as DailyJournalType
  );

  const updateJournalData = useCallback(
    (field: keyof DailyJournalDetailsType, value: string) => {
      setJournalData((prevData) => ({
        ...prevData,
        details: { ...prevData["details"], [field]: value },
      }));
    },
    []
  );

  const isFormValid = useMemo(() => {
    return (
      journalData.details.trainingAndCompetition.trim() !== "" &&
      journalData.details.nutrition.trim() !== "" &&
      journalData.details.sleep.trim() !== "" &&
      journalData.details.mentalState.trim() !== "" &&
      journalData.details.changeTomorrow.trim() !== "" &&
      journalData.details.continueTomorrow.trim() !== ""
    );
  }, [journalData]);

  return (
    <main className="flex flex-1">
      {currentScreen === "journal-overview" && (
        <JournalOverviewScreen setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "journal-details" && (
        <JournalDetailsScreen
          journalData={journalData}
          setCurrentScreen={setCurrentScreen}
          updateJournalData={updateJournalData}
          isFormValid={isFormValid}
        />
      )}
      {currentScreen === "congratulations" && <CongratulationsScreen />}
    </main>
  );
}
