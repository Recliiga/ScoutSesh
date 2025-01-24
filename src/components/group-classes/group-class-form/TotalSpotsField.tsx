import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TotalSpotsField({
  totalSpots,
  setTotalSpots,
}: {
  totalSpots: number;
  setTotalSpots(value: number): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="totalSpots">Total Spots</Label>
      <Input
        id="totalSpots"
        name="totalSpots"
        value={totalSpots}
        onChange={(e) => setTotalSpots(Number(e.target.value))}
        type="number"
        min="1"
        required
      />
    </div>
  );
}
