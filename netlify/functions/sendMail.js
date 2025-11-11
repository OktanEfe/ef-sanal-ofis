// netlify/functions/sendEmail.js
import nodemailer from "nodemailer";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);
  const { name, email, phone, message } = data;

  // ✅ SMTP transporter (Brevo / Sendinblue)
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "info@efsanalofis.com",        // Brevo'da doğruladığın e-posta
      pass: process.env.BREVO_SMTP_KEY,    // Netlify Environment içine koyduğun Key
    },
  });

  const mailOptions = {
    from: "EF Sanal Ofis <info@efsanalofis.com>",
    to: "info@efsanalofis.com", // Formdan gelen mail nereye düşecek
    subject: "📩 Yeni İletişim Formu Mesajı",
    html: `
      <h2>Yeni Mesaj</h2>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Mesaj:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        message: "Email gönderildi ✅",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: error.message,
      }),
    };
  }
}