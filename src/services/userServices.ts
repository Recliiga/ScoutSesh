import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import "@/db/models/Organization";
import Stripe from "stripe";

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

export async function fetchUserStripeAccount(
  stripeAccountId?: string,
): Promise<
  | { account: Stripe.Response<Stripe.Account>; error: null }
  | { account: null; error: string }
> {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/stripe/retrieve?accountId=${stripeAccountId || ""}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    const error = err as Error;
    return { account: null, error: error.message };
  }
}
