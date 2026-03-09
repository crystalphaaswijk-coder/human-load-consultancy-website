/* SMOOTH SCROLL */

const wrapper = document.querySelector("#smooth-wrapper");
const content = document.querySelector("#smooth-content");

let current = 0;
let target = 0;
let ease = 0.08;

function setHeight(){
document.body.style.height = content.scrollHeight + "px";
}

function smoothScroll(){

target = window.scrollY;

current += (target - current) * ease;

content.style.transform = `translateY(${-current}px)`;

requestAnimationFrame(smoothScroll);

}

setHeight();
window.addEventListener("resize", setHeight);
smoothScroll();



/* HERO PARALLAX */

const heroMid = document.querySelector(".hero-mid img");

function heroParallax(){

let scroll = current;

heroMid.style.transform =
`translateY(${scroll * .35}px) scale(1.1)`;

requestAnimationFrame(heroParallax);

}

heroParallax();



/* REVEAL */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

});

reveals.forEach(el=>observer.observe(el));



/* CURSOR */

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove",(e)=>{

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

});
