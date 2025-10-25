document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mainMenu = document.getElementById("mainmenu");
  
    if (menuBtn && mainMenu) {
      menuBtn.addEventListener("click", () => {
        mainMenu.classList.toggle("active");
  
        // Menü açıldığında ikon değişsin (hamburger ↔ çarpı)
        const icon = menuBtn.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      });
    }
  });