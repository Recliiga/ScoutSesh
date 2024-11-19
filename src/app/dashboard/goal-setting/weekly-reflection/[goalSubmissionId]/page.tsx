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

const goalData = {
  _id: "673b0ddfe412914bba1a7458",
  name: "Increase in stamina and top speed updated",
  details: {
    aspiration: "Become the fastest in my team",
    strengths: "Acceleration",
    weaknesses: "Top speed",
  },
  goals: [
    {
      goal: "Increase my top speed to 23mph",
      actions: "Train daily",
      location: "The team training ground",
      frequency: "3 days a week",
      confidence: 0,
      dateCompleted: null,
      weeklyReflections: [
        {
          completion: "no",
          improvement: "yes",
          isCompleted: false,
          _id: "673c8ec1167f0d86f406742b",
          createdAt: new Date("2024-11-19T15:15:51.325Z"),
          updatedAt: new Date("2024-11-19T15:15:51.325Z"),
        },
      ],
      _id: "673b0ddfe412914bba1a7459",
      createdAt: new Date("2024-11-19T15:15:51.325Z"),
      updatedAt: new Date("2024-11-19T15:15:51.325Z"),
    },
    {
      goal: "Increase my stamina",
      actions: "Eat healthy",
      location: "At home",
      frequency: "Everyday",
      confidence: 9,
      dateCompleted: null,
      weeklyReflections: [
        {
          completion: "yes",
          improvement: "yes",
          isCompleted: false,
          _id: "673c8ec1167f0d86f406742c",
          createdAt: new Date("2024-11-19T15:15:51.325Z"),
          updatedAt: new Date("2024-11-19T15:15:51.325Z"),
        },
      ],
      _id: "673b0ddfe412914bba1a745a",
      createdAt: new Date("2024-11-19T15:15:51.325Z"),
      updatedAt: new Date("2024-11-19T15:15:51.325Z"),
    },
  ],
  user: {
    _id: "672aa11b09997457464f0be2",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "$2b$10$R9Fct96BLQr44mwn15r0IOrRLXH02LGi/vMUA8eQPYGWhD3xJpmRG",
    role: "Athlete",
    __v: 0,
    profilePicture:
      "http://res.cloudinary.com/dpw5ibssm/image/upload/v1731409547/tadcmxcepfm1udsysssg.jpg",
    DOB: "Thu Jan 01 1998 00:00:00 GMT+0100 (West Africa Standard Time)",
    bio: "John Doe is a professional football athlete known for his exceptional agility, strategic vision, and leadership on the field. Playing as a midfielder for Los Angeles FC, John has consistently impressed fans and coaches alike with his ability to control the game and create scoring opportunities. With a background in college-level football at UCLA and two league championships under his belt, John is dedicated to continuous improvement and teamwork, striving to elevate his game with every match. Off the field, he is passionate about community outreach, inspiring young athletes to pursue their dreams in sports.",
    location: "California, United States",
    primarySport: "Football",
    updatedAt: new Date("2024-11-12T11:05:46.826Z"),
    organization: null,
  },
  createdAt: new Date("2024-11-18T09:50:23.362Z"),
  updatedAt: new Date("2024-11-19T15:15:51.325Z"),
  __v: 1,
};

export type CommentType = {
  id: string;
  text: string;
  author: string;
  selectedText: string;
  timestamp: string;
};

type ActiveCommentType = {
  id: string;
  sectionId: string;
  selectedText: string;
};

export default function WeeklyReflectionResults() {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<ActiveCommentType | null>(
    null
  );
  const [comments, setComments] = useState<{ [key: string]: CommentType[] }>(
    {}
  );

  function addComment(sectionId: string, selectedText: string) {
    setActiveComment({ sectionId, selectedText });
    setIsCommentDialogOpen(true);
  }

  function submitComment(text: string) {
    if (!activeComment || !!text.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      text,
      author: "John Doe", // Replace with actual user name when available
      selectedText: activeComment.selectedText,
      timestamp: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
    setComments((prevComments) => ({
      ...prevComments,
      [activeComment.sectionId]: [
        ...(prevComments[activeComment.sectionId] || []),
        newComment,
      ],
    }));

    setIsCommentDialogOpen(false);
    setActiveComment(null);
  }

  function editComment(comment: CommentType, sectionId: string) {
    console.log(comment);
    setActiveComment({ ...comment, sectionId });
    setIsCommentDialogOpen(true);
  }

  function updateComment(text: string) {
    if (!activeComment || !!text.trim()) return;

    setComments((prevComments) => ({
      ...prevComments,
      [activeComment.sectionId]: prevComments[activeComment.sectionId].map(
        (c) =>
          c.id === activeComment.id
            ? {
                ...c,
                text,
                timestamp: new Date().toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }),
              }
            : c
      ),
    }));

    setActiveComment(null);
    setIsCommentDialogOpen(false);
  }

  // function deleteComment(commentId: string, sectionId: string) {
  //   setComments((prevComments) => ({
  //     ...prevComments,
  //     [sectionId]: prevComments[sectionId].filter((c) => c.id !== commentId),
  //   }));
  // }

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
                          editComment={editComment}
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
                        editComment={editComment}
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
                          editComment={editComment}
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
                        editComment={editComment}
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
                          editComment={editComment}
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
                        editComment={editComment}
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
                                  editComment={editComment}
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
                                editComment={editComment}
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
                                    editComment={editComment}
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
                                  editComment={editComment}
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
                                    editComment={editComment}
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
                                  editComment={editComment}
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
                                    editComment={editComment}
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
                                  editComment={editComment}
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
                                      <CommentableText
                                        text={weeklyReflection.improvement}
                                        sectionId={`strategy-${index}-${i}`}
                                        addComment={addComment}
                                        editComment={editComment}
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
                                      editComment={editComment}
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
                                        editComment={editComment}
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
                                      editComment={editComment}
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
        onSubmit={
          activeComment && activeComment.id ? updateComment : submitComment
        }
        initialText={activeComment ? activeComment.selectedText : ""}
      />
    </>
  );
}
