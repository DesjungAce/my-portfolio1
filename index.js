document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // Mobile menu
  // ======================
  const menuButton = document.getElementById("menuButton");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", event => {
      if (
        menu.classList.contains("is-open") &&
        !menu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ======================
  // Project page buttons
  // ======================
  const pageButtons = document.querySelectorAll(".page-button");
  const projectPages = document.querySelectorAll(".project-page");

  pageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetPage = document.getElementById(targetId);

      if (!targetPage) return;

      pageButtons.forEach(pageButton => {
        pageButton.classList.remove("is-active");
      });

      projectPages.forEach(page => {
        page.classList.remove("is-active");
        page.hidden = true;
      });

      button.classList.add("is-active");
      targetPage.classList.add("is-active");
      targetPage.hidden = false;

      const projectsSection = document.getElementById("projects");

      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ======================
  // Image lightbox
  // ======================
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  let lastOpenedImage = null;

  function openLightbox(link) {
    if (!lightbox || !lightboxImage) return;

    const image = link.querySelector("img");

    lastOpenedImage = link;

    lightboxImage.src =
      link.getAttribute("data-full") || link.getAttribute("href");

    lightboxImage.alt = image
      ? image.alt
      : "Expanded project image";

    if (lightboxCaption) {
      lightboxCaption.textContent =
        link.getAttribute("data-caption") || "";
    }

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.hidden = true;
    document.body.style.overflow = "";

    if (lastOpenedImage) {
      lastOpenedImage.focus();
    }
  }

  document.querySelectorAll(".photo-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openLightbox(link);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  // ======================
  // Contact form
  // ======================
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent =
          "Please fill in all fields before sending. 💌";
        formStatus.style.color = "#a33a4e";
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        formStatus.textContent =
          "Please enter a valid email address. 📧";
        formStatus.style.color = "#a33a4e";
        return;
      }

      formStatus.textContent =
        "Thank you! Your message has been noted. 🌸";
      formStatus.style.color = "#4b6b45";
      contactForm.reset();
    });
  }

  // ======================
  // Footer year
  // ======================
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
