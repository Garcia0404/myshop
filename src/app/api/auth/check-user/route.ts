import { NextResponse } from "next/server";
import client from "app/lib/db";
import { checkUserSchema } from "app/lib/schemas/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar los datos con Zod
    const validation = checkUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { password, username } = validation.data;
    // Verificar si el usuario existe en la base de datos
    let query = "";
    let params: string[] = [];
    if (password) {
      query = "SELECT * FROM users WHERE password = ?";
      params = [password];
    } else if (username) {
      query = "SELECT * FROM users WHERE username = ?";
      params = [username];
    }

    const result = await client.execute({
      sql: query,
      args: params,
    });

    if (result.rows.length > 0) {
      return NextResponse.json(
        { message: "El usuario ya está registrado", exists: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "El usuario no está registrado", exists: false },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al verificar el usuario", error: (error as Error).message },
      { status: 500 }
    );
  }
}