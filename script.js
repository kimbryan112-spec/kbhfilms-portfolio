/*=========================================================
KBHFILMS V2
=========================================================*/

"use strict";

/*=========================================================
MEDIA CONFIGURATION (Cloudflare R2)
=========================================================*/

const MEDIA_CONFIG = {

    /* Public origin or custom domain only. Never include the bucket name. */
    MEDIA_BASE: "https://YOUR-R2-PUBLIC-DOMAIN",

    hero: "hero/hero.mp4",

    featured: "featured/showreel.mp4",

    services: {

        commercial: "services/commercial.mp4",

        ugc: "services/ugc.mp4",

        podcast: "services/podcast.mp4",

        wedding: "services/wedding.mp4"

    },

    ads: [

        "ads/ads01.mp4",

        "ads/ads02.mp4",

        "ads/ads03.mp4",

        "ads/ads04.mp4",

        "ads/ads05.mp4",

        "ads/ads06.mp4",

        "ads/ads07.mp4",

        "ads/ads08.mp4",

        "ads/ads09.mp4",

        "ads/ads10.mp4"

    ],

    images: {

        logo: "images/logo.png",

        portrait: "images/portrait.webp",

        favicon: "images/favicon.png",

        appleTouchIcon: "images/apple-touch-icon.png",

        ogImage: "images/og-image.jpg"

    },

    backgrounds: {

        about: "backgrounds/about-bg.webp",

        manifesto: "backgrounds/manifesto-bg.webp",

        heroPoster: "backgrounds/hero-poster.webp"

    }

};

/*=========================================================
SITE CONFIGURATION
=========================================================*/

const SITE_CONFIG = {

    site: {

        companyName: "KBHFILMS",

        tagline: "Stories That Move People.",

        author: "KBHFILMS",

        copyright: "© 2025 KBHFILMS. All Rights Reserved."

    },

    contact: {

        email: "",

        phone: ""

    },

    social: {

        instagram: "",

        facebook: "",

        youtube: ""

    },

    seo: {

        title: "KBHFILMS | Cinematic Filmmaker Portfolio",

        description: "Premium filmmaker portfolio showcasing cinematic commercials, weddings, podcasts and UGC content by KBHFILMS.",

        keywords: "Filmmaker, Videographer, Cinematic, Wedding, Commercial, UGC, Podcast",

        ogImage: "images/og-image.jpg",

        favicon: "images/favicon.png",

        appleTouchIcon: "images/apple-touch-icon.png"

    }

};

function getMediaUrl(path) {

    const base = String(MEDIA_CONFIG.MEDIA_BASE || "").replace(/\/+$/, "");

    const relative = String(path || "").replace(/^\/+/, "");

    if (!relative) {

        return "";

    }

    if (!base) {

        return relative;

    }

    return `${base}/${relative}`;

}

function setVideoSource(video, path) {

    if (!video || !path) {

        return;

    }

    const url = getMediaUrl(path);

    const source = video.querySelector("source");

    if (source) {

        source.src = url;

    } else {

        video.src = url;

    }

    video.load();

}

function setImageSource(image, path) {

    if (!image || !path) {

        return;

    }

    image.src = getMediaUrl(path);

}

function setupHeroMedia() {

    if (!heroVideo) {

        return;

    }

    const posterUrl = getMediaUrl(MEDIA_CONFIG.backgrounds.heroPoster);

    const wrapper = heroVideo.closest(".hero-video-wrapper");

    heroVideo.poster = posterUrl;

    heroVideo.muted = true;

    heroVideo.autoplay = true;

    heroVideo.playsInline = true;

    heroVideo.preload = "metadata";

    heroVideo.controls = false;

    heroVideo.setAttribute("playsinline", "");

    heroVideo.setAttribute("webkit-playsinline", "");

    if (wrapper) {

        wrapper.style.backgroundImage = "url(\"" + posterUrl + "\")";

    }

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const saveData = Boolean(connection && (connection.saveData || connection.effectiveType === "slow-2g"));

    function revealHeroVideo() {

        if (heroVideo.classList.contains("is-fallback")) {

            return;

        }

        heroVideo.classList.add("is-ready");

        heroVideo.play().catch(function () {});

    }

    function fallbackHeroVideo() {

        heroVideo.classList.add("is-fallback");

        heroVideo.classList.remove("is-ready");

        heroVideo.controls = false;

        heroVideo.removeAttribute("controls");

        heroVideo.pause();

        const source = heroVideo.querySelector("source");

        if (source) {

            source.removeAttribute("src");

        }

        heroVideo.removeAttribute("src");

    }

    heroVideo.addEventListener("playing", revealHeroVideo);

    heroVideo.addEventListener("canplay", revealHeroVideo);

    heroVideo.addEventListener("error", fallbackHeroVideo);

    if (saveData) {

        return;

    }

    setVideoSource(heroVideo, MEDIA_CONFIG.hero);

}

function applyMediaConfig() {

    setupHeroMedia();

    setVideoSource(featuredVideo, MEDIA_CONFIG.featured);

    const servicePaths = [

        MEDIA_CONFIG.services.commercial,

        MEDIA_CONFIG.services.ugc,

        MEDIA_CONFIG.services.podcast,

        MEDIA_CONFIG.services.wedding

    ];

    serviceVideos.forEach((video, index) => {

        setVideoSource(video, servicePaths[index]);

    });

    adsVideos.forEach((video, index) => {

        const ads = MEDIA_CONFIG.ads;

        setVideoSource(video, ads[index % ads.length]);

    });

    const logoPath = MEDIA_CONFIG.images.logo;

    document.querySelectorAll(

        ".preloader-logo, .logo img, .featured-logo img, footer img"

    ).forEach(image => {

        setImageSource(image, logoPath);

    });

    setImageSource(

        document.querySelector(".about-image img"),

        MEDIA_CONFIG.images.portrait

    );

}

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

applyMediaConfig();

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