const heroMid = document.querySelector(".hero-mid img");
const heroBack = document.querySelector(".hero-back");
const heroFront = document.querySelector(".hero-front");
const topbar = document.getElementById("topbar");
const reveals = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");

/* sections that should get layered movement */
const parallaxItems = [
  { el: document.querySelector(".editorial-grid"), speed: 0.035 },
  { el: document.querySelector(".feature-card"), speed: 0.028 },
  { el: document.querySelector(".feature-quote"), speed: 0.02 },
  { el: document.querySelector(".method-shell"), speed: 0.024 },
  { el: document.querySelector(".services-section .section-head"), speed: 0.018 },
  { el: document.querySelectorAll(".service-card"), speed: 0.02, step: 0.008 },
  { el: document.querySelector(".approach-section .section-head"), speed: 0.018 },
  { el: document.querySelectorAll(".approach-card"), speed: 0.022, step: 0.009 },
  { el: document.querySelector(".trajectory-shell"), speed: 0.024 },
  { el: document.querySelectorAll(".trajectory-step"), speed: 0.02, step: 0.007 },
  { el: document.querySelectorAll(".faq-item"), speed: 0.014, step: 0.004 },
  { el: document.querySelector(".cta-shell"), speed: 0.018 }
];

function applyParallax(el, amount) {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const viewportCenter = window.innerHeight * 0.5;
  const elementCenter = rect.top + rect.height * 0.5;
  const distance = elementCenter - viewportCenter;

  el.style.transform = `translate3d(0, ${distance * amount * -1}px, 0)`;
}

function handleScroll() {
  const scroll = window.scrollY;

  if (heroBack) {
    heroBack.style.transform = `translate3d(0, ${scroll * 0.10}px, 0)`;
  }

  if (heroMid) {
    heroMid.style.transform = `translate3d(0, ${scroll * 0.30}px, 0) scale(1.08)`;
  }

  if (heroFront) {
    heroFront.style.transform = `translate3d(0, ${scroll * 0.05}px, 0)`;
  }

  parallaxItems.forEach((item) => {
    if (!item.el) return;

    if (NodeList.prototype.isPrototypeOf(item.el)) {
      item.el.forEach((node, index) => {
        const speed = item.speed + ((item.step || 0) * index);
        applyParallax(node, speed);
      });
    } else {
      applyParallax(item.el, item.speed);
    }
  });

  if (topbar) {
    if (scroll > 40) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);
window.addEventListener("load", handleScroll);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

reveals.forEach((el) => observer.observe(el));

if (glow) {
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}
