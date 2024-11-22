import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { CalendarIcon, CheckCircle, ChevronRightIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

export type EntryType = {
  id: number;
  date: string;
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  reflection: {
    changeTomorrow: string;
    continueTomorrow: string;
  };
};

export default function JournalEntryCard({ entry }: { entry: EntryType }) {
  return (
    <Link href={`/journal-entries/${entry.id}`}>
      <Card className="hover:bg-gray-100 transition-colors">
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-center font-medium text-sm">
              <CalendarIcon className="mr-1 w-4 h-4" />
              {format(parseISO(entry.date), "MMMM d, yyyy")}
            </div>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
