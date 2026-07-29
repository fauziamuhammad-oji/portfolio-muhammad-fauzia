# 📧 Sistem Kontak Portofolio - Setup Guide

Sistem email baru ini memungkinkan:
✅ Pengunjung mengirim pesan dengan identitas jelas (nama + email)
✅ Anda menerima pesan di inbox utama dengan **Reply-To** ke email pengirim
✅ Ketika Anda balas, pesan otomatis ke pengirim asli
✅ Pengirim mendapat notifikasi bahwa pesan diterima
✅ Konversasi email yang proper seperti customer support

---

## Setup Step-by-Step

### 1. Setup Gmail App Password

Karena Gmail sekarang butuh "App Password" (bukan password biasa):

1. Buka: https://myaccount.google.com/apppasswords
2. Pilih "Mail" dan "Windows Computer" (atau device Anda)
3. Google akan generate **16 karakter password khusus**
4. Copy password tersebut (Anda akan butuh di step berikutnya)

**Catatan:** 2FA harus sudah aktif di akun Gmail Anda.

---

### 2. Setup Project di Folder Anda

```bash
# Buka Terminal/Command Prompt di folder "Projek Portofolio New"

# 1. Duplikasi .env.example menjadi .env
cp .env.example .env
# Atau di Windows:
copy .env.example .env

# 2. Edit file .env dan isi:
EMAIL_USER=fauziamuhammad@apps.ipb.ac.id
EMAIL_PASS=xxxx xxxx xxxx xxxx  # Paste app password dari step 1

# 3. Install dependencies
npm install

# 4. Jalankan server
npm start
```

Jika berhasil, akan keluar:
```
Server berjalan di http://localhost:3001
Endpoint: POST http://localhost:3001/api/contact
```

---

### 3. Test Sistem

1. Buka file HTML (index.html atau gemini-code-1785329445578.html) di browser
2. Scroll ke bagian "Narahubung"
3. Isi form:
   - Nama: Oji Test
   - Email: test@example.com
   - Pesan: Ini pesan test
4. Klik "Kirim Pesan 🚀"

**Expected Result:**
- ✅ Email masuk ke fauziamuhammad@apps.ipb.ac.id
- ✅ Email di-CC ke test@example.com (notifikasi terima)
- ✅ Ketika Anda "Reply All", balasan otomatis ke test@example.com

---

### 4. File-file yang Sudah Saya Buat

```
📁 Projek Portofolio New/
├── server.js              ← Backend Express server (RUN INI)
├── send-email.js          ← Module email (unused, untuk referensi)
├── package.json           ← Dependencies (npm install)
├── .env.example           ← Template environment variables
├── .env                   ← File konfigurasi aktual (jangan commit!)
├── index.html             ← Sudah diupdate
├── gemini-code-1785329445578.html ← Sudah diupdate
└── README.md              ← File ini
```

---

### 5. Troubleshooting

#### ❌ "Backend tidak terjangkau" Error

**Solusi:**
```bash
# Pastikan server berjalan:
npm start

# Atau jika pakai nodemon (development):
npm run dev
```

#### ❌ "Gagal mengirim email"

**Cek:**
1. App Password benar? (Generate ulang di Google Account)
2. Gmail IMAP/SMTP aktif? (Buka: https://myaccount.google.com/lesssecureapps)
3. 2FA sudah aktif di akun Gmail?

#### ❌ "Cannot find module 'nodemailer'"

**Solusi:**
```bash
npm install
```

---

### 6. Deploy ke Production

Jika ingin online (bukan localhost):

**Option A: Deploy ke Railway, Heroku, atau Render**
- Deploy file `server.js` dan `package.json`
- Set environment variables di platform deployment
- Update URL di HTML: `http://localhost:3001` → `https://your-backend-url.com`

**Option B: Deploy ke VPS atau own server**
- Setup Node.js di server
- Setup PM2 atau systemd untuk auto-restart
- Setup SSL/HTTPS
- Update URL di HTML

---

### 7. Security Notes

⚠️ **Jangan commit `.env` ke Git!**
- File `.env` sudah di `.gitignore`
- Selalu gunakan `dotenv` untuk manage secrets

⚠️ **CORS hanya untuk localhost saat ini**
- Jika production, update CORS settings di `server.js` line 18

---

### 8. Fitur Bonus

Sistem ini juga bisa di-extend untuk:
- ✅ Spam filtering (honeypot field)
- ✅ Rate limiting (max 5 pesan/jam)
- ✅ Dashboard admin untuk melihat pesan
- ✅ Integrasi dengan database (MongoDB/PostgreSQL)
- ✅ Webhooks untuk notifikasi ke Discord/Telegram

---

**Pertanyaan?** Hubungi melalui portofolio atau update README ini.

---

*Last Updated: 2026-07-29*
