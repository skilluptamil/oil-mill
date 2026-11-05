/* ===================================================================
   VAAGAI CHEKKU - MAIN APP UTILITIES
   js/main.js
   =================================================================== */

// --- Global Toast Notification Helper ---
function showToast(message, type = 'success') {
  let toastEl = document.getElementById('chekkuToast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'chekkuToast';
    toastEl.className = 'custom-toast';
    document.body.appendChild(toastEl);
  }

  const iconClass = type === 'error' ? 'bi-exclamation-triangle-fill text-danger' : 
                    type === 'info' ? 'bi-info-circle-fill text-info' : 'bi-check-circle-fill';

  toastEl.innerHTML = `
    <i class="bi ${iconClass}"></i>
    <div>
      <div style="font-weight: 700; font-size: 0.95rem;">Notification</div>
      <div style="font-size: 0.85rem; opacity: 0.9;">${message}</div>
    </div>
  `;

  toastEl.classList.add('show');
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Animated Number Counters ---
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // --- Coming Soon Countdown Timer ---
  const countdownEl = document.getElementById('countdownTimer');
  if (countdownEl) {
    // Target date: 60 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 65);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const dEl = document.getElementById('countDays');
        const hEl = document.getElementById('countHours');
        const mEl = document.getElementById('countMinutes');
        const sEl = document.getElementById('countSeconds');

        if (dEl) dEl.textContent = String(days).padStart(2, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- Current Year in Footer ---
  const yearSpans = document.querySelectorAll('.current-year');
  const thisYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = thisYear;
  });
});

