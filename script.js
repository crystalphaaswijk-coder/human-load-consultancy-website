const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const heroBg = document.querySelector('.hero-bg');

function parallaxHero() {
  if (!heroBg) return;

  const scrollY = window.scrollY || window.pageYOffset;

  // Subtiele parallax: hoe hoger dit getal, hoe “sterker” het effect
  const offset = scrollY * 0.2;

  heroBg.style.transform = `translateY(${offset}px)`;
}

window.addEventListener('scroll', parallaxHero, { passive: true });
window.addEventListener('load', parallaxHero);
