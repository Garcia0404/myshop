import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1, // Expira la cookie inmediatamente
    path: "/",
  });
  const response = NextResponse.json(
    { message: "Sesión cerrada" },
    { status: 200 }
  );
  response.headers.append("Set-Cookie", cookie);
  return response;
}
