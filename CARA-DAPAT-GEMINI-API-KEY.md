# 🔑 Cara Mendapatkan API Key Google Gemini (GRATIS)

API Key Gemini diperlukan agar chatbot AI "Fauzia AI" dapat berfungsi di website portofolio Anda.

---

## Langkah-Langkah Mendapatkan API Key

### 1. Buka Google AI Studio
Kunjungi: **https://aistudio.google.com/app/apikey**

### 2. Login dengan Akun Google
Gunakan akun Google Anda (yang sama dengan Gmail).

### 3. Klik "Create API Key"
- Klik tombol **"Create API key"** atau **"Get API key"**
- Pilih Google Cloud Project (bisa pilih yang sudah ada atau buat baru dengan nama `Portofolio-AI`)
- Klik **"Create API key in existing project"** atau **"Create API key in new project"**

### 4. Salin API Key
- API Key akan muncul dalam format: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- **PENTING:** API Key harus diawali dengan `AIza` dan total 39 karakter
- Klik tombol **Copy** untuk menyalin

### 5. Paste ke File `.env`
Buka file `.env` di folder proyek Anda, lalu isi:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Ganti `AIzaSyXXX...` dengan API Key asli yang Anda dapat!**

---

## ⚠️ Catatan Penting

### API Key SALAH (contoh yang TIDAK valid):
```
❌ your_gemini_api_key_here
❌ sk-1234567890abcdef (ini format OpenAI, bukan Gemini)
❌ GANTI_DENGAN_API_KEY_ASLI
```

### API Key BENAR (format yang valid):
```
✅ AIzaSyDxK8f9Hg2Lm3Np4Qr5St6Uv7Wx8Yz0Ab1Cd2Ef3Gh4
✅ AIzaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSs
```

---

## 🚀 Setelah Dapat API Key

1. **Update file `.env`** dengan API Key yang valid
2. **Restart server** (jika lokal: `npm start`, jika Docker: `docker-compose restart backend`)
3. **Test chatbot** di website dengan bertanya sesuatu

---

## 🔒 Keamanan API Key

- **JANGAN** commit file `.env` ke Git/GitHub
- **JANGAN** share API Key di public (screenshot, forum, dll)
- Jika tercuri, bisa di-revoke dan buat baru di Google AI Studio

---

## 📌 Link Referensi

- **Google AI Studio**: https://aistudio.google.com/
- **Dokumentasi Gemini API**: https://ai.google.dev/docs
- **Tutorial Video (YouTube)**: Cari "how to get google gemini api key free"

---

Selamat mencoba! 🎉
