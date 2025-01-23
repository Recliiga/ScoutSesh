import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function CourseDateField({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate?: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate?: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="space-y-2">
      <Label>Course Dates</Label>
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2">
              Start Date:
              <Button variant="outline" type="button">
                {startDate ? format(startDate, "PPP") : "Select Date"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              fromDate={new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2">
              End Date:
              <Button variant="outline" type="button" disabled={!startDate}>
                {endDate ? format(endDate, "PPP") : "Select Date"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              fromDate={startDate}
              disabled={!startDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
