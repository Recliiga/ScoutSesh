"use client";

import React, { useState } from "react";
import AthleteEvaluationOverviewScreen from "@/components/athlete-evaluation/AthleteEvaluationOverviewScreen";
import PhysicalSkillAssessmentScreen from "./PhysicalSkillAssessmentScreen";
import MentalSkillAssessmentScreen from "./MentalSkillAssessmentScreen";
import SportSpecificSkillAssessmentScreen from "./SportSpecificSkillAssessmentScreen";
import PlayerFeedbackScreen from "./PlayerFeedbackScreen";
import SaveTemplateScreen from "./SaveTemplateScreen";
import CompletionScreen from "./CompletionScreen";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import { UserType } from "@/db/models/User";

const defaultPhysicalSkills = [
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

const defaultMentalSkills = [
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

export type SkillType = {
  checked: boolean;
  currentLevel: number;
  name: string;
};

const initialEvaluationTemplateData: AthleteEvaluationTemplateType = {
  overviewDetails: {
    title: "Athlete Performance Evaluation",
    description:
      "Evaluate your overall performance, recent achievements, and areas for improvement. This assessment will help guide your development and set appropriate goals.",
    questions: [
      {
        label: "How would you describe your current performance?",
        placeholder:
          "Assess your overall performance in recent games and practices.",
      },
      {
        label: "What are your recent achievements?",
        placeholder:
          "List any notable accomplishments or improvements you've made recently.",
      },
      {
        label: "What areas do you think you need to improve?",
        placeholder:
          "Identify specific skills or aspects of your game that need enhancement.",
      },
    ],
  },
  physicalSkillAssessments: defaultPhysicalSkills,
  mentalSkillAssessments: defaultMentalSkills,
  sportSpecificSkillAssessments: [],
  selectedSport: "",
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
  user: { firstName: "", lastName: "" } as UserType,
};

export default function AthleteEvaluationTemplateForm() {
  const [currentScreen, setCurrentScreen] = useState(
    "athlete-evaluation-overview"
  );
  const [overviewDetails, setOverviewDetails] = useState(
    initialEvaluationTemplateData.overviewDetails
  );
  const [physicalSkillAssessments, setPhysicalSkillAssessments] = useState<
    SkillType[]
  >(
    initialEvaluationTemplateData.physicalSkillAssessments.map((skill) => ({
      currentLevel: 5,
      name: skill,
      checked: true,
    }))
  );
  const [mentalSkillAssessments, setMentalSkillAssessments] = useState(
    initialEvaluationTemplateData.mentalSkillAssessments.map((skill) => ({
      currentLevel: 5,
      name: skill,
      checked: true,
    }))
  );
  const [sportSpecificSkillAssessments, setSportSpecificSkillAssessments] =
    useState(
      initialEvaluationTemplateData.sportSpecificSkillAssessments.map(
        (skill) => ({
          currentLevel: 5,
          name: skill,
          checked: true,
        })
      )
    );
  const [selectedSport, setSelectedSport] = useState(
    initialEvaluationTemplateData.selectedSport
  );
  const [coachFeedback, setCoachFeedback] = useState(
    initialEvaluationTemplateData.coachFeedback
  );
  const evaluationTemplateData: AthleteEvaluationTemplateType = {
    overviewDetails,
    physicalSkillAssessments: physicalSkillAssessments.map(
      (skill) => skill.name
    ),
    mentalSkillAssessments: mentalSkillAssessments.map((skill) => skill.name),
    sportSpecificSkillAssessments: sportSpecificSkillAssessments.map(
      (skill) => skill.name
    ),
    selectedSport,
    coachFeedback,
    user: { firstName: "", lastName: "" } as UserType,
  };

  function handleSportChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sport = e.target.value as keyof typeof sportSpecificSkills;
    setSelectedSport(sport);
    setSportSpecificSkillAssessments(
      sportSpecificSkills[sport].map((skill) => ({
        currentLevel: 5,
        name: skill,
        checked: true,
      }))
    );
  }

  function updateOverviewDetails(
    field: "title" | "description",
    value: string
  ) {
    setOverviewDetails((prev) => ({ ...prev, [field]: value }));
  }

  function updateOverviewDetailsQuestion(
    field: "label" | "placeholder",
    value: string,
    index: number
  ) {
    setOverviewDetails((prev) => ({
      ...prev,
      questions: prev.questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      ),
    }));
  }

  function updateCoachFeedback(field: "title" | "description", value: string) {
    setCoachFeedback((prev) => ({ ...prev, [field]: value }));
  }

  function updateCoachFeedbackQuestion(
    field: "label" | "placeholder",
    value: string,
    index: number
  ) {
    setCoachFeedback((prev) => ({
      ...prev,
      questions: prev.questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      ),
    }));
  }

  function addQuestion(section: keyof AthleteEvaluationTemplateType) {
    switch (section) {
      case "overviewDetails":
        setOverviewDetails((prev) => ({
          ...prev,
          questions: [...prev.questions, { label: "", placeholder: "" }],
        }));
        break;

      case "coachFeedback":
        setCoachFeedback((prev) => ({
          ...prev,
          questions: [...prev.questions, { label: "", placeholder: "" }],
        }));
        break;

      default:
        break;
    }
  }

  function removeQuestion(
    section: keyof AthleteEvaluationTemplateType,
    index: number
  ) {
    switch (section) {
      case "overviewDetails":
        setOverviewDetails((prev) => ({
          ...prev,
          questions: prev.questions.filter((_, i) => i !== index),
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
          ? "max-w-7xl w-[90%] mx-auto py-4 sm:py-6"
          : ""
      } flex`}
    >
      {currentScreen === "athlete-evaluation-overview" && (
        <AthleteEvaluationOverviewScreen
          addQuestion={addQuestion}
          overviewDetails={overviewDetails}
          removeQuestion={removeQuestion}
          updateOverviewDetails={updateOverviewDetails}
          updateOverviewDetailsQuestion={updateOverviewDetailsQuestion}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "physical-skill-assessment" && (
        <PhysicalSkillAssessmentScreen
          setCurrentScreen={setCurrentScreen}
          physicalSkillAssessments={physicalSkillAssessments}
          setPhysicalSkillAssessments={setPhysicalSkillAssessments}
        />
      )}
      {currentScreen === "mental-skill-assessment" && (
        <MentalSkillAssessmentScreen
          setCurrentScreen={setCurrentScreen}
          mentalSkillAssessments={mentalSkillAssessments}
          setMentalSkillAssessments={setMentalSkillAssessments}
        />
      )}
      {currentScreen === "sport-specific-skill-assessment" && (
        <SportSpecificSkillAssessmentScreen
          selectedSport={selectedSport}
          handleSportChange={handleSportChange}
          sportSpecificSkillAssessments={sportSpecificSkillAssessments}
          setSportSpecificSkillAssessments={setSportSpecificSkillAssessments}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "player-feedback" && (
        <PlayerFeedbackScreen
          updateCoachFeedback={updateCoachFeedback}
          updateCoachFeedbackQuestion={updateCoachFeedbackQuestion}
          addQuestion={addQuestion}
          coachFeedback={coachFeedback}
          removeQuestion={removeQuestion}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "save-template" && (
        <SaveTemplateScreen
          templateData={evaluationTemplateData}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "completion" && <CompletionScreen />}
    </main>
  );
}
