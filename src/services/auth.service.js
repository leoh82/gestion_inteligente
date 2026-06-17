import { pool } from "../database/db.js";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken"; 

export const registerUser = async (userData) => {

  const {
    nombre,
    email,
    password
  } = userData;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users
    (
      nombre,
      email,
      password
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    RETURNING id, nombre, email
    `,
    [
      nombre,
      email,
      hashedPassword
    ]
  );
  return result.rows[0];
};

export const loginUser = async (email, password) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  const user = result.rows[0];
  if (!user) {
    const error = new Error("Credenciales no validas");
    error.StatusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error("Credenciales invalidas");
    error.StatusCode = 401;
    throw error;
  }
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "8h" }
);

return {
  token,
  user: {
    id: user.id,
    email: user.email,
    role: user.role
  }
}
};