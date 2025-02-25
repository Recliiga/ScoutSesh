"use server";
import connectDB from "@/db/connectDB";
import { cookies } from "next/headers";
import GoalComment, { GoalCommentType } from "@/db/models/GoalComment";
import { revalidatePath } from "next/cache";
import DailyJournalComment, {
  DailyJournalCommentType,
} from "@/db/models/DailyJournalCommen";
import { getUserIdFromCookies } from "@/lib/utils";

export async function postGoalComment(
  text: string,
  goalId: string,
  sectionKey: string,
) {
  const cookieStore = await cookies();

  try {
    const { userId, error: authError } =
      await getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and create new Comment
    await connectDB();
    const comment: GoalCommentType = await GoalComment.create({
      text,
      goal: goalId,
      sectionKey,
      author: userId,
    });

    // Fetch the new Comment posted and populate the author field
    const newComment: GoalCommentType = JSON.parse(
      JSON.stringify(
        await GoalComment.findById(comment._id).populate("author"),
      ),
    );
    revalidatePath(
      "/dashboard/goal-setting/weekly-reflection/[goalSubmissionId]",
      "page",
    );
    return { newComment, error: null };
  } catch (error) {
    return { newComment: null, error: (error as Error).message };
  }
}

export async function postDailyJournalComment(
  text: string,
  dailyJournalId: string,
  sectionKey: string,
) {
  const cookieStore = await cookies();

  try {
    const { userId, error: authError } =
      await getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and create new Comment
    await connectDB();
    const comment: DailyJournalCommentType = await DailyJournalComment.create({
      text,
      dailyJournal: dailyJournalId,
      sectionKey,
      author: userId,
    });

    // Fetch the new Comment posted and populate the author field
    const newComment: DailyJournalCommentType = JSON.parse(
      JSON.stringify(
        await DailyJournalComment.findById(comment._id).populate("author"),
      ),
    );
    revalidatePath(
      "/dashboard/goal-setting/weekly-reflection/[goalSubmissionId]",
      "page",
    );
    return { newComment, error: null };
  } catch (error) {
    return { newComment: null, error: (error as Error).message };
  }
}
