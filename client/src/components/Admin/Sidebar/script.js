// script.js
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggle-btn");
  const closeBtn = document.getElementById("close-btn");
  const mainContent = document.getElementById("main-content");

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.add("sidebar-open");
    mainContent.classList.add("main-content-expanded");
  });

  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("sidebar-open");
    mainContent.classList.remove("main-content-expanded");
  });
});
