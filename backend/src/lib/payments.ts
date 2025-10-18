import Stripe from "stripe";
import { env } from "../config/env";

// Lazily initialize Stripe to avoid boot failures when key is missing in dev
let stripeSingleton: Stripe | null = null;
export function getStripe(): Stripe {
  if (!stripeSingleton) {
    if (!env.stripeSecret) {
      throw new Error(
        "Stripe secret key not configured. Set STRIPE_SECRET_KEY"
      );
    }
    stripeSingleton = new Stripe(env.stripeSecret, {
      apiVersion: "2025-09-30.clover",
    });
  }
  return stripeSingleton;
}

// Paystack API helper
export class PaystackAPI {
  private baseUrl = "https://api.paystack.co";
  private secretKey = env.paystackSecret;

  async initializeTransaction(data: {
    email: string;
    amount: number;
    currency?: string;
    reference?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount * 100, // Convert to kobo
        currency: data.currency || "NGN",
        reference: data.reference,
      }),
    });

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.statusText}`);
    }

    return response.json();
  }

  async verifyTransaction(reference: string) {
    const response = await fetch(
      `${this.baseUrl}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const paystack = new PaystackAPI();
