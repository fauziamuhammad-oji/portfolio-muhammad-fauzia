# ✅ Checklist Deployment ke Production

Panduan lengkap untuk deploy website portofolio dengan chatbot AI ke production tanpa error.

---

## 📋 Persiapan Sebelum Deploy

### 1. **Verifikasi File `.env` Lengkap dan Valid**

Pastikan file `.env` berisi semua variabel berikut:

```env
# Email untuk form kontak
EMAIL_USER=fauziamuhammad@apps.ipb.ac.id
EMAIL_PASS=xxxx xxxx xxxx xxxx

# Port server
PORT=3001

# API Key Gemini (WAJIB 39 karakter, diawali AIza)
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Cara validasi API Key Gemini:**
- ✅ Panjang HARUS 39 karakter
- ✅ HARUS diawali dengan `AIza`
- ❌ Jangan pakai placeholder `your_gemini_api_key_here`

**Cara dapat API Key:** Lihat file `CARA-DAPAT-GEMINI-API-KEY.md`

---

### 2. **Test Backend Lokal Dulu**

Sebelum deploy, pastikan backend berjalan tanpa error di lokal:

```bash
# Install dependencies
npm install

# Jalankan server
npm start
```

**Expected output:**
```
Server lokal berjalan di port 3001
```

**Test endpoint:**
```bash
# Test API health
curl http://localhost:3001/api/health

# Test chatbot (ganti YOUR_MESSAGE)
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Halo","isFirstMessage":true}'
```

Jika ada error, perbaiki dulu sebelum deploy.

---

## 🐳 Deploy dengan Docker

### 1. **Pastikan Docker Desktop Running**

```bash
docker --version
docker-compose --version
```

### 2. **Build & Run Container**

```bash
# Build ulang image dengan perubahan terbaru
docker-compose up --build -d

# Cek status container
docker ps
```

**Expected output:**
```
CONTAINER ID   IMAGE                    STATUS
abc123def456   portofolio-backend       Up 2 seconds
xyz789ghi012   nginx:alpine            Up 2 seconds
```

### 3. **Cek Logs Backend**

```bash
# Lihat log backend untuk memastikan tidak ada error
docker logs portofolio-backend

# Follow logs secara real-time
docker logs -f portofolio-backend
```

**Log yang BAIK:**
```
Server lokal berjalan di port 3001
```

**Log yang BURUK (harus diperbaiki):**
```
Error: GEMINI_API_KEY tidak ditemukan di environment variables!
UnhandledPromiseRejectionWarning: ...
```

### 4. **Test Website**

Buka browser:
```
http://localhost
```

- ✅ Test form kontak: Isi dan kirim
- ✅ Test chatbot: Klik ikon chat di kiri bawah, ketik pertanyaan
- ✅ Cek console browser (F12) untuk error JavaScript

---

## ☁️ Deploy ke Cloud (Vercel, Railway, dll)

### Vercel Deployment

**File yang diperlukan:** `vercel.json`

Buat file `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.js" },
    { "src": "/(.*)", "dest": "/$1" }
  ],
  "env": {
    "EMAIL_USER": "@email_user",
    "EMAIL_PASS": "@email_pass",
    "GEMINI_API_KEY": "@gemini_api_key"
  }
}
```

**Deploy steps:**
1. Push ke GitHub repository
2. Import project di Vercel
3. **PENTING:** Set Environment Variables di Vercel Dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `GEMINI_API_KEY`
4. Deploy

---

## 🐛 Troubleshooting Error di Production

### Error: "Server tidak dapat dijangkau atau sedang offline"

**Penyebab:**
1. Backend container tidak jalan
2. Nginx tidak bisa connect ke backend
3. Port 3001 backend tidak expose

**Solusi:**
```bash
# Restart backend
docker-compose restart backend

# Cek network
docker network ls
docker network inspect projek-portofolio-new_default

# Cek apakah backend listening di port 3001
docker exec portofolio-backend netstat -tulpn | grep 3001
```

---

### Error: "API Key Gemini tidak valid"

**Penyebab:**
- API Key salah format (bukan diawali `AIza` atau bukan 39 karakter)

**Solusi:**
1. Dapatkan API Key baru dari https://aistudio.google.com/app/apikey
2. Update file `.env`
3. Restart container: `docker-compose restart backend`

---

### Error: "Gagal mengirim email"

**Penyebab:**
- `EMAIL_PASS` bukan App Password Gmail
- 2FA belum aktif di Google Account

**Solusi:**
1. Aktifkan 2FA di Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Salin 16 karakter (format: `xxxx xxxx xxxx xxxx`)
4. Update `.env` dan restart

---

## 🔒 Security Checklist

- ✅ File `.env` ada di `.gitignore` (jangan commit ke Git!)
- ✅ API Keys tidak hardcode di source code
- ✅ Nginx block akses ke file `.env`, `server.js`, dll
- ✅ CORS sudah diatur dengan benar

---

## 📊 Monitoring Production

### Cek Health Server

```bash
curl https://yourwebsite.com/api/health
```

**Expected response:**
```json
{
  "status": "Server berjalan",
  "timestamp": "2026-08-02T10:30:00.000Z"
}
```

### Monitor Logs

```bash
# Docker logs
docker logs -f portofolio-backend

# Nginx access logs
docker logs -f portofolio-frontend
```

---

## 🎯 Final Checklist Sebelum Go Live

- [ ] API Key Gemini valid dan sudah ditest
- [ ] Email form kontak berfungsi
- [ ] Chatbot AI merespon dengan benar
- [ ] Semua gambar dan sertifikat terload
- [ ] Responsive design OK di mobile
- [ ] SSL certificate aktif (HTTPS)
- [ ] `.env` tidak ter-commit ke Git
- [ ] Backup database/logs (jika ada)

---

**Selamat! Website Anda sudah siap production! 🚀**

Jika masih ada masalah, cek log error dan bandingkan dengan troubleshooting di atas.
