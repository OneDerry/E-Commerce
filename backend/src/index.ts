import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { api } from "./routes";
import { errorHandler } from "./middleware/error";
import { env, assertEnv } from "./config/env";

const app = express();

// Basic security & parsing
app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Health endpoints
app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));
app.get("/readyz", (_req, res) => res.status(200).json({ ready: true }));

// Placeholder routes
app.get("/", (_req, res) =>
  res.json({ name: "VDM Backend", version: "0.1.0" })
);

// API
app.use("/api", api);

// Error handler
app.use(errorHandler);

assertEnv();
const port = env.port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`VDM backend listening on http://localhost:${port}`);
});
