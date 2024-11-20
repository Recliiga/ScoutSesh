import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CommentType } from "./WeeklyReflectionResults";

export default function CommentableText({
  text,
  sectionId,
  addComment,
  comments,
}: {
  text: string;
  sectionId: string;
  addComment(sectionId: string): void;
  comments: { [key: string]: CommentType[] };
}) {
  const sectionComments = comments[sectionId] || [];

  return (
    <div className="relative group">
      <div className="bg-green-50 p-2 rounded">{text}</div>
      <Button
        className="top-2 right-2 absolute bg-green-500 opacity-0 group-hover:opacity-100 text-white transition-opacity"
        size="sm"
        onClick={() => addComment(sectionId)}
      >
        <MessageSquarePlusIcon className="mr-2 w-4 h-4" />
        Add Comment
      </Button>
      {sectionComments.length > 0 && (
        <div className="flex flex-col gap-4 bg-yellow-100 mt-2 p-2 rounded">
          <h5 className="font-semibold">Comments:</h5>
          {sectionComments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2"
              onClick={(e) => e.stopPropagation}
            >
              <p className="text-sm">{comment.text}</p>
              <p className="text-gray-500 text-xs">
                {comment.timestamp} - {comment.author || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
