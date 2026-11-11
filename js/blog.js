/* ===================================================================
   VAAGAI CHEKKU - BLOG FILTER & SEARCH
   js/blog.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const blogItems = document.querySelectorAll('.blog-list-item');
  const searchInput = document.getElementById('blogSearchInput');
  const categoryLinks = document.querySelectorAll('.blog-cat-link');
  const emptyNotice = document.getElementById('noBlogNotice');

  let activeCat = 'all';
  let activeSearch = '';

  function filterBlogPosts() {
    let visibleCount = 0;

    blogItems.forEach(item => {
      const category = item.getAttribute('data-category') || '';
      const title = (item.querySelector('.blog-title')?.textContent || '').toLowerCase();
      const excerpt = (item.querySelector('.blog-excerpt')?.textContent || '').toLowerCase();

      const matchesCat = activeCat === 'all' || category.toLowerCase() === activeCat.toLowerCase();
      const matchesSearch = !activeSearch || title.includes(activeSearch) || excerpt.includes(activeSearch);

      if (matchesCat && matchesSearch) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      activeSearch = this.value.trim().toLowerCase();
      filterBlogPosts();
    });
  }

  categoryLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      categoryLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      activeCat = this.getAttribute('data-category') || 'all';
      filterBlogPosts();
    });
  });

  // Handle URL query category if present (e.g. blog.html?category=ayurveda)
  const urlParams = new URLSearchParams(window.location.search);
  const qCategory = urlParams.get('category');
  if (qCategory) {
    const matchingTab = Array.from(categoryLinks).find(l => (l.getAttribute('data-category') || '').toLowerCase() === qCategory.toLowerCase());
    if (matchingTab) {
      categoryLinks.forEach(l => l.classList.remove('active'));
      matchingTab.classList.add('active');
      activeCat = qCategory.toLowerCase();
      filterBlogPosts();
    }
  }
});

