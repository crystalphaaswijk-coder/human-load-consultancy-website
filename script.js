const content = document.querySelector(".smooth-content");

let target = 0;
let current = 0;
let ease = 0.08;

function smoothScroll(){

target = window.scrollY;

current += (target - current) * ease;

content.style.transform =
`translateY(${-current}px)`;

requestAnimationFrame(smoothScroll);
}

smoothScroll();

const heroBack = document.querySelector(".hero-back");
const heroMid = document.querySelector(".hero-mid img");
const heroFront = document.querySelector(".hero-front");

window.addEventListener("scroll", () => {

let scroll = window.scrollY;

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

});

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
