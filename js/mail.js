document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact_form");
    const successEl = document.getElementById("mail_success");
    const failEl = document.getElementById("mail_fail");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      };
  
      try {
        const res = await fetch("/.netlify/functions/sendMail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (!res.ok) throw new Error("Mail gönderilemedi");
  
        successEl.style.display = "block";
        failEl.style.display = "none";
        form.reset();
      } catch (err) {
        console.error(err);
        failEl.style.display = "block";
        successEl.style.display = "none";
      }
    });
  });