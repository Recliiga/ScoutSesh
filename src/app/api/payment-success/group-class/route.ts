import connectDB from "@/db/connectDB";
import GroupClassOrder from "@/db/models/GroupClassOrder";
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
    const groupClassType = searchParams.get("group_class_type");
    const groupClassId = searchParams.get("group_class_id");
    const userId = searchParams.get("user_id");
    const coachId = searchParams.get("coach_id");

    const isLiveClass = groupClassType === "live";

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID not provided" },
        { status: 400 },
      );
    }

    // Retrieve the Stripe session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Perform actions based on session details
    const { payment_status, amount_total, payment_intent } = session;

    if (payment_status === "paid" && amount_total) {
      // Update database and create notification for purchase
      await connectDB();

      const hasOrder = await GroupClassOrder.findOne({
        stripeSessionId: sessionId,
      });
      if (!hasOrder) {
        await GroupClassOrder.create({
          course: groupClassId,
          user: userId,
          price: amount_total / 100,
          stripeSessionId: sessionId,
          stripePaymentIntent: payment_intent,
          platformPercentage: 20,
        });

        await NotificationEntry.create({
          type: isLiveClass ? "liveClass" : "videoCourse",
          fromUser: userId,
          toUser: coachId,
          link: isLiveClass
            ? `/dashboard/group-classes/live-classes/${groupClassId}`
            : "/dashboard/group-classes/courses",
        });
      }

      const redirectUrl = isLiveClass
        ? `/dashboard/group-classes/live-classes/${groupClassId}`
        : "/dashboard/group-classes/my-classes";

      const url = new URL(redirectUrl, process.env.BASE_URL);
      return NextResponse.redirect(url);
    } else {
      const url = new URL(
        "/dashboard/group-classes/courses",
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
