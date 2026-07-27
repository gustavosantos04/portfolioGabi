function initializePortfolio() {
    if (document.documentElement.dataset.portfolioInitialized === "true") return;
    document.documentElement.dataset.portfolioInitialized = "true";

    const header = document.querySelector(".site-header");
    const menu = document.getElementById("menu");
    const menuToggle = document.querySelector(".menu-toggle");
    const modal = document.getElementById("certificate-modal");
    const modalTitle = document.getElementById("modal-title");
    const certificateFrame = document.getElementById("certificate-frame");
    const previewButtons = document.querySelectorAll("[data-pdf]");
    const closeModalButtons = document.querySelectorAll("[data-close-modal]");
    const year = document.getElementById("year");
    let lastFocusedElement = null;

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const updateHeader = () => {
        header?.classList.toggle("scrolled", window.scrollY > 24);
    };

    const closeMenu = () => {
        if (!menu || !menuToggle) return;
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector(".sr-only").textContent = "Abrir menu";
        document.body.classList.remove("menu-open");
    };

    const toggleMenu = () => {
        if (!menu || !menuToggle) return;
        const open = !menu.classList.contains("is-open");
        menu.classList.toggle("is-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
        document.body.classList.toggle("menu-open", open);
    };

    const openModal = (pdfPath, title, trigger) => {
        if (!modal || !certificateFrame || !modalTitle) return;
        lastFocusedElement = trigger;
        certificateFrame.src = pdfPath;
        modalTitle.textContent = title;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modal.querySelector(".modal-close")?.focus();
    };

    const closeModal = () => {
        if (!modal || !certificateFrame) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        certificateFrame.src = "";
        document.body.classList.remove("modal-open");
        lastFocusedElement?.focus();
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    menuToggle?.addEventListener("click", toggleMenu);

    menu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    previewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openModal(button.dataset.pdf, button.dataset.title || "Certificado", button);
        });
    });

    closeModalButtons.forEach((button) => button.addEventListener("click", closeModal));

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (modal?.classList.contains("is-open")) {
            closeModal();
        } else {
            closeMenu();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePortfolio, { once: true });
} else {
    initializePortfolio();
}
