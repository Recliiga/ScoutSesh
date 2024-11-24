"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DailyJournalCommentableText from "@/components/daily-journal/CommentableText";
import DailyJournalCommentDialog from "@/components/daily-journal/CommentDialog";
import { XIcon } from "lucide-react";
import { postDailyJournalComment } from "@/actions/commentActions";
import { DailyJournalCommentType } from "@/db/models/DailyJournalCommen";
import { DailyJournalType } from "@/db/models/DailyJournal";

export type DailyJournalDetailsType = {
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  changeTomorrow: string;
  continueTomorrow: string;
};

export default function DailyJournalResults({
  journalData,
}: {
  journalData: DailyJournalType;
}) {
  const [activeComment, setActiveComment] =
    useState<DailyJournalCommentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [comments, setComments] = useState<DailyJournalCommentType[]>([]);

  function closePopover() {
    setActiveComment(null);
    setActiveSection("");
  }

  function addComment(sectionId: string) {
    setActiveComment({
      text: "",
    } as DailyJournalCommentType);
    setActiveSection(sectionId);
  }

  async function submitComment(text: string) {
    setLoading(true);
    const noText = text.trim() === "";

    if (!activeComment || noText) return;

    const { newComment, error } = await postDailyJournalComment(
      text,
      journalData._id,
      activeSection
    );

    console.log({ newComment, error });

    // const {
    //   newComment,
    //   error,
    // }:
    //   | { newComment: DailyJournalCommentType; error: null }
    //   | { newComment: null; error: string } = {
    //   newComment: null,
    //   error: "asdf",
    // };

    if (error === null) {
      setComments((prevComments) => [...prevComments, newComment]);
      closePopover();
    }

    setLoading(false);
  }

  const journalDataUserName =
    journalData.user.firstName + " " + journalData.user.lastName;

  const dailyJournalSections = [
    {
      id: "trainingAndCompetition",
      title: "How was your training and competition today?",
      commentableText: journalData.details.trainingAndCompetition,
    },
    {
      id: "nutrition",
      title: "Did you make healthy nutrition choices today?",
      commentableText: journalData.details.nutrition,
    },
    {
      id: "sleep",
      title: "How was your sleep last night?",
      commentableText: journalData.details.sleep,
    },
    {
      id: "mentalState",
      title: "How do you feel mentally today?",
      commentableText: journalData.details.mentalState,
    },
    {
      id: "changeTomorrow",
      title: "How do you feel mentally today?",
      commentableText: journalData.details.changeTomorrow,
    },
    {
      id: "continueTomorrow",
      title: "What positive things will you continue doing tomorrow?",
      commentableText: journalData.details.continueTomorrow,
    },
  ];

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="mx-auto py-6 w-[90%] max-w-6xl">
          <h2 className="mb-2 font-semibold text-2xl">Daily Journal Results</h2>
          <div className="mb-6 text-muted-foreground text-sm">
            {new Date(journalData.createdAt).toDateString()}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={journalData.user.profilePicture}
                    alt={journalDataUserName}
                  />
                  <AvatarFallback>
                    {journalDataUserName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-xl">
                    {journalDataUserName}
                  </h2>
                  <p className="text-muted-foreground">Player</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Daily Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dailyJournalSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="mb-2 font-semibold text-lg">
                      {section.title}
                    </h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <DailyJournalCommentableText
                            text={section.commentableText}
                            sectionId={section.id}
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
                        <DailyJournalCommentableText
                          text={section.commentableText}
                          sectionId={section.id}
                          addComment={addComment}
                          comments={comments}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
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
      <DailyJournalCommentDialog
        isOpen={Boolean(activeComment)}
        loading={loading}
        onClose={() => setActiveComment(null)}
        onSubmit={submitComment}
        initialText={activeComment ? activeComment.text : ""}
      />
    </>
  );
}
