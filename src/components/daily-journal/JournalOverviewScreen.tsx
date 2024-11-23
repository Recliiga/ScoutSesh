import { JournalDataType, ScreenType } from "./DailyJournalForm";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import BackButton from "../dashboard/BackButton";

export default function JournalOverviewScreen({
  journalData,
  setCurrentScreen,
}: {
  journalData: JournalDataType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
}) {
  return (
    <div className="flex flex-col items-center gap-8 mx-auto py-8 w-[90%] max-w-6xl">
      <div className="flex md:flex-row flex-col gap-8 max-w-4xl">
        <div className="flex-1">
          <div className="mb-4 text-muted-foreground text-sm">
            1/3 Daily Journal
          </div>
          <h1 className="mb-4 font-bold text-2xl sm:text-3xl">
            Let&apos;s record your day
          </h1>
          <p>
            Keeping a daily journal is crucial for tracking your progress and
            identifying areas for improvement in your hockey journey. Take a few
            minutes to reflect on your day and answer the following questions
            honestly.
          </p>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <Label className="mb-2 font-medium text-sm">
              Today&apos;s Date
            </Label>
            <div className="bg-muted p-2 border rounded-md w-fit md:w-full">
              {journalData.date}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-4xl">
        <BackButton />
        <Button
          className="bg-green-500 text-white"
          onClick={() => setCurrentScreen("journal-details")}
        >
          Continue to Daily Journal
        </Button>
      </div>
    </div>
  );
}
