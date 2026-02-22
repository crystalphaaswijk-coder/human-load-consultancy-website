// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

faders.forEach((el) => appearOnScroll.observe(el));

// Hero parallax (within hero-wrap only)
const heroWrap = document.querySelector(".hero-wrap");
const heroBg = document.querySelector(".hero-bg");

let ticking = false;

function parallaxHero() {
  if (!heroWrap || !heroBg) return;

  const y = window.scrollY || window.pageYOffset;
  const h = heroWrap.offsetHeight;

  // 0..1 within hero-wrap
  const p = Math.min(Math.max(y / h, 0), 1);

  // premium but visible
  const offset = p * 220; // px

  heroBg.style.transform = `translateY(${offset}px)`;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(parallaxHero);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener("load", () => {
  parallaxHero();
});
