/* ===================================================================
   VAAGAI CHEKKU - THEME SWITCHER (Dark Mode / Light Mode)
   js/theme.js
   =================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'chekku_theme';
  const htmlEl = document.documentElement;

  // Retrieve saved theme or default to light
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Check OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateThemeUI(theme) {
    htmlEl.setAttribute('data-theme', theme);

    // Update toggle button icons
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });

    // Update brand logos
    const logoImgs = document.querySelectorAll('.brand-logo-img');
    logoImgs.forEach(img => {
      if (theme === 'dark') {
        img.src = 'assets/logos/logo-dark.svg';
      } else {
        img.src = 'assets/logos/logo.svg';
      }
    });
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeUI(theme);
  }

  // Initial setup immediately before render finishes
  const currentTheme = getPreferredTheme();
  updateThemeUI(currentTheme);

  // Attach event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    updateThemeUI(localStorage.getItem(STORAGE_KEY) || currentTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const activeTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(activeTheme);
        if (typeof showToast === 'function') {
          showToast(`Switched to ${activeTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        }
      });
    });
  });

  // Export helper
  window.ChekkuTheme = {
    set: setTheme,
    get: () => htmlEl.getAttribute('data-theme')
  };
})();

