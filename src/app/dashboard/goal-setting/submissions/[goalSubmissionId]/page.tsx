import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAthleteGoalData } from "@/services/goalServices";
import ConfidenceMeter from "@/components/weekly-reflection/ConfidenceMeter";
import Link from "next/link";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import BackButton from "@/components/dashboard/BackButton";
import { getFullname } from "@/lib/utils";

export default async function GoalSettingResults({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const user = await getSessionFromHeaders();
  const { goalSubmissionId } = await params;
  const { goalData, error } = await fetchAthleteGoalData(goalSubmissionId);

  if (error !== null) throw new Error(error);
  if (!goalData) notFound();

  const goalDataUserName = getFullname(goalData.user);

  return (
    <main className="flex-1">
      <div className="flex flex-col justify-center items-center p-4 w-full min-h-screen">
        <div className="w-full max-w-4xl">
          <h2 className="mb-2 font-semibold text-2xl">Goal Setting Results</h2>
          <h1 className="mb-2 font-bold text-3xl">{goalData.name}</h1>
          <div className="mb-6 text-muted-foreground text-sm">
            {new Date(goalData.createdAt).toDateString()}
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={goalData.user.profilePicture}
                    alt={goalDataUserName}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {goalDataUserName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-xl">{goalDataUserName}</h2>
                  <p className="text-muted-foreground">{goalData.user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Goal Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What is your Aspiration?
                  </h3>
                  <p className="bg-primary/10 p-2 rounded">
                    {goalData.details.aspiration}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What are your Strengths?
                  </h3>
                  <p className="bg-primary/10 p-2 rounded">
                    {goalData.details.strengths}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What are your Weaknesses?
                  </h3>
                  <p className="bg-primary/10 p-2 rounded">
                    {goalData.details.weaknesses}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Define your goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalData.goals.map((goal, index) => (
                  <Card key={index} className="bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Goal #{index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-1 font-medium">Goal:</h4>
                          <p className="bg-white p-2 rounded">{goal.goal}</p>
                        </div>
                        <div>
                          <h4 className="mb-1 font-medium">
                            What will I need to do to achieve this?
                          </h4>
                          <p className="bg-white p-2 rounded">{goal.actions}</p>
                        </div>
                        <div>
                          <h4 className="mb-1 font-medium">
                            Where will I be doing it?
                          </h4>
                          <p className="bg-white p-2 rounded">
                            {goal.location}
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-1 font-medium">
                            How regularly will I do it?
                          </h4>
                          <p className="bg-white p-2 rounded">
                            {goal.frequency}
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-1 font-medium">
                            What is your current belief that you can complete
                            this goal?
                          </h4>
                          <ConfidenceMeter score={goal.confidence} />
                          <p className="mt-1 text-gray-600 text-sm">
                            {goal.confidence}/10
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Your goals have been successfully submitted. Here&apos;s what
                you should do next:
              </p>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Update your progress in your daily journal</li>
                <li>
                  Review and refine your goals regularly with the Weekly
                  Reflection
                </li>
                <li>
                  Discuss your goals with your coach during your next session
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-8 w-full">
            {user._id === goalData.user._id ? (
              <Button variant="outline" className="px-0 py-0">
                <Link
                  className="px-4 py-2"
                  href={`/dashboard/goal-setting/submissions/${goalData._id}/edit`}
                >
                  Edit Goals
                </Link>
              </Button>
            ) : (
              <BackButton />
            )}
            <Button className="bg-green-500 px-0 py-0 text-white">
              <Link className="px-4 py-2" href={`/dashboard/goal-setting`}>
                Go to Home Page
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
