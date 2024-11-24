import connectDB from "@/db/connectDB";
import DailyJournalComment, {
  DailyJournalCommentType,
} from "@/db/models/DailyJournalCommen";
import GoalComment, { GoalCommentType } from "@/db/models/GoalComment";

export async function fetchGoalComments(goalId: string) {
  try {
    await connectDB();
    const goalComments: GoalCommentType[] = JSON.parse(
      JSON.stringify(
        await GoalComment.find({ goal: goalId }).populate("author")
      )
    );
    return { goalComments, error: null };
  } catch (error) {
    return { goalComments: null, error: (error as Error).message };
  }
}

export async function fetchJournalComments(journalId: string) {
  try {
    await connectDB();
    const journalComments: DailyJournalCommentType[] = JSON.parse(
      JSON.stringify(
        await DailyJournalComment.find({ dailyJournal: journalId }).populate(
          "author"
        )
      )
    );
    return { journalComments, error: null };
  } catch (error) {
    return { journalComments: null, error: (error as Error).message };
  }
}
