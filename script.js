/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");
    const loadingBar = document.getElementById("loadingBar");
    const loadingNumber = document.getElementById("loadingNumber");

    let progress = 0;

    const loader = setInterval(() => {

        progress++;

        loadingBar.style.width = progress + "%";
        loadingNumber.textContent = progress.toString().padStart(2, "0");

        if (progress >= 100) {

            clearInterval(loader);

            preloader.classList.add("hide");

            setTimeout(() => {
                preloader.remove();
            }, 900);

        }

    }, 18);

});

/* ==========================================
   NAVBAR
========================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    mobileNavigation.classList.toggle("active");

});

document.querySelectorAll(".mobile-navigation a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        mobileNavigation.classList.remove("active");

    });

});

/* ==========================================
   REVEAL ON SCROLL
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight * 0.85) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});/* ==========================================
   HERO PARALLAX
========================================== */

const hero = document.querySelector(".hero");
const orbOne = document.querySelector(".hero-orb-one");
const orbTwo = document.querySelector(".hero-orb-two");

if (hero && orbOne && orbTwo) {

    hero.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        orbOne.style.transform =
            `translate(${x}px, ${y}px)`;

        orbTwo.style.transform =
            `translate(${-x}px, ${-y}px)`;

    });

}

/* ==========================================
   HERO VIDEO PLAYBACK
========================================== */

document.querySelectorAll("video").forEach(video => {

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            video.setAttribute("muted", "");
            video.play().catch(() => {});

        });

    }

});

/* ==========================================
   ADS AUTO SCROLL
========================================== */

const adsTrack = document.querySelector(".ads-track");

if (adsTrack) {

    const reels = [...adsTrack.children];

    reels.forEach(reel => {

        adsTrack.appendChild(reel.cloneNode(true));

    });

    let position = 0;

    function animateAds() {

        position += 0.35;

        if (position >= adsTrack.scrollWidth / 2) {

            position = 0;

        }

        adsTrack.style.transform =
            `translateX(-${position}px)`;

        requestAnimationFrame(animateAds);

    }

    animateAds();

}

/* ==========================================
   PAUSE CAROUSEL ON HOVER
========================================== */

if (adsTrack) {

    let paused = false;
    let pos = 0;

    adsTrack.addEventListener("mouseenter", () => {

        paused = true;

    });

    adsTrack.addEventListener("mouseleave", () => {

        paused = false;

    });

    function loop() {

        if (!paused) {

            pos += 0.35;

            if (pos >= adsTrack.scrollWidth / 2) {

                pos = 0;

            }

            adsTrack.style.transform =
                `translateX(-${pos}px)`;

        }

        requestAnimationFrame(loop);

    }

    adsTrack.style.willChange = "transform";
    loop();

}

/* ==========================================
   BUTTON RIPPLE
========================================== */

document.querySelectorAll(".button,.contact-button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-4px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/* ==========================================
   CARD HOVER EFFECT
========================================== */

document.querySelectorAll(".world-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
            rgba(255,255,255,.05),
            transparent 55%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "";

    });

});

/* ==========================================
   CURRENT YEAR
========================================== */

const year = document.querySelector(".footer-bottom p");

if (year) {

    year.innerHTML =
        `© ${new Date().getFullYear()} KBHFILMS. All Rights Reserved.`;

}