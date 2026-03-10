const heroMid = document.querySelector(".hero-mid img");
const heroBack = document.querySelector(".hero-back");
const heroFront = document.querySelector(".hero-front");
const topbar = document.getElementById("topbar");
const reveals = document.querySelectorAll(".reveal");

/* HERO PARALLAX + NAVBAR */
function handleScroll() {
  const scroll = window.scrollY;

  if (heroBack) {
    heroBack.style.transform = `translateY(${scroll * 0.1}px)`;
  }

  if (heroMid) {
    heroMid.style.transform = `translateY(${scroll * 0.35}px) scale(1.1)`;
  }

  if (heroFront) {
    heroFront.style.transform = `translateY(${scroll * 0.05}px)`;
  }

  if (topbar) {
    if (scroll > 60) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

/* REVEAL ANIMATION */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => observer.observe(el));
