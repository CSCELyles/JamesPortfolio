const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("header[id], section[id]");
const progressBar = document.querySelector(".scroll-progress-bar");

/* Highlight the side-navigation item for the current section */
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => navObserver.observe(section));

/* Fade content in each time its section comes into view */
const revealItems = document.querySelectorAll(
  `
    main section > .section-label,
    main section > h2,
    main section > p:not(.section-label),
    .empty-projects,
    .document-card,
    .email-link,
    footer
  `
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--delay", `${(index % 4) * 90}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.18
  }
);

revealItems.forEach((item) => revealObserver.observe(item));


function updateProgressBar() {
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}



window.addEventListener("scroll", updateProgressBar, { passive: true });
window.addEventListener("resize", updateProgressBar);
updateProgressBar();