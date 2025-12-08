document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("videoShown")) {
      setTimeout(() => {
        document.getElementById("videoPopup").style.display = "flex";
        localStorage.setItem("videoShown", "true");
      }, 1000);
    }
  });
  
  document.getElementById("closePopup").addEventListener("click", () => {
    closeVideoPopup();
  });
  
  document.getElementById("videoPopup").addEventListener("click", (e) => {
    if (e.target.id === "videoPopup") closeVideoPopup();
  });
  
  function closeVideoPopup() {
    const popup = document.getElementById("videoPopup");
    const video = document.getElementById("popupVideo");
  
    popup.style.display = "none";
    video.pause();
  }