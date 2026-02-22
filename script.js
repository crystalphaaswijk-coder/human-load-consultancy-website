// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Hero parallax (subtiel / Kora-achtig)
const heroBg = document.querySelector(".hero-bg");
let ticking = false;

function parallaxHero() {
  if (!heroBg) return;

  const y = window.scrollY || window.pageYOffset;

  // maak sterker door dit getal te verhogen
  heroBg.style.transform = `translateY(${y * 0.35}px)`;

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(parallaxHero);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener("load", parallaxHero);
