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
import CommentableText from "@/components/weekly-reflection/CommentableText";
import CommentDialog from "@/components/weekly-reflection/CommentDialog";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { CommentSchemaType } from "@/db/models/Comment";

export default function WeeklyReflectionResults({
  goalData,
}: {
  goalData: GoalDataSchemaType;
}) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<CommentSchemaType | null>(
    null
  );
  const [activeSection, setActiveSection] = useState("");
  const [comments, setComments] = useState<{
    [key: string]: CommentSchemaType[];
  }>({});

  function addComment(sectionId: string) {
    setActiveSection(sectionId);
    setActiveComment({
      text: "",
      author: "",
    } as CommentSchemaType);
    setIsCommentDialogOpen(true);
  }

  function submitComment(text: string) {
    const noText = text.trim() === "";

    if (!activeComment || noText) return;

    const newComment = {
      text,
      author: "John Doe",
    } as CommentSchemaType;
    setComments((prevComments) => ({
      ...prevComments,
      [activeSection]: [...(prevComments[activeSection] || []), newComment],
    }));

    setIsCommentDialogOpen(false);
    setActiveComment(null);
    setActiveSection("");
  }

  const reflectionDataUserName =
    goalData.user.firstName + " " + goalData.user.lastName;

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="mx-auto p-4 w-[90%] max-w-6xl">
          <h2 className="mb-2 font-semibold text-2xl">
            Weekly Reflection Results
          </h2>
          <h1 className="mb-2 font-bold text-3xl">{goalData.name}</h1>
          <div className="mb-6 text-muted-foreground text-sm">
            {goalData.name}
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
            <CardHeader>
              <CardTitle>Goal Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-lg">
                    What is your Aspiration?
                  </h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <CommentableText
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
                          onClick={() => {
                            console.log(`Closing comment box for aspiration`);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <CommentableText
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
                        <CommentableText
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
                          onClick={() => {
                            console.log(`Closing comment box for strengths`);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <CommentableText
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
                        <CommentableText
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
                          onClick={() => {
                            console.log(`Closing comment box for weaknesses`);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close comments"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <CommentableText
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
                                <CommentableText
                                  text={goal.goal}
                                  sectionId={`goal-${index}`}
                                  addComment={addComment}
                                  comments={comments}
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">Comments</h4>
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Closing comment box for goal-${index}`
                                    );
                                  }}
                                  className="text-gray-500 hover:text-gray-700"
                                  aria-label="Close comments"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                              </div>
                              <CommentableText
                                text={goal.goal}
                                sectionId={`goal-${index}`}
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
                                  <CommentableText
                                    text={goal.actions}
                                    sectionId={`actions-${index}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={() => {
                                      console.log(
                                        `Closing comment box for actions-${index}`
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <CommentableText
                                  text={goal.actions}
                                  sectionId={`actions-${index}`}
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
                                  <CommentableText
                                    text={goal.location}
                                    sectionId={`location-${index}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={() => {
                                      console.log(
                                        `Closing comment box for location-${index}`
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <CommentableText
                                  text={goal.location}
                                  sectionId={`location-${index}`}
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
                                  <CommentableText
                                    text={goal.frequency}
                                    sectionId={`frequency-${index}`}
                                    addComment={addComment}
                                    comments={comments}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">Comments</h4>
                                  <button
                                    onClick={() => {
                                      console.log(
                                        `Closing comment box for frequency-${index}`
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close comments"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <CommentableText
                                  text={goal.frequency}
                                  sectionId={`frequency-${index}`}
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
                              key={weeklyReflection._id as string}
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
                                      <CommentableText
                                        text={weeklyReflection.improvement}
                                        sectionId={`strategy-${index}-${i}`}
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
                                        onClick={() => {
                                          console.log(
                                            `Closing comment box for strategy-${index}-${i}`
                                          );
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        aria-label="Close comments"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <CommentableText
                                      text={weeklyReflection.improvement}
                                      sectionId={`strategy-${index}-${i}`}
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
                                      <CommentableText
                                        text={weeklyReflection.completion}
                                        sectionId={`completion-${index}-${i}`}
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
                                        onClick={() => {
                                          console.log(
                                            `Closing comment box for completion-${index}-${i}`
                                          );
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        aria-label="Close comments"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <CommentableText
                                      text={weeklyReflection.completion}
                                      sectionId={`completion-${index}-${i}`}
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
          <div className="flex justify-end mt-8 mb-4 w-full">
            <Button
              className="bg-green-500 text-white"
              onClick={() => console.log("Navigate to dashboard")}
            >
              Go to Home Page
            </Button>
          </div>
        </div>
      </ScrollArea>
      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => {
          setIsCommentDialogOpen(false);
          setActiveComment(null);
        }}
        onSubmit={submitComment}
        initialText={activeComment ? activeComment.text : ""}
      />
    </>
  );
}
