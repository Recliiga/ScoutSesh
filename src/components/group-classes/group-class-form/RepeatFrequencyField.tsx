import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RepeatFrequencyType } from "@/db/models/GroupClass";

export default function RepeatFrequencyField({
  repeatFrequency,
  setRepeatFrequency,
}: {
  repeatFrequency?: RepeatFrequencyType;
  setRepeatFrequency: (value: RepeatFrequencyType | undefined) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="repeatFrequency">Repeat</Label>
      <Select
        name="repeatFrequency"
        value={repeatFrequency}
        onValueChange={(value) =>
          setRepeatFrequency(value as RepeatFrequencyType)
        }
      >
        <SelectTrigger id="repeatFrequency">
          <SelectValue placeholder="Select repeat option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Every Day</SelectItem>
          <SelectItem value="weekly">Every Week</SelectItem>
          <SelectItem value="bi-weekly">Every 2 Weeks</SelectItem>
          <SelectItem value="monthly">Every Month</SelectItem>
          <SelectItem value="yearly">Every Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
