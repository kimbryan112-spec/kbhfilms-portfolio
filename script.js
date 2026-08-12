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

});