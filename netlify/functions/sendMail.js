// netlify/functions/sendMail.js

exports.handler = async (event) => {
    try {
      if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
      }
  
      const body = JSON.parse(event.body);
  
      const { name, email, phone, message } = body;
  
      // ✅ Brevo API endpoint
      const apiUrl = "https://api.brevo.com/v3/smtp/email";
  
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "BREVO_API_KEY bulunamadı" }),
        };
      }
  
      const payload = {
        sender: { name: "EF Sanal Ofis", email: "info@efsanalofis.com" },
        to: [{ email: "info@efsanalofis.com" }], // sana gelecek mail
        replyTo: { email: email },               // form gönderen kişiye reply olacak
        subject: `Yeni İletişim Formu Mesajı - ${name}`,
        htmlContent: `
          <h2>Yeni Mesaj</h2>
          <p><b>Ad Soyad:</b> ${name}</p>
          <p><b>E-posta:</b> ${email}</p>
          <p><b>Telefon:</b> ${phone}</p>
          <p><b>Mesaj:</b> ${message}</p>
        `,
      };
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: "Mail başarıyla gönderildi.",
            brevoId: result.messageId,
          }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: result }),
        };
      }
    } catch (err) {
      console.error("SendMail Error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.toString() }),
      };
    }
  };