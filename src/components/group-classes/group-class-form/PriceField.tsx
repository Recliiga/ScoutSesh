import Error from "@/components/AuthError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceField({
  price,
  setPrice,
  error,
}: {
  price: number;
  setPrice(value: number): void;
  error: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="price">Price ($)</Label>
      <Input
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        type="number"
        min="0"
        step="0.01"
        required
      />
      {error.trim() !== "" && <Error error={error} />}
    </div>
  );
}
