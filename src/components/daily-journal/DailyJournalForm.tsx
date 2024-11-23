"use client";
"use client";
import React, { useState, useCallback, useMemo } from "react";
import CongratulationsScreen from "@/components/daily-journal/CongratulationsScreen";
import JournalOverviewScreen from "@/components/daily-journal/JournalOverviewScreen";
import JournalDetailsScreen from "@/components/daily-journal/JournalDetailsScreen";
import { DailyJournalType } from "@/db/models/DailyJournal";

export type ScreenType =
  | "congratulations"
  | "journal-details"
  | "journal-overview";

const initialJournalData = {
  trainingAndCompetition: "",
  nutrition: "",
  sleep: "",
  mentalState: "",
  changeTomorrow: "",
  continueTomorrow: "",
};

export default function DailyJournalForm() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>("journal-overview");
  const [journalData, setJournalData] = useState<DailyJournalType>(
    initialJournalData as DailyJournalType
  );

  const updateJournalData = useCallback(
    (field: keyof DailyJournalType, value: string) => {
      setJournalData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
    []
  );

  const isFormValid = useMemo(() => {
    return (
      journalData.trainingAndCompetition.trim() !== "" &&
      journalData.nutrition.trim() !== "" &&
      journalData.sleep.trim() !== "" &&
      journalData.mentalState.trim() !== "" &&
      journalData.changeTomorrow.trim() !== "" &&
      journalData.continueTomorrow.trim() !== ""
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
