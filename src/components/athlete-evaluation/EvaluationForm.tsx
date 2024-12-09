"use client";

import React, { useState } from "react";
import EvaluationPlayerFeedbackScreen from "./EvaluationPlayerFeedbackScreen";
import EvaluationCompletionScreen from "./EvaluationCompletionScreen";
import EvaluationSportSpecificSkillAssessmentScreen from "./EvaluationSportSpecificSkillAssessmentScreen";
import EvaluationMentalSkillAssessmentScreen from "./EvaluationMentalSkillAssessmentScreen";
import EvaluationPhysicalSkillAssessmentScreen from "./EvaluationPhysicalSkillAssessmentScreen";
import EvaluationOverviewScreen from "./EvaluationOverviewScreen";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";

type AssessmentType =
  | "physicalSkillAssessments"
  | "mentalSkillAssessments"
  | "sportSpecificSkillAssessments";

export type UpdateEvaluationDataParams<T extends keyof AthleteEvaluationType> =
  [
    section: T,
    value: T extends AssessmentType
      ? number
      : T extends "overviewDetails" | "coachFeedback"
        ? string
        : AthleteEvaluationType[T],
    index: T extends AssessmentType | "overviewDetails" | "coachFeedback"
      ? number
      : null,
  ];

export default function EvaluationForm({
  order,
  coachTemplates,
}: {
  order: AthleteEvaluationOrderType;
  coachTemplates?: AthleteEvaluationTemplateType[];
}) {
  const { template: orderTemplate } = order;
  const [templateId, setTemplateId] = useState(orderTemplate?._id || "");

  const template =
    orderTemplate || coachTemplates?.find((temp) => temp._id === templateId);

  function getEvaluationDataFromTemplate(
    template: AthleteEvaluationTemplateType,
  ) {
    return {
      athlete: order.athlete,
      coach: order.coach,
      template: template,
      selectedSport: template.selectedSport,
      overviewDetails: {
        ...template.overviewDetails,
        questions: template.overviewDetails.questions.map((question) => ({
          ...question,
          response: "",
        })),
      },
      coachFeedback: {
        ...template.coachFeedback,
        questions: template.overviewDetails.questions.map((question) => ({
          ...question,
          response: "",
        })),
      },
      physicalSkillAssessments: template.physicalSkillAssessments.map(
        (skill) => ({
          skill: skill,
          currentLevel: 5,
        }),
      ),
      mentalSkillAssessments: template.mentalSkillAssessments.map((skill) => ({
        skill: skill,
        currentLevel: 5,
      })),
      sportSpecificSkillAssessments: template.sportSpecificSkillAssessments.map(
        (skill) => ({
          skill: skill,
          currentLevel: 5,
        }),
      ),
      // nextEvaluationDate: "",
      // nextEvaluationTime: "10:00",
    } as AthleteEvaluationType;
  }

  const initialEvaluationData = template
    ? getEvaluationDataFromTemplate(template)
    : null;

  const [evaluationId, setEvaluationId] = useState("");
  const [currentScreen, setCurrentScreen] = useState("evaluation-overview");
  const [evaluationData, setEvaluationData] = useState(initialEvaluationData);

  function handleSelectTemplate(tempId: string) {
    setTemplateId(tempId);
    const selectedTemplate = coachTemplates?.find(
      (temp) => temp._id === tempId,
    );

    if (!selectedTemplate) return;
    setEvaluationData(getEvaluationDataFromTemplate(selectedTemplate));
  }

  function updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ) {
    if (!evaluationData) return;
    const [section, value, index] = params;
    switch (section) {
      case "selectedSport":
        setEvaluationData({
          ...evaluationData,
          selectedSport: value as string,
        } as AthleteEvaluationType);
        break;

      // case "nextEvaluationDate":
      //   setEvaluationData({
      //     ...evaluationData,
      //     nextEvaluationDate: value as string,
      //   } as AthleteEvaluationType);
      //   break;

      // case "nextEvaluationTime":
      //   setEvaluationData({
      //     ...evaluationData,
      //     nextEvaluationTime: value as string,
      //   } as AthleteEvaluationType);
      //   break;

      case "overviewDetails":
        setEvaluationData({
          ...evaluationData,
          overviewDetails: {
            ...evaluationData.overviewDetails,
            questions: evaluationData.overviewDetails.questions.map(
              (question, i) => ({
                ...question,
                response: i === index ? (value as string) : question.response,
              }),
            ),
          },
        } as AthleteEvaluationType);
        break;

      case "coachFeedback":
        setEvaluationData({
          ...evaluationData,
          coachFeedback: {
            ...evaluationData.coachFeedback,
            questions: evaluationData.coachFeedback.questions.map(
              (question, i) => ({
                ...question,
                response: i === index ? (value as string) : question.response,
              }),
            ),
          },
        } as AthleteEvaluationType);
        break;

      case "physicalSkillAssessments":
        setEvaluationData({
          ...evaluationData,
          physicalSkillAssessments: evaluationData.physicalSkillAssessments.map(
            (assessment, i) => ({
              ...assessment,
              currentLevel:
                i === index ? (value as number) : assessment.currentLevel,
            }),
          ),
        } as AthleteEvaluationType);
        break;

      case "mentalSkillAssessments":
        setEvaluationData({
          ...evaluationData,
          mentalSkillAssessments: evaluationData.mentalSkillAssessments.map(
            (assessment, i) => ({
              ...assessment,
              currentLevel:
                i === index ? (value as number) : assessment.currentLevel,
            }),
          ),
        } as AthleteEvaluationType);
        break;

      case "sportSpecificSkillAssessments":
        setEvaluationData({
          ...evaluationData,
          sportSpecificSkillAssessments:
            evaluationData.sportSpecificSkillAssessments.map(
              (assessment, i) => ({
                ...assessment,
                currentLevel:
                  i === index ? (value as number) : assessment.currentLevel,
              }),
            ),
        } as AthleteEvaluationType);
        break;

      default:
        break;
    }
  }

  return (
    <main
      className={`flex-1 ${
        currentScreen !== "completion"
          ? "mx-auto w-[90%] max-w-7xl py-4 sm:py-6"
          : ""
      } flex`}
    >
      {currentScreen === "evaluation-overview" && (
        <EvaluationOverviewScreen
          evaluationData={evaluationData}
          templateId={templateId}
          handleSelectTemplate={handleSelectTemplate}
          coachTemplates={coachTemplates}
          updateEvaluationData={updateEvaluationData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {evaluationData ? (
        <>
          {currentScreen === "physical-skill-assessment" && (
            <EvaluationPhysicalSkillAssessmentScreen
              evaluationData={evaluationData}
              updateEvaluationData={updateEvaluationData}
              setCurrentScreen={setCurrentScreen}
            />
          )}
          {currentScreen === "mental-skill-assessment" && (
            <EvaluationMentalSkillAssessmentScreen
              evaluationData={evaluationData}
              updateEvaluationData={updateEvaluationData}
              setCurrentScreen={setCurrentScreen}
            />
          )}
          {currentScreen === "sport-specific-skill-assessment" && (
            <EvaluationSportSpecificSkillAssessmentScreen
              evaluationData={evaluationData}
              updateEvaluationData={updateEvaluationData}
              setCurrentScreen={setCurrentScreen}
            />
          )}
          {currentScreen === "player-feedback" && (
            <EvaluationPlayerFeedbackScreen
              order={order}
              evaluationData={evaluationData}
              updateEvaluationData={updateEvaluationData}
              setCurrentScreen={setCurrentScreen}
              setEvaluationId={setEvaluationId}
            />
          )}
          {currentScreen === "completion" && (
            <EvaluationCompletionScreen evaluationId={evaluationId} />
          )}
        </>
      ) : null}
    </main>
  );
}
