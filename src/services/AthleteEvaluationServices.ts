import connectDB from "@/db/connectDB";
import AthleteEvaluation, {
  AthleteEvaluationType,
} from "@/db/models/AthleteEvaluation";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";

export async function fetchAthleteEvaluations(athleteId: string) {
  try {
    await connectDB();
    const evaluations: AthleteEvaluationType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.find({ athlete: athleteId })
          .populate({
            path: "template",
            select: "user name",
            populate: { path: "user", select: "firstName lastName" },
          })
          .populate({ path: "coach", select: "firstName, lastName" }),
      ),
    );
    return { evaluations, error: null };
  } catch (err) {
    const error = err as Error;
    return { evaluations: null, error: error.message };
  }
}

export async function fetchCoachEvaluations(coachId: string) {
  try {
    await connectDB();
    const evaluations: AthleteEvaluationType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.find({ coach: coachId })
          .populate({
            path: "template",
            select: "user",
            populate: { path: "user", select: "firstName lastName" },
          })
          .populate({ path: "coach", select: "firstName, lastName" }),
      ),
    );
    return { evaluations, error: null };
  } catch (err) {
    const error = err as Error;
    return { evaluations: null, error: error.message };
  }
}

export async function fetchAthleteEvaluationOrders(athleteId: string) {
  try {
    await connectDB();
    const orders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find({ athlete: athleteId })
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
      JSON.stringify(
        await AthleteEvaluationOrder.findById(evaluationOrderId).populate({
          path: "athlete",
          select: "firstName lastName",
        }),
      ),
    );
    return { order, error: null };
  } catch (err) {
    const error = err as Error;
    return { order: null, error: error.message };
  }
}

export async function fetchEvaluationResults(evaluationId: string) {
  try {
    await connectDB();
    const firstEvaluation: AthleteEvaluationType | null = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.findById(evaluationId)
          .populate({
            path: "athlete",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "coach",
            select: "firstName lastName profilePicture",
          }),
      ),
    );
    if (!firstEvaluation) throw new Error("Invalid Evaluation ID");

    const order: AthleteEvaluationOrderType | null = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.findById(firstEvaluation.order),
      ),
    );
    const nextDueDateIndex = order?.evaluationDates.findIndex(
      (date) => date.date === firstEvaluation.dueDate,
    );

    const nextDueDate =
      nextDueDateIndex !== undefined
        ? order?.evaluationDates[nextDueDateIndex + 1].date
        : undefined;

    let coachEvaluation: AthleteEvaluationType | null = null;
    let selfEvaluation: AthleteEvaluationType | null = null;

    if (firstEvaluation.isSelfEvaluation) {
      selfEvaluation = firstEvaluation;

      const secondEvaluation: AthleteEvaluationType | null = JSON.parse(
        JSON.stringify(
          await AthleteEvaluation.findOne({
            order: firstEvaluation.order,
            dueDate: firstEvaluation.dueDate,
            isSelfEvaluation: false,
          })
            .populate({
              path: "athlete",
              select: "firstName lastName profilePicture",
            })
            .populate({
              path: "coach",
              select: "firstName lastName profilePicture",
            }),
        ),
      );
      if (!secondEvaluation) throw new Error("No coach evaluation");

      coachEvaluation = secondEvaluation;
    } else {
      coachEvaluation = firstEvaluation;

      const secondEvaluation: AthleteEvaluationType | null = JSON.parse(
        JSON.stringify(
          await AthleteEvaluation.findOne({
            order: firstEvaluation.order,
            dueDate: firstEvaluation.dueDate,
            isSelfEvaluation: true,
          })
            .populate({
              path: "athlete",
              select: "firstName lastName profilePicture",
            })
            .populate({
              path: "coach",
              select: "firstName lastName profilePicture",
            }),
        ),
      );
      selfEvaluation = secondEvaluation;
    }

    const evaluationResults = {
      athlete: selfEvaluation,
      coach: coachEvaluation,
      nextEvaluationDate: nextDueDate,
    };

    return { evaluationResults, error: null };
  } catch (err) {
    const error = err as Error;
    return { evaluationResults: null, error: error.message };
  }
}
