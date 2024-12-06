import { PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AthleteEvaluationTemplateType,
  CoachFeedbackType,
} from "./CreateAthleteEvaluationTemplateForm";
import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import EditButton from "./EditButton";
import EditQuestionButton from "./EditQuestionButton";

type PropsType = {
  coachFeedback: CoachFeedbackType;
  updateCoachFeedback(field: "title" | "description", value: string): void;
  updateCoachFeedbackQuestion(
    field: "label" | "placeholder",
    value: string,
    index: number
  ): void;
  removeQuestion(
    section: keyof AthleteEvaluationTemplateType,
    index: number
  ): void;
  addQuestion(section: keyof AthleteEvaluationTemplateType): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function PlayerFeedbackScreen({
  coachFeedback,
  updateCoachFeedback,
  updateCoachFeedbackQuestion,
  removeQuestion,
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
    coachFeedback.title.trim() === "" ||
    coachFeedback.description.trim() === "" ||
    coachFeedback.questions.some(
      (question) =>
        question.label.trim() === "" || question.placeholder.trim() === ""
    );

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 text-sm">
      <div className="flex w-full max-w-4xl gap-8 md:flex-row flex-col">
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            5/7 Athlete Evaluation
          </div>
          <div
            className={`flex items-start gap-2 justify-between ${
              isEditing.title ? "mb-4" : ""
            }`}
          >
            {isEditing.title ? (
              <Input
                className="font-bold"
                value={coachFeedback.title}
                onChange={(e) => updateCoachFeedback("title", e.target.value)}
              />
            ) : (
              <h1 className="mb-4 text-3xl font-bold">{coachFeedback.title}</h1>
            )}
            <EditButton
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              field="title"
            />
          </div>
          <div className="flex items-start gap-2 justify-between">
            {isEditing.description ? (
              <Textarea
                className="text-sm"
                rows={3}
                value={coachFeedback.description}
                onChange={(e) =>
                  updateCoachFeedback("description", e.target.value)
                }
              />
            ) : (
              <p>{coachFeedback.description}</p>
            )}
            <EditButton
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              field="description"
            />
          </div>
        </div>
        <div className="flex-1">
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-4 sm:p-6">
              {coachFeedback.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between">
                    {editingQuestion === `question-${index}` ? (
                      <Input
                        className="font-medium text-sm"
                        placeholder="Enter your question"
                        value={coachFeedback.questions[index].label}
                        onChange={(e) =>
                          updateCoachFeedbackQuestion(
                            "label",
                            e.target.value,
                            index
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
                        onClick={() => removeQuestion("coachFeedback", index)}
                        className="text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id={`feedback-${index}`}
                    placeholder="Enter placeholder"
                    className="w-full mt-2 text-sm"
                    value={question.placeholder}
                    onChange={(e) =>
                      updateCoachFeedbackQuestion(
                        "placeholder",
                        e.target.value,
                        index
                      )
                    }
                  />
                </div>
              ))}
              <Button
                onClick={() => {
                  addQuestion("coachFeedback");
                  setEditingQuestion(
                    `question-${coachFeedback.questions.length}`
                  );
                }}
                className="mt-4 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Question
              </Button>
            </CardContent>
          </Card>
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
          disabled={cannotSubmit}
          className="bg-green-600 text-white"
          onClick={() => setCurrentScreen("save-template")}
        >
          Save Template
        </Button>
      </div>
    </div>
  );
}
