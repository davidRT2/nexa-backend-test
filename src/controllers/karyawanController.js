import multer from "multer";
import fs from "fs";
import {
  getAllKaryawan,
  addKaryawan,
  getLastKaryawanNip,
  updateKaryawan as updateKaryawanModel,
  deactivateKaryawan as deactivateKaryawanModel,
} from "../models/karyawanModel.js";
import logger from "../utils/logger.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const getKaryawan = async (req, res) => {
  try {
    const { keyword = "", start = 0, count = 10 } = req.query;
    const karyawan = await getAllKaryawan(
      keyword,
      parseInt(start),
      parseInt(count)
    );

    if (!karyawan.length) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    res.json(karyawan);
  } catch (error) {
    logger.error(`❌ Error getKaryawan: ${error.message}`);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

const generateNip = async () => {
  const year = new Date().getFullYear();
  const lastNip = await getLastKaryawanNip(year);
  const counter = lastNip ? parseInt(lastNip.slice(4)) + 1 : 1;
  return `${year}${String(counter).padStart(4, "0")}`;
};

export const createKaryawan = [
  authenticateToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      const { nama, alamat, gend, tgl_lahir } = req.body;
      const insert_by = req.user.username;

      if (!nama || !alamat || !gend || !tgl_lahir) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
      }

      const nip = await generateNip();
      let photoBase64 = null;
      if (req.file) {
        const base64Photo = req.file.buffer.toString("base64");
        const mimeType = req.file.mimetype;
        photoBase64 = `data:${mimeType};base64,${base64Photo}`;
      }

      await addKaryawan(
        nip,
        nama,
        alamat,
        gend,
        tgl_lahir,
        photoBase64,
        insert_by
      );

      logger.info(
        `✅ Karyawan ${nama} berhasil ditambahkan oleh ${insert_by} dengan NIP: ${nip}`
      );
      res.status(201).json({ message: "Karyawan berhasil ditambahkan!", nip });
    } catch (error) {
      logger.error(`❌ Error createKaryawan: ${error.message}`);
      res
        .status(500)
        .json({ message: "Gagal menambahkan karyawan!", error: error.message });
    }
  },
];

export const updateKaryawan = async (req, res) => {
  try {
    const { nip, nama, alamat, gend, tgl_lahir } = req.body;
    if (!nip || !nama || !alamat || !gend || !tgl_lahir) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const updated = await updateKaryawanModel(
      nip,
      nama,
      alamat,
      gend,
      tgl_lahir
    );
    if (!updated) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan!" });
    }

    res.json({ message: "Karyawan berhasil diperbarui!" });
  } catch (error) {
    logger.error(`❌ Error updateKaryawan: ${error.message}`);
    res
      .status(500)
      .json({ message: "Gagal memperbarui karyawan!", error: error.message });
  }
};

export const deactivateKaryawan = async (req, res) => {
  try {
    const { nip } = req.body;
    if (!nip) {
      return res.status(400).json({ message: "NIP harus diisi!" });
    }

    const deactivated = await deactivateKaryawanModel(nip);
    if (!deactivated) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan!" });
    }

    res.json({ message: "Karyawan berhasil dinonaktifkan!" });
  } catch (error) {
    logger.error(`❌ Error deactivateKaryawan: ${error.message}`);
    res
      .status(500)
      .json({ message: "Gagal menonaktifkan karyawan!", error: error.message });
  }
};
