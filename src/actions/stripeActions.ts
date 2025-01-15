"use server";

import connectDB from "@/db/connectDB";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import { GroupClassType } from "@/db/models/GroupClass";
import GroupClassOrder from "@/db/models/GroupClassOrder";
import { getSession } from "@/services/authServices";
import { redirect } from "next/navigation";
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
  let accountLinkUrl;
  try {
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.BASE_URL}/dashboard/profile`,
      return_url: `${process.env.BASE_URL}/dashboard/profile`,
      type: "account_onboarding",
    });

    accountLinkUrl = accountLink.url;
  } catch (err) {
    const error = err as Error;
    console.log({ error: error.message });
    return { error: "An Error occured connecting stripe" };
  } finally {
    if (accountLinkUrl) redirect(accountLinkUrl);
  }
}

export async function createStripeUpdateUrl(stripeAccountId: string) {
  let accountLinkUrl;
  try {
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.BASE_URL}/dashboard/profile`,
      return_url: `${process.env.BASE_URL}/dashboard/profile`,
      type: "account_update",
    });

    accountLinkUrl = accountLink.url;
  } catch (err) {
    const error = err as Error;
    console.log({ error: error.message });
    return { error: "An Error occured connecting stripe" };
  } finally {
    if (accountLinkUrl) redirect(accountLinkUrl);
  }
}

export async function saveAccountInformation(
  accountId: string,
  accountInformation: {
    country: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  },
) {
  try {
    // const updatedAccount = stripe.accounts.update(accountId, {
    //   external_account: {
    //     object: "bank_account",
    //     country: accountInformation.country,
    //     currency: "usd",
    //     account_holder_name: accountInformation.accountName,
    //     account_holder_type: "individual",
    //     routing_number: accountInformation.routingNumber,
    //     account_number: accountInformation.accountNumber,
    //   },
    // });
    // if (!updatedAccount) return { error: "An unexpected error occured" };
    //
    // return { error: null };

    return { error: "Error saving account information" };
  } catch (err) {
    const error = err as Error;
    console.log("Error saving account information: ", error.message);
    return { error: error.message };
  }
}

export async function requestWithdrawal(
  amount: number,
  stripeAccountId: string,
) {
  try {
    // const transfer = await stripe.transfers.create({
    //   amount: amount * 100, // Amount in the smallest currency unit (e.g., cents for USD)
    //   currency: "usd",
    //   destination: stripeAccountId, // Connected account ID
    //   description: "Vendor payout for order #1234",
    // });
    // console.log(await stripe.balance.retrieve());
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Error creating checkout session:", error.message);
    return { error: error.message };
  }
}
