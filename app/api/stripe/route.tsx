import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";

const dashboardUrl = absoluteUrl("/dashboard");
const landingPageUrl = absoluteUrl("/");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: dashboardUrl,
      });

      return  new NextResponse(JSON.stringify({ url: stripeSession.url }));

    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: dashboardUrl,
      cancel_url: landingPageUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              description: "Unlimited Workout",
              name: "WorkoutWiz Subscription",
            },
            unit_amount: 1499,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
