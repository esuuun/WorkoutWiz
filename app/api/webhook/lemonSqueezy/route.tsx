import { db } from "@/utils/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;

    if (typeof secret !== "string") {
      throw new Error("Webhook secret is not set or is invalid.");
    }

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log("Webhook payload:", body);

    if (
      !body.meta ||
      !body.meta.custom_data ||
      !body.meta.custom_data.userId
    ) {
      console.error("User ID is missing in the payload");
      return new NextResponse("User ID is required", { status: 400 });
    }

    const userId = body.meta.custom_data.userId;
    // Logic according to event
    if (eventType === "subscription_created") {
      
      const isSuccessful = body.data.attributes.status === "active";

      console.log(`Processing subscription for user: ${userId}`);

      const lemonSqueezyCustomerId = body.data.attributes.customer_id;
      const lemonSqueezySubscriptionId =
        body.data.attributes.first_subscription_item.subscription_id;
      const lemonSqueezyPriceId =
        body.data.attributes.first_subscription_item.price_id;
      const subscriptionPeriodEnd = body.data.attributes.renews_at;

      await db.subscription.create({
        data: {
          userId: userId,
          lemonSqueezyCustomerId: String(lemonSqueezyCustomerId),
          lemonSqueezySubscriptionId: String(lemonSqueezySubscriptionId),
          lemonSqueezyPriceId: String(lemonSqueezyPriceId),
          lemonSqueezyCurrentPeriodEnd: new Date(subscriptionPeriodEnd),
        },
      });

      console.log("Subscription created successfully for user:", userId);
    }

    if (eventType === "subscription_updated") {
      const lemonSqueezyPriceId = body.data.attributes.first_subscription_item.price_id
      const lemonSqueezySubscriptionId =
        body.data.attributes.first_subscription_item.subscription_id;
      const subscriptionPeriodEnd = body.data.attributes.renews_at;

      await db.subscription.update({
        where: {
          lemonSqueezySubscriptionId: String(lemonSqueezySubscriptionId),
        },
        data: {
          lemonSqueezyPriceId: String(lemonSqueezyPriceId),
          lemonSqueezyCurrentPeriodEnd: new Date(subscriptionPeriodEnd),
        },
      });

      console.log("Subscription updated successfully for user:", userId);
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
