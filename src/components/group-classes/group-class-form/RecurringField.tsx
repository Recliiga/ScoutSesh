import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RecurringField({
  isRecurring,
  setIsRecurring,
  clearRecurringFields,
}: {
  isRecurring: boolean;
  setIsRecurring(value: boolean): void;
  clearRecurringFields(): void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="recurring"
        checked={isRecurring}
        onCheckedChange={(value) => {
          if (!value) clearRecurringFields();
          setIsRecurring(value);
        }}
      />
      <Label htmlFor="recurring">Recurring Course</Label>
    </div>
  );
}
