import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useClickOutside from "@/hooks/useClickOutside";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function StartDateField({
  startDate,
  endDate,
  setEndDate,
}: {
  startDate?: Date;
  endDate?: Date;
  setEndDate(date?: Date): void;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [popoverRef] = useClickOutside(() => setPopoverOpen(false));

  return (
    <div ref={popoverRef}>
      <Popover open={popoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 text-sm">
            End Date:
            <Button
              variant="outline"
              type="button"
              disabled={!startDate}
              onClick={() => setPopoverOpen(true)}
            >
              {endDate ? format(endDate, "PPP") : "Select Date"}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(value) => {
              setEndDate(value);
              setPopoverOpen(false);
            }}
            fromDate={startDate}
            disabled={!startDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
