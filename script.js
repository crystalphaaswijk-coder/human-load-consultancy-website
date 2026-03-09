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
