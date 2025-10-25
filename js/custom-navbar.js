document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mainMenu = document.getElementById("mainmenu");
    const sideArea = document.querySelector(".menu_side_area");
  
    if (menuBtn && mainMenu && sideArea) {
      menuBtn.addEventListener("click", function () {
        // Menü aç/kapa
        mainMenu.classList.toggle("menu-open");
        sideArea.classList.toggle("menu-open");
  
        // Hamburger ikonunu çevir (isteğe bağlı)
        menuBtn.classList.toggle("active");
      });
    }
  });