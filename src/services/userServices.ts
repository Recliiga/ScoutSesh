import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import "@/db/models/Organization";
import Stripe from "stripe";
import countriesData from "@/data/countries.json";

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

export async function fetchUserStripeAccount(stripeAccountId?: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    if (!stripeAccountId) throw new Error("Invalid account ID");
    const account = JSON.parse(
      JSON.stringify(await stripe.accounts.retrieve(stripeAccountId)),
    );

    return { account, error: null };
  } catch (err) {
    const error = err as Error;
    return { account: null, error: error.message };
  }
}

export type CountryDataType = {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
};

export async function fetchCountries() {
  try {
    return { countries: countriesData.data, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching countries: ", error.message);
    return { countries: [], error: error.message };
  }
}
