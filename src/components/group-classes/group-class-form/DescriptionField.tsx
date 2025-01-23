import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionField({
  description,
  setDescription,
}: {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your course..."
        required
      />
    </div>
  );
}
