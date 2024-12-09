import connectDB from "@/db/connectDB";
import AthleteEvaluation, {
  AthleteEvaluationType,
} from "@/db/models/AthleteEvaluation";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";

export async function fetchEvaluationsByAthlete(userId: string) {
  try {
    await connectDB();
    const evaluations: AthleteEvaluationType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.find({ user: userId }).populate({
          path: "template",
          select: "user",
          populate: { path: "user", select: "firstName lastName" },
        }),
      ),
    );
    return { evaluations, error: null };
  } catch (err) {
    const error = err as Error;
    return { evaluations: null, error: error.message };
  }
}

export async function fetchCoachEvaluationOrders(coachId: string) {
  try {
    await connectDB();
    const orders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find({ coach: coachId })
          .populate({
            path: "athlete",
            select: "firstName lastName profilePicture",
          })
          .sort({
            createdAt: -1,
          }),
      ),
    );
    return { orders, error: null };
  } catch (err) {
    const error = err as Error;
    return { orders: null, error: error.message };
  }
}

export async function fetchLatestAthleteEvaluationOrder(userId: string) {
  try {
    await connectDB();
    const orders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find({ user: userId }).sort({
          createdAt: -1,
        }),
      ),
    );
    const order = orders[0];
    return { order, error: null };
  } catch (err) {
    const error = err as Error;
    return { order: null, error: error.message };
  }
}

export async function fetchEvaluationOrder(evaluationOrderId: string) {
  try {
    await connectDB();
    const order: AthleteEvaluationOrderType | null = JSON.parse(
      JSON.stringify(await AthleteEvaluationOrder.findById(evaluationOrderId)),
    );
    return { order, error: null };
  } catch (err) {
    const error = err as Error;
    return { order: null, error: error.message };
  }
}
