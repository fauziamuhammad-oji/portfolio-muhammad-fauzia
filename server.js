// Backend server Express untuk menerima form kontak dan mengirim email
// Setup:
//   1. npm install express body-parser nodemailer cors dotenv
//   2. Buat file .env dengan EMAIL_USER dan EMAIL_PASS
//   3. Jalankan server dengan: node server.js

require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Konfigurasi Nodemailer
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
    console.error('ERROR: EMAIL_USER dan EMAIL_PASS harus diatur di file .env. Pastikan menggunakan alamat Gmail dan App Password tanpa spasi.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP verification failed:', error.message || error);
        process.exit(1);
    }
    console.log('SMTP verification succeeded. Ready to send email.');
});

// Route untuk menerima form submission
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validasi
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
    }

    try {
        // Email ke pemilik portofolio dengan Reply-To ke pengirim
        const mailToOwner = {
            from: emailUser,
            to: emailUser,
            replyTo: email, // Kunci: balasan otomatis ke pengirim
            cc: email, // Pengirim juga menerima copy
            subject: `Pesan Baru - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
                    <h2 style="color: #333;">Pesan Baru dari Pengunjung Portofolio</h2>
                    <hr style="border: none; border-top: 2px solid #ddd;">
                    
                    <p><strong>Nama:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID')}</p>
                    
                    <hr style="border: none; border-top: 2px solid #ddd;">
                    <h3>Pesan:</h3>
                    <p style="background: white; padding: 15px; border-radius: 5px;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    <hr style="border: none; border-top: 2px solid #ddd;">
                    
                    <p style="color: #666; font-size: 12px;">
                        <strong>📧 Cara Balas:</strong> Klik tombol "Balas" di email Anda. Balasan akan otomatis dikirim ke ${email}
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailToOwner);

        // Email notifikasi ke pengirim bahwa pesan diterima
        const notificationToSender = {
            from: emailUser,
            to: email,
            subject: 'Pesan Anda telah diterima - Portofolio Muhammad Fauzia',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
                    <h2 style="color: #333;">Terima Kasih, ${name}! 🎉</h2>
                    <p>Pesan Anda telah kami terima dengan baik.</p>
                    
                    <p><strong>Detail Pesan:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 5px;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                    
                    <p>Kami akan segera meresponnya. Balasan kami akan dikirim ke email ini: <strong>${email}</strong></p>
                    
                    <hr style="border: none; border-top: 2px solid #ddd;">
                    <p style="color: #666; font-size: 12px;">
                        Regards,<br>
                        Muhammad Fauzia<br>
                        <a href="https://portfoliomu.com">Kunjungi Portofolio</a>
                    </p>
                </div>
            `
        };

        await transporter.sendMail(notificationToSender);

        res.json({ 
            success: true, 
            message: 'Pesan berhasil dikirim dan notifikasi telah dikirim ke email Anda' 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan saat mengirim email: ' + error.message 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server berjalan' });
});

// Fallback untuk SPA / static site hosting
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log(`Endpoint: POST http://localhost:${port}/api/contact`);
});
