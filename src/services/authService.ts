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
  const user = await getUser(username);
  const passwordHash = user.password_hash as string;
  const isValidPassword = await bcrypt.compare(password, passwordHash);
  if (!isValidPassword) {
    throw new Error("Contraseña incorrecta");
  }
  return user;
}
export async function checkIfUserExists(username: string): Promise<boolean> {
  const query = `SELECT * FROM users WHERE username = ?`;
  const result = await client.execute({
    sql: query,
    args: [username],
  });
  return result.rows.length > 0;
}
export async function getUser(username: string) {
  const userExists = await checkIfUserExists(username);
  if (!userExists) throw new Error("Usuario no encontrado");
  const query = `SELECT * FROM users WHERE username = ?`;
  const result = await client.execute({
    sql: query,
    args: [username],
  });
  return result.rows[0];
}
