import { checkUserSchema } from "app/lib/schemas/auth";
import { loginUser } from "app/services/authService";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
const SECRET_KEY = process.env.SECRET_KEY_JWT || "";

export async function POST(req: Request) {
  const body = await req.json();
  //Validar con zod
  const validation = checkUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Datos inválidos", errors: validation.error.errors },
      { status: 400 }
    );
  }
  const { username, password } = validation.data;
  try {
    await loginUser(username, password);
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    // Configurar la cookie
    const cookie = serialize("token", token, {
      httpOnly: true, // Solo permite que la cookie sea accesible desde el servidor
      secure: process.env.NODE_ENV !== "development", // Solo permite solicitudes HTTPS, a menos que sea en desarrollo
      sameSite: "strict", // La cookie solo es válida si se usa desde el mismo sitio que se creó
      maxAge: 3600, // 1 hora
      path: "/", // Permite el uso de la cookie en todas las rutas
    });
    return NextResponse.json(
      { message: "Inicio de sesión exitoso", data: validation.data },
      { status: 200 }
    ).headers.set("Set-Cookie", cookie);
  } catch (error) {
    return NextResponse.json(
      { message: "Error al iniciar sesión", error: (error as Error).message },
      { status: 500 }
    );
  }
}
