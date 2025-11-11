exports.handler = async (event) => {
    try {
      console.log("FUNCTION CALISTI ✅");
  
      if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
      }
  
      const body = JSON.parse(event.body);
      const { name, email, phone, message } = body;
  
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error("❌ BREVO_API_KEY bulunamadı");
        return { statusCode: 500, body: "BREVO_API_KEY bulunamadı" };
      }
  
      const payload = {
        sender: { name: "EF Sanal Ofis", email: "info@efsanalofis.com" },
        to: [{ email: "info@efsanalofis.com" }],
        replyTo: { email },
        subject: `Yeni İletişim Formu Mesajı - ${name}`,
        htmlContent: `
          <h2>Yeni Mesaj</h2>
          <p><b>Ad Soyad:</b> ${name}</p>
          <p><b>E-posta:</b> ${email}</p>
          <p><b>Telefon:</b> ${phone}</p>
          <p><b>Mesaj:</b> ${message}</p>
        `,
      };
  
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      console.log("BREVO RESPONSE ✅", result);
  
      return response.ok
        ? { statusCode: 200, body: "Mail gönderildi" }
        : { statusCode: 400, body: JSON.stringify(result) };
  
    } catch (err) {
      console.error("SendMail Error ❌", err);
      return { statusCode: 500, body: JSON.stringify({ error: err.toString() }) };
    }
  };