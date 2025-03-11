import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUser } from "app/services/authService";
const SECRET_KEY = process.env.SECRET_KEY_JWT || "";
export async function GET(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Token no proporcionado" },
      { status: 401 }
    );
  }
  try {
    const result = jwt.verify(token, SECRET_KEY) as { username: string };
    const user = await getUser(result.username);
    return NextResponse.json({
      message: "Token válido",
      data: { username: user.username, email: user.email },
    });
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
