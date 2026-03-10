const heroMid = document.querySelector(".hero-mid img");
const heroBack = document.querySelector(".hero-back");
const heroFront = document.querySelector(".hero-front");
const topbar = document.getElementById("topbar");
const reveals = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");

function handleScroll() {
  const scroll = window.scrollY;

  if (heroBack) {
    heroBack.style.transform = `translateY(${scroll * 0.08}px)`;
  }

  if (heroMid) {
    heroMid.style.transform = `translateY(${scroll * 0.30}px) scale(1.08)`;
  }

  if (heroFront) {
    heroFront.style.transform = `translateY(${scroll * 0.04}px)`;
  }

  if (topbar) {
    if (scroll > 40) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", handleScroll);
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
