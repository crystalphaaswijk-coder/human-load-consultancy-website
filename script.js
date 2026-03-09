/* -------------------------------
SMOOTH INERTIA SCROLL
--------------------------------*/

const wrapper = document.querySelector(".smooth-wrapper");
const content = document.querySelector(".smooth-content");

let target = 0;
let current = 0;
let ease = 0.08;

function setBodyHeight(){
document.body.style.height =
content.getBoundingClientRect().height + "px";
}

function smoothScroll(){

target = window.scrollY;

current += (target - current) * ease;

content.style.transform =
`translateY(${-current}px)`;

requestAnimationFrame(smoothScroll);

}

setBodyHeight();
window.addEventListener("resize", setBodyHeight);

smoothScroll();


/* -------------------------------
HERO PARALLAX
--------------------------------*/

const heroBack = document.querySelector(".hero-back");
const heroMid = document.querySelector(".hero-mid img");
const heroFront = document.querySelector(".hero-front");

function heroParallax(){

let scroll = current;

if(heroBack){
heroBack.style.transform =
`translateY(${scroll * 0.2}px)`;
}

if(heroMid){
heroMid.style.transform =
`translateY(${scroll * 0.35}px) scale(1.1)`;
}

if(heroFront){
heroFront.style.transform =
`translateY(${scroll * 0.1}px)`;
}

requestAnimationFrame(heroParallax);

}

heroParallax();


/* -------------------------------
SCROLL REVEAL
--------------------------------*/

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("in-view");
}
});
},{
threshold:0.2
});

reveals.forEach(el=>{
observer.observe(el);
});


/* -------------------------------
NAVBAR SCROLL EFFECT
--------------------------------*/

const topbar = document.getElementById("topbar");

window.addEventListener("scroll",()=>{

if(window.scrollY > 60){
topbar.classList.add("scrolled");
}else{
topbar.classList.remove("scrolled");
}

});


/* -------------------------------
MAGNETIC BUTTONS
--------------------------------*/

const magnets = document.querySelectorAll(".magnetic");

magnets.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect = btn.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const moveX = (x - rect.width/2) * 0.25;
const moveY = (y - rect.height/2) * 0.25;

btn.style.transform =
`translate(${moveX}px, ${moveY}px)`;

});

btn.addEventListener("mouseleave",()=>{
btn.style.transform = "translate(0,0)";
});

});


/* -------------------------------
CURSOR GLOW
--------------------------------*/

const glow = document.querySelector(".cursor-glow");

if(glow){

window.addEventListener("mousemove",(e)=>{

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

});

}
