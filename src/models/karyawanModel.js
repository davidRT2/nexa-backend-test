import pool from "../config/database.js";

export const getAllKaryawan = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM karyawan_Muhammad_David_Akbar"
  );
  return rows;
};

export const addKaryawan = async (
  nip,
  nama,
  alamat,
  gend,
  tgl_lahir,
  photo,
  insert_by
) => {
  const status = "1"; // Default status 1
  const [result] = await pool.query(
    "CALL sp_add_kary_Muhammad_David_Akbar(?, ?, ?, ?, ?, ?, ?, ?)",
    [nip, nama, alamat, gend, photo, tgl_lahir, status, insert_by]
  );
  return result;
};

export const getLastKaryawanNip = async (year) => {
  const [rows] = await pool.query(
    "SELECT nip FROM karyawan_Muhammad_David_Akbar WHERE LEFT(nip, 4) = ? ORDER BY nip DESC LIMIT 1",
    [year]
  );
  return rows.length > 0 ? rows[0].nip : null;
};

export const updateKaryawan = async (nip, nama, alamat, gend, tgl_lahir) => {
  const [result] = await pool.query(
    "UPDATE karyawan SET nama = ?, alamat = ?, gend = ?, tgl_lahir = ? WHERE nip = ?",
    [nama, alamat, gend, tgl_lahir, nip]
  );
  return result.affectedRows > 0;
};

export const deactivateKaryawan = async (nip) => {
  const status = "9"; // Status 9 untuk nonaktif
  const [result] = await pool.query(
    "UPDATE karyawan SET status = ? WHERE nip = ?",
    [status, nip]
  );
  return result.affectedRows > 0;
};

export const activateKaryawan = async (nip) => {
  const status = "1"; // Status 1 untuk aktif
  const [result] = await pool.query(
    "UPDATE karyawan SET status = ? WHERE nip = ?",
    [status, nip]
  );
  return result.affectedRows > 0;
};
