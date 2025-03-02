# Backend Test - Nexa

## Konfigurasi Lingkungan

Buat file `.env` di root proyek dan isi dengan konfigurasi berikut:

###sesuakan host user pass name sesuai db democase

```ini
PORT=3000
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=3306
JWT_SECRET=nexatest
TOKEN_EXPIRATION=1h
```

### Penjelasan Variabel Lingkungan:

- `PORT` - Port di mana server berjalan.
- `DB_HOST` - Host database.
- `DB_USER` - Username untuk database.
- `DB_PASS` - Password untuk database.
- `DB_NAME` - Nama database yang digunakan.
- `DB_PORT` - Port yang digunakan database.
- `JWT_SECRET` - Secret key untuk JWT authentication.
- `TOKEN_EXPIRATION` - Masa berlaku token JWT.

---

## API Routes

### **Karyawan Routes**

### Karyawan Routes

| Method | Endpoint      | Middleware          | Deskripsi                                                                       |
| ------ | ------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/`           | `authenticateToken` | Mendapatkan daftar karyawan dengan keyword, start, dan count (pagination)       |
| POST   | `/`           | `authenticateToken` | Menambahkan karyawan baru                                                       |
| PUT    | `/`           | `authenticateToken` | Memperbarui data karyawan berdasarkan NIP (dikirim dalam **body request JSON**) |
| PATCH  | `/deactivate` | `authenticateToken` | Menonaktifkan karyawan berdasarkan NIP (dikirim dalam **body request JSON**)    |

### Contoh Request Body

#### **Memperbarui Karyawan (PUT /)**

```json
{
  "NIP": "123456",
  "name": "John Doe",
  "position": "Manager"
}
```

#### **Menonaktifkan Karyawan (PATCH /deactivate)**

```json
{
  "NIP": "123456"
}
```

### **Auth Routes**

| Method | Endpoint    | Middleware | Deskripsi             |
| ------ | ----------- | ---------- | --------------------- |
| POST   | `/login`    | -          | Melakukan login user  |
| POST   | `/register` | -          | Registrasi admin baru |

---

## Menjalankan Proyek dengan Docker

### **Docker Compose**

Pastikan Docker sudah terinstall. Jalankan perintah berikut untuk membangun dan menjalankan aplikasi:

```bash
docker compose up --build -d
```

Jika terjadi error pada koneksi database, pastikan bahwa database sudah berjalan dengan konfigurasi yang benar.

### **Cek Container yang Berjalan**

Gunakan perintah berikut untuk mengecek apakah container sudah berjalan:

```bash
docker ps
```

### **Masuk ke Container**

Untuk masuk ke dalam container dan mengecek environment variables:

```bash
docker exec -it <container_id> sh
printenv
```

Gantilah `<container_id>` dengan ID container yang sesuai.

---

## Repository & Deployment

Kode ini disimpan dalam repository:
[GitHub - BackendTest Nexa](https://github.com/davidRT2/nexa-backend-test)

Untuk mengupdate repository, gunakan perintah berikut:

```bash
git pull origin main --rebase
git push -u origin main
```

Jika ingin memaksa push (gunakan dengan hati-hati):

```bash
git push -u origin main --force
```
