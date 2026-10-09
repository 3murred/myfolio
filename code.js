document.addEventListener("DOMContentLoaded", () => {
  // menu mobile

  const menuButton = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    const menuLinks = mobileMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }

  const backgroundAudio = document.getElementById("background-audio");

  if (backgroundAudio) {
    backgroundAudio.volume = 0.25;

    const startAudio = () => {
      backgroundAudio.play().catch((error) => {
        console.warn("play do audio foi bloqueado:", error);
      });

      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
    };

    document.addEventListener("click", startAudio, { once: true });
    document.addEventListener("keydown", startAudio, { once: true });
  }
});
