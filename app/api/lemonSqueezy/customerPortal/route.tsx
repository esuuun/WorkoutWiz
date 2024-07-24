import { lemonsqueezyApiInstance } from "@/utils/axios";
import { db } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Fetch the user's subscription from your database
      const userSubscription = await db.subscription.findUnique({
        where: { userId },
      });
  
      if (!userSubscription || !userSubscription.lemonSqueezySubscriptionId) {
        return new NextResponse("No active subscription", { status: 403 });
      }
  
      const response = await lemonsqueezyApiInstance.get(
        `/subscriptions/${userSubscription.lemonSqueezySubscriptionId}`
      );
  
      const subscription = response.data.data;
      const customerPortal = subscription.attributes.urls.customer_portal;
  
      if (subscription.attributes.status !== 'active') {
        return new NextResponse("Subscription is not active", { status: 403 });
      }
  
      return new NextResponse(JSON.stringify({ customerPortal }), { status: 200 });
    } catch (error) {
      console.error("[LEMONSQUEEZY ERROR]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  