import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock user database - In a real app, this would be a database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@vdmstore.com",
    phone: "+2341234567890",
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    phone: "+2341234567891",
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string; email: string; isAdmin: boolean };

    // Find user
    const user = users.find((u) => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
