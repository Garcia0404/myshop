import { registerSchema } from "app/lib/schemas/auth";
import { checkIfUserExists, registerUser } from "app/services/authService";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  // Validar los datos con Zod
  const validation = registerSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Datos inválidos", errors: validation.error.errors },
      { status: 400 }
    );
  }
  const { username, email, password } = validation.data;
  // Si pasa la validación, verificar si ya existe el usuario
  try {
    const userExists = await checkIfUserExists(username); // Función que verifica si el usuario existe
    if (userExists) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 409 }
      );
    }
    const result = await registerUser(username, email, password);
    return NextResponse.json(
      { message: "Usuario registrado exitosamente", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error al registrar el usuario",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
