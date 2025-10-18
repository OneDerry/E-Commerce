export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "change-me",
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
  paystackSecret: process.env.PAYSTACK_SECRET_KEY || "",
};

export function assertEnv() {
  if (!env.databaseUrl) throw new Error("DATABASE_URL is required");
  if (!env.jwtSecret || env.jwtSecret === "change-me") {
    // eslint-disable-next-line no-console
    console.warn("Warning: Using default JWT secret. Set JWT_SECRET in env.");
  }
}
