/* ===================================================================
   VAAGAI CHEKKU - FORMS VALIDATION & AUTH CONTROLS
   js/forms.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Show / Hide Password Toggle ---
  const togglePassBtns = document.querySelectorAll('.password-toggle-btn');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.className = 'bi bi-eye-slash';
        } else {
          input.type = 'password';
          if (icon) icon.className = 'bi bi-eye';
        }
      }
    });
  });

  // --- Helper: Validate Email ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Helper: Validate Phone ---
  function isValidPhone(phone) {
    return /^[0-9+() -]{7,16}$/.test(phone);
  }

  // --- General Contact Form Validation ---
  const contactForm = document.getElementById('generalContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('#contactName')?.value.trim();
      const email = contactForm.querySelector('#contactEmail')?.value.trim();
      const phone = contactForm.querySelector('#contactPhone')?.value.trim();
      const message = contactForm.querySelector('#contactMessage')?.value.trim();

      if (!name || name.length < 2) {
        showToast('Please enter your full name (minimum 2 characters).', 'error');
        return;
      }
      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (!phone || !isValidPhone(phone)) {
        showToast('Please enter a valid phone number.', 'error');
        return;
      }
      if (!message || message.length < 10) {
        showToast('Please provide a detailed message (minimum 10 characters).', 'error');
        return;
      }

      showToast(`Thank you ${name}! Your enquiry has been received (Demonstration Mode - Frontend validated).`, 'success');
      contactForm.reset();
    });
  }

  // --- Bulk Order Enquiry Form Validation ---
  const bulkForm = document.getElementById('bulkEnquiryForm');
  if (bulkForm) {
    bulkForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = bulkForm.querySelector('#bulkName')?.value.trim();
      const phone = bulkForm.querySelector('#bulkPhone')?.value.trim();
      const email = bulkForm.querySelector('#bulkEmail')?.value.trim();
      const oilType = bulkForm.querySelector('#bulkOilType')?.value;
      const quantity = bulkForm.querySelector('#bulkQuantity')?.value.trim();
      const packaging = bulkForm.querySelector('#bulkPackaging')?.value;
      const message = bulkForm.querySelector('#bulkMessage')?.value.trim();

      if (!name) {
        showToast('Please enter your business or customer name.', 'error');
        return;
      }
      if (!phone || !isValidPhone(phone)) {
        showToast('Please enter a valid contact phone number.', 'error');
        return;
      }
      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid business email address.', 'error');
        return;
      }
      if (!oilType) {
        showToast('Please select your required cold-pressed oil type.', 'error');
        return;
      }
      if (!quantity) {
        showToast('Please enter the estimated quantity required (e.g. 200 Litres).', 'error');
        return;
      }
      if (!packaging) {
        showToast('Please choose your preferred packaging type.', 'error');
        return;
      }

      showToast(`Bulk quotation request received for ${quantity} of ${oilType}! We will reach out shortly. (Demonstration Mode)`, 'success');
      bulkForm.reset();
    });
  }

  // --- Modal Quick Enquiry Form ---
  const modalEnquiryForm = document.getElementById('modalQuickEnquiryForm');
  if (modalEnquiryForm) {
    modalEnquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('#modalEnquiryName')?.value.trim();
      const phone = this.querySelector('#modalEnquiryPhone')?.value.trim();
      const oil = this.querySelector('#enquiryModalOilType')?.value.trim();

      if (!name || !phone) {
        showToast('Please fill in your name and phone number.', 'error');
        return;
      }

      showToast(`Enquiry for "${oil}" successfully registered! (Demo mode)`, 'success');
      const modalEl = document.getElementById('quickEnquiryModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
      }
      modalEnquiryForm.reset();
    });
  }

  // --- Login Form Validation ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = loginForm.querySelector('#loginEmail')?.value.trim();
      const pass = loginForm.querySelector('#loginPassword')?.value;

      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (!pass || pass.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      showToast('Login successful! Redirecting to home page...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // --- Registration Form Validation ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = registerForm.querySelector('#regFullName')?.value.trim();
      const email = registerForm.querySelector('#regEmail')?.value.trim();
      const phone = registerForm.querySelector('#regPhone')?.value.trim();
      const pass = registerForm.querySelector('#regPassword')?.value;
      const confirmPass = registerForm.querySelector('#regConfirmPassword')?.value;
      const terms = registerForm.querySelector('#regAgreeTerms')?.checked;

      if (!name || name.length < 3) {
        showToast('Please enter your full legal name.', 'error');
        return;
      }
      if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (!phone || !isValidPhone(phone)) {
        showToast('Please enter a valid phone number.', 'error');
        return;
      }
      if (!pass || pass.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
      }
      if (pass !== confirmPass) {
        showToast('Passwords do not match! Please re-check.', 'error');
        return;
      }
      if (!terms) {
        showToast('Please agree to the Terms of Service & Privacy Policy.', 'error');
        return;
      }

      showToast('Account registered successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    });
  }
});

