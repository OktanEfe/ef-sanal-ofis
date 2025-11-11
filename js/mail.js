// js/mail.js

document.getElementById("contact_form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
  
    const response = await fetch("/.netlify/functions/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });
  
    const result = await response.json();
  
    if (result.status === "success") {
      document.getElementById("mail_success").style.display = "block";
      document.getElementById("mail_fail").style.display = "none";
      document.getElementById("contact_form").reset();
    } else {
      document.getElementById("mail_fail").style.display = "block";
      document.getElementById("mail_success").style.display = "none";
    }
  });