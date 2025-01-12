"use server";

import connectDB from "@/db/connectDB";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { GroupClassType } from "@/db/models/GroupClass";
import GroupClassOrder from "@/db/models/GroupClassOrder";
import { getSession } from "@/services/authServices";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function createStripeCheckoutSession<
  T extends "group-class" | "athlete-evaluation",
>(
  type: T,
  item: T extends "group-class" ? GroupClassType : AthleteEvaluationType,
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
      return { sessionId: null, error: "type is athlete evaluation" };
    }
  } catch (err) {
    const error = err as Error;
    console.error("Error creating checkout session:", error.message);
    return { sessionId: null, error: error.message };
  }
}
