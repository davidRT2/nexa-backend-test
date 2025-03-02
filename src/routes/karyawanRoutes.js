import express from "express";
import {
  getKaryawan,
  createKaryawan,
  updateKaryawan,
  deactivateKaryawan,
} from "../controllers/karyawanController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Mendapatkan daftar karyawan dengan keyword, start, dan count (pagination)
router.get("/", authenticateToken, getKaryawan);

// Menambahkan karyawan baru
router.post("/", createKaryawan);

// Memperbarui data karyawan berdasarkan NIP
router.put("/", authenticateToken, updateKaryawan);

// Menonaktifkan karyawan berdasarkan NIP
router.patch("/deactivate", authenticateToken, deactivateKaryawan);

export default router;
