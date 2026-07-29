# 🚀 SETUP CEPAT - Sistem Email Baru

Silakan ikuti langkah-langkah ini dengan **URUT** agar sistem email Anda berfungsi dengan baik!

---

## ✅ Step 1: Generate Gmail App Password (5 menit)

1. **Buka:** https://myaccount.google.com/apppasswords
2. **Login** dengan akun Gmail Anda (fauziamuhammad@apps.ipb.ac.id)
3. **Pilih:**
   - "Mail" (dropdown pertama)
   - "Windows Computer" (dropdown kedua)
4. **Klik "Generate"**
5. Google akan menampilkan **16 karakter password**
   - Contoh: `zyxw qpon mlkj ihgf`
6. **Copy** password ini (Anda butuh di step berikutnya)

✋ **PENTING:** Jangan tulis password di notepad! Copy langsung ke step berikutnya.

---

## ✅ Step 2: Setup File Konfigurasi (3 menit)

1. **Buka folder:** `C:\Users\amrul\Downloads\Projek Portofolio New`
2. **Lihat file:** `.env.example` 
3. **Duplikasi** file ini, rename jadi `.env`
   - Windows: Klik kanan → Copy → Paste → Rename
   - Atau gunakan Command Prompt:
     ```
     copy .env.example .env
     ```
4. **Edit file `.env`** (buka dengan Notepad atau VSCode):
   ```
   EMAIL_USER=fauziamuhammad@apps.ipb.ac.id
   EMAIL_PASS=zyxw qpon mlkj ihgf
   PORT=3001
   ```
   - Ganti `zyxw qpon mlkj ihgf` dengan password dari Step 1
5. **Save** file

---

## ✅ Step 3: Install Dependencies (2 menit)

1. **Buka Command Prompt/Terminal** di folder project
   - Di Windows: Tekan `Ctrl + Shift + Right Click` → "Open PowerShell here"
   - Atau manual: `cd C:\Users\amrul\Downloads\Projek Portofolio New`

2. **Jalankan:**
   ```
   npm install
   ```
   - Ini akan download/install semua packages yang dibutuhkan
   - Tunggu sampai selesai (sekitar 1-2 menit tergantung internet)

---

## ✅ Step 4: Jalankan Server (selamanya)

1. **Di Command Prompt yang sama, jalankan:**
   ```
   npm start
   ```

2. **Tunggu sampai keluar message:**
   ```
   Server berjalan di http://localhost:3001
   Endpoint: POST http://localhost:3001/api/contact
   ```

3. **Biarkan Command Prompt ini tetap BUKA**
   - Jangan tutup window ini!
   - Bisa minimize saja
   - Server akan terus running selama window open

---

## ✅ Step 5: Test Sistem

1. **Buka browser** → file `index.html` atau `gemini-code-1785329445578.html`
2. **Scroll ke bagian "Narahubung"**
3. **Isi form kontak:**
   - Nama: `Test`
   - Email: `test@gmail.com`
   - Pesan: `Ini test pesan`
4. **Klik "Kirim Pesan 🚀"**

**Expected Result:**
- ✅ Alert: "Terima kasih! Pesan Anda telah berhasil dikirim"
- ✅ Email masuk ke `fauziamuhammad@apps.ipb.ac.id`
- ✅ Email juga dikirim ke `test@gmail.com` sebagai notifikasi
- ✅ Di email balasan Anda, field "Reply-To" adalah `test@gmail.com`
- ✅ Ketika Anda klik "Reply" atau "Reply All", balasan langsung ke pengirim asli

---

## ⚠️ Jika Ada Error

### Error: "Backend tidak terjangkau"
**Solusi:**
- Pastikan Step 4 sudah dijalankan
- Command Prompt harus tetap terbuka
- Coba refresh browser (F5)

### Error: "npm: command not found"
**Solusi:**
- Node.js belum install
- Download dari: https://nodejs.org/
- Install versi LTS (Long Term Support)
- Restart Computer
- Coba lagi

### Error: "ENOENT: no such file or directory, open '.env'"
**Solusi:**
- File `.env` belum dibuat
- Ulangi Step 2 dengan teliti

### Error: "Invalid login credentials"
**Solusi:**
- App Password salah atau sudah expired
- Ulangi Step 1 (generate App Password baru)
- Update di file `.env`

---

## 🎯 Setelah Semua Berfungsi

### Backup Setup Anda
Jangan hilangkan file `.env` ini! Jika harddisk error atau perlu setup ulang:
- Cukup copy-paste file `.env` ke folder baru
- Jalankan `npm install` dan `npm start`

### Integrasikan ke Workflow Harian
1. Sebelum open website portofolio, jalankan `npm start` dulu
2. Biarkan server berjalan di background
3. Sekarang sistem kontak Anda aktif dan siap menerima pesan

---

## 📧 Fitur Sistem

✅ **Pengunjung kirim pesan** → Email ke inbox utama Anda  
✅ **Identitas jelas** → Nama + Email pengirim di dalam email  
✅ **Notifikasi balasan** → Pengirim dapat notifikasi pesan diterima  
✅ **Reply-To otomatis** → Balasan Anda langsung ke pengirim  
✅ **Log realtime** → Terminal menampilkan setiap pesan masuk  

---

## 🆘 Butuh Bantuan?

Jika masih error setelah ikuti langkah-langkah di atas:
1. Screenshot error message
2. Bilang langkah ke berapa yang error
3. Saya akan bantu perbaiki

**Good luck! 🎉**
