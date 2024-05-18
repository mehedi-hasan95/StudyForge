import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id as string;
    const { couresId } = await req.json();
    if (!currentUser) {
      return new NextResponse("Unauthorize User", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: couresId,
        isPublished: true,
      },
    });
    const puchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: couresId,
        },
      },
    });
    if (puchase) {
      return new NextResponse("Already purchase", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId,
      },
      select: { stripeCustomerId: true },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: currentUser.email!,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}?cancel=1`,
      metadata: {
        couresId,
        userId,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
