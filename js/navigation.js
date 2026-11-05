/* ===================================================================
   VAAGAI CHEKKU - NAVIGATION CONTROLLER
   js/navigation.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Sticky Header on Scroll ---
  const header = document.querySelector('.site-header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Active Nav Link Detection ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetPage = href.split('/').pop();

    if (targetPage === currentPath) {
      link.classList.add('active');
      // If it's inside a dropdown, also mark the parent dropdown toggle active
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.nav-link');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  // --- Close Mobile Nav on Link Click (except dropdown triggers) ---
  const mobileCollapse = document.getElementById('navbarChekku');
  if (mobileCollapse && typeof bootstrap !== 'undefined') {
    const navItems = mobileCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        const bsCollapse = bootstrap.Collapse.getInstance(mobileCollapse);
        if (bsCollapse && window.innerWidth < 992) {
          bsCollapse.hide();
        }
      });
    });
  }
});

