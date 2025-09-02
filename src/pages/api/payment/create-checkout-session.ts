import { stripe } from "@/lib/stripe";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createCheckoutSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return handleError(res, 405, "Method Not Allowed");
  }

  try {
    const body = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.title || "Subscription Plan",
              images: body?.image,
            },
            unit_amount: Math.round(Number(body.price) * 100),
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      ui_mode: "hosted",
      success_url: `http://localhost:3000/payment-result?session_id={CHECKOUT_SESSION_ID}&slug=${body?.slug}`,
      cancel_url: `http://localhost:3000/services/template-details/${body?.slug}`,
      //   customer_email: data.email,
      custom_text: {
        submit: { message: "Pay To Olynex" },
      },
    });

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to retrieve Project");
  }
}
