const header = document.getElementById("header");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

window.addEventListener(
    "scroll",
    () => header?.classList.toggle("scrolled", window.scrollY > 24),
    { passive: true }
);

if (menu && nav) {
    menu.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");

        nav.classList.toggle("open", isOpen);
        menu.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            nav.classList.remove("open");
            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Open menu");
        });
    });
}

const projects = {
    p1: {
        title: "Moestopo TV",
        category: "PODCAST · CAMERA · HOST · 2025",
        description:
            "An audiovisual production experience with Moestopo TV, from operating the camera to presenting and telling stories on camera.",
        image: "assets/projects/organisasi.png",
    },
    p2: {
        title: "Short Film",
        category: "DIRECTING · CAMERA · EDITING · 2025",
        description:
            "A narrative short film developed from concept and script through production and final edit.",
        image: "assets/projects/short-film.png",
    },
    p3: {
        title: "TV Production",
        category: "PRODUCTION · SCRIPT · DOCUMENTARY · 2025—26",
        description:
            "Contributed to television production through visual research, script preparation, production support, and documentation.",
        image: "assets/projects/tv.png",
    },
    p4: {
        title: "Visual Notes",
        category: "PHOTO · VIDEO · EXPERIMENTS · ONGOING",
        description:
            "Personal visual stories from the outdoors, photography, video experiments, and ongoing visual studies.",
        image: "assets/projects/vlog.jpeg",
    },
};

const modal = document.getElementById("projectModal");
const image = document.getElementById("carouselImage");
const title = document.getElementById("modalTitle");
const category = document.getElementById("modalCategory");
const description = document.getElementById("modalDescription");
let activeProject = "p1";

function showProject(key) {
    const project = projects[key];

    if (!project) {
        return;
    }

    activeProject = key;
    image.src = project.image;
    image.alt = project.title;
    title.textContent = project.title;
    category.textContent = project.category;
    description.textContent = project.description;

    const projectNumber = Object.keys(projects).indexOf(key) + 1;
    document.getElementById("carouselCurrent").textContent = String(
        projectNumber
    ).padStart(2, "0");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
}

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function stepProject(direction) {
    const keys = Object.keys(projects);
    const currentIndex = keys.indexOf(activeProject);
    const nextIndex = (currentIndex + direction + keys.length) % keys.length;

    showProject(keys[nextIndex]);
}

document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => {
        showProject(button.dataset.project);
    });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document
    .querySelector(".modal-backdrop")
    .addEventListener("click", closeModal);
document
    .getElementById("carouselPrev")
    .addEventListener("click", () => stepProject(-1));
document
    .getElementById("carouselNext")
    .addEventListener("click", () => stepProject(1));

document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    }

    if (event.key === "ArrowRight") {
        stepProject(1);
    }

    if (event.key === "ArrowLeft") {
        stepProject(-1);
    }
});

document.getElementById("top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Gentle, staggered section reveals
const revealGroups = [
    [".hero-copy", "left"],
    [".hero-visual", "right"],
    [".scroll-cue", "up"],
    [".work-section .section-heading > div", "left"],
    [".work-section .section-intro", "right"],
    [".project-card", "up"],
    [".about-main", "left"],
    [".portrait-card", "right"],
    [".craft-section .section-heading > div", "left"],
    [".craft-section .section-intro", "right"],
    [".craft-grid article", "up"],
    [".journey-section .section-heading > div", "left"],
    [".journey-section .section-intro", "right"],
    [".journey-list > article", "left"],
    [".education-block", "up"],
    [".cv-download", "left"],
    [".work-more", "right"],
    [".contact-inner > *", "up"],
];

const revealElements = [];
revealGroups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add("reveal", `reveal-${direction}`);
        element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
        revealElements.push(element);
    });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}
