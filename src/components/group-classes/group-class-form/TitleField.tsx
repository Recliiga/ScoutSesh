import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TitleField({
  title,
  setTitle,
}: {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="title">Title</Label>
      <Input
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
  );
}
