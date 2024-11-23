"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ConfidenceMeter from "@/components/weekly-reflection/ConfidenceMeter";
import WeeklyReflectionCommentableText from "@/components/weekly-reflection/CommentableText";
import WeeklyReflectionCommentDialog from "@/components/weekly-reflection/CommentDialog";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { GoalCommentType } from "@/db/models/GoalComment";
import { postGoalComment } from "@/actions/commentActions";
import Link from "next/link";
import { getFullname } from "@/lib/utils";

export default function WeeklyReflectionResults({
  goalData,
  comments: goalComments,
}: {
  goalData: GoalDataSchemaType;
  comments: GoalCommentType[];
}) {
  const [activeComment, setActiveComment] = useState<GoalCommentType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [comments, setComments] = useState<GoalCommentType[]>(goalComments);

  function closePopover() {
    setActiveComment(null);
    setActiveSection("");
  }

  function addComment(sectionId: string) {
    setActiveComment({
      text: "",
    } as GoalCommentType);
    setActiveSection(sectionId);
  }

  async function submitComment(text: string) {
    setLoading(true);
    const noText = text.trim() === "";

    if (!activeComment || noText) return;

    const { newComment, error } = await postGoalComment(
      text,
      goalData._id,
      activeSection
    );

    if (error === null) {
      setComments((prevComments) => [...prevComments, newComment]);
      closePopover();
    }

    setLoading(false);
  }

  const reflectionDataUserName = getFullname(goalData.user);

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="mx-auto py-4 w-[90%] max-w-6xl">
          <h2 className="mb-2 font-semibold text-2xl">
            Weekly Reflection Results
          </h2>
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
                    alt={reflectionDataUserName}
                  />
                  <AvatarFallback>
                    {reflectionDataUserName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-xl">
                    {reflectionDataUserName}
                  </h2>
                  <p className="text-muted-foreground">{goalData.user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader className="p-4 sm:p-6 pb-0">
              <CardTitle>Goal Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What is your Aspiration?
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <WeeklyReflectionCommentableText
                          text={goalData.details.aspiration}
                          sectionId="aspiration"
                          addComment={addComment}
                          comments={comments}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Comments</h4>
                        <button
                          onClick={closePopover}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <WeeklyReflectionCommentableText
                        text={goalData.details.aspiration}
                        sectionId="aspiration"
                        addComment={addComment}
                        comments={comments}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What are your Strengths?
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <WeeklyReflectionCommentableText
                          text={goalData.details.strengths}
                          sectionId="strengths"
                          addComment={addComment}
                          comments={comments}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Comments</h4>
                        <button
                          onClick={closePopover}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <WeeklyReflectionCommentableText
                        text={goalData.details.strengths}
                        sectionId="strengths"
                        addComment={addComment}
                        comments={comments}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What are your Weaknesses?
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <WeeklyReflectionCommentableText
                          text={goalData.details.weaknesses}
                          sectionId="weaknesses"
                          addComment={addComment}
                          comments={comments}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Comments</h4>
                        <button
                          onClick={closePopover}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <WeeklyReflectionCommentableText
                        text={goalData.details.weaknesses}
                        sectionId="weaknesses"
                        addComment={addComment}
                        comments={comments}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Goal Reflections</CardTitle>
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
                          <Popover>
                            <PopoverTrigger asChild>
                              <div>
                                <WeeklyReflectionCommentableText
                                  text={goal.goal}
                                  sectionId={`goal-${goal._id}`}
                                  addComment={addComment}
                                  comments={comments}
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">Comments</h4>
                                <button
                                  onClick={closePopover}
                                  className="text-gray-500 hover:text-gray-700"
                                  aria-label="Close comments"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                              </div>
                              <WeeklyReflectionCommentableText
                                text={goal.goal}
                                sectionId={`goal-${goal._id}`}
                                addComment={addComment}
                                comments={comments}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                          <div>
                            <h4 className="mb-1 font-medium">
                              What will I need to do to achieve this?
                            </h4>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div>
                                  <WeeklyReflectionCommentableText
                                    text={goal.actions}
                                    sectionId={`actions-${goal._id}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={closePopover}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <WeeklyReflectionCommentableText
                                  text={goal.actions}
                                  sectionId={`actions-${goal._id}`}
                                  addComment={addComment}
                                  comments={comments}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <h4 className="mb-1 font-medium">
                              Where will I be doing it?
                            </h4>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div>
                                  <WeeklyReflectionCommentableText
                                    text={goal.location}
                                    sectionId={`location-${goal._id}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={closePopover}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <WeeklyReflectionCommentableText
                                  text={goal.location}
                                  sectionId={`location-${goal._id}`}
                                  addComment={addComment}
                                  comments={comments}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <h4 className="mb-1 font-medium">
                              How regularly will I do it?
                            </h4>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div>
                                  <WeeklyReflectionCommentableText
                                    text={goal.frequency}
                                    sectionId={`frequency-${goal._id}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={closePopover}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <WeeklyReflectionCommentableText
                                  text={goal.frequency}
                                  sectionId={`frequency-${goal._id}`}
                                  addComment={addComment}
                                  comments={comments}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <h4 className="mb-1 font-medium">
                              Initial Confidence:
                            </h4>
                            <ConfidenceMeter score={goal.confidence} />
                            <p className="mt-1 text-gray-600 text-sm">
                              {goal.confidence}/10
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 border-gray-200 bg-gray-100 p-4 border rounded-lg">
                          <h4 className="font-medium text-gray-800">
                            Weekly Reflections:
                          </h4>
                          {goal.weeklyReflections.map((weeklyReflection, i) => (
                            <div
                              key={weeklyReflection._id}
                              className="flex flex-col gap-2 bg-white px-4 p-2 rounded-md"
                            >
                              <h5 className="font-semibold text-accent-black">
                                Week #{i + 1}
                              </h5>
                              <div className="bg-white rounded">
                                <h5 className="font-medium text-gray-700">
                                  Is this strategy servicing my goal?
                                </h5>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div>
                                      <WeeklyReflectionCommentableText
                                        text={weeklyReflection.improvement}
                                        sectionId={`strategy-${goal._id}-${weeklyReflection._id}`}
                                        addComment={addComment}
                                        comments={comments}
                                      />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="font-semibold">
                                        Comments
                                      </h4>
                                      <button
                                        onClick={closePopover}
                                        className="text-gray-500 hover:text-gray-700"
                                        aria-label="Close comments"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <WeeklyReflectionCommentableText
                                      text={weeklyReflection.improvement}
                                      sectionId={`strategy-${goal._id}-${weeklyReflection._id}`}
                                      addComment={addComment}
                                      comments={comments}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="bg-white rounded">
                                <h5 className="font-medium text-gray-700">
                                  Did I complete this goal?
                                </h5>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div>
                                      <WeeklyReflectionCommentableText
                                        text={weeklyReflection.completion}
                                        sectionId={`completion-${goal._id}-${weeklyReflection._id}`}
                                        addComment={addComment}
                                        comments={comments}
                                      />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="font-semibold">
                                        Comments
                                      </h4>
                                      <button
                                        onClick={closePopover}
                                        className="text-gray-500 hover:text-gray-700"
                                        aria-label="Close comments"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <WeeklyReflectionCommentableText
                                      text={weeklyReflection.completion}
                                      sectionId={`completion-${goal._id}-${weeklyReflection._id}`}
                                      addComment={addComment}
                                      comments={comments}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-8 mb-4 w-full">
            <Button variant={"outline"} className="px-0 py-0">
              <Link
                href={"/dashboard/goal-setting/submissions"}
                className="px-2 sm:px-4 py-2 w-full h-full"
              >
                Back to Submissions
              </Link>
            </Button>
            <Button className="bg-green-500 px-0 py-0 text-white">
              <Link
                href={"/dashboard/goal-setting"}
                className="px-2 sm:px-4 py-2 w-full h-full"
              >
                Go to Home Page
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
      <WeeklyReflectionCommentDialog
        isOpen={Boolean(activeComment)}
        loading={loading}
        onClose={() => setActiveComment(null)}
        onSubmit={submitComment}
        initialText={activeComment ? activeComment.text : ""}
      />
    </>
  );
}
