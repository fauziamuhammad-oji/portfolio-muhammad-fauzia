// Backend untuk mengirim email dengan proper Reply-To dan notifikasi
// Gunakan dengan Node.js: npm install nodemailer
// Jalankan: node send-email.js

const nodemailer = require('nodemailer');

// Konfigurasi email (gunakan Gmail App Password atau SMTP lain)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fauziamuhammad@apps.ipb.ac.id', // Email utama Anda
        pass: 'YOUR_APP_PASSWORD' // Generate di https://myaccount.google.com/apppasswords
    }
});

// Fungsi untuk mengirim email dari pengirim ke Anda
async function sendContactEmail(senderName, senderEmail, message) {
    try {
        // Email ke Anda dengan identitas pengirim jelas
        const mailOptions = {
            from: 'fauziamuhammad@apps.ipb.ac.id',
            to: 'fauziamuhammad@apps.ipb.ac.id',
            replyTo: senderEmail, // Ketika Anda balas, otomatis ke email pengirim
            cc: senderEmail, // Pengirim juga menerima copy
            subject: `Pesan Baru dari Portofolio - ${senderName}`,
            html: `
                <h2>Pesan Baru dari Pengunjung Portofolio</h2>
                <hr>
                <p><strong>Nama:</strong> ${senderName}</p>
                <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
                <hr>
                <h3>Pesan:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Klik "Balas" untuk merespons. Balasan akan otomatis dikirim ke ${senderEmail}</small></p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email berhasil dikirim:', info.response);
        return { success: true, message: 'Email terkirim' };
    } catch (error) {
        console.error('Error mengirim email:', error);
        return { success: false, message: error.message };
    }
}

// Export untuk digunakan di route/API
module.exports = { sendContactEmail };
