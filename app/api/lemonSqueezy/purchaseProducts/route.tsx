import { absoluteUrl } from "@/lib/utils";
import { lemonsqueezyApiInstance } from "@/utils/axios";
import { db } from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const dashboardUrl = absoluteUrl("/dashboard");
const landingPageUrl = absoluteUrl("/");

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
      }
      

    const reqData = await req.json();

    if (!reqData.productId) {
      return new NextResponse(
        JSON.stringify({ message: "ProductId is required" }),
        { status: 400 }
      );
    }

    const response = await lemonsqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          product_options: {
            redirect_url:dashboardUrl
          },
          checkout_data: {
            custom: {
              userId: userId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    console.log(response.data);

    return new NextResponse(JSON.stringify({ checkoutUrl }), { status: 200 });
  } catch (error) {
    console.error("Error creating checkout:", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}