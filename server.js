require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Port dinamis untuk pengujian lokal
const PORT = process.env.PORT || 3001;

// ==========================================
// Middleware Setup
// ==========================================
app.use(cors()); // Izinkan Akses CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handler untuk payload JSON tidak valid
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: 'Request JSON tidak valid.'
        });
    }
    next(err);
});

// Helper untuk mendapatkan Transporter Nodemailer
const getTransporter = () => {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        throw new Error('EMAIL_USER atau EMAIL_PASS belum diatur di Environment Variables!');
    }

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });
};

// Helper validasi format email
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ==========================================
// Endpoints / Routes
// ==========================================

// Route utama/default
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Online',
        message: 'API Backend Portofolio (Vercel-Ready) Aktif 🚀'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server berjalan', timestamp: new Date() });
});

// Route POST untuk mengirim email dari form kontak
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Validasi Kelengkapan Field
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Semua field (nama, email, pesan) wajib diisi!' 
        });
    }

    // 2. Validasi Format Email
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Format alamat email tidak valid!'
        });
    }

    try {
        const emailUser = process.env.EMAIL_USER;
        const transporter = getTransporter();

        // Template Email 1: Ke Pemilik Portofolio
        const mailToOwner = {
            from: `"Portofolio Notif" <${emailUser}>`,
            to: emailUser,
            replyTo: email,
            subject: `📩 Pesan Baru dari ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
                    <h2 style="color: #2c3e50;">Pesan Baru dari Pengunjung Portofolio</h2>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    
                    <p><strong>Nama:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
                    
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <h3>Pesan:</h3>
                    <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="color: #7f8c8d; font-size: 12px;">
                        💡 <strong>Cara Balas:</strong> Cukup klik "Reply" di email ini. Balasan akan langsung terkirim ke ${email}.
                    </p>
                </div>
            `
        };

        // Template Email 2: Konfirmasi Otomatis ke Pengirim
        const notificationToSender = {
            from: `"Muhammad Fauzia" <${emailUser}>`,
            to: email,
            subject: 'Pesan Anda Telah Diterima - Portofolio Muhammad Fauzia',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
                    <h2 style="color: #2c3e50;">Terima Kasih, ${name}! 🎉</h2>
                    <p>Pesan Anda telah saya terima dengan baik.</p>
                    
                    <p><strong>Detail Pesan Anda:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    
                    <p>Saya akan segera merespons pesan Anda secepatnya.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="color: #7f8c8d; font-size: 12px;">
                        Salam hangat,<br>
                        <strong>Muhammad Fauzia</strong>
                    </p>
                </div>
            `
        };

        // Kirim kedua email secara sejajar (Parallel Execution) agar respons cepat
        await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(notificationToSender)
        ]);

        return res.status(200).json({ 
            success: true, 
            message: 'Pesan berhasil dikirim dan notifikasi telah dikirim ke email pengirim.' 
        });

    } catch (error) {
        console.error('Error saat mengirim email:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Gagal mengirim email: ' + (error.message || 'Terjadi kesalahan server')
        });
    }
});

// ==========================================
// Export & Local Listener (Vercel Compatibility)
// ==========================================

// Hanya jalankan listener jika diuji secara lokal (bukan Vercel Serverless)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server lokal berjalan di port ${PORT}`);
    });
}

// ⚠️ WAJIB UNTUK VERCEL: Export app Express
module.exports = app;