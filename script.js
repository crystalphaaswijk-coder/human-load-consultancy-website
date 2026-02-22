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

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
let ticking = false;

const heroWrap = document.querySelector(".hero-wrap");
const heroBg = document.querySelector(".hero-bg");
let ticking = false;

function parallaxHero(){
  if(!heroWrap || !heroBg) return;

  const y = window.scrollY || window.pageYOffset;
  const h = heroWrap.offsetHeight;

  // 0..1 binnen de hero-wrap
  const p = Math.min(Math.max(y / h, 0), 1);

  // sterker effect (pas gerust aan)
  const offset = p * 180;

  heroBg.style.transform = `translateY(${offset}px)`;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if(!ticking){
    requestAnimationFrame(parallaxHero);
    ticking = true;
  }
}, { passive:true });

window.addEventListener("load", parallaxHero);
