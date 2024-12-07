"use client";

import React, { useState } from "react";
import EvaluationPlayerFeedbackScreen from "./EvaluationPlayerFeedbackScreen";
import EvaluationCompletionScreen from "./EvaluationCompletionScreen";
import EvaluationSportSpecificSkillAssessmentScreen from "./EvaluationSportSpecificSkillAssessmentScreen";
import EvaluationMentalSkillAssessmentScreen from "./EvaluationMentalSkillAssessmentScreen";
import EvaluationPhysicalSkillAssessmentScreen from "./EvaluationPhysicalSkillAssessmentScreen";
import EvaluationOverviewScreen from "./EvaluationOverviewScreen";
import { AthleteEvaluationDataType } from "@/db/models/AthleteEvaluation";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";

const physicalSkills = [
  "Endurance",
  "Conditioning",
  "Strength",
  "Durability",
  "Speed",
  "Acceleration",
  "Agility",
  "Change of Direction",
  "Toughness",
  "Power",
  "Balance",
  "Flexibility",
  "Coordination",
  "Reaction Time",
  "Body Composition",
  "Athleticism",
];

const mentalSkills = [
  "Discipline",
  "Poise",
  "Competitiveness",
  "Mental Toughness",
  "Focus & Concentration",
  "Confidence",
  "Resilience",
  "Motivation",
  "Composure",
  "Coachability",
  "Work Ethic",
  "Responsiveness",
  "Perseverance & Grit",
  "Adaptability",
  "Sportsmanship",
  "Reliability",
  "Decision Making",
  "Sport IQ",
  "Leadership",
];

const sportSpecificSkills = [
  "Serving",
  "Passing",
  "Setting",
  "Spiking",
  "Blocking",
  "Digging",
  "Jump Serving",
  "Receiving",
  "Positioning",
  "Reading the Opponent",
  "Quick Attacks",
  "Defensive Formations",
  "Transition Play",
  "Teamwork",
  "Court Awareness",
];

const defaultEvaluationTemplate = {
  overviewDetails: {
    title: "Athlete Performance Evaluation",
    description:
      "Evaluate your overall performance, recent achievements, and areas for improvement. Your self-assessment will help guide your development and set appropriate goals.",
    questions: [
      {
        label: "How would you describe your current performance?",
        placeholder:
          "Assess your overall performance in recent games and practices.",
      },
      {
        label: "What are your recent achievements?",
        placeholder:
          "List your notable accomplishments or improvements made recently.",
      },
      {
        label: "What areas need improvement?",
        placeholder:
          "Identify specific skills or aspects of your game that need enhancement.",
      },
    ],
  },
  physicalSkillAssessments: physicalSkills,
  mentalSkillAssessments: mentalSkills,
  sportSpecificSkillAssessments: sportSpecificSkills,
  coachFeedback: {
    title: "Overall Self-Assessment",
    description:
      "Provide a comprehensive self-assessment of your progress and offer specific areas for improvement.",
    questions: [
      {
        label: "Overall Progress:",
        placeholder: "Summarize your overall progress and development.",
      },
      {
        label: "Areas for Improvement:",
        placeholder:
          "Identify specific areas for improvement in your performance.",
      },
    ],
  },
} as AthleteEvaluationTemplateType;

type AssessmentType =
  | "physicalSkillAssessments"
  | "mentalSkillAssessments"
  | "sportSpecificSkillAssessments";

export type UpdateEvaluationDataParams<
  T extends keyof AthleteEvaluationDataType,
> = [
  section: T,
  value: T extends AssessmentType
    ? number
    : T extends "overviewDetails" | "coachFeedback"
      ? string
      : AthleteEvaluationDataType[T],
  index: T extends AssessmentType | "overviewDetails" | "coachFeedback"
    ? number
    : null,
];

export default function SelfEvaluationForm({
  template,
}: {
  template?: AthleteEvaluationTemplateType;
}) {
  const evaluationTemplate = template || defaultEvaluationTemplate;
  const initialEvaluationData: AthleteEvaluationDataType = {
    ...evaluationTemplate,
    overviewDetails: {
      ...evaluationTemplate.overviewDetails,
      questions: evaluationTemplate.overviewDetails.questions.map(
        (question) => ({
          ...question,
          response: "",
        }),
      ),
    },
    coachFeedback: {
      ...evaluationTemplate.coachFeedback,
      questions: evaluationTemplate.overviewDetails.questions.map(
        (question) => ({
          ...question,
          response: "",
        }),
      ),
    },
    physicalSkillAssessments: evaluationTemplate.physicalSkillAssessments.map(
      (skill) => ({ skill: skill, currentLevel: 5 }),
    ),
    mentalSkillAssessments: evaluationTemplate.mentalSkillAssessments.map(
      (skill) => ({ skill: skill, currentLevel: 5 }),
    ),
    sportSpecificSkillAssessments:
      evaluationTemplate.sportSpecificSkillAssessments.map((skill) => ({
        skill: skill,
        currentLevel: 5,
      })),
    nextEvaluationDate: "",
    nextEvaluationTime: "10:00",
  };

  const [evaluationId, setEvaluationId] = useState("");
  const [currentScreen, setCurrentScreen] = useState("evaluation-overview");
  const [evaluationData, setEvaluationData] = useState(initialEvaluationData);

  function updateEvaluationData<T extends keyof AthleteEvaluationDataType>(
    ...params: UpdateEvaluationDataParams<T>
  ) {
    const [section, value, index] = params;
    switch (section) {
      case "selectedSport":
        setEvaluationData((prev) => ({
          ...prev,
          selectedSport: value as string,
        }));
        break;

      case "nextEvaluationDate":
        setEvaluationData((prev) => ({
          ...prev,
          nextEvaluationDate: value as string,
        }));
        break;

      case "nextEvaluationTime":
        setEvaluationData((prev) => ({
          ...prev,
          nextEvaluationTime: value as string,
        }));
        break;

      case "overviewDetails":
        setEvaluationData((prev) => ({
          ...prev,
          overviewDetails: {
            ...prev.overviewDetails,
            questions: prev.overviewDetails.questions.map((question, i) => ({
              ...question,
              response: i === index ? (value as string) : question.response,
            })),
          },
        }));
        break;

      case "coachFeedback":
        setEvaluationData((prev) => ({
          ...prev,
          coachFeedback: {
            ...prev.coachFeedback,
            questions: prev.coachFeedback.questions.map((question, i) => ({
              ...question,
              response: i === index ? (value as string) : question.response,
            })),
          },
        }));
        break;

      case "physicalSkillAssessments":
        setEvaluationData((prev) => ({
          ...prev,
          physicalSkillAssessments: prev.physicalSkillAssessments.map(
            (assessment, i) => ({
              ...assessment,
              currentLevel:
                i === index ? (value as number) : assessment.currentLevel,
            }),
          ),
        }));
        break;

      case "mentalSkillAssessments":
        setEvaluationData((prev) => ({
          ...prev,
          mentalSkillAssessments: prev.mentalSkillAssessments.map(
            (assessment, i) => ({
              ...assessment,
              currentLevel:
                i === index ? (value as number) : assessment.currentLevel,
            }),
          ),
        }));
        break;

      case "sportSpecificSkillAssessments":
        setEvaluationData((prev) => ({
          ...prev,
          sportSpecificSkillAssessments: prev.sportSpecificSkillAssessments.map(
            (assessment, i) => ({
              ...assessment,
              currentLevel:
                i === index ? (value as number) : assessment.currentLevel,
            }),
          ),
        }));
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
          updateEvaluationData={updateEvaluationData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
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
          evaluationData={evaluationData}
          updateEvaluationData={updateEvaluationData}
          setCurrentScreen={setCurrentScreen}
          setEvaluationId={setEvaluationId}
        />
      )}
      {currentScreen === "completion" && (
        <EvaluationCompletionScreen evaluationId={evaluationId} />
      )}
    </main>
  );
}
