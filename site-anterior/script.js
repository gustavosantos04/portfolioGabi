document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".navbar a");
    const navMenu = document.getElementById("nav-links");
    const navToggle = document.getElementById("nav-toggle");
    const modal = document.getElementById("certificado-modal");
    const modalTitle = document.getElementById("certificado-modal-title");
    const modalFrame = document.getElementById("certificado-frame");
    const closeButton = document.getElementById("certificado-modal-close");
    const overlay = modal ? modal.querySelector("[data-close-modal]") : null;
    const previewButtons = document.querySelectorAll(".btn-visualizar");

    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add("visible");
            }
        });
    }

    function closeMobileMenu() {
        if (!navMenu || !navToggle) {
            return;
        }

        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu de navegação");
    }

    function toggleMobileMenu() {
        if (!navMenu || !navToggle) {
            return;
        }

        const willOpen = !navMenu.classList.contains("is-open");
        navMenu.classList.toggle("is-open", willOpen);
        navToggle.classList.toggle("is-open", willOpen);
        navToggle.setAttribute("aria-expanded", String(willOpen));
        navToggle.setAttribute("aria-label", willOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    }

    function openCertificateModal(pdfPath, title) {
        if (!modal || !modalFrame || !modalTitle) {
            return;
        }

        modalFrame.src = pdfPath;
        modalTitle.textContent = title;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeCertificateModal() {
        if (!modal || !modalFrame) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        modalFrame.src = "";
        document.body.classList.remove("modal-open");
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            event.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                closeMobileMenu();
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    if (navToggle) {
        navToggle.addEventListener("click", toggleMobileMenu);
    }

    previewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const pdfPath = this.dataset.pdf;
            const title = this.dataset.title || "Visualizar certificado";

            if (!pdfPath) {
                return;
            }

            openCertificateModal(pdfPath, title);
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeCertificateModal);
    }

    if (overlay) {
        overlay.addEventListener("click", closeCertificateModal);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navMenu && navMenu.classList.contains("is-open")) {
            closeMobileMenu();
        }

        if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
            closeCertificateModal();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

if (document.getElementById("particles-js") && typeof particlesJS === "function") {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#B8860B" },
            shape: {
                type: ["circle", "polygon", "star"],
                stroke: { width: 1, color: "#FFD700" },
                polygon: { nb_sides: 5 }
            },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2 }
        }
    });
}
