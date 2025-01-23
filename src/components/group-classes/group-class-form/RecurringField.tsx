import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RecurringField({
  isRecurring,
  setIsRecurring,
}: {
  isRecurring: boolean;
  setIsRecurring: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="recurring"
        checked={isRecurring}
        onCheckedChange={setIsRecurring}
      />
      <Label htmlFor="recurring">Recurring Course</Label>
    </div>
  );
}
