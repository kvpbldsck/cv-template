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

document.addEventListener(LOAD_EVENT, setupMobileNavbar);
