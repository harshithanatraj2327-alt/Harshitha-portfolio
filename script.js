document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    }


    /* =========================
       CLOSE MOBILE MENU
    ========================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("show");
            }

            const icon = menuBtn?.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .achievement-card, .certificate-card, .education-card, .publication-container"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================
       CERTIFICATE IMAGE PREVIEW
    ========================= */

    const certificateImages =
        document.querySelectorAll(".certificate-image img");

    certificateImages.forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {

            const overlay = document.createElement("div");

            overlay.className = "image-lightbox";

            overlay.innerHTML = `
                <button class="lightbox-close" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <img src="${image.src}" alt="${image.alt}">
            `;

            document.body.appendChild(overlay);

            document.body.style.overflow = "hidden";

            const closeButton =
                overlay.querySelector(".lightbox-close");

            function closeLightbox() {

                overlay.remove();

                document.body.style.overflow = "";

            }

            closeButton.addEventListener(
                "click",
                closeLightbox
            );

            overlay.addEventListener("click", event => {

                if (event.target === overlay) {
                    closeLightbox();
                }

            });

            document.addEventListener(
                "keydown",
                function escapeHandler(event) {

                    if (event.key === "Escape") {

                        closeLightbox();

                        document.removeEventListener(
                            "keydown",
                            escapeHandler
                        );

                    }

                }
            );

        });

    });


    /* =========================
       SMOOTH BUTTON HOVER
    ========================= */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-3px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });


});
