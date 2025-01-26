import Error from "@/components/AuthError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PriceField({
  price,
  setPrice,
  error,
}: {
  price: string;
  setPrice(value: string): void;
  error: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="price">Price ($)</Label>
      <Input
        id="price"
        name="price"
        value={price}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) return;
          setPrice(e.target.value);
        }}
        type="text"
        inputMode="numeric"
        required
      />
      {error.trim() !== "" && <Error error={error} />}
    </div>
  );
}
