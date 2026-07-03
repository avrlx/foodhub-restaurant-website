'use strict';


// navbar variables
const nav = document.querySelector('.navbar-nav');
const navLinks = document.querySelectorAll('.nav-link');
const cartToggleBtn = document.querySelector('.shopping-cart-btn');
const navToggleBtn = document.querySelector('.menu-toggle-btn');
const shoppingCart = document.querySelector('.cart-box');
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const sections = document.querySelectorAll('main section[id], footer[id]');
const currentYear = document.querySelector('.js-current-year');



// nav toggle function
const navToggleFunc = function () {
  nav.classList.toggle('active');
  navToggleBtn.classList.toggle('active');
}

// shopping cart toggle function
const cartToggleFunc = function () { shoppingCart.classList.toggle('active') }

const scrollToTarget = function (targetId) {
  const targetElement = document.getElementById(targetId);

  if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}



// add event on nav-toggle-btn
navToggleBtn.addEventListener('click', function () {

  // If the shopping-cart has an `active` class, it will be removed.
  if (shoppingCart.classList.contains('active')) cartToggleFunc();

  navToggleFunc();

});

// add event on cart-toggle-btn
cartToggleBtn.addEventListener('click', function () {

  // If the navbar-nav has an `active` class, it will be removed.
  if (nav.classList.contains('active')) navToggleFunc();

  cartToggleFunc();

});

// add event on all nav-link
for (let i = 0; i < navLinks.length; i++) {

  navLinks[i].addEventListener('click', navToggleFunc);

}

// add event on scroll buttons
for (let i = 0; i < scrollButtons.length; i++) {

  scrollButtons[i].addEventListener('click', function () {
    const targetId = this.dataset.scrollTarget;

    if (targetId) scrollToTarget(targetId);
  });

}

// set current year in footer
if (currentYear) currentYear.textContent = new Date().getFullYear();

// highlight the current section in the navigation
const setActiveNavLink = function (activeId) {
  for (let i = 0; i < navLinks.length; i++) {
    const isActive = navLinks[i].getAttribute('href') === `#${activeId}`;

    navLinks[i].classList.toggle('active', isActive);
  }
}

if (sections.length) {
  const sectionObserver = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        setActiveNavLink(entries[i].target.id);
      }
    }
  }, {
    root: null,
    threshold: 0.45,
    rootMargin: '-20% 0px -45% 0px'
  });

  for (let i = 0; i < sections.length; i++) {
    sectionObserver.observe(sections[i]);
  }
}