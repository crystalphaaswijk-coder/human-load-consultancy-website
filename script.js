const heroMid = document.querySelector(".hero-mid img");
const heroBack = document.querySelector(".hero-back");
const heroFront = document.querySelector(".hero-front");
const topbar = document.getElementById("topbar");
const reveals = document.querySelectorAll(".reveal");
const glow = document.querySelector(".cursor-glow");

const layeredItems = [
  [document.querySelector(".editorial-grid"), 0.028],
  [document.querySelector(".feature-card"), 0.022],
  [document.querySelector(".feature-quote"), 0.016],
  [document.querySelector(".method-shell"), 0.02],
  [document.querySelector(".services-section .section-head"), 0.014],
  ...Array.from(document.querySelectorAll(".service-card")).map((el, i) => [el, 0.012 + i * 0.004]),
  [document.querySelector(".approach-section .section-head"), 0.014],
  ...Array.from(document.querySelectorAll(".approach-card")).map((el, i) => [el, 0.014 + i * 0.004]),
  [document.querySelector(".trajectory-shell"), 0.02],
  ...Array.from(document.querySelectorAll(".trajectory-step")).map((el, i) => [el, 0.012 + i * 0.003]),
  ...Array.from(document.querySelectorAll(".faq-item")).map((el, i) => [el, 0.008 + i * 0.002]),
  [document.querySelector(".cta-shell"), 0.014]
];

function updateParallax() {
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

  layeredItems.forEach(([el, speed]) => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const offset = (elementCenter - viewportCenter) * speed * -1;

    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  if (topbar) {
    topbar.classList.toggle("scrolled", scroll > 40);
  }
}

window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax);
window.addEventListener("load", updateParallax);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((el) => observer.observe(el));

if (glow) {
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

const steps = document.querySelectorAll(".support-step");
const number = document.getElementById("supportNumber");
const progress = document.getElementById("supportProgress");
const section = document.querySelector(".support-section");

function updateSupportScroll(){

  const supportNumber = document.querySelector(".support-number");

if(supportNumber){

const rect = section.getBoundingClientRect();
let offset = rect.top * -0.08;

offset = Math.max(Math.min(offset, 40), -40);

supportNumber.style.transform = `translateY(${offset}px)`;

}
  
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
const scroll = window.scrollY;
const viewport = window.innerHeight;

const progressValue = Math.min(
Math.max((scroll - sectionTop + viewport*0.5) / sectionHeight,0),
1
);

progress.style.height = progressValue * 100 + "%";

steps.forEach((step,index)=>{

const rect = step.getBoundingClientRect();
const trigger = window.innerHeight * 0.55;

if(rect.top < trigger && rect.bottom > trigger){

steps.forEach(s=>s.classList.remove("active"));
step.classList.add("active");

let newNumber = "0" + (index + 1);

if(number.textContent !== newNumber){

number.style.opacity = 0;

setTimeout(()=>{

number.textContent = newNumber;
number.style.opacity = .85;

},200);

}

}

});

}

window.addEventListener("scroll",updateSupportScroll);
window.addEventListener("load",updateSupportScroll);

/* trajectory progress line */

const trajectory = document.querySelector("#trajectory");
const progress = document.querySelector("#trajectoryProgress");

window.addEventListener("scroll", () => {

if(!trajectory) return;

const rect = trajectory.getBoundingClientRect();
const height = trajectory.offsetHeight;

const scrolled = Math.min(
Math.max((window.innerHeight - rect.top) / height, 0),
1
);

progress.style.height = scrolled * 100 + "%";

});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 80){
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

  const windowHeight = window.innerHeight;

  reveals.forEach(el => {

    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("visible");
    }

  });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
