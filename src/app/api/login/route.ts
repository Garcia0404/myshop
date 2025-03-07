import { checkUserSchema } from "app/lib/schemas/auth";
import { loginUser } from "app/services/authService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  //Validar con zod
  const validation = checkUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: "Datos inválidos", errors: validation.error.errors }, { status: 400 });
  }
  const { username, password } = validation.data;
  try{
    await loginUser(username, password);
    return NextResponse.json({ message: "Inicio de sesión exitoso", data: validation.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al iniciar sesión", error: (error as Error).message }, { status: 500 });
  }
}
