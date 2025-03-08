import { NextResponse } from "next/server";
import { getUser } from "app/services/authService";
export async function GET(req: Request) {
  const username = req.headers.get("username") as string;
  try {
    const user = await getUser(username);
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error al obtener usuario" }, { status: 401 });
  }
}
