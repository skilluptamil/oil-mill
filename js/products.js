/* ===================================================================
   VAAGAI CHEKKU - PRODUCTS FILTER, SEARCH & DEEP LINKING
   js/products.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const productCards = document.querySelectorAll('.product-grid-item');
  const searchInput = document.getElementById('productSearchInput');
  const emptyState = document.getElementById('noProductsNotice');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterProducts() {
    let visibleCount = 0;

    productCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Category filter button click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeCategory = this.getAttribute('data-filter');
      filterProducts();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.trim().toLowerCase();
      filterProducts();
    });
  }

  // Deep linking: Handle URL query params (?category=...) and hash (#...-oil)
  function applyDeepLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const hash = window.location.hash ? window.location.hash.replace('#', '') : '';

    let targetCat = catParam;
    if (!targetCat && hash) {
      targetCat = hash.replace('-oil', '').toLowerCase();
    }

    if (targetCat) {
      targetCat = targetCat.toLowerCase();
      const matchingBtn = document.querySelector(`.filter-btn[data-filter="${targetCat}"]`);
      if (matchingBtn) {
        filterBtns.forEach(b => b.classList.remove('active'));
        matchingBtn.classList.add('active');
        activeCategory = targetCat;
        if (searchInput) {
          searchInput.value = '';
          searchQuery = '';
        }
        filterProducts();

        setTimeout(() => {
          const targetId = hash || (targetCat + '-oil');
          const targetEl = document.getElementById(targetId) || document.getElementById(targetCat + '-oil');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const card = targetEl.querySelector('.product-card');
            if (card) {
              card.classList.remove('product-highlight');
              void card.offsetWidth; // Force DOM reflow to re-trigger animation
              card.classList.add('product-highlight');
              setTimeout(() => {
                card.classList.remove('product-highlight');
              }, 2500);
            }
          }
        }, 300);
      }
    }
  }

  // Initial check on load
  applyDeepLink();

  // Listen for hash change in case user navigates via anchor
  window.addEventListener('hashchange', applyDeepLink);

  // In-page click handling for footer links when already on products.html
  document.querySelectorAll('a[href*="products.html"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && (href.includes('category=') || href.includes('#'))) {
        try {
          const parsed = new URL(href, window.location.href);
          const currentPath = window.location.pathname.replace(/\\/g, '/');
          const targetPath = parsed.pathname.replace(/\\/g, '/');
          
          if (currentPath.endsWith('products.html') && (targetPath.endsWith('products.html') || targetPath === '')) {
            const cat = parsed.searchParams.get('category');
            const h = parsed.hash;
            if (cat || h) {
              e.preventDefault();
              window.history.pushState(null, '', href);
              applyDeepLink();
            }
          }
        } catch (err) {
          // fallback to default browser navigation
        }
      }
    });
  });

  // Pre-fill Enquiry Modal with product info
  const enquiryBtns = document.querySelectorAll('.btn-enquire-product');
  const modalOilTypeInput = document.getElementById('enquiryModalOilType');

  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      if (modalOilTypeInput && productName) {
        modalOilTypeInput.value = productName;
      }
    });
  });
});
