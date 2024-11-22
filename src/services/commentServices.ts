import connectDB from "@/db/connectDB";
import Comment, { CommentSchemaType } from "@/db/models/Comment";

export async function fetchGoalComments(goalId: string) {
  try {
    await connectDB();
    const comments: CommentSchemaType[] = JSON.parse(
      JSON.stringify(await Comment.find({ goal: goalId }).populate("author"))
    );
    return { comments, error: null };
  } catch (error) {
    return { comments: null, error: (error as Error).message };
  }
}
