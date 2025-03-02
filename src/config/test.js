import pool from "./database.js";

async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Database connected!", rows);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testDB();
