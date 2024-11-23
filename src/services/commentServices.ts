import connectDB from "@/db/connectDB";
import GoalComment, { GoalCommentType } from "@/db/models/GoalComment";

export async function fetchGoalComments(goalId: string) {
  try {
    await connectDB();
    const comments: GoalCommentType[] = JSON.parse(
      JSON.stringify(
        await GoalComment.find({ goal: goalId }).populate("author")
      )
    );
    return { comments, error: null };
  } catch (error) {
    return { comments: null, error: (error as Error).message };
  }
}
