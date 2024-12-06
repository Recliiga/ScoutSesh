import { CircleCheckBig, PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function EditButton({
  setIsEditing,
  isEditing,
  field,
}: {
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      title: boolean;
      description: boolean;
    }>
  >;
  isEditing: {
    title: boolean;
    description: boolean;
  };
  field: "title" | "description";
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }))
      }
    >
      {isEditing[field] ? (
        <CircleCheckBig className="h-4 w-4" />
      ) : (
        <PencilIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
