const MOBILE_WIDTH = 768;
const BURGER_MENU_OPENED_LABEL = 'Close navigation menu';
const BURGER_MENU_CLOSED_LABEL = 'Open navigation menu';
const CLICK_EVENT = 'click';
const LOAD_EVENT = 'DOMContentLoaded';

function isMobile() {
    return window.innerWidth <= MOBILE_WIDTH;
}

function toggleNavigationOnMobile() {
    if (isMobile()) {
        document.querySelector('.navigation__menu').classList.toggle('dropdown__menu--opened');
        const burgerIcon = document.querySelector('.navigation__toggler .burger-icon');
        burgerIcon.classList.toggle('burger-icon--opened');
        document.querySelector('.navigation__toggler').setAttribute(
            'aria-label',
            burgerIcon.classList.contains('burger-icon--opened')
                ? BURGER_MENU_OPENED_LABEL
                : BURGER_MENU_CLOSED_LABEL);
    }
}

function setupMobileNavbar() {
    document
        .querySelector('.navigation__toggler')
        .addEventListener(CLICK_EVENT, toggleNavigationOnMobile);

    document
        .querySelectorAll('.navigation__item')
        .forEach(i => i.addEventListener(CLICK_EVENT, toggleNavigationOnMobile));
}

function initParticles() {
    Particles.init({
        selector: '.particles-canvas',
        // color: ["#000000"],
        color: ["#f2bb05", "#e9ecef"],
        maxParticles: getMaxParticles(),
        connectParticles: true,
        // sizeVariations: 5,
        // minDistance: 60,
        lineCap: "rounded",
        lineWidth: 2,
        // speed: 0,
        responsive: [
            {
                breakpoint:1200,
                options: {
                    maxParticles:0,
                }
            },
            {
                breakpoint:1920,
                options: {
                    maxParticles:300,
                }
            },
            {
                breakpoint:2400,
                options: {
                    maxParticles:450,
                }
            },
            {
                breakpoint:3000,
                options: {
                    maxParticles:600,
                }
            },
            {
                breakpoint:4000,
                options: {
                    maxParticles:750,
                }
            },
        ]
    });
}

function getMaxParticles() {
    console.log(window.innerWidth, " ", window.innerHeight);
    return parseInt(300 * window.innerWidth * window.innerWidth * window.innerHeight * window.innerHeight / 1920 / 1920 / 919 / 919);
}

document.addEventListener(LOAD_EVENT, setupMobileNavbar);
document.addEventListener(LOAD_EVENT, initParticles);
