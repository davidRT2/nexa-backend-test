import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import karyawanRoutes from "./routes/karyawanRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import logger from "./utils/logger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Middleware: Logging untuk semua request
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `[${req.method}] ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/karyawan", authenticateToken, karyawanRoutes);

// ✅ Middleware: Menangani 404 Not Found
app.use((req, res, next) => {
  logger.warn(`⚠️ 404 Not Found - [${req.method}] ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// ✅ Middleware: Menangani 500 Internal Server Error
app.use((err, req, res, next) => {
  logger.error(
    `❌ Server Error: ${err.message} | Path: [${req.method}] ${req.originalUrl}`
  );
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`✅ Server running on port ${PORT}`);
});
