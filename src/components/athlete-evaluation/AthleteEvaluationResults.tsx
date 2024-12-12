"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { getFullname } from "@/lib/utils";
import Speedometer from "./Speedometer";
import DifferenceIndicator from "./DifferenceIndicator";
import BackButton from "../dashboard/BackButton";
import Link from "next/link";

export default function EvaluationResults({
  evaluationResults,
}: {
  evaluationResults: {
    coach: AthleteEvaluationType;
    athlete: AthleteEvaluationType | null;
    nextEvaluationDate: Date | undefined;
  };
}) {
  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-8 py-4">
      <div className="flex flex-col gap-4">
        <div className="mb-4 text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <h1 className="text-3xl font-bold">Athlete Evaluation Results</h1>
      </div>
      <div className="flex flex-col items-stretch justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
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
      <Card>
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
                        <h4 className="mb-2 font-medium">{question.label}</h4>
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

      <Card>
        <CardHeader>
          <CardTitle>Physical Skill Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationResults.coach.physicalSkillAssessments.map(
              (coachSkill, index) => {
                const athleteSkill =
                  evaluationResults.athlete?.physicalSkillAssessments[index];
                const scoreDifference = athleteSkill
                  ? coachSkill.currentLevel - athleteSkill.currentLevel
                  : "N/A";
                return (
                  <Card key={index} className="w-full">
                    <CardHeader className="p-2">
                      <CardTitle className="text-center text-base font-medium">
                        {coachSkill.skill}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Athlete</p>
                          <Speedometer
                            score={athleteSkill?.currentLevel || "N/A"}
                          />
                        </div>
                        <DifferenceIndicator difference={scoreDifference} />
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Coach</p>
                          <Speedometer score={coachSkill.currentLevel} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mental Skill Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationResults.coach.mentalSkillAssessments.map(
              (coachSkill, index) => {
                const athleteSkill =
                  evaluationResults.athlete?.physicalSkillAssessments[index];
                const scoreDifference = athleteSkill
                  ? coachSkill.currentLevel - athleteSkill.currentLevel
                  : "N/A";

                return (
                  <Card key={index} className="w-full">
                    <CardHeader className="p-2">
                      <CardTitle className="text-center text-base font-medium">
                        {coachSkill.skill}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Athlete</p>
                          <Speedometer
                            score={athleteSkill?.currentLevel || "N/A"}
                          />
                        </div>
                        <DifferenceIndicator difference={scoreDifference} />
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Coach</p>
                          <Speedometer score={coachSkill.currentLevel} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sport-Specific Skill Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationResults.coach.sportSpecificSkillAssessments.map(
              (coachSkill, index) => {
                const athleteSkill =
                  evaluationResults.athlete?.physicalSkillAssessments[index];
                const scoreDifference = athleteSkill
                  ? coachSkill.currentLevel - athleteSkill.currentLevel
                  : "N/A";
                return (
                  <Card key={index} className="w-full">
                    <CardHeader className="p-2">
                      <CardTitle className="text-center text-base font-medium">
                        {coachSkill.skill}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Athlete</p>
                          <Speedometer
                            score={athleteSkill?.currentLevel || "N/A"}
                          />
                        </div>
                        <DifferenceIndicator difference={scoreDifference} />
                        <div className="flex flex-col items-center">
                          <p className="mb-1 text-xs font-medium">Coach</p>
                          <Speedometer score={coachSkill.currentLevel} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
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
                        <h4 className="mb-2 font-medium">{question.label}</h4>
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

      <Card>
        <CardHeader>
          <CardTitle>Next Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The next evaluation is scheduled for:{" "}
            <strong>
              {evaluationResults.nextEvaluationDate
                ? new Date(
                    evaluationResults.nextEvaluationDate,
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </strong>
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex w-full justify-between">
        <BackButton />
        <Link
          href={"/dashboard/athlete-evaluation"}
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-600"
        >
          Go to Home Page
        </Link>
      </div>
    </main>
  );
}
