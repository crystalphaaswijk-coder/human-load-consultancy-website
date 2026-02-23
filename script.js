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

  const p = Math.min(Math.max(y / h, 0), 1);
  const offset = p * 220; // <-- dit was je “oude” premium setting

  heroBg.style.transform = `translateY(${offset}px)`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(parallaxHero);
    ticking = true;
  }
}, { passive: true });

window.addEventListener("load", parallaxHero);

// Section parallax (text + image)
const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
let sectionTicking = false;

function sectionParallax() {
  const y = window.scrollY || window.pageYOffset;
  const vh = window.innerHeight || 800;

  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-parallax")) || 0.12;

    // element position in viewport
    const rect = el.getBoundingClientRect();

    // only animate when near viewport (performance + avoids weird jumps)
    if (rect.bottom < -200 || rect.top > vh + 200) return;

    // centered progress: 0 when element centered, negative above, positive below
    const centerOffset = rect.top + rect.height / 2 - vh / 2;

    // translate opposite direction for a premium feel
    const translate = -centerOffset * speed;

    el.style.transform = `translate3d(0, ${translate}px, 0)`;
  });

  sectionTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!sectionTicking) {
      requestAnimationFrame(sectionParallax);
      sectionTicking = true;
    }
  },
  { passive: true }
);

window.addEventListener("load", sectionParallax);
window.addEventListener("resize", sectionParallax);

// ===== Parallax for blocks with [data-parallax] =====
(() => {
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!parallaxEls.length) return;

  let ticking = false;

  function updateParallax() {
    const vh = window.innerHeight || 800;

    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.12;
      const rect = el.getBoundingClientRect();

      // alleen rond viewport bewegen
      if (rect.bottom < -200 || rect.top > vh + 200) return;

      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const translate = -centerOffset * speed;

      el.style.transform = `translate3d(0, ${translate}px, 0)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("load", updateParallax);
  window.addEventListener("resize", updateParallax);
})();
