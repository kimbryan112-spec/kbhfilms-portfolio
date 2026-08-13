/*=========================================================
KBHFILMS V2
=========================================================*/

"use strict";

/*=========================================================
SELECTORS
=========================================================*/

const body = document.body;

const navbar = document.querySelector(".navbar");

const menuBtn = document.querySelector(".menu-toggle");

const mobileMenu = document.querySelector(".mobile-menu");

const hero = document.querySelector(".hero");

const heroVideo = document.querySelector(".hero-video");

const featuredVideo = document.querySelector(".featured-video");

const serviceVideos = document.querySelectorAll(".service-video");

const adsVideos = document.querySelectorAll(".ads-video");

const revealElements = document.querySelectorAll(".section");

const preloader = document.querySelector(".preloader");

const cursor = document.querySelector(".cursor");

const cursorDot = document.querySelector(".cursor-dot");

/*=========================================================
PRELOADER
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

        body.classList.remove("loading");

    }, 1200);

});

/*=========================================================
NAVBAR
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

/*=========================================================
MOBILE MENU
=========================================================*/

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");

    mobileMenu.classList.toggle("active");

});

mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*=========================================================
CUSTOM CURSOR
=========================================================*/

window.addEventListener("mousemove", e => {

    cursor.style.transform =

        `translate(${e.clientX}px,${e.clientY}px)`;

    cursorDot.style.transform =

        `translate(${e.clientX}px,${e.clientY}px)`;

});

/*=========================================================
BUTTON HOVER
=========================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        cursor.classList.add("active");

    });

    btn.addEventListener("mouseleave",()=>{

        cursor.classList.remove("active");

    });

});

/*=========================================================
SCROLL REVEAL
=========================================================*/

const revealObserver = new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealElements.forEach(section=>{

revealObserver.observe(section);

});

/*=========================================================
SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

target.scrollIntoView({

behavior:"smooth"

});

});

});/*=========================================================
SMART VIDEO SYSTEM
=========================================================*/

const videos = document.querySelectorAll("video");

function pauseAllVideos() {

    videos.forEach(video => {

        video.pause();

        video.muted = true;

    });

}

const videoObserver = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

const video = entry.target;

if (entry.isIntersecting) {

const promise = video.play();

if (promise !== undefined) {

promise.catch(() => {});

}

} else {

video.pause();

}

});

},

{

threshold:0.55

}

);

videos.forEach(video=>{

videoObserver.observe(video);

});

/*=========================================================
HERO VIDEO AUDIO
=========================================================*/

const heroObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

heroVideo.muted=true;

}else{

heroVideo.pause();

}

});

},

{

threshold:.35

}

);

heroObserver.observe(hero);

/*=========================================================
SERVICE VIDEO AUDIO
=========================================================*/

const portfolioVideos=document.querySelectorAll(

".featured-video,.service-video,.ads-video"

);

const audioObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

const video=entry.target;

if(entry.isIntersecting){

portfolioVideos.forEach(v=>{

if(v!==video){

v.muted=true;

}

});

video.muted=false;

video.play().catch(()=>{});

}else{

video.pause();

video.muted=true;

}

});

},

{

threshold:.75

}

);

portfolioVideos.forEach(video=>{

audioObserver.observe(video);

});

/*=========================================================
REPLAY
=========================================================*/

videos.forEach(video=>{

video.addEventListener("ended",()=>{

video.currentTime=0;

video.play();

});

});

/*=========================================================
REDUCE CPU
=========================================================*/

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

videos.forEach(video=>{

video.pause();

});

}else{

videos.forEach(video=>{

const rect=video.getBoundingClientRect();

if(

rect.top<window.innerHeight&&

rect.bottom>0

){

video.play().catch(()=>{});

}

});

}

});

/*=========================================================
LAZY PLAY
=========================================================*/

videos.forEach(video=>{

video.preload="metadata";

});

/*=========================================================
PARALLAX HERO
=========================================================*/

window.addEventListener(

"scroll",

()=>{

const y=window.scrollY;

heroVideo.style.transform=

`scale(1.08) translateY(${y*.12}px)`;

});

/*=========================================================
BUTTON RIPPLE
=========================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",e=>{

const ripple=document.createElement("span");

ripple.className="ripple";

const rect=btn.getBoundingClientRect();

ripple.style.left=

`${e.clientX-rect.left}px`;

ripple.style.top=

`${e.clientY-rect.top}px`;

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});

/*=========================================================
SCROLL INDICATOR
=========================================================*/

window.addEventListener(

"scroll",

()=>{

const indicator=document.querySelector(

".scroll-indicator"

);

if(window.scrollY>150){

indicator.style.opacity="0";

}else{

indicator.style.opacity="1";

}

});

/*=========================================================
PERFORMANCE
=========================================================*/

window.addEventListener(

"resize",

()=>{

requestAnimationFrame(()=>{

});

});