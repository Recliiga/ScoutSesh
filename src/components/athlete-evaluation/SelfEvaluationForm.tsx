"use client";

import React, { useState } from "react";
import EvaluationPlayerFeedbackScreen from "./EvaluationPlayerFeedbackScreen";
import EvaluationCompletionScreen from "./EvaluationCompletionScreen";
import EvaluationSportSpecificSkillAssessmentScreen from "./EvaluationSportSpecificSkillAssessmentScreen";
import EvaluationMentalSkillAssessmentScreen from "./EvaluationMentalSkillAssessmentScreen";
import EvaluationPhysicalSkillAssessmentScreen from "./EvaluationPhysicalSkillAssessmentScreen";
import EvaluationOverviewScreen from "./EvaluationOverviewScreen";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import { PrimarySportType } from "@/db/models/User";

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

// const sportSpecificSkills = [
//   "Serving",
//   "Passing",
//   "Setting",
//   "Spiking",
//   "Blocking",
//   "Digging",
//   "Jump Serving",
//   "Receiving",
//   "Positioning",
//   "Reading the Opponent",
//   "Quick Attacks",
//   "Defensive Formations",
//   "Transition Play",
//   "Teamwork",
//   "Court Awareness",
// ];

const sportSpecificSkills = {
  volleyball: [
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
  ],
  basketball: [
    "Shooting",
    "Dribbling",
    "Passing",
    "Rebounding",
    "Defense",
    "Footwork",
    "Post Moves",
    "Ball Handling",
    "Court Vision",
    "Pick and Roll",
    "Free Throws",
    "Offensive Positioning",
    "Defensive Positioning",
    "Boxing Out",
    "Fast Break",
  ],
  soccer: [
    "Dribbling",
    "Passing",
    "Shooting",
    "Ball Control",
    "Heading",
    "Tackling",
    "Positioning",
    "Off-ball Movement",
    "First Touch",
    "Crossing",
    "Set Pieces",
    "Defensive Marking",
    "Goalkeeping",
    "One-on-One Skills",
    "Team Tactics",
  ],
  tennis: [
    "Forehand",
    "Backhand",
    "Serve",
    "Volley",
    "Overhead",
    "Footwork",
    "Return of Serve",
    "Slice",
    "Topspin",
    "Lob",
    "Drop Shot",
    "Approach Shot",
    "Defensive Skills",
    "Court Positioning",
    "Match Strategy",
  ],
  swimming: [
    "Freestyle",
    "Backstroke",
    "Breaststroke",
    "Butterfly",
    "Individual Medley",
    "Turns",
    "Starts",
    "Underwater Kicking",
    "Breathing Technique",
    "Pacing",
    "Sprint Technique",
    "Endurance",
    "Open Water Skills",
    "Relay Exchanges",
    "Race Strategy",
  ],
  golf: [
    "Driving",
    "Iron Play",
    "Putting",
    "Chipping",
    "Bunker Shots",
    "Course Management",
    "Mental Game",
    "Club Selection",
    "Swing Mechanics",
    "Reading Greens",
    "Shot Shaping",
    "Stance and Posture",
    "Grip",
    "Follow-Through",
    "Pre-Shot Routine",
  ],
  baseball: [
    "Hitting",
    "Pitching",
    "Fielding",
    "Throwing",
    "Base Running",
    "Catching",
    "Bunting",
    "Sliding",
    "Game Strategy",
    "Pitch Recognition",
    "Defensive Positioning",
    "Outfield Play",
    "Infield Play",
    "Batting Stance",
    "Mental Toughness",
  ],
  football: [
    "Passing",
    "Catching",
    "Running",
    "Blocking",
    "Tackling",
    "Route Running",
    "Play Recognition",
    "Ball Security",
    "Footwork",
    "Hand-Eye Coordination",
    "Field Vision",
    "Strength Training",
    "Speed and Agility",
    "Special Teams Skills",
    "Game Strategy",
  ],
  hockey: [
    "Skating",
    "Puck Handling",
    "Shooting",
    "Passing",
    "Checking",
    "Positioning",
    "Face-offs",
    "Goaltending",
    "Forechecking",
    "Backchecking",
    "Power Play",
    "Penalty Kill",
    "Breakouts",
    "Defensive Zone Coverage",
    "Offensive Zone Pressure",
  ],
  rugby: [
    "Passing",
    "Tackling",
    "Kicking",
    "Rucking",
    "Mauling",
    "Scrummaging",
    "Lineout Play",
    "Ball Carrying",
    "Evasion",
    "Support Play",
    "Decision Making",
    "Positional Awareness",
    "Fitness",
    "Communication",
    "Game Understanding",
  ],
  cricket: [
    "Batting",
    "Bowling",
    "Fielding",
    "Wicket-keeping",
    "Running Between Wickets",
    "Shot Selection",
    "Bowling Variations",
    "Field Placement",
    "Game Awareness",
    "Concentration",
    "Physical Fitness",
    "Mental Toughness",
    "Team Strategy",
    "Adaptability",
    "Leadership",
  ],
  track_and_field: [
    "Sprinting",
    "Distance Running",
    "Jumping",
    "Throwing",
    "Hurdling",
    "Starting Technique",
    "Pacing",
    "Form and Technique",
    "Strength Training",
    "Flexibility",
    "Mental Preparation",
    "Race Strategy",
    "Recovery",
    "Equipment Management",
    "Competition Tactics",
  ],
  gymnastics: [
    "Floor Exercise",
    "Balance Beam",
    "Uneven Bars",
    "Vault",
    "Pommel Horse",
    "Rings",
    "Parallel Bars",
    "High Bar",
    "Flexibility",
    "Strength",
    "Body Control",
    "Landings",
    "Choreography",
    "Mental Focus",
    "Competitive Composure",
  ],
  boxing: [
    "Punching Technique",
    "Footwork",
    "Defense",
    "Ring Control",
    "Conditioning",
    "Combinations",
    "Counter-punching",
    "Timing",
    "Speed",
    "Power",
    "Endurance",
    "Mental Toughness",
    "Strategy",
    "Feinting",
    "Clinch Work",
  ],
  martial_arts: [
    "Striking",
    "Grappling",
    "Kicking",
    "Blocking",
    "Throws",
    "Joint Locks",
    "Ground Fighting",
    "Forms/Katas",
    "Weapon Techniques",
    "Breathing Control",
    "Flexibility",
    "Balance",
    "Mental Focus",
    "Discipline",
    "Self-Defense",
  ],
};

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
  sportSpecificSkillAssessments: sportSpecificSkills["basketball"],
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

