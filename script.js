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

const CONTACT_CONFIG = {

    email: "hello@kbhfilms.com",

    facebook: "https://facebook.com/kbhfilms",

    instagram: "https://instagram.com/kbhfilms",

    youtube: "https://youtube.com/@kbhfilms",

    cta: {

        contact: "#contact",

        portfolio: "#portfolio"

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

function isSaveDataConnection() {

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    return Boolean(connection && (connection.saveData || connection.effectiveType === "slow-2g"));

}

function isMobileViewport() {

    return window.matchMedia("(max-width: 768px)").matches;

}

function clearVideoSource(video) {

    if (!video) {

        return;

    }

    const source = video.querySelector("source");

    if (source) {

        source.removeAttribute("src");

    }

    video.removeAttribute("src");

}

function fallbackVideoElement(video, card) {

    if (!video) {

        return;

    }

    video.classList.add("is-fallback");

    video.pause();

    clearVideoSource(video);

    if (card) {

        card.classList.add("is-fallback");

    }

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

function setupFeaturedMedia() {

    if (!featuredVideo) {

        return;

    }

    const posterUrl = getMediaUrl(MEDIA_CONFIG.backgrounds.heroPoster);

    const wrapper = featuredVideo.closest(".featured-media");

    featuredVideo.poster = posterUrl;

    featuredVideo.muted = true;

    featuredVideo.playsInline = true;

    featuredVideo.preload = "metadata";

    featuredVideo.setAttribute("playsinline", "");

    featuredVideo.setAttribute("webkit-playsinline", "");

    if (wrapper) {

        wrapper.style.backgroundImage = "url(\"" + posterUrl + "\")";

        wrapper.style.backgroundSize = "cover";

        wrapper.style.backgroundPosition = "center";

        wrapper.style.backgroundRepeat = "no-repeat";

    }

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const saveData = Boolean(connection && (connection.saveData || connection.effectiveType === "slow-2g"));

    function revealFeaturedVideo() {

        if (featuredVideo.classList.contains("is-fallback")) {

            return;

        }

        featuredVideo.classList.add("is-ready");

        featuredVideo.play().catch(function () {});

    }

    function fallbackFeaturedVideo() {

        featuredVideo.classList.add("is-fallback");

        featuredVideo.classList.remove("is-ready");

        featuredVideo.pause();

        const source = featuredVideo.querySelector("source");

        if (source) {

            source.removeAttribute("src");

        }

        featuredVideo.removeAttribute("src");

    }

    featuredVideo.addEventListener("playing", revealFeaturedVideo);

    featuredVideo.addEventListener("canplay", revealFeaturedVideo);

    featuredVideo.addEventListener("error", fallbackFeaturedVideo);

    if (saveData) {

        return;

    }

    setVideoSource(featuredVideo, MEDIA_CONFIG.featured);

}

function setupAdsMedia() {

    if (!adsVideos.length) {

        return;

    }

    const saveData = isSaveDataConnection();

    const mobile = isMobileViewport();

    const ads = MEDIA_CONFIG.ads;

    adsVideos.forEach((video, index) => {

        const path = ads[index % ads.length];

        const card = video.closest(".ads-card");

        video.muted = true;

        video.playsInline = true;

        video.preload = mobile ? "none" : "metadata";

        video.setAttribute("playsinline", "");

        video.setAttribute("webkit-playsinline", "");

        video.dataset.mediaPath = path;

        video.addEventListener("error", function () {

            fallbackVideoElement(video, card);

            adsVisibility.delete(video);

            updateAdsPlayback();

        });

        if (saveData) {

            return;

        }

        if (!mobile) {

            setVideoSource(video, path);

        }

    });

}

function ensureAdVideoSource(video) {

    if (!video || video.classList.contains("is-fallback") || isSaveDataConnection()) {

        return;

    }

    const path = video.dataset.mediaPath;

    if (!path) {

        return;

    }

    const source = video.querySelector("source");

    const currentSrc = source ? source.getAttribute("src") : video.getAttribute("src");

    if (currentSrc) {

        return;

    }

    setVideoSource(video, path);

}

function setupServicesMedia() {

    if (!serviceVideos.length) {

        return;

    }

    const saveData = isSaveDataConnection();

    const mobile = isMobileViewport();

    const servicePaths = [

        MEDIA_CONFIG.services.commercial,

        MEDIA_CONFIG.services.ugc,

        MEDIA_CONFIG.services.podcast,

        MEDIA_CONFIG.services.wedding

    ];

    serviceVideos.forEach((video, index) => {

        const path = servicePaths[index];

        const card = video.closest(".service-card");

        video.muted = true;

        video.playsInline = true;

        video.preload = mobile ? "none" : "metadata";

        video.setAttribute("playsinline", "");

        video.setAttribute("webkit-playsinline", "");

        video.dataset.mediaPath = path;

        video.addEventListener("error", function () {

            fallbackVideoElement(video, card);

            servicesVisibility.delete(video);

            updateServicesPlayback();

        });

        if (saveData) {

            return;

        }

        if (!mobile) {

            setVideoSource(video, path);

        }

    });

}

function ensureServiceVideoSource(video) {

    if (!video || video.classList.contains("is-fallback") || isSaveDataConnection()) {

        return;

    }

    const path = video.dataset.mediaPath;

    if (!path) {

        return;

    }

    const source = video.querySelector("source");

    const currentSrc = source ? source.getAttribute("src") : video.getAttribute("src");

    if (currentSrc) {

        return;

    }

    setVideoSource(video, path);

}

function fallbackAboutPortrait(image, card) {

    if (!image) {

        return;

    }

    image.classList.add("is-fallback");

    image.removeAttribute("src");

    if (card) {

        card.classList.add("is-fallback");

    }

}

function setupAboutMedia() {

    const aboutSection = document.querySelector(".about");

    const portraitImage = document.querySelector(".about-image img");

    const aboutImageCard = portraitImage ? portraitImage.closest(".about-image") : null;

    if (portraitImage) {

        portraitImage.loading = "lazy";

        portraitImage.decoding = "async";

        portraitImage.fetchPriority = "low";

        portraitImage.addEventListener("error", function () {

            fallbackAboutPortrait(portraitImage, aboutImageCard);

        }, { once: true });

        setImageSource(portraitImage, MEDIA_CONFIG.images.portrait);

    }

    if (!aboutSection) {

        return;

    }

    const bgPath = MEDIA_CONFIG.backgrounds.about;

    if (!bgPath) {

        return;

    }

    const bgUrl = getMediaUrl(bgPath);

    if (!bgUrl) {

        return;

    }

    const bgProbe = new Image();

    bgProbe.addEventListener("load", function () {

        aboutSection.style.background =

            "radial-gradient(circle at top right, rgba(255,255,255,.03), transparent 40%), url(\"" + bgUrl + "\") center/cover no-repeat, #080808";

    }, { once: true });

    bgProbe.src = bgUrl;

}

function setupContactLinks() {

    const contactDestination = CONTACT_CONFIG.cta.contact;

    const portfolioDestination = CONTACT_CONFIG.cta.portfolio;

    document.querySelectorAll('a[href="#contact"]').forEach(function (link) {

        link.href = contactDestination;

    });

    document.querySelectorAll('a[href="#portfolio"]').forEach(function (link) {

        link.href = portfolioDestination;

    });

    const contactGridLinks = document.querySelectorAll(".contact-grid a");

    if (contactGridLinks.length >= 4) {

        if (CONTACT_CONFIG.email) {

            contactGridLinks[0].href = "mailto:" + CONTACT_CONFIG.email;

        }

        if (CONTACT_CONFIG.instagram) {

            contactGridLinks[1].href = CONTACT_CONFIG.instagram;

        }

        if (CONTACT_CONFIG.facebook) {

            contactGridLinks[2].href = CONTACT_CONFIG.facebook;

        }

        if (CONTACT_CONFIG.youtube) {

            contactGridLinks[3].href = CONTACT_CONFIG.youtube;

        }

    }

}

function applyMediaConfig() {

    setupHeroMedia();

    setupFeaturedMedia();

    setupAdsMedia();

    setupServicesMedia();

    setupAboutMedia();

    const logoPath = MEDIA_CONFIG.images.logo;

    document.querySelectorAll(

        ".preloader-logo, .logo img, .featured-logo img, footer img"

    ).forEach(image => {

        setImageSource(image, logoPath);

    });

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

const servicesVisibility = new Map();

let activeServiceVideo = null;

function updateServicesPlayback() {

    let winner = null;

    let bestRatio = 0;

    serviceVideos.forEach((video) => {

        if (video.classList.contains("is-fallback")) {

            return;

        }

        const ratio = servicesVisibility.get(video) || 0;

        if (ratio > bestRatio) {

            bestRatio = ratio;

            winner = video;

        }

    });

    serviceVideos.forEach((video) => {

        if (video === winner) {

            return;

        }

        video.pause();

    });

    if (winner && bestRatio > 0) {

        ensureServiceVideoSource(winner);

        winner.muted = true;

        if (activeServiceVideo && activeServiceVideo !== winner) {

            activeServiceVideo.pause();

        }

        activeServiceVideo = winner;

        winner.play().catch(function () {});

    } else if (activeServiceVideo) {

        activeServiceVideo.pause();

        activeServiceVideo = null;

    }

}

const adsVideos = document.querySelectorAll(".ads-video");

const adsVisibility = new Map();

let activeAdVideo = null;

function updateAdsPlayback() {

    let winner = null;

    let bestRatio = 0;

    adsVideos.forEach((video) => {

        if (video.classList.contains("is-fallback")) {

            return;

        }

        const ratio = adsVisibility.get(video) || 0;

        if (ratio > bestRatio) {

            bestRatio = ratio;

            winner = video;

        }

    });

    adsVideos.forEach((video) => {

        if (video === winner) {

            return;

        }

        video.pause();

    });

    if (winner && bestRatio > 0) {

        ensureAdVideoSource(winner);

        winner.muted = true;

        if (activeAdVideo && activeAdVideo !== winner) {

            activeAdVideo.pause();

        }

        activeAdVideo = winner;

        winner.play().catch(function () {});

    } else if (activeAdVideo) {

        activeAdVideo.pause();

        activeAdVideo = null;

    }

}

const revealElements = document.querySelectorAll(".section");

const preloader = document.querySelector(".preloader");

const cursor = document.querySelector(".cursor");

const cursorDot = document.querySelector(".cursor-dot");

applyMediaConfig();

setupContactLinks();

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

if(!video.classList.contains("ads-video")&&!video.classList.contains("service-video")){

videoObserver.observe(video);

}

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

".featured-video"

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
ADS CAROUSEL PLAYBACK
=========================================================*/

const adsObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            const video = entry.target;

            if (!entry.isIntersecting || entry.intersectionRatio <= 0) {

                adsVisibility.set(video, 0);

                video.pause();

            } else {

                adsVisibility.set(video, entry.intersectionRatio);

            }

        });

        updateAdsPlayback();

    },

    {

        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1]

    }

);

adsVideos.forEach((video) => {

    adsObserver.observe(video);

});

/*=========================================================
SERVICES PLAYBACK
=========================================================*/

const servicesObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            const video = entry.target;

            if (!entry.isIntersecting || entry.intersectionRatio <= 0) {

                servicesVisibility.set(video, 0);

                video.pause();

            } else {

                servicesVisibility.set(video, entry.intersectionRatio);

            }

        });

        updateServicesPlayback();

    },

    {

        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1]

    }

);

serviceVideos.forEach((video) => {

    servicesObserver.observe(video);

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

if(video.classList.contains("ads-video")||video.classList.contains("service-video")){

return;

}

const rect=video.getBoundingClientRect();

if(

rect.top<window.innerHeight&&

rect.bottom>0

){

video.play().catch(()=>{});

}

});

updateAdsPlayback();

updateServicesPlayback();

}

});

/*=========================================================
LAZY PLAY
=========================================================*/

videos.forEach(video=>{

if(video.classList.contains("ads-video")||video.classList.contains("service-video")){

return;

}

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