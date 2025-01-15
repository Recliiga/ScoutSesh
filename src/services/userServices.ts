import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import "@/db/models/Organization";
import stripeCountries from "@/data/stripe-countries.json";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import "@/db/models/GroupClass";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";

export async function fetchUser(userId: string) {
  try {
    await connectDB();
    const user: UserType | null = JSON.parse(
      JSON.stringify(
        await User.findById(userId).populate({
          path: "organization",
          select: "name logo",
        }),
      ),
    );

    if (!user) return { user: null, error: "Invalid user ID" };
    if (user.status !== "Active")
      return { user: null, error: "User is not active" };

    return { user, error: null };
  } catch (err) {
    const error = err as Error;
    return { user: null, error: error.message };
  }
}

export async function fetchTeamMembers(organizationId: string) {
  try {
    await connectDB();
    const teamMembers: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find({
          organization: organizationId,
          status: "Active",
        }),
      ),
    );
    return { teamMembers, error: null };
  } catch (err) {
    const error = err as Error;
    return { teamMembers: null, error: error.message };
  }
}

export async function fetchTransactions(userId: string) {
  try {
    await connectDB();
    const allEvaluationOrders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find({ coach: userId })
          .populate({
            path: "athlete",
            select: "firstName lastName profilePicture",
          })
          .sort({
            createdAt: -1,
          }),
      ),
    );

    const evaluationOrders = allEvaluationOrders.filter(
      (order) => order.stripeSessionId,
    );

    const allGroupClassOrders: GroupClassOrderType[] = JSON.parse(
      JSON.stringify(
        await GroupClassOrder.find().populate({
          path: "course",
          select: "_id coaches",
          populate: { path: "coaches", select: "_id" },
        }),
      ),
    );

    const groupClassOrders = allGroupClassOrders.filter((order) =>
      order.course?.coaches.some((coach) => coach._id === userId),
    );

    const transactions: TransactionType[] = [
      ...evaluationOrders.map((order) => ({
        _id: order._id,
        price: order.totalPrice,
        purchaseDate: order.createdAt,
        platformPercentage: order.platformPercentage,
        referrerPercentage: order.referrerPercentage,
        stripePaymentIntent: order.stripePaymentIntent,
      })),
      ...groupClassOrders.map((order) => ({
        _id: order._id,
        price: order.price,
        purchaseDate: order.createdAt,
        platformPercentage: order.platformPercentage,
        referrerPercentage: order.referrerPercentage,
        stripePaymentIntent: order.stripePaymentIntent,
      })),
    ];

    return { transactions, error: null };
  } catch (err) {
    const error = err as Error;
    return { transactions: [], error: error.message };
  }
}

export async function fetchAccountBalance(userId: string) {
  try {
    const { transactions, error } = await fetchTransactions(userId);
    if (error) throw new Error("An error occured fetching balance");

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const accountBalance = transactions
      .filter((transaction) => new Date(transaction.purchaseDate) <= oneWeekAgo)
      .reduce(
        (total, transaction) =>
          total +
          (transaction.price * (100 - (transaction.platformPercentage || 20))) /
            100,
        0,
      );

    const pendingBalance = transactions
      .filter((transaction) => new Date(transaction.purchaseDate) > oneWeekAgo)
      .reduce(
        (total, transaction) =>
          total +
          (transaction.price * (100 - (transaction.platformPercentage || 20))) /
            100,
        0,
      );

    return { accountBalance, pendingBalance, error: null };
  } catch (err) {
    const error = err as Error;
    return { accountBalance: 0, pendingBalance: 0, error: error.message };
  }
}

export type CountryDataType = {
  iso2: string;
  name: string;
};

export async function fetchCountries() {
  return stripeCountries;
}
