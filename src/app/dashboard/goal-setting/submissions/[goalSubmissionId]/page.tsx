import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import ConfidenceMeter from "@/components/weekly-reflection/ConfidenceMeter";
// import Link from "next/link";
// import BackButton from "@/components/dashboard/BackButton";
// import { getFullname } from "@/lib/utils";
import { fetchAthleteGoalData } from "@/services/goalServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import WeeklyReflectionResults from "@/components/weekly-reflection/WeeklyReflectionResults";
import { fetchGoalComments } from "@/services/commentServices";

export default async function GoalSettingResults({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const user = await getSessionFromHeaders();
  const { goalSubmissionId } = await params;
  const { goalData } = await fetchAthleteGoalData(goalSubmissionId);
  if (!goalData) notFound();

  const { goalComments, error: commentError } =
    await fetchGoalComments(goalSubmissionId);
  if (commentError !== null) throw new Error(commentError);

  // const goalDataUserName = getFullname(goalData.user);

  return (
    <WeeklyReflectionResults
      goalComments={goalComments}
      goalData={goalData}
      forAthlete={user.role === "Athlete"}
    />
  );

  // return (
  //   <main className="flex-1">
  //     <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
  //       <div className="w-full max-w-4xl">
  //         <h2 className="mb-2 text-2xl font-semibold">Goal Setting Results</h2>
  //         <h1 className="mb-2 text-3xl font-bold">{goalData.name}</h1>
  //         <div className="mb-6 text-sm text-muted-foreground">
  //           {new Date(goalData.createdAt).toDateString()}
  //         </div>
  //         <Card className="mb-8">
  //           <CardHeader>
  //             <CardTitle>Player Information</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <div className="flex items-center space-x-4">
  //               <Avatar className="h-16 w-16">
  //                 <AvatarImage
  //                   src={goalData.user.profilePicture}
  //                   alt={goalDataUserName}
  //                   className="object-cover"
  //                 />
  //                 <AvatarFallback>
  //                   {goalData.user.firstName[0]}
  //                   {goalData.user.lastName[0]}
  //                 </AvatarFallback>
  //               </Avatar>
  //               <div>
  //                 <h2 className="text-xl font-semibold">{goalDataUserName}</h2>
  //                 <p className="text-muted-foreground">{goalData.user.role}</p>
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>
  //         <Card className="mb-8">
  //           <CardHeader>
  //             <CardTitle>Goal Overview</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <div className="space-y-6">
  //               <div>
  //                 <h3 className="mb-2 text-lg font-semibold">
  //                   What is your Aspiration?
  //                 </h3>
  //                 <p className="rounded bg-primary/10 p-2">
  //                   {goalData.details.aspiration}
  //                 </p>
  //               </div>
  //               <div>
  //                 <h3 className="mb-2 text-lg font-semibold">
  //                   What are your Strengths?
  //                 </h3>
  //                 <p className="rounded bg-primary/10 p-2">
  //                   {goalData.details.strengths}
  //                 </p>
  //               </div>
  //               <div>
  //                 <h3 className="mb-2 text-lg font-semibold">
  //                   What are your Weaknesses?
  //                 </h3>
  //                 <p className="rounded bg-primary/10 p-2">
  //                   {goalData.details.weaknesses}
  //                 </p>
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>
  //         <Card className="mb-8">
  //           <CardHeader>
  //             <CardTitle>Define your goals</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <div className="space-y-6">
  //               {goalData.goals.map((goal, index) => (
  //                 <Card key={index} className="bg-green-50">
  //                   <CardHeader>
  //                     <CardTitle className="text-lg">
  //                       Goal #{index + 1}
  //                     </CardTitle>
  //                   </CardHeader>
  //                   <CardContent>
  //                     <div className="space-y-4">
  //                       <div>
  //                         <h4 className="mb-1 font-medium">Goal:</h4>
  //                         <p className="rounded bg-white p-2">{goal.goal}</p>
  //                       </div>
  //                       <div>
  //                         <h4 className="mb-1 font-medium">
  //                           What will I need to do to achieve this?
  //                         </h4>
  //                         <p className="rounded bg-white p-2">{goal.actions}</p>
  //                       </div>
  //                       <div>
  //                         <h4 className="mb-1 font-medium">
  //                           Where will I be doing it?
  //                         </h4>
  //                         <p className="rounded bg-white p-2">
  //                           {goal.location}
  //                         </p>
  //                       </div>
  //                       <div>
  //                         <h4 className="mb-1 font-medium">
  //                           How regularly will I do it?
  //                         </h4>
  //                         <p className="rounded bg-white p-2">
  //                           {goal.frequency}
  //                         </p>
  //                       </div>
  //                       <div>
  //                         <h4 className="mb-1 font-medium">
  //                           What is your current belief that you can complete
  //                           this goal?
  //                         </h4>
  //                         <ConfidenceMeter score={goal.confidence} />
  //                         <p className="mt-1 text-sm text-gray-600">
  //                           {goal.confidence}/10
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </CardContent>
  //                 </Card>
  //               ))}
  //             </div>
  //           </CardContent>
  //         </Card>
  //         <Card className="mb-8">
  //           <CardHeader>
  //             <CardTitle>Next Steps</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <p className="mb-4">
  //               Your goals have been successfully submitted. Here&apos;s what
  //               you should do next:
  //             </p>
  //             <ul className="list-disc space-y-2 pl-5">
  //               <li>Update your progress in your daily journal</li>
  //               <li>
  //                 Review and refine your goals regularly with the Weekly
  //                 Reflection
  //               </li>
  //               <li>
  //                 Discuss your goals with your coach during your next session
  //               </li>
  //             </ul>
  //           </CardContent>
  //         </Card>
  //         <div className="mt-8 flex w-full justify-between">
  //           {user._id === goalData.user._id ? (
  //             <Button variant="outline" className="px-0 py-0">
  //               <Link
  //                 className="px-4 py-2"
  //                 href={`/dashboard/goal-setting/submissions/${goalData._id}/edit`}
  //               >
  //                 Edit Goals
  //               </Link>
  //             </Button>
  //           ) : (
  //             <BackButton />
  //           )}
  //           <Button className="bg-green-500 px-0 py-0 text-white">
  //             <Link className="px-4 py-2" href={`/dashboard/goal-setting`}>
  //               Go to Home Page
  //             </Link>
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
}
