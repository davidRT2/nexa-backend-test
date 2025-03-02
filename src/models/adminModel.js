import pool from "../config/db.js"; // Tambahkan .js untuk ES Module
import bcrypt from "bcryptjs";

export const findAdminByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

export const validatePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword.toString());
};
