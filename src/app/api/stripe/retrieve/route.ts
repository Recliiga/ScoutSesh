import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const accountId = searchParams.get("accountId");
  if (!accountId) {
    return NextResponse.json({ error: "Invalid accountId" }, { status: 400 });
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);

    return NextResponse.json(
      { account: account, error: null },
      {
        status: 200,
      },
    );
  } catch (err) {
    const error = err as Error;
    console.log("Error retrieving account:", error.message);
    return NextResponse.json(
      {
        account: null,
        error: `Failed to retrieve account: ${error.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
