// Đợi DOM load xong
document.addEventListener("DOMContentLoaded", function () {
  // Tạo nút toggle menu
  const menuToggle = document.createElement("button");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "☰";
  menuToggle.setAttribute("aria-label", "Mở menu");
  document.body.appendChild(menuToggle);

  // Tạo overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Lấy sidebar
  const leftSide = document.querySelector(".left-side");

  // Hàm mở menu
  function openMenu() {
    leftSide.classList.add("active");
    overlay.classList.add("active");
    menuToggle.innerHTML = "✕";
    menuToggle.setAttribute("aria-label", "Đóng menu");
    document.body.style.overflow = "hidden"; // Ngăn scroll khi menu mở
  }

  // Hàm đóng menu
  function closeMenu() {
    leftSide.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.innerHTML = "☰";
    menuToggle.setAttribute("aria-label", "Mở menu");
    document.body.style.overflow = ""; // Cho phép scroll lại
  }

  // Xử lý click nút toggle
  menuToggle.addEventListener("click", function () {
    if (leftSide.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Đóng menu khi click overlay
  overlay.addEventListener("click", closeMenu);

  // Đóng menu khi click vào link trong menu
  const menuLinks = document.querySelectorAll(".left-side-middle-item a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Chỉ đóng menu trên mobile/tablet
      if (window.innerWidth <= 1023) {
        closeMenu();
      }
    });
  });

  // Đóng menu khi nhấn ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && leftSide.classList.contains("active")) {
      closeMenu();
    }
  });

  // Đóng menu khi resize lên desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1023 && leftSide.classList.contains("active")) {
      closeMenu();
    }
  });

  // Smooth scroll cho các link anchor
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 20; // Khoảng cách từ top
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Highlight active section khi scroll
  const sections = document.querySelectorAll(".right-side > div[id]");
  const navLinks = document.querySelectorAll(".left-side-middle-item");

  function highlightActiveSection() {
    let current = "";
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((item) => {
      const link = item.querySelector("a");
      const href = link.getAttribute("href").substring(1);

      if (href === current) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Thêm CSS cho active state
  const style = document.createElement("style");
  style.textContent = `
    .left-side-middle-item.active {
      background-color: rgba(245, 252, 253, 0.2);
      border-left: 4px solid var(--accent-blue);
    }
    
    .left-side-middle-item.active a {
      color: var(--accent-blue);
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  // Lắng nghe sự kiện scroll
  window.addEventListener("scroll", highlightActiveSection);

  // Gọi lần đầu khi load trang
  highlightActiveSection();
});
