import User from "@/db/models/User";
import { getSession } from "@/services/authServices";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function createConnectedAccount(userEmail: string) {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: userEmail,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });

    return { accountId: account.id, error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Error creating connected account:", error.message);

    return {
      accountId: null,
      error: `Error creating connected account: 
      ${error.message}`,
    };
  }
}

export async function GET() {
  try {
    const { user } = await getSession();
    if (!user) throw new Error("User not authenticated!");

    let userStripeAccount = user.stripeAccountId;

    if (!userStripeAccount) {
      const { accountId, error } = await createConnectedAccount(user.email);
      if (error === null) {
        const updatedUser = await User.findByIdAndUpdate(user._id, {
          stripeAccountId: accountId,
        });
        if (!updatedUser)
          throw new Error("Unable to save stripe account ID to database");

        userStripeAccount = accountId;
      } else {
        throw new Error(error);
      }
    }

    const redirect_uri = `${process.env.BASE_URL}/dashboard/profile`;

    const accountLink = await stripe.accountLinks.create({
      account: userStripeAccount, // The connected account ID from your database or passed in query params
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/reauth`,
      return_url: redirect_uri, // Where to redirect after the process
      type: "account_onboarding",
    });

    return new Response(JSON.stringify({ url: accountLink.url, error: null }), {
      status: 200,
    });
  } catch (err) {
    const error = err as Error;
    console.log("Error creating account link:", error.message);
    return new Response(
      JSON.stringify({
        url: null,
        error: `Failed to create account link: ${error.message}`,
      }),
      {
        status: 500,
      },
    );
  }
}
