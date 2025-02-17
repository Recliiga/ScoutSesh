import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TotalSpotsField({
  totalSpots,
  setTotalSpots,
}: {
  totalSpots: string;
  setTotalSpots(value: string): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="totalSpots">Total Spots</Label>
      <Input
        id="totalSpots"
        name="totalSpots"
        value={totalSpots}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) return;
          setTotalSpots(e.target.value);
        }}
        type="text"
        inputMode="numeric"
        required
      />
    </div>
  );
}
