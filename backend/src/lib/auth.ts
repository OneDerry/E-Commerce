import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env";

export interface JWTPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateTokens(payload: JWTPayload) {
  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, env.jwtSecret) as JWTPayload;
}
