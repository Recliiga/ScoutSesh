"use server";

import connectDB from "@/db/connectDB";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import { GroupClassType } from "@/db/models/GroupClass";
import GroupClassOrder from "@/db/models/GroupClassOrder";
import { getSession } from "@/services/authServices";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function createStripeCheckoutSession<
  T extends "group-class" | "athlete-evaluation",
>(
  type: T,
  item: T extends "group-class"
    ? GroupClassType
    : Partial<AthleteEvaluationOrderType>,
  coachId?: string,
  organizationName?: string,
) {
  try {
    const { user } = await getSession();

    if (!user) return { sessionId: null, error: "User unauthenticated" };
    if (user.role !== "Athlete")
      return { sessionId: null, error: "User unauthorized" };

    // Create a new Stripe Checkout session
    if (type === "group-class") {
      const productItem = item as GroupClassType;

      await connectDB();
      const hasOrder = await GroupClassOrder.findOne({
        user: user._id,
        course: productItem._id,
      });
      if (hasOrder)
        return { sessionId: null, error: "User already purchased course" };

      const successUrl = `${process.env.BASE_URL}/api/payment-success/group-class?group_class_id=${productItem._id}&group_class_type=${productItem.courseType}&user_id=${user._id}&coach_id=${productItem.coaches[0]._id}&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${process.env.BASE_URL}/dashboard/group-classes/courses`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [productItem].map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.thumbnail],
            },
            unit_amount: item.price * 100, // Price in cents
          },

          quantity: 1,
        })),
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: user.email,
      });

      return { sessionId: session.id, error: null };
    } else {
      const productItem = item as AthleteEvaluationOrderType;

      if (!coachId || !organizationName)
        return { sessionId: null, error: "Invalid Coach or Organization" };

      await connectDB();
      const newOrder = await AthleteEvaluationOrder.create({
        ...productItem,
        coach: coachId,
        athlete: user._id,
        platformPercentage: 20,
      });

      const successUrl = `${process.env.BASE_URL}/api/payment-success/athlete-evaluation?evaluation_order_id=${newOrder._id}&user_id=${user._id}&coach_id=${coachId}&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${process.env.BASE_URL}/dashboard/athlete-evaluation/request-evaluation`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [productItem].map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: `Athlete Evaluation from ${organizationName}`,
              description: `Athlete Evaluation from ${organizationName}`,
            },
            unit_amount: item.totalPrice * 100, // Price in cents
          },

          quantity: 1,
        })),
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: user.email,
      });

      return { sessionId: session.id, error: null };
    }
  } catch (err) {
    const error = err as Error;
    console.error("Error creating checkout session:", error.message);
    return { sessionId: null, error: error.message };
  }
}

export async function createStripeConnectUrl(stripeAccountId: string) {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.BASE_URL}/dashboard/profile`,
      return_url: `${process.env.BASE_URL}/dashboard/profile`,
      type: "account_onboarding",
    });

    return { url: accountLink.url, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Connect Stripe Error: ", error.message);
    return { url: null, error: "An Error occured connecting stripe" };
  }
}

export async function generateStatement(
  accountId: string,
  fromDate: Date,
  toDate: Date,
  paymentIntentList: string[],
) {
  try {
    const chargesResponse: Stripe.Response<Stripe.ApiList<Stripe.Charge>> =
      JSON.parse(
        JSON.stringify(
          await stripe.charges.list({
            created: {
              gte: Math.floor(fromDate.getTime() / 1000), // From date
              lt: Math.floor(toDate.getTime() / 1000), // To date
            },
          }),
        ),
      );
    const statement = chargesResponse.data.filter((charge) =>
      paymentIntentList.some((intent) => intent === charge.payment_intent),
    );
    return { statement, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error generating statement: ", error.message);
    return { statement: null, error: "Error generating statement" };
  }
}

export async function addAccountInformation(
  accountId: string,
  accountInfo: {
    accountNumber: string;
    country: string;
    accountName: string;
    routingNumber: string;
  },
) {
  try {
    // stripe.accounts.createExternalAccount(accountId, {
    //   external_account: {
    //     object: "bank_account",
    //     account_number: accountInfo.accountNumber,
    //     country: accountInfo.country,
    //     account_holder_name: accountInfo.accountName,
    //     account_holder_type: "individual",
    //     routing_number: accountInfo.routingNumber,
    //   },
    // });
    // return { error: null };
    return { error: "Error adding new payout account" };
  } catch (err) {
    const error = err as Error;
    console.log("Error adding new payout account: ", error.message);
    return { error: "Error adding new payout account" };
  }
}
