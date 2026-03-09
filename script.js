const topbar = document.getElementById("topbar");
const heroImage = document.getElementById("heroImage");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

function handleTopbar() {
  if (window.scrollY > 24) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
}

function handleParallax() {
  if (!heroImage) return;
  const offset = Math.min(window.scrollY * 0.18, 80);
  heroImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
}

handleTopbar();
handleParallax();

window.addEventListener("scroll", () => {
  handleTopbar();
  handleParallax();
});

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
  observer.observe(item);
});
