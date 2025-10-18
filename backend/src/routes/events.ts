import { Router } from "express";
import { prisma } from "../lib/prisma";

export const router = Router();

router.post("/", async (req, res) => {
  const { name, category, payload, userId, sessionId } = req.body || {};
  if (!name || !category)
    return res.status(400).json({ error: "name and category are required" });
  const event = await prisma.event.create({
    data: { name, category, payload: payload ?? {}, userId, sessionId },
  });
  // Forward to analytics provider here (Mixpanel/Amplitude) if tokens present
  res.status(201).json({ success: true, id: event.id });
});
