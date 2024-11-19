import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CommentType } from "@/app/dashboard/goal-setting/weekly-reflection/[goalSubmissionId]/page";

export default function CommentableText({
  text,
  sectionId,
  addComment,
  editComment,
  comments,
}: {
  text: string;
  sectionId: string;
  addComment(sectionId: string, selectedText: string): void;
  editComment(comment: CommentType, sectionId: string): void;
  comments: { [key: string]: CommentType[] };
}) {
  const sectionComments = comments[sectionId] || [];

  return (
    <div className="relative group">
      <div className="bg-green-50 p-2 rounded">{text}</div>
      <Button
        className="top-2 right-2 absolute bg-green-500 opacity-0 group-hover:opacity-100 text-white transition-opacity"
        size="sm"
        onClick={() => addComment(sectionId, "")}
      >
        <MessageSquarePlusIcon className="mr-2 w-4 h-4" />
        Add Comment
      </Button>
      {sectionComments.length > 0 && (
        <div className="bg-yellow-100 mt-2 p-2 rounded">
          <h5 className="mb-2 font-semibold">Comments:</h5>
          {sectionComments.map((comment) => (
            <div key={comment.id} className="mb-2 last:mb-0">
              <p className="text-sm">{comment.text}</p>
              <p className="text-gray-500 text-xs">
                {comment.timestamp} - {comment.author || "Anonymous"}
              </p>
              <Button onClick={() => editComment(comment, sectionId)}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
