import { CircleCheckBig, PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function EditQuestionButton({
  setEditingQuestion,
  isEditing,
  questionId,
}: {
  setEditingQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  isEditing: boolean;
  questionId: `question-${number}`;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        setEditingQuestion((prev) => (prev === questionId ? null : questionId))
      }
    >
      {isEditing ? (
        <CircleCheckBig className="h-4 w-4" />
      ) : (
        <PencilIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
