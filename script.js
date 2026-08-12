/* ==========================================================
   KBHFILMS
   Premium Portfolio Script
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       PRELOADER
    ========================================== */

    const preloader = document.getElementById("preloader");
    const loadingBar = document.getElementById("loadingBar");
    const loadingNumber = document.getElementById("loadingNumber");

    let progress = 0;

    const loader = setInterval(() => {

        progress++;

        if (loadingBar) {
            loadingBar.style.width = progress + "%";
        }

        if (loadingNumber) {
            loadingNumber.textContent = String(progress).padStart(2, "0");
        }

        if (progress >= 100) {

            clearInterval(loader);

            setTimeout(() => {

                preloader.style.opacity = "0";
                preloader.style.pointerEvents = "none";

                setTimeout(() => {

                    preloader.remove();

                }, 700);

            }, 400);

        }

    }, 18);


    /* ==========================================
       REVEAL ON SCROLL
    ========================================== */

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: .15

    });

    reveals.forEach(item => revealObserver.observe(item));


    /* ==========================================
       NAVBAR SCROLL
    ========================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.style.background = "rgba(5,5,5,.92)";
            navbar.style.padding = "18px 5%";
            navbar.style.borderBottom = "1px solid rgba(255,255,255,.08)";

        } else {

            navbar.style.background = "rgba(0,0,0,.25)";
            navbar.style.padding = "28px 5%";
            navbar.style.borderBottom = "1px solid rgba(255,255,255,.05)";

        }

    });


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNavigation = document.getElementById("mobileNavigation");

    if (mobileNavigation) {

        mobileNavigation.style.position = "fixed";
        mobileNavigation.style.inset = "0";
        mobileNavigation.style.background = "#050505";
        mobileNavigation.style.display = "none";
        mobileNavigation.style.zIndex = "999";
        mobileNavigation.style.padding = "120px 10%";

    }

    let menuOpen = false;

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            menuOpen = !menuOpen;

            mobileNavigation.style.display = menuOpen ? "block" : "none";

        });

    }

    document.querySelectorAll(".mobile-navigation a").forEach(link => {

        link.addEventListener("click", () => {

            menuOpen = false;
            mobileNavigation.style.display = "none";

        });

    });


    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });


    /* ==========================================
       PARALLAX HERO
    ========================================== */

    const orbOne = document.querySelector(".hero-orb-one");
    const orbTwo = document.querySelector(".hero-orb-two");

    window.addEventListener("mousemove", (e) => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (orbOne) {

            orbOne.style.transform =
                `translate(${x * 30}px, ${y * 30}px)`;

        }

        if (orbTwo) {

            orbTwo.style.transform =
                `translate(${-x * 40}px, ${-y * 40}px)`;

        }

    });


    /* ==========================================
       WORLD CARD HOVER
    ========================================== */

    document.querySelectorAll(".world-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateX(14px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateX(0)";

        });

    });


    /* ==========================================
       BUTTON RIPPLE
    ========================================== */

    document.querySelectorAll(".button,.contact-button").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-4px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0px)";

        });

    });


    /* ==========================================
       BACK TO TOP
    ========================================== */

    const backTop = document.querySelector('a[href="#home"]');

    if (backTop) {

        backTop.addEventListener("click", e => {

            e.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

});