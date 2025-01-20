import connectDB from "@/db/connectDB";
import AthleteEvaluationOrder from "@/db/models/AthleteEvaluationOrder";
import NotificationEntry from "@/db/models/NotificationEntry";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const userId = searchParams.get("user_id");
    const coachId = searchParams.get("coach_id");
    const evaluationOrderId = searchParams.get("evaluation_order_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID not provided" },
        { status: 400 },
      );
    }

    // Retrieve the Stripe session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Perform actions based on session details
    const { payment_status, amount_total } = session;

    if (payment_status === "paid" && amount_total) {
      // Update database and create notification for purchase
      await connectDB();

      const hasOrder = await AthleteEvaluationOrder.findOne({
        stripeSessionId: sessionId,
      });

      if (!hasOrder) {
        await AthleteEvaluationOrder.findByIdAndUpdate(evaluationOrderId, {
          stripeSessionId: sessionId,
        });

        await NotificationEntry.create({
          type: "evaluation",
          fromUser: userId,
          toUser: coachId,
          link: "/dashboard/athlete-evaluation",
        });
      }

      const url = new URL(
        "/dashboard/athlete-evaluation",
        process.env.BASE_URL,
      );
      return NextResponse.redirect(url);
    } else {
      const url = new URL(
        "/dashboard/athlete-evaluation/request-evaluation",
        process.env.BASE_URL,
      );
      return NextResponse.redirect(url);
    }
  } catch (err) {
    const error = err as Error;
    console.error("Error in payment success handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
