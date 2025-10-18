import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { getStripe, paystack } from "../lib/payments";
import { authenticateToken } from "../middleware/auth";

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export const router = Router();

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  shippingAddress: z.string().min(10),
  paymentMethod: z.enum(["stripe", "paystack"]),
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const body = createOrderSchema.parse(req.body);
    const { items, shippingAddress, paymentMethod } = body;
    const userId = req.user!.userId;

    // Get products and calculate totals
    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { inventory: true },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: "Some products not found" });
    }

    // Calculate totals
    let subtotalCents = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const itemTotal = product.priceCents * item.quantity;
      subtotalCents += itemTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPriceCents: product.priceCents,
      };
    });

    const shippingCents = 0; // Free shipping for now
    const totalCents = subtotalCents + shippingCents;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId,
        shippingAddr: shippingAddress,
        totalCents,
        subtotalCents,
        shippingCents,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Initialize payment based on method
    if (paymentMethod === "stripe") {
      const stripe = getStripe();
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCents,
        currency: "usd",
        metadata: {
          orderId: order.id,
          userId,
        },
      });

      await prisma.payment.create({
        data: {
          orderId: order.id,
          provider: "stripe",
          providerRef: paymentIntent.id,
          amountCents: totalCents,
          currency: "USD",
          status: "pending",
        },
      });

      res.json({
        success: true,
        order,
        payment: {
          clientSecret: paymentIntent.client_secret,
        },
      });
    } else if (paymentMethod === "paystack") {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user?.email) {
        return res
          .status(400)
          .json({ error: "User email required for Paystack" });
      }

      const paystackResponse = (await paystack.initializeTransaction({
        email: user.email,
        amount: totalCents / 100, // Convert to dollars
        reference: order.id,
      })) as PaystackResponse;

      await prisma.payment.create({
        data: {
          orderId: order.id,
          provider: "paystack",
          providerRef: paystackResponse.data.reference,
          amountCents: totalCents,
          currency: "USD",
          status: "pending",
        },
      });

      res.json({
        success: true,
        order,
        payment: {
          authorizationUrl: paystackResponse.data.authorization_url,
          reference: paystackResponse.data.reference,
        },
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0]?.message });
    }
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user!.userId;
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(orders);
});

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.userId;

  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});
