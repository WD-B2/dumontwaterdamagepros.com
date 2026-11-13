(function () {
  "use strict";
  var BP = 768;
  var doc = document.documentElement;
  var burger = document.getElementById("hamburger");
  var drawer = document.getElementById("mobDrawer");
  var overlay = document.getElementById("mobOverlay");
  var closeBtn = document.getElementById("drawerClose");
  var lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    overlay.classList.add("visible");
    burger.setAttribute("aria-expanded", "true");
    doc.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.hidden = true;
    overlay.classList.remove("visible");
    burger.setAttribute("aria-expanded", "false");
    doc.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (burger) burger.addEventListener("click", function () {
    if (drawer.hidden) openDrawer(); else closeDrawer();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && !drawer.hidden) closeDrawer();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BP && drawer && !drawer.hidden) closeDrawer();
  });

  var groupBtns = document.querySelectorAll(".dgroup-btn");
  Array.prototype.forEach.call(groupBtns, function (btn) {
    btn.addEventListener("click", function () {
      var list = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (list) list.classList.toggle("open", !open);
    });
  });

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-answer");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    a.hidden = false;
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
})();
