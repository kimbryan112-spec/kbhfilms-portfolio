/* ==========================================================
   KBHFILMS V2
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       PRELOADER
    ========================== */

    const preloader = document.getElementById("preloader");
    const loadingBar = document.getElementById("loadingBar");
    const loadingNumber = document.getElementById("loadingNumber");

    if (preloader && loadingBar && loadingNumber) {

        let progress = 0;

        const loader = setInterval(() => {

            progress++;

            loadingBar.style.width = progress + "%";
            loadingNumber.textContent = progress;

            if (progress >= 100) {

                clearInterval(loader);

                setTimeout(() => {

                    preloader.style.opacity = "0";
                    preloader.style.pointerEvents = "none";

                    setTimeout(() => {

                        preloader.remove();

                    }, 700);

                }, 300);

            }

        }, 18);

    }

    /* ==========================
       REVEAL ANIMATION
    ========================== */

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold:0.15

    });

    revealElements.forEach(el => observer.observe(el));

    /* ==========================
       NAVBAR
    ========================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if(!navbar) return;

        if(window.scrollY > 60){

            navbar.style.background = "rgba(5,5,5,.90)";
            navbar.style.padding = "18px 5%";

        }else{

            navbar.style.background = "rgba(0,0,0,.25)";
            navbar.style.padding = "28px 5%";

        }

    });

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileNavigation");

    if(menuToggle && mobileMenu){

        menuToggle.addEventListener("click",()=>{

            if(mobileMenu.style.display==="block"){

                mobileMenu.style.display="none";

            }else{

                mobileMenu.style.display="block";

            }

        });

    }

    document.querySelectorAll(".mobile-navigation a").forEach(link=>{

        link.addEventListener("click",()=>{

            if(mobileMenu){

                mobileMenu.style.display="none";

            }

        });

    });

    /* ==========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

    /* ==========================
       HERO PARALLAX
    ========================== */

    const orbOne=document.querySelector(".hero-orb-one");
    const orbTwo=document.querySelector(".hero-orb-two");

    window.addEventListener("mousemove",(e)=>{

        const x=e.clientX/window.innerWidth;
        const y=e.clientY/window.innerHeight;

        if(orbOne){

            orbOne.style.transform=`translate(${x*30}px,${y*30}px)`;

        }

        if(orbTwo){

            orbTwo.style.transform=`translate(${-x*40}px,${-y*40}px)`;

        }

    });

});/* ==========================================
   FEATURED PROJECT VIDEO
========================================== */

const featuredVideo = document.querySelector(".featured-video");
const featuredImage = document.querySelector(".featured-image");

if (featuredVideo && featuredImage) {

    featuredVideo.play().catch(() => {});

    featuredImage.addEventListener("mouseenter", () => {
        featuredVideo.play();
    });

    featuredImage.addEventListener("mouseleave", () => {
        featuredVideo.play();
    });

}/* ==========================================
   KBHFILMS V2
   ADS Infinite Reel Engine
========================================== */

const adsTrack = document.querySelector(".ads-track");

if (adsTrack) {

    // original reels
    const reels = Array.from(adsTrack.children);

    // duplicate hanggang mapuno ang buong track
    while (adsTrack.children.length < 60) {

        reels.forEach(reel => {

            adsTrack.appendChild(reel.cloneNode(true));

        });

    }

    let x = 0;

    const speed = 0.45;

    function animateAds() {

        x += speed;

        adsTrack.style.transform = `translate3d(-${x}px,0,0)`;

        // unang reel
        const first = adsTrack.firstElementChild;

        if (!first) {

            requestAnimationFrame(animateAds);

            return;

        }

        const firstWidth =
            first.offsetWidth +
            parseFloat(getComputedStyle(adsTrack).gap);

        if (x >= firstWidth) {

            x -= firstWidth;

            adsTrack.appendChild(first);

            adsTrack.style.transform =
                `translate3d(-${x}px,0,0)`;

        }

        requestAnimationFrame(animateAds);

    }

    animateAds();

}
