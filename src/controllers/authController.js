import pool from "../config/database.js";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../config/crypto.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM admin WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];
    const decryptedPassword = decrypt(
      Buffer.from(admin.password, "hex").toString()
    );

    if (password !== decryptedPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || "1h" } // Default 1 jam jika tidak diatur di .env
    );

    await pool.query(
      "INSERT INTO admin_token (id_admin, token, expired_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))",
      [admin.id, token]
    );

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan Password diperlukan" });
    }

    // Cek apakah username sudah ada
    const [existingUser] = await pool.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Enkripsi password menggunakan AES
    const encryptedPassword = encrypt(password);

    // Simpan admin ke database
    await pool.query("INSERT INTO admin (username, password) VALUES (?, ?)", [
      username,
      encryptedPassword,
    ]);

    return res.status(201).json({ message: "Admin berhasil didaftarkan" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
