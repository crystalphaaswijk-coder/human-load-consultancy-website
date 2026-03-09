const midLayer = document.querySelector(".hero-mid img");

window.addEventListener("scroll",()=>{

const scroll = window.scrollY;

midLayer.style.transform =
`translateY(${scroll * 0.45}px) scale(1.15)`;

});
