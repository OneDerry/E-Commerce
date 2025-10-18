import { Router } from "express";
import { router as products } from "./products";
import { router as events } from "./events";
import { router as auth } from "./auth";
import { router as orders } from "./orders";

export const api = Router();

api.use("/auth", auth);
api.use("/products", products);
api.use("/events", events);
api.use("/orders", orders);
