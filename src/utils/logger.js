import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // 🔹 Tampilkan log di terminal
    new transports.File({ filename: "logs/error.log", level: "error" }), // 🔴 Simpan error ke file
    new transports.File({ filename: "logs/combined.log" }), // 📜 Simpan semua log ke file
  ],
});

export default logger;
