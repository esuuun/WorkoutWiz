import { stripe } from '@/lib/stripe';
import { db } from '@/utils/db';
import { auth, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the user's subscription from your database
    const userSubscription = await db.userSubscription.findUnique({
      where: { userId },
    });

    if (!userSubscription || !userSubscription.stripeSubscriptionId) {
      return new NextResponse("No active subscription", { status: 403 });
    }

    // Check the subscription status on Stripe
    const subscription = await stripe.subscriptions.retrieve(userSubscription.stripeSubscriptionId);

    if (subscription.status !== 'active') {
      return new NextResponse("Subscription is not active", { status: 403 });
    }

    return new NextResponse(JSON.stringify({ message: 'Subscription is active' }), { status: 200 });
  } catch (error) {
    console.error("[STRIPE ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
