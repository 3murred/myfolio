document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  const menuLinks = mobileMenu.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
});
