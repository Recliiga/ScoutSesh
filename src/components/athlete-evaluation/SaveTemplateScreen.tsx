import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import {
  createTemplate,
  updateTemplate,
} from "@/actions/AthleteEvaluationActions";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";

export default function SaveTemplateScreen({
  templateData,
  templateName,
  setTemplateName,
  setCurrentScreen,
  isEditing,
}: {
  templateData: AthleteEvaluationTemplateType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  templateName: string;
  setTemplateName: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date().toDateString();

  async function handleSaveTemplate() {
    setError(null);
    setLoading(true);
    const { error } = isEditing
      ? await updateTemplate(templateData._id, templateData)
      : await createTemplate(templateData);
    if (!error) {
      setCurrentScreen("completion");
    }
    setError(error);
    setLoading(false);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            6/7 Athlete Evaluation
          </div>
          <h1 className="mb-4 text-3xl font-bold">
            {isEditing ? "Update" : "Save"} Evaluation Template
          </h1>
          <p className="text-gray-600">
            Name and {isEditing ? "update" : "save"} your evaluation template.
            This template can be used for future evaluations.
          </p>
        </div>
        <div className="flex-1">
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  name="template-name"
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter a name for your template"
                />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="template-date" className="font-semibold">
                  Date
                </Label>
                <p id="template-date" className="text-gray-700">
                  {currentDate}
                </p>
              </div>
              {error && <Error error={error} />}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 flex w-full max-w-4xl justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("player-feedback")}
        >
          Back
        </Button>
        <Button
          className="bg-green-600 text-white"
          onClick={handleSaveTemplate}
          disabled={!templateName.trim() || loading}
        >
          {loading ? (
            <>
              <LoadingIndicator /> Saving...
            </>
          ) : templateName.trim() ? (
            `${isEditing ? "Update" : "Save"} Template as: ${templateName}`
          ) : (
            `${isEditing ? "Update" : "Save"} Template`
          )}
        </Button>
      </div>
    </div>
  );
}
