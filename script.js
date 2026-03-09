const heroBack = document.querySelector(".hero-back");
const heroMid = document.querySelector(".hero-mid img");
const heroFront = document.querySelector(".hero-front");

window.addEventListener("scroll", () => {

const scroll = window.scrollY;

if(heroBack){
heroBack.style.transform = `translateY(${scroll * 0.15}px)`;
}

if(heroMid){
heroMid.style.transform = `translateY(${scroll * 0.35}px) scale(1.1)`;
}

if(heroFront){
heroFront.style.transform = `translateY(${scroll * 0.05}px)`;
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

const topbar = document.getElementById("topbar");

window.addEventListener("scroll",()=>{
if(window.scrollY > 60){
topbar.classList.add("scrolled");
}else{
topbar.classList.remove("scrolled");
}
});
