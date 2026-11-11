/* ===================================================================
   VAAGAI CHEKKU - FORMS VALIDATION & AUTH CONTROLS
   js/forms.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Show / Hide Password Toggle ---
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
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

  // --- Pre-fill Quick Enquiry Modal across index.html, home-2.html, products.html ---
  const enquiryBtns = document.querySelectorAll('.btn-enquire-product');
  const modalOilTypeInput = document.getElementById('enquiryModalOilType');
  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      if (modalOilTypeInput && productName) {
        modalOilTypeInput.value = productName;
      }
      const modalForm = document.getElementById('modalQuickEnquiryForm');
      if (modalForm) {
        resetValidationState(modalForm);
      }
    });
  });

  // --- Validation Helpers ---
  function isValidEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(email);
  }

  function isValidPhone(phone) {
    if (!/^\+?[\d\s()-]+$/.test(phone)) return false;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return false;
    if (/^(\d)\1+$/.test(digits)) return false;
    return true;
  }

  function getFieldLabelText(form, field) {
    if (field.id) {
      const label = form.querySelector(`label[for="${field.id}"]`);
      if (label) {
        return label.textContent.replace(/\*/g, '').replace(/\(Optional\)/gi, '').trim();
      }
    }
    return field.getAttribute('aria-label') || field.getAttribute('placeholder') || 'this field';
  }

  function validateFieldValue(form, field) {
    if (field.disabled || field.readOnly || !field.hasAttribute('required')) {
      return '';
    }

    const val = (field.value || '').trim();
    const labelText = getFieldLabelText(form, field);

    if (field.type === 'checkbox') {
      if (!field.checked) {
        if (field.id === 'regAgreeTerms') {
          return 'Please agree to the Terms of Service & Privacy Policy.';
        }
        return `Please check ${labelText}.`;
      }
      return '';
    }

    if (field.tagName === 'SELECT') {
      if (!val) {
        return `Please select a ${labelText.toLowerCase()}.`;
      }
      return '';
    }

    if (!val) {
      const cleanLabel = labelText.toLowerCase().replace(/^your\s+/, '');
      if (cleanLabel === 'quantity required') {
        return 'Please enter the required quantity.';
      }
      if (cleanLabel.startsWith('enter your ')) {
        return `Please ${cleanLabel}.`;
      }
      return `Please enter your ${cleanLabel}.`;
    }

    if (field.type === 'email') {
      if (!isValidEmail(val)) {
        return 'Please enter a valid email address (e.g. name@example.com).';
      }
      return '';
    }

    if (field.type === 'tel') {
      if (!isValidPhone(val)) {
        return 'Please enter a valid 10 to 15-digit phone number (e.g. +91 98765 43210).';
      }
      return '';
    }

    if (field.type === 'password' || (field.id && field.id.toLowerCase().includes('password'))) {
      if (val.length < 6) {
        return 'Password must be at least 6 characters long.';
      }
      if (field.id === 'regConfirmPassword') {
        const regPass = form.querySelector('#regPassword')?.value || '';
        if (val !== regPass) {
          return 'Passwords do not match. Please re-check.';
        }
      }
      return '';
    }

    if (field.id === 'contactMessage') {
      if (val.length < 5) {
        return 'Please provide a message of at least 5 characters.';
      }
      return '';
    }

    if (field.id === 'bulkQuantity') {
      if (!/[a-zA-Z0-9]/.test(val)) {
        return 'Please enter a valid quantity (e.g. 50 Litres).';
      }
      return '';
    }

    if (['bulkName', 'contactName', 'modalEnquiryName', 'regFullName'].includes(field.id)) {
      if (val.length < 2) {
        return 'Name must be at least 2 characters long.';
      }
    }

    return '';
  }

  function getErrorAnchor(field) {
    return field.closest('.input-group') || field.closest('.form-check') || field;
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    field.setAttribute('aria-invalid', 'true');

    const anchor = getErrorAnchor(field);
    let errEl = anchor.nextElementSibling;
    if (!errEl || !errEl.classList.contains('field-error-msg')) {
      errEl = document.createElement('div');
      errEl.className = 'field-error-msg';
      errEl.setAttribute('role', 'alert');
      anchor.insertAdjacentElement('afterend', errEl);
    }
    errEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i><span>${message}</span>`;
  }

  function clearFieldError(field, markValid = false) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    const val = (field.value || '').trim();
    if (markValid && ((field.type === 'checkbox' && field.checked) || (field.type !== 'checkbox' && val !== ''))) {
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
    }

    const anchor = getErrorAnchor(field);
    const errEl = anchor.nextElementSibling;
    if (errEl && errEl.classList.contains('field-error-msg')) {
      errEl.remove();
    }
  }

  function getFormFields(form) {
    return Array.from(form.querySelectorAll('input, select, textarea')).filter(el => {
      const tagType = (el.type || '').toLowerCase();
      return tagType !== 'submit' && tagType !== 'button' && tagType !== 'hidden' && !el.disabled && !el.readOnly;
    });
  }

  function isFormValid(form) {
    const fields = getFormFields(form);
    return fields.every(field => validateFieldValue(form, field) === '');
  }

  function syncSubmitButton(form) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitBtn) return;

    if (isFormValid(form)) {
      submitBtn.classList.remove('btn-submit-disabled');
      submitBtn.setAttribute('aria-disabled', 'false');
    } else {
      submitBtn.classList.add('btn-submit-disabled');
      submitBtn.setAttribute('aria-disabled', 'true');
    }
  }

  function resetValidationState(form) {
    getFormFields(form).forEach(field => {
      clearFieldError(field, false);
      delete field.dataset.touched;
    });
    syncSubmitButton(form);
  }

  function validateFormAndDisplayErrors(form) {
    const fields = getFormFields(form);
    let firstInvalidField = null;
    let allValid = true;

    fields.forEach(field => {
      field.dataset.touched = 'true';
      const err = validateFieldValue(form, field);
      if (err) {
        allValid = false;
        showFieldError(field, err);
        if (!firstInvalidField) firstInvalidField = field;
      } else {
        clearFieldError(field, field.hasAttribute('required'));
      }
    });

    syncSubmitButton(form);

    if (firstInvalidField) {
      firstInvalidField.focus({ preventScroll: false });
    }
    return allValid;
  }

  function attachLiveValidation(form, onValidSubmit) {
    if (!form) return;
    form.setAttribute('novalidate', 'novalidate');

    const fields = getFormFields(form);
    fields.forEach(field => {
      const eventName = (field.tagName === 'SELECT' || field.type === 'checkbox') ? 'change' : 'input';

      field.addEventListener('blur', function () {
        field.dataset.touched = 'true';
        const err = validateFieldValue(form, field);
        if (err) {
          showFieldError(field, err);
        } else {
          clearFieldError(field, field.hasAttribute('required'));
        }
        syncSubmitButton(form);
      });

      field.addEventListener(eventName, function () {
        if (field.id === 'regPassword') {
          const confirmField = form.querySelector('#regConfirmPassword');
          if (confirmField && confirmField.dataset.touched === 'true') {
            const confirmErr = validateFieldValue(form, confirmField);
            if (confirmErr) showFieldError(confirmField, confirmErr);
            else clearFieldError(confirmField, true);
          }
        }

        const err = validateFieldValue(form, field);
        if (field.dataset.touched === 'true') {
          if (err) {
            showFieldError(field, err);
          } else {
            clearFieldError(field, field.hasAttribute('required'));
          }
        } else if (!err && field.hasAttribute('required')) {
          clearFieldError(field, true);
        }
        syncSubmitButton(form);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateFormAndDisplayErrors(form)) {
        if (typeof showToast === 'function') {
          showToast('Please fill in all required (*) fields correctly before submitting.', 'error');
        }
        return;
      }
      onValidSubmit(form);
    });

    // Initial button state check
    syncSubmitButton(form);
  }

  // --- 1. General Contact Form (contact.html) ---
  const contactForm = document.getElementById('generalContactForm');
  attachLiveValidation(contactForm, function (form) {
    const name = form.querySelector('#contactName')?.value.trim();
    if (typeof showToast === 'function') {
      showToast(`Thank you ${name}! Your enquiry has been received (Demonstration Mode - Frontend validated).`, 'success');
    }
    form.reset();
    resetValidationState(form);
  });

  // --- 2. Bulk Order Enquiry Form (index.html & contact.html) ---
  document.querySelectorAll('#bulkEnquiryForm').forEach(bulkForm => {
    attachLiveValidation(bulkForm, function (form) {
      const oilType = form.querySelector('#bulkOilType')?.value;
      const quantity = form.querySelector('#bulkQuantity')?.value.trim();
      if (typeof showToast === 'function') {
        showToast(`Bulk quotation request received for ${quantity} of ${oilType}! We will reach out shortly. (Demonstration Mode)`, 'success');
      }
      form.reset();
      resetValidationState(form);
    });
  });

  // --- 3. Quick Product Enquiry Modal Form (index.html, home-2.html, products.html) ---
  document.querySelectorAll('#modalQuickEnquiryForm').forEach(modalEnquiryForm => {
    attachLiveValidation(modalEnquiryForm, function (form) {
      const oil = form.querySelector('#enquiryModalOilType')?.value.trim() || 'Cold-Pressed Oil';
      if (typeof showToast === 'function') {
        showToast(`Enquiry for "${oil}" successfully registered! (Demo mode)`, 'success');
      }
      const modalEl = form.closest('.modal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
      }
      form.reset();
      resetValidationState(form);
    });
  });

  // --- 4. Blog Newsletter Form (blog.html) ---
  const blogNewsletterForm = document.getElementById('blogNewsletterForm');
  attachLiveValidation(blogNewsletterForm, function (form) {
    const email = form.querySelector('#blogNewsletterEmail, input[type="email"]')?.value.trim();
    if (typeof showToast === 'function') {
      showToast(`Subscribed successfully! Updates will be sent to ${email}`, 'success');
    }
    form.reset();
    resetValidationState(form);
  });

  // --- 5. Coming Soon Launch Notify Form (coming-soon.html) ---
  const comingSoonForm = document.getElementById('comingSoonForm');
  attachLiveValidation(comingSoonForm, function (form) {
    const email = form.querySelector('#comingSoonEmail, input[type="email"]')?.value.trim();
    if (typeof showToast === 'function') {
      showToast(`Thank you! You are on the VIP launch list: ${email}`, 'success');
    }
    form.reset();
    resetValidationState(form);
  });

  // --- 6. Staff Login Form (login.html) ---
  const loginForm = document.getElementById('loginForm');
  attachLiveValidation(loginForm, function () {
    if (typeof showToast === 'function') {
      showToast('Login successful! Redirecting to home page...', 'success');
    }
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  // --- 7. Partner Registration Form (register.html) ---
  const registerForm = document.getElementById('registerForm');
  attachLiveValidation(registerForm, function (form) {
    if (typeof showToast === 'function') {
      showToast('Account registered successfully! Redirecting to login...', 'success');
    }
    form.reset();
    resetValidationState(form);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });
});
