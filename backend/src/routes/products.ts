import { Router } from "express";
import { prisma } from "../lib/prisma";

export const router = Router();

router.get("/", async (req, res) => {
  const { search, category } = req.query as {
    search?: string;
    category?: string;
  };
  const where: any = {};
  if (category) where.category = { slug: category };
  if (search)
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];

  const products = await prisma.product.findMany({
    where,
    include: { category: true, reviews: true, inventory: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, reviews: true, variants: true, inventory: true },
  });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});
