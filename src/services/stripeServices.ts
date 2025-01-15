import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function fetchUserStripeAccount(stripeAccountId?: string) {
  if (!stripeAccountId) throw new Error("Invalid stripe account ID");
  try {
    const stripeAccount = await stripe.accounts.retrieve(stripeAccountId);

    return { stripeAccount, error: null };
  } catch (err) {
    const error = err as Error;
    return { stripeAccount: null, error: error.message };
  }
}

export async function fetchUserStripeExternalAccount(stripeAccountId?: string) {
  if (!stripeAccountId) throw new Error("Invalid stripe account ID");
  try {
    const externalAccounts = await stripe.accounts.listExternalAccounts(
      stripeAccountId,
      { object: "bank_account" },
    );

    return { externalAccounts, error: null };
  } catch (err) {
    const error = err as Error;
    return { externalAccounts: null, error: error.message };
  }
}