export default function SelfEvaluationForm({
  template,
  primarySport: primarySport,
}:
  | {
      template?: AthleteEvaluationTemplateType;
      primarySport: PrimarySportType;
    }
  | {
      template: AthleteEvaluationTemplateType;
      primarySport?: PrimarySportType;
    }) {
  const evaluationTemplate = template || defaultEvaluationTemplate;
  const initialEvaluationData = {
    //@ts-expect-error use evaluation template._id as template type
    template: evaluationTemplate._id as AthleteEvaluationTemplateType,
    selectedSport: primarySport || evaluationTemplate.selectedSport,
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
    sportSpecificSkillAssessments: primarySport
      ? sportSpecificSkills[primarySport].map((skill) => ({
          skill: skill,
          currentLevel: 5,
        }))
      : evaluationTemplate.sportSpecificSkillAssessments.map((skill) => ({
          skill: skill,
          currentLevel: 5,
        })),
    nextEvaluationDate: "",
    nextEvaluationTime: "10:00",
  } as AthleteEvaluationType;

  const [evaluationId, setEvaluationId] = useState("");
  const [currentScreen, setCurrentScreen] = useState("evaluation-overview");
  const [evaluationData, setEvaluationData] = useState(initialEvaluationData);

  function updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ) {
    const [section, value, index] = params;
    switch (section) {
      case "selectedSport":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              selectedSport: value as string,
            }) as AthleteEvaluationType,
        );
        break;

      case "nextEvaluationDate":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              nextEvaluationDate: value as string,
            }) as AthleteEvaluationType,
        );
        break;

      case "nextEvaluationTime":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              nextEvaluationTime: value as string,
            }) as AthleteEvaluationType,
        );
        break;

      case "overviewDetails":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              overviewDetails: {
                ...prev.overviewDetails,
                questions: prev.overviewDetails.questions.map(
                  (question, i) => ({
                    ...question,
                    response:
                      i === index ? (value as string) : question.response,
                  }),
                ),
              },
            }) as AthleteEvaluationType,
        );
        break;

      case "coachFeedback":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              coachFeedback: {
                ...prev.coachFeedback,
                questions: prev.coachFeedback.questions.map((question, i) => ({
                  ...question,
                  response: i === index ? (value as string) : question.response,
                })),
              },
            }) as AthleteEvaluationType,
        );
        break;

      case "physicalSkillAssessments":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              physicalSkillAssessments: prev.physicalSkillAssessments.map(
                (assessment, i) => ({
                  ...assessment,
                  currentLevel:
                    i === index ? (value as number) : assessment.currentLevel,
                }),
              ),
            }) as AthleteEvaluationType,
        );
        break;

      case "mentalSkillAssessments":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              mentalSkillAssessments: prev.mentalSkillAssessments.map(
                (assessment, i) => ({
                  ...assessment,
                  currentLevel:
                    i === index ? (value as number) : assessment.currentLevel,
                }),
              ),
            }) as AthleteEvaluationType,
        );
        break;

      case "sportSpecificSkillAssessments":
        setEvaluationData(
          (prev) =>
            ({
              ...prev,
              sportSpecificSkillAssessments:
                prev.sportSpecificSkillAssessments.map((assessment, i) => ({
                  ...assessment,
                  currentLevel:
                    i === index ? (value as number) : assessment.currentLevel,
                })),
            }) as AthleteEvaluationType,
        );
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
