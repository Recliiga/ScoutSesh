"use client";

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircleIcon,
  PlusCircle,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type AthleteEvaluationType = {
  overviewDetails: {
    title: string;
    description: string;
    questions: {
      label: string;
      placeholder: string;
    }[];
  };
  physicalSkillAssessments: {
    skill: string;
    currentLevel: number;
  }[];
  mentalSkillAssessments: {
    skill: string;
    currentLevel: number;
  }[];
  sportSpecificSkillAssessments: {
    skill: string;
    currentLevel: number;
  }[];
  selectedSport: string;
  coachFeedback: {
    title: string;
    description: string;
    questions: {
      label: string;
      placeholder: string;
    }[];
  };
  nextEvaluationDate: string;
  nextEvaluationTime: string;
};

const evaluationDataTemplate: AthleteEvaluationType = {
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
  physicalSkillAssessments: defaultPhysicalSkills.map((skill) => ({
    skill,
    currentLevel: 5,
  })),
  mentalSkillAssessments: defaultMentalSkills.map((skill) => ({
    skill,
    currentLevel: 5,
  })),
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
  nextEvaluationDate: "",
  nextEvaluationTime: "",
};

function SkillSlider({
  skill,
  currentLevel,
  onSkillChange,
  onCurrentLevelChange,
  onDeleteSkill,
}: {
  skill: string;
  currentLevel: number;
  onSkillChange(newSkill: string): void;
  onCurrentLevelChange(newLevel: string): void;
  onDeleteSkill(): void;
}) {
  return (
    <Card className="w-56 shrink-0">
      <CardHeader className="bg-primary text-primary-foreground p-3 rounded-t-lg">
        <CardTitle className="text-sm font-bold flex justify-between items-center">
          <span>{skill}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteSkill}
            className="text-primary-foreground hover:text-primary-foreground/80"
          >
            &times;
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 pb-2 px-3">
        <div className="space-y-3">
          <Slider
            min={1}
            max={10}
            step={1}
            value={[currentLevel]}
            // onValueChange={(newValue) =>
            //   onCurrentLevelChange(newValue[0])
            // }
            className="w-full"
          />
          <div className="flex justify-between text-xs font-medium">
            <span>1</span>
            <span>10</span>
          </div>
          <p className="text-center text-sm font-semibold">
            Level: {currentLevel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Component() {
  const [currentScreen, setCurrentScreen] = useState(
    "athlete-evaluation-overview"
  );
  const [evaluationData, setEvaluationData] = useState(evaluationDataTemplate);

  const [availablePhysicalSkills, setAvailablePhysicalSkills] = useState(
    defaultPhysicalSkills.map((skill) => ({
      name: skill,
      checked: true,
    }))
  );

  const [availableMentalSkills, setAvailableMentalSkills] = useState(
    defaultMentalSkills.map((skill) => ({
      name: skill,
      checked: true,
    }))
  );

  //   const [isEditing, setIsEditing] = useState({
  //     title: false,
  //     description: false,
  //     questions: {},
  //   });

  function updateEvaluationData(
    section: string | null,
    field: string,
    value: string,
    index: number | null = null
  ) {}

  function addQuestion(section: keyof typeof evaluationDataTemplate) {}

  function removeQuestion(
    section: keyof typeof evaluationDataTemplate,
    index: number
  ) {}

  function handleEdit(field: string, index: number | null = null) {}

  //   const handleSave = (section, field, value, index = null) => {
  //     updateEvaluationData(section, field, value, index);
  //     setIsEditing((prev) => ({
  //       ...prev,
  //       [field]: index !== null ? { ...prev[field], [index]: false } : false,
  //     }));
  //   };

  function AthleteEvaluationOverviewScreen() {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="flex w-full max-w-4xl">
          <div className="w-1/2 pr-8">
            <div className="mb-4 text-sm text-muted-foreground">
              1/7 Athlete Evaluation
            </div>
            <div className="flex items-center justify-between">
              <h1 className="mb-4 text-3xl font-bold">
                {evaluationData.overviewDetails.title}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit("title")}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between">
              <p className="mb-4">
                {evaluationData.overviewDetails.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit("description")}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-1/2 pl-8">
            {evaluationData.overviewDetails.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between">
                  <Label className="mb-2 text-sm font-medium">
                    {question.label}
                  </Label>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit("questions", index)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion("overviewDetails", index)}
                      className="text-red-500"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="w-full mt-2"
                  placeholder={question.placeholder}
                  value={question.placeholder}
                  onChange={(e) =>
                    updateEvaluationData(
                      "overviewDetails",
                      `questions.${index}.placeholder`,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <Button
              onClick={() => addQuestion("overviewDetails")}
              className="mt-4 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Question
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-4xl mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("athlete-evaluation-overview")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => setCurrentScreen("physical-skill-assessment")}
          >
            Next: Physical Skill Assessment
          </Button>
        </div>
      </div>
    );
  }

  function PhysicalSkillAssessmentScreen() {
    const [newSkillName, setNewSkillName] = useState("");
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    const addCustomSkill = () => {
      if (newSkillName.trim() !== "") {
        const trimmedSkillName = newSkillName.trim();
        setAvailablePhysicalSkills((prev) => [
          ...prev,
          { name: trimmedSkillName, checked: true },
        ]);
        setEvaluationData((prevData) => ({
          ...prevData,
          physicalSkillAssessments: [
            ...prevData.physicalSkillAssessments,
            { skill: trimmedSkillName, currentLevel: 5 },
          ],
        }));

        setNewSkillName("");
        setIsAddingSkill(false);
      }
    };

    function toggleSkill(skillName: string) {}

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 p-8">
          <div className="w-full space-y-4">
            <div className="mb-4 text-sm text-muted-foreground">
              2/7 Athlete Evaluation
            </div>
            <h1 className="text-3xl font-bold">Assess Your Physical Skills</h1>
            <p className="text-gray-600 mb-4">
              Rate your current level for each physical skill:
            </p>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Physical Skills</h2>
              <p className="text-gray-600  mb-4">
                Select the physical skills you wish to evaluate
              </p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                {availablePhysicalSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${index}`}
                      checked={skill.checked}
                      onCheckedChange={() => toggleSkill(skill.name)}
                    />
                    <Label htmlFor={`skill-${index}`} className="text-sm">
                      {skill.name}
                    </Label>
                  </div>
                ))}
              </div>
              {isAddingSkill ? (
                <div className="flex items-center space-x-2 mt-4">
                  <Input
                    type="text"
                    placeholder="Enter new skill name"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    onClick={addCustomSkill}
                    disabled={newSkillName.trim() === ""}
                  >
                    Add Skill
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingSkill(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAddingSkill(true)}
                  className="mt-4 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add More Physical Skills
                </Button>
              )}
            </div>

            <div className="relative w-full overflow-x-auto pb-4 mb-4">
              <div className="flex flex-wrap gap-4">
                {evaluationData.physicalSkillAssessments.map(
                  (assessment, index) => (
                    <SkillSlider
                      key={index}
                      skill={assessment.skill}
                      currentLevel={assessment.currentLevel}
                      onSkillChange={(newSkill) =>
                        updateEvaluationData(
                          "physicalSkillAssessments",
                          "skill",
                          newSkill,
                          index
                        )
                      }
                      onCurrentLevelChange={(newLevel) =>
                        updateEvaluationData(
                          "physicalSkillAssessments",
                          "currentLevel",
                          newLevel,
                          index
                        )
                      }
                      onDeleteSkill={() => toggleSkill(assessment.skill)}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("athlete-evaluation-overview")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => setCurrentScreen("mental-skill-assessment")}
          >
            Next: Mental Skill Assessment
          </Button>
        </div>
      </div>
    );
  }

  function MentalSkillAssessmentScreen() {
    const [newSkillName, setNewSkillName] = useState("");
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    const addCustomSkill = () => {
      if (newSkillName.trim() !== "") {
        const trimmedSkillName = newSkillName.trim();
        setAvailableMentalSkills((prev) => [
          ...prev,
          { name: trimmedSkillName, checked: true },
        ]);
        setEvaluationData((prevData) => ({
          ...prevData,
          mentalSkillAssessments: [
            ...prevData.mentalSkillAssessments,
            { skill: trimmedSkillName, currentLevel: 5 },
          ],
        }));
        setNewSkillName("");
        setIsAddingSkill(false);
      }
    };

    function toggleSkill(skillName: string) {}

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 p-8">
          <div className="w-full space-y-4">
            <div className="mb-4 text-sm text-muted-foreground">
              3/7 Athlete Evaluation
            </div>
            <h1 className="text-3xl font-bold">Assess Your Mental Skills</h1>
            <p className="text-gray-600 mb-4">
              Rate your current level for each mental skill:
            </p>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Mental Skills</h2>
              <p className="text-gray-600 mb-4">
                Select the mental skills you wish to evaluate
              </p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
                {availableMentalSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${index}`}
                      checked={skill.checked}
                      onCheckedChange={() => toggleSkill(skill.name)}
                    />
                    <Label htmlFor={`skill-${index}`} className="text-sm">
                      {skill.name}
                    </Label>
                  </div>
                ))}
              </div>
              {isAddingSkill ? (
                <div className="flex items-center space-x-2 mt-4">
                  <Input
                    type="text"
                    placeholder="Enter new skill name"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    onClick={addCustomSkill}
                    disabled={newSkillName.trim() === ""}
                  >
                    Add Skill
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingSkill(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAddingSkill(true)}
                  className="mt-4 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add More Mental Skills
                </Button>
              )}
            </div>

            <div className="relative w-full overflow-x-auto pb-4 mb-4">
              <div className="flex flex-wrap gap-4">
                {evaluationData.mentalSkillAssessments.map(
                  (assessment, index) => (
                    <SkillSlider
                      key={index}
                      skill={assessment.skill}
                      currentLevel={assessment.currentLevel}
                      onSkillChange={(newSkill) =>
                        updateEvaluationData(
                          "mentalSkillAssessments",
                          "skill",
                          newSkill,
                          index
                        )
                      }
                      onCurrentLevelChange={(newLevel) =>
                        updateEvaluationData(
                          "mentalSkillAssessments",
                          "currentLevel",
                          newLevel,
                          index
                        )
                      }
                      onDeleteSkill={() => toggleSkill(assessment.skill)}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("physical-skill-assessment")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => setCurrentScreen("sport-specific-skill-assessment")}
          >
            Next: Sport Specific Skill Assessment
          </Button>
        </div>
      </div>
    );
  }

  function SportSpecificSkillAssessmentScreen() {
    const [newSkillName, setNewSkillName] = useState("");
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    function handleSportChange(sport: string) {}

    function addCustomSkill() {}

    function toggleSkill(skillName: string) {}

    const sportOptions = [
      { value: "volleyball", label: "Volleyball" },
      { value: "basketball", label: "Basketball" },
      { value: "soccer", label: "Soccer" },
      { value: "tennis", label: "Tennis" },
      { value: "swimming", label: "Swimming" },
      { value: "baseball", label: "Baseball" },
      { value: "football", label: "Football" },
      { value: "golf", label: "Golf" },
      { value: "hockey", label: "Hockey" },
      { value: "rugby", label: "Rugby" },
      { value: "cricket", label: "Cricket" },
      { value: "track_and_field", label: "Track and Field" },
      { value: "gymnastics", label: "Gymnastics" },
      { value: "boxing", label: "Boxing" },
      { value: "martial_arts", label: "Martial Arts" },
    ];

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 p-8">
          <div className="w-full space-y-4">
            <div className="mb-4 text-sm text-muted-foreground">
              4/7 Athlete Evaluation
            </div>
            <h1 className="text-3xl font-bold">
              Assess Your Sport Specific Skills
            </h1>
            <p className="text-gray-600 mb-4">
              Rate your current level for each sport-specific skill:
            </p>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Select Sport</h2>
              <Select
                onValueChange={handleSportChange}
                value={evaluationData.selectedSport}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {evaluationData.selectedSport && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Sport Specific Skills
                </h2>
                <p className="text-gray-600 mb-4">
                  Evaluate the athlete&apos;s sport-specific skills
                </p>
                <div className="relative w-full overflow-x-auto pb-4 mb-4">
                  <div className="flex flex-wrap gap-4">
                    {evaluationData.sportSpecificSkillAssessments.map(
                      (assessment, index) => (
                        <SkillSlider
                          key={index}
                          skill={assessment.skill}
                          currentLevel={assessment.currentLevel}
                          onSkillChange={(newSkill) =>
                            updateEvaluationData(
                              "sportSpecificSkillAssessments",
                              "skill",
                              newSkill,
                              index
                            )
                          }
                          onCurrentLevelChange={(newLevel) =>
                            updateEvaluationData(
                              "sportSpecificSkillAssessments",
                              "currentLevel",
                              newLevel,
                              index
                            )
                          }
                          onDeleteSkill={() => toggleSkill(assessment.skill)}
                        />
                      )
                    )}
                  </div>
                </div>
                {isAddingSkill ? (
                  <div className="flex items-center space-x-2 mt-4">
                    <Input
                      type="text"
                      placeholder="Enter new skill name"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      onClick={addCustomSkill}
                      disabled={newSkillName.trim() === ""}
                    >
                      Add Skill
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingSkill(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsAddingSkill(true)}
                    className="mt-4 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Custom Skill
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("mental-skill-assessment")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => setCurrentScreen("player-feedback")}
          >
            Next: Overall Feedback
          </Button>
        </div>
      </div>
    );
  }

  function PlayerFeedbackScreen() {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="flex w-full max-w-4xl">
          <div className="w-1/2 pr-8">
            <div className="mb-4 text-sm text-muted-foreground">
              5/7 Athlete Evaluation
            </div>
            <div className="flex items-center justify-between">
              <h1 className="mb-4 text-3xl font-bold">
                {evaluationData.coachFeedback.title}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit("title")}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between">
              <p>{evaluationData.coachFeedback.description}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit("description")}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <Card className="space-y-4">
              <CardContent className="space-y-4">
                {evaluationData.coachFeedback.questions.map(
                  (question, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={`feedback-${index}`}
                          className="text-lg font-bold"
                        >
                          {question.label}
                        </Label>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit("questions", index)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeQuestion("coachFeedback", index)
                            }
                            className="text-red-500"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id={`feedback-${index}`}
                        className="w-full mt-2"
                        placeholder={question.placeholder}
                        value={question.placeholder}
                        onChange={(e) =>
                          updateEvaluationData(
                            "coachFeedback",
                            `questions.${index}.placeholder`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )
                )}
                <Button
                  onClick={() => addQuestion("coachFeedback")}
                  className="mt-4 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Question
                </Button>
              </CardContent>
            </Card>
            <div className="mt-8 p-4 bg-primary/10 border-l-4 border-primary rounded-md">
              <Label
                htmlFor="next-evaluation-date-time"
                className="font-semibold text-primary text-lg"
              >
                Next Evaluation Date and Time:
              </Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  id="next-evaluation-date"
                  type="date"
                  className="w-1/2 border-primary"
                  value={evaluationData.nextEvaluationDate}
                  onChange={(e) =>
                    updateEvaluationData(
                      null,
                      "nextEvaluationDate",
                      e.target.value
                    )
                  }
                />
                <Input
                  id="next-evaluation-time"
                  type="time"
                  className="w-1/2 border-primary"
                  value={evaluationData.nextEvaluationTime}
                  onChange={(e) =>
                    updateEvaluationData(
                      null,
                      "nextEvaluationTime",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-4xl mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("sport-specific-skill-assessment")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={() => setCurrentScreen("save-template")}
          >
            Save Template
          </Button>
        </div>
      </div>
    );
  }

  function SaveTemplateScreen() {
    const [templateName, setTemplateName] = useState("");
    const [currentDate, setCurrentDate] = useState(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    const handleSaveTemplate = () => {
      console.log("Saving template:", templateName);
      console.log("Template date:", currentDate);
      console.log("Template data:", evaluationData);
      setCurrentScreen("completion");
    };

    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="flex w-full max-w-4xl">
          <div className="w-1/2 pr-8">
            <div className="mb-4 text-sm text-muted-foreground">
              6/7 Athlete Evaluation
            </div>
            <h1 className="mb-4 text-3xl font-bold">
              Save Evaluation Template
            </h1>
            <p className="text-gray-600">
              Name and save your evaluation template. This template can be used
              for future evaluations.
            </p>
          </div>
          <div className="w-1/2 pl-8">
            <Card className="space-y-4">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter a name for your template"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="template-date" className="font-semibold">
                    Date
                  </Label>
                  <p id="template-date" className="text-gray-700">
                    {currentDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-between w-full max-w-4xl mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentScreen("player-feedback")}
          >
            Back
          </Button>
          <Button
            className="bg-green-600 text-white"
            onClick={handleSaveTemplate}
            disabled={!templateName.trim()}
          >
            {templateName.trim()
              ? `Save Template as: ${templateName}`
              : "Save Template"}
          </Button>
        </div>
      </div>
    );
  }

  function CompletionScreen() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-50">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="mb-4 text-sm text-muted-foreground">
              7/7 Athlete Evaluation
            </div>
            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
            <CardTitle className="text-2xl font-bold text-green-700">
              Athlete Evaluation Complete!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">
              You have successfully submitted your self-evaluation.
            </p>
            <p className="text-md text-gray-600 mb-6">
              You can review your evaluation or return to the main dashboard to
              track your progress.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentScreen("save-template")}
              >
                Back
              </Button>
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  console.log("Navigating to main dashboard");
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-7xl w-[90%] mx-auto py-4 sm:py-6">
      {currentScreen === "athlete-evaluation-overview" && (
        <AthleteEvaluationOverviewScreen />
      )}
      {currentScreen === "physical-skill-assessment" && (
        <PhysicalSkillAssessmentScreen />
      )}
      {currentScreen === "mental-skill-assessment" && (
        <MentalSkillAssessmentScreen />
      )}
      {currentScreen === "sport-specific-skill-assessment" && (
        <SportSpecificSkillAssessmentScreen />
      )}
      {currentScreen === "player-feedback" && <PlayerFeedbackScreen />}
      {currentScreen === "save-template" && <SaveTemplateScreen />}
      {currentScreen === "completion" && <CompletionScreen />}
    </main>
  );
}
