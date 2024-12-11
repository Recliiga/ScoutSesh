"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { getFullname } from "@/lib/utils";

const Speedometer = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score <= 3) return "#EF4444"; // Vibrant red
    if (score <= 7) return "#FBBF24"; // Vibrant yellow
    return "#10B981"; // Vibrant green
  };

  const color = getColor(score);

  const sections = Array.from({ length: 10 }, (_, i) => {
    const sectionAngle = 180 - i * 18;
    const filled = i < score;
    return { angle: sectionAngle, filled };
  });

  return (
    <div className="relative h-20 w-32">
      <svg className="h-full w-full" viewBox="0 0 120 70">
        {sections.map((section, index) => (
          <path
            key={index}
            d={`M60 60 L${60 + 50 * Math.cos((section.angle * Math.PI) / 180)} ${60 - 50 * Math.sin((section.angle * Math.PI) / 180)} A50 50 0 0 1 ${60 + 50 * Math.cos(((section.angle - 18) * Math.PI) / 180)} ${60 - 50 * Math.sin(((section.angle - 18) * Math.PI) / 180)} Z`}
            fill={section.filled ? color : "#E5E7EB"}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        <circle cx="60" cy="60" r="20" fill="white" opacity="0.8" />
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#1F2937"
        >
          {score}
        </text>
      </svg>
    </div>
  );
};

const DifferenceIndicator = ({ difference }: { difference: number }) => {
  const boxColor =
    difference > 0
      ? "bg-green-100 border-green-500 text-green-700"
      : difference < 0
        ? "bg-red-100 border-red-500 text-red-700"
        : "bg-gray-100 border-gray-500 text-gray-700";
  const arrow = difference > 0 ? "↑" : difference < 0 ? "↓" : "-";
  const displayValue = difference === 0 ? "-" : Math.abs(difference);
  return (
    <div
      className={`flex items-center justify-center rounded border px-1 py-0.5 ${boxColor}`}
    >
      <span className="mr-0.5 text-xs font-medium">{arrow}</span>
      <span className="text-xs font-medium">{displayValue}</span>
    </div>
  );
};

export default function EvaluationResults({
  evaluationResults,
}: {
  evaluationResults: {
    coach: AthleteEvaluationType;
    athlete: AthleteEvaluationType | null;
  };
}) {
  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1">
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="mb-4 text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <h1 className="mb-6 text-3xl font-bold">
            Athlete Evaluation Results
          </h1>
          <div className="mb-8 flex flex-col items-stretch justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Card className="flex-1 bg-green-50 p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={evaluationResults.coach.athlete.profilePicture}
                    alt={getFullname(evaluationResults.coach.athlete)}
                  />
                  <AvatarFallback>
                    {getFullname(evaluationResults.coach.athlete)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {getFullname(evaluationResults.coach.athlete)}
                  </h2>
                  <p className="text-muted-foreground">Athlete</p>
                </div>
              </div>
            </Card>
            <Card className="flex-1 p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={evaluationResults.coach.coach.profilePicture}
                    alt={getFullname(evaluationResults.coach.coach)}
                  />
                  <AvatarFallback>
                    {getFullname(evaluationResults.coach.coach)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {getFullname(evaluationResults.coach.coach)}
                  </h2>
                  <p className="text-muted-foreground">Coach</p>
                </div>
              </div>
            </Card>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Evaluation Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6 rounded-lg border bg-green-50 p-4">
                  <h3 className="text-lg font-semibold">Athlete Responses</h3>
                  {evaluationResults.athlete
                    ? evaluationResults.athlete.overviewDetails.questions.map(
                        (question, index) => (
                          <div key={index}>
                            <h4 className="mb-2 font-medium">
                              {question.label}
                            </h4>
                            <p className="rounded bg-primary/10 p-2">
                              {question.response}
                            </p>
                          </div>
                        ),
                      )
                    : "N/A"}
                </div>
                <div className="space-y-6 rounded-lg border p-4">
                  <h3 className="text-lg font-semibold">Coach Responses</h3>
                  {evaluationResults.coach.overviewDetails.questions.map(
                    (question, index) => (
                      <div key={index}>
                        <h4 className="mb-2 font-medium">{question.label}</h4>
                        <p className="rounded bg-primary/10 p-2">
                          {question.response}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Physical Skill Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {evaluationResults.athlete
                  ? evaluationResults.athlete.physicalSkillAssessments.map(
                      (athleteSkill, index) => {
                        const coachSkill =
                          evaluationResults.coach.physicalSkillAssessments[
                            index
                          ];
                        const scoreDifference =
                          coachSkill.currentLevel - athleteSkill.currentLevel;
                        return (
                          <Card key={index} className="w-full">
                            <CardHeader className="p-2">
                              <CardTitle className="text-center text-base font-medium">
                                {athleteSkill.skill}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Athlete
                                  </p>
                                  <Speedometer
                                    score={athleteSkill.currentLevel}
                                  />
                                </div>
                                <DifferenceIndicator
                                  difference={scoreDifference}
                                />
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Coach
                                  </p>
                                  <Speedometer
                                    score={coachSkill.currentLevel}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      },
                    )
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Mental Skill Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {evaluationResults.athlete
                  ? evaluationResults.athlete.mentalSkillAssessments.map(
                      (athleteSkill, index) => {
                        const coachSkill =
                          evaluationResults.coach.mentalSkillAssessments[index];
                        const scoreDifference =
                          coachSkill.currentLevel - athleteSkill.currentLevel;
                        return (
                          <Card key={index} className="w-full">
                            <CardHeader className="p-2">
                              <CardTitle className="text-center text-base font-medium">
                                {athleteSkill.skill}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Athlete
                                  </p>
                                  <Speedometer
                                    score={athleteSkill.currentLevel}
                                  />
                                </div>
                                <DifferenceIndicator
                                  difference={scoreDifference}
                                />
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Coach
                                  </p>
                                  <Speedometer
                                    score={coachSkill.currentLevel}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      },
                    )
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sport-Specific Skill Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {evaluationResults.athlete
                  ? evaluationResults.athlete.sportSpecificSkillAssessments.map(
                      (athleteSkill, index) => {
                        const coachSkill =
                          evaluationResults.coach.sportSpecificSkillAssessments[
                            index
                          ];
                        const scoreDifference =
                          coachSkill.currentLevel - athleteSkill.currentLevel;
                        return (
                          <Card key={index} className="w-full">
                            <CardHeader className="p-2">
                              <CardTitle className="text-center text-base font-medium">
                                {athleteSkill.skill}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Athlete
                                  </p>
                                  <Speedometer
                                    score={athleteSkill.currentLevel}
                                  />
                                </div>
                                <DifferenceIndicator
                                  difference={scoreDifference}
                                />
                                <div className="flex flex-col items-center">
                                  <p className="mb-1 text-xs font-medium">
                                    Coach
                                  </p>
                                  <Speedometer
                                    score={coachSkill.currentLevel}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      },
                    )
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6 rounded-lg border bg-green-50 p-4">
                  <h3 className="text-lg font-semibold">Athlete Feedback</h3>
                  {evaluationResults.athlete
                    ? evaluationResults.athlete.coachFeedback.questions.map(
                        (question, index) => (
                          <div key={index}>
                            <h4 className="mb-2 font-medium">
                              {question.label}
                            </h4>
                            <p className="rounded bg-primary/10 p-2">
                              {question.response}
                            </p>
                          </div>
                        ),
                      )
                    : "N/A"}
                </div>
                <div className="space-y-6 rounded-lg border p-4">
                  <h3 className="text-lg font-semibold">Coach Feedback</h3>
                  {evaluationResults.coach.coachFeedback.questions.map(
                    (question, index) => (
                      <div key={index}>
                        <h4 className="mb-2 font-medium">{question.label}</h4>
                        <p className="rounded bg-primary/10 p-2">
                          {question.response}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Next Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p>
                The next evaluation is scheduled for:{" "}
                <strong>
                  {new Date(
                    `${evaluationResults.athlete.nextEvaluationDate}T${evaluationResults.athlete.nextEvaluationTime}`,
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(
                    `${evaluationResults.athlete.nextEvaluationDate}T${evaluationResults.athlete.nextEvaluationTime}`,
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </strong>
              </p> */}
            </CardContent>
          </Card>
          <div className="mt-8 flex w-full justify-between">
            <Button
              variant="outline"
              onClick={() => console.log("Navigate to previous page")}
            >
              Back
            </Button>
            <Button
              className="bg-green-500 text-white"
              onClick={() => console.log("Navigate to dashboard")}
            >
              Go to Home Page
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
