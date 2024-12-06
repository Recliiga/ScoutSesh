import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import { createTemplate } from "@/actions/AETemplateActions";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";

export default function SaveTemplateScreen({
  templateData,
  setCurrentScreen,
}: {
  templateData: AthleteEvaluationTemplateType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [templateName, setTemplateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date().toDateString();

  async function handleSaveTemplate() {
    setError(null);
    setLoading(true);
    const { error } = await createTemplate(templateData);
    if (!error) {
      setCurrentScreen("completion");
    }
    setError(error);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex w-full max-w-4xl flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            6/7 Athlete Evaluation
          </div>
          <h1 className="mb-4 text-3xl font-bold">Save Evaluation Template</h1>
          <p className="text-gray-600">
            Name and save your evaluation template. This template can be used
            for future evaluations.
          </p>
        </div>
        <div className="flex-1">
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter a name for your template"
                />
              </div>
              <div className="space-y-2 mt-4">
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
      <div className="flex justify-between w-full max-w-4xl mt-8">
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
            `Save Template as: ${templateName}`
          ) : (
            "Save Template"
          )}
        </Button>
      </div>
    </div>
  );
}
