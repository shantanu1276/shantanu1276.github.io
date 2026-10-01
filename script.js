/* =========================================================
   SHANTANU MONDAL - PERSONAL PORTFOLIO
   Main JavaScript

   This file controls:
   - Mobile navigation
   - Typing animation
   - Dark/light mode
   - Scroll reveal
   - Active navigation section
   - Projects
   - Contact form validation
   - Current year
   - Back-to-top button
========================================================= */


/* =========================================================
   PROJECT DATA
=========================================================

   IMPORTANT:
   This is the ONE clearly marked place where you can edit
   your projects.

   Replace the placeholder projects with your actual projects.

   To add another project:
   1. Copy one object.
   2. Paste it below the previous object.
   3. Change the values.

========================================================= */

const projects = [

    {
        title: "Project One",
        description:
            "Replace this description with a short explanation of your first project, the problem it solves and what you learned from building it.",

        tech: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        github:
            "https://github.com/YOUR_GITHUB_USERNAME/project-one",

        demo:
            "https://YOUR_GITHUB_USERNAME.github.io/project-one/",

        icon: "</>"
    },


    {
        title: "Project Two",
        description:
            "Replace this placeholder with your second project's description. Mention the main functionality and technologies used.",

        tech: [
            "C++",
            "DSA"
        ],

        github:
            "https://github.com/YOUR_GITHUB_USERNAME/project-two",

        demo:
            "#",

        icon: "C++"
    },


    {
        title: "Project Three",
        description:
            "Replace this placeholder with your third project's description. Explain the project's purpose and your contribution.",

        tech: [
            "Python",
            "React",
            "Git"
        ],

        github:
            "https://github.com/YOUR_GITHUB_USERNAME/project-three",

        demo:
            "#",

        icon: "PY"
    }

    /*
        ADD MORE PROJECTS HERE.

        Example:

        {
            title: "My New Project",

            description:
                "Description of my new project.",

            tech: [
                "React",
                "JavaScript",
                "CSS"
            ],

            github:
                "https://github.com/YOUR_GITHUB_USERNAME/my-new-project",

            demo:
                "https://example.com",

            icon: "JS"
        },

    */

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navToggle =
    document.getElementById("nav-toggle");

const navMenu =
    document.getElementById("nav-menu");

const navLinks =
    document.querySelectorAll(".nav-link");

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");

const typingText =
    document.getElementById("typing-text");

const projectsContainer =
    document.getElementById("projects-container");

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

const backToTop =
    document.getElementById("back-to-top");

const currentYear =
    document.getElementById("current-year");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

navToggle.addEventListener("click", () => {

    const isOpen =
        navMenu.classList.toggle("open");

    navToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu after clicking a link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const roles = [
    "CSE Undergraduate",
    "Problem Solver",
    "Web Developer",
    "Software Engineer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {

    const currentRole =
        roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(typeRole, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }

    const speed =
        deleting ? 50 : 90;

    setTimeout(typeRole, speed);
}


/* Start typing effect */

typeRole();


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function updateThemeIcon() {

    const isDark =
        document.body.classList.contains(
            "dark-theme"
        );

    themeIcon.textContent =
        isDark ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-theme"
    );

}

updateThemeIcon();


/* Toggle theme */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-theme"
        );

        const isDark =
            document.body.classList.contains(
                "dark-theme"
            );

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();
    }
);


/* =========================================================
   PROJECT RENDERING
========================================================= */

function renderProjects() {

    projectsContainer.innerHTML =
        projects
            .map((project) => {

                const tags =
                    project.tech
                        .map(
                            (technology) =>
                                `<span>${technology}</span>`
                        )
                        .join("");

                return `

                    <article class="project-card reveal">

                        <div class="project-image">
                            ${project.icon}
                        </div>

                        <div class="project-body">

                            <h3>
                                ${project.title}
                            </h3>

                            <p>
                                ${project.description}
                            </p>

                            <div class="project-tags">
                                ${tags}
                            </div>

                            <div class="project-links">

                                <a
                                    href="${project.github}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View ${project.title} source code"
                                >
                                    GitHub →
                                </a>

                                <a
                                    href="${project.demo}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View ${project.title} live demo"
                                >
                                    Live Demo →
                                </a>

                            </div>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* Render projects */

renderProjects();


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


function observeRevealElements() {

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            revealObserver.observe(
                element
            );

        });

}


observeRevealElements();


/* =========================================================
   ACTIVE NAVIGATION HIGHLIGHT
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId =
                        entry.target.id;

                    navLinks.forEach((link) => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute(
                                "href"
                            ) === `#${sectionId}`
                        );

                    });

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

contactForm.addEventListener(
    "submit",
    (event) => {

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");


        /*
            Client-side validation.

            Formspree handles the actual submission.
        */

        if (
            name.value.trim().length < 2
        ) {

            event.preventDefault();

            showFormStatus(
                "Please enter your name.",
                "error"
            );

            name.focus();

            return;
        }


        if (
            !isValidEmail(email.value)
        ) {

            event.preventDefault();

            showFormStatus(
                "Please enter a valid email address.",
                "error"
            );

            email.focus();

            return;
        }


        if (
            subject.value.trim().length < 3
        ) {

            event.preventDefault();

            showFormStatus(
                "Please enter a subject.",
                "error"
            );

            subject.focus();

            return;
        }


        if (
            message.value.trim().length < 10
        ) {

            event.preventDefault();

            showFormStatus(
                "Message should contain at least 10 characters.",
                "error"
            );

            message.focus();

            return;
        }


        /*
            If all validation passes, the browser
            submits the form to Formspree.
        */

        showFormStatus(
            "Sending your message...",
            "success"
        );

    }
);


/* Email validation */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* Form status */

function showFormStatus(
    message,
    type
) {

    formStatus.textContent =
        message;

    formStatus.style.color =
        type === "error"
            ? "#ef4444"
            : "#22c55e";

}


/* =========================================================
   BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents =
                "auto";

        } else {

            backToTop.style.opacity = "0";
            backToTop.style.pointerEvents =
                "none";

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIAL BACK-TO-TOP STATE
========================================================= */

backToTop.style.opacity = "0";
backToTop.style.pointerEvents = "none";
