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

// Hero parallax (OLD premium)
(() => {
  const heroWrap = document.querySelector(".hero-wrap");
  const heroBg = document.querySelector(".hero-bg");
  if (!heroWrap || !heroBg) return;

  let ticking = false;

  function parallaxHero() {
    const y = window.scrollY || window.pageYOffset;
    const h = heroWrap.offsetHeight || 1;

    const p = Math.min(Math.max(y / h, 0), 1);
    const offset = p * 220;

    heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(parallaxHero);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("load", parallaxHero);
})();

// Reveal on scroll
(() => {
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if (!reveals.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-inview");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((el) => io.observe(el));
})();

// Parallax for "Not a quick fix" section only
(() => {
  const els = Array.from(
    document.querySelectorAll(".services-intro [data-parallax]")
  );
  if (!els.length) return;

  let ticking = false;

  function run() {
    const vh = window.innerHeight || 800;

    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const rect = el.getBoundingClientRect();

      if (rect.bottom < -200 || rect.top > vh + 200) return;

      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const py = -centerOffset * speed;

      el.style.setProperty("--py", `${py}px`);
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(run);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("load", run);
  window.addEventListener("resize", run);
})();
