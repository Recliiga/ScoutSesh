import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TotalSpotsField({
  totalSpots,
  setTotalSpots,
}: {
  totalSpots: string;
  setTotalSpots: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="totalSpots">Total Spots</Label>
      <Input
        id="totalSpots"
        name="totalSpots"
        value={totalSpots}
        onChange={(e) => setTotalSpots(e.target.value)}
        type="number"
        min="1"
        required
      />
    </div>
  );
}
