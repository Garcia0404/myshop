import bcrypt from "bcrypt";
import client from "../lib/db";

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const passwordHash = await bcrypt.hash(password, 10); // Hashear la contraseña

  const result = await client.execute({
    sql: "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    args: [username, email, passwordHash],
  });
  return result;
}
export async function loginUser(username: string, password: string) {
  const result = await client.execute({
    sql: "SELECT * FROM users WHERE username = ?",
    args: [username],
  });

  if (result.rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  const user = result.rows[0];
  const passwordHash = user.password_hash as string;
  const isValidPassword = await bcrypt.compare(password, passwordHash);

  if (!isValidPassword) {
    throw new Error("Contraseña incorrecta");
  }

  return user;
}
export async function checkIfUserExists(
  username: string,
  email: string
): Promise<boolean> {
  // Consulta SQL para buscar un usuario por username o email
  const query = `SELECT * FROM users WHERE username = ? OR email = ?`;
  const result = await client.execute({
    sql: query,
    args: [username, email],
  });

  // Si hay al menos una fila en el resultado, el usuario existe
  return result.rows.length > 0;
}
