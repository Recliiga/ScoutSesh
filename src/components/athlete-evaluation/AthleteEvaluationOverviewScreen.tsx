import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Input } from "../ui/input";
import EditButton from "./EditButton";
import EditQuestionButton from "./EditQuestionButton";
import {
  AthleteEvaluationTemplateType,
  OverviewDetailsType,
} from "@/db/models/AthleteEvaluationTemplate";

type PropsType = {
  overviewDetails: OverviewDetailsType;
  removeQuestion(
    section: keyof AthleteEvaluationTemplateType,
    index: number,
  ): void;
  updateOverviewDetails(field: "title" | "description", value: string): void;
  updateOverviewDetailsQuestion(
    field: "label" | "placeholder",
    value: string,
    index: number,
  ): void;
  addQuestion(section: keyof AthleteEvaluationTemplateType): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function AthleteEvaluationOverviewScreen({
  overviewDetails,
  removeQuestion,
  updateOverviewDetails,
  updateOverviewDetailsQuestion,
  addQuestion,
  setCurrentScreen,
}: PropsType) {
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
  });
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const isEditingAny =
    isEditing.title || isEditing.description || Boolean(editingQuestion);

  const cannotSubmit =
    isEditingAny ||
    overviewDetails.title.trim() === "" ||
    overviewDetails.description.trim() === "" ||
    overviewDetails.questions.some(
      (question) =>
        question.label.trim() === "" || question.placeholder.trim() === "",
    );

  return (
    <div className="flex w-full flex-col items-center justify-center text-sm">
      <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            1/7 Athlete Evaluation
          </div>
          <div
            className={`flex items-start justify-between gap-2 ${
              isEditing.title ? "mb-4" : ""
            }`}
          >
            {isEditing.title ? (
              <Input
                name="title"
                className="font-bold"
                value={overviewDetails.title}
                onChange={(e) => updateOverviewDetails("title", e.target.value)}
              />
            ) : (
              <h1 className="text-2xl font-bold">{overviewDetails.title}</h1>
            )}
            <EditButton
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              field="title"
            />
          </div>
          <div className="flex items-start justify-between gap-2">
            {isEditing.description ? (
              <Textarea
                name="description"
                className="text-sm"
                rows={5}
                value={overviewDetails.description}
                onChange={(e) =>
                  updateOverviewDetails("description", e.target.value)
                }
              />
            ) : (
              <p className="mb-4">{overviewDetails.description}</p>
            )}
            <EditButton
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              field="description"
            />
          </div>
        </div>
        <div className="flex-1">
          {overviewDetails.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between gap-2">
                {editingQuestion === `question-${index}` ? (
                  <Input
                    name={`question-${index}`}
                    className="text-sm font-medium"
                    placeholder="Enter your question"
                    value={overviewDetails.questions[index].label}
                    onChange={(e) =>
                      updateOverviewDetailsQuestion(
                        "label",
                        e.target.value,
                        index,
                      )
                    }
                  />
                ) : (
                  <Label
                    className={`"text-sm font-medium ${
                      question.label ? "" : "text-zinc-400"
                    }`}
                  >
                    {question.label || "Enter your question"}
                  </Label>
                )}
                <div className="flex items-center space-x-1">
                  <EditQuestionButton
                    isEditing={editingQuestion === `question-${index}`}
                    questionId={`question-${index}`}
                    setEditingQuestion={setEditingQuestion}
                  />
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
                name={`placeholder-${index}`}
                className="mt-2 w-full text-sm"
                placeholder="Enter placeholder"
                value={question.placeholder}
                onChange={(e) =>
                  updateOverviewDetailsQuestion(
                    "placeholder",
                    e.target.value,
                    index,
                  )
                }
              />
            </div>
          ))}
          <Button
            onClick={() => {
              addQuestion("overviewDetails");
              setEditingQuestion(
                `question-${overviewDetails.questions.length}`,
              );
            }}
            className="mt-4 flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>
      <div className="mt-8 flex w-full max-w-4xl justify-between">
        <Button
          disabled={cannotSubmit}
          className="ml-auto bg-green-600 text-white"
          onClick={() => setCurrentScreen("physical-skill-assessment")}
        >
          Next: Physical Skill Assessment
        </Button>
      </div>
    </div>
  );
}
