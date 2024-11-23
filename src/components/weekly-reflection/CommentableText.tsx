import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CommentSchemaType } from "@/db/models/Comment";

export default function WeeklyReflectionCommentableText({
  text,
  sectionId,
  addComment,
  comments,
}: {
  text: string;
  sectionId: string;
  addComment(sectionId: string): void;
  comments: CommentSchemaType[];
}) {
  const sectionComments = comments.filter(
    (comment) => comment.sectionKey === sectionId
  );

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
              key={comment._id}
              className="flex flex-col gap-2 border-amber-200 pb-2 border-b last:border-none"
              onClick={(e) => e.stopPropagation}
            >
              <p className="text-sm">{comment.text}</p>
              <p className="text-gray-500 text-xs">
                {new Date(comment.updatedAt).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                -{" "}
                {comment.author.firstName + " " + comment.author.lastName ||
                  "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
