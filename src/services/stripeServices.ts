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
    const externalAccountData = await stripe.accounts.listExternalAccounts(
      stripeAccountId,
      { object: "bank_account" },
    );

    const externalAccounts = externalAccountData.data.map((account) => ({
      id: account.id,
      //@ts-expect-error bank_name attribute does not exist
      bankName: account.bank_name,
      accountNumber: `******${account.last4}`,
      verified: account.status === "verified",
    }));

    return { externalAccounts, error: null };
  } catch (err) {
    const error = err as Error;
    return { externalAccounts: [], error: error.message };
  }
}
