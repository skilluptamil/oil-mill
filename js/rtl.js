/* ===================================================================
   VAAGAI CHEKKU - DIRECTION SWITCHER (LTR / RTL)
   js/rtl.js
   =================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'chekku_direction';
  const htmlEl = document.documentElement;

  function getPreferredDir() {
    return localStorage.getItem(STORAGE_KEY) || 'ltr';
  }

  function updateDirUI(dir) {
    htmlEl.setAttribute('dir', dir);

    // Update RTL buttons
    const toggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    toggleBtns.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-text');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left to Right' : 'Switch to Right to Left');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  function setDir(dir) {
    localStorage.setItem(STORAGE_KEY, dir);
    updateDirUI(dir);
  }

  // Initial setup
  const currentDir = getPreferredDir();
  updateDirUI(currentDir);

  // Attach event listeners
  document.addEventListener('DOMContentLoaded', function () {
    updateDirUI(localStorage.getItem(STORAGE_KEY) || currentDir);

    const toggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const activeDir = htmlEl.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        setDir(activeDir);
        if (typeof showToast === 'function') {
          showToast(`Layout switched to ${activeDir.toUpperCase()}`, 'info');
        }
      });
    });
  });

  window.ChekkuRTL = {
    set: setDir,
    get: () => htmlEl.getAttribute('dir')
  };
})();

