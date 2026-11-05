/**
 * VAAGAI CHEKKU - BLOG DETAILS DYNAMIC RENDERER
 * js/blog-details.js
 * 
 * Reads ?id=... from the URL, fetches matching post from BLOG_DATA,
 * and renders all titles, images, author info, content, related posts,
 * and sidebar links dynamically without mismatched content.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Extract blog ID from query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const rawId = urlParams.get('id');

  // 2. Fetch matching post or fallback gracefully to first article
  const post = window.getBlogPostById ? window.getBlogPostById(rawId) : window.BLOG_DATA[0];

  if (!post) {
    console.error('No blog data found for rendering.');
    return;
  }

  // 3. Update document title and meta description
  document.title = `${post.title} | Vaagai Chekku Blog`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', post.excerpt);
  }

  // 4. Update banner breadcrumb, badge, and heading
  const breadcrumbEl = document.getElementById('blogBreadcrumbTitle');
  if (breadcrumbEl) {
    breadcrumbEl.textContent = post.title;
  }

  const badgeEl = document.getElementById('blogCategoryTag');
  if (badgeEl) {
    badgeEl.innerHTML = `<i class="bi ${post.categoryIcon || 'bi-journal-text'}"></i> ${post.category}`;
  }

  const titleEl = document.getElementById('blogPostTitle');
  if (titleEl) {
    titleEl.textContent = post.title;
  }

  // 5. Update author metadata header
  const authorAvatarEl = document.getElementById('blogAuthorAvatar');
  if (authorAvatarEl) {
    authorAvatarEl.src = post.author.avatar;
    authorAvatarEl.alt = post.author.name;
  }

  const authorNameEl = document.getElementById('blogAuthorName');
  if (authorNameEl) {
    authorNameEl.textContent = `By ${post.author.name}`;
  }

  const authorRoleDateEl = document.getElementById('blogAuthorRoleDate');
  if (authorRoleDateEl) {
    authorRoleDateEl.textContent = `${post.author.role} | Published on ${post.date}`;
  }

  const readTimeEl = document.getElementById('blogReadTime');
  if (readTimeEl) {
    readTimeEl.innerHTML = `<i class="bi bi-clock me-1"></i> ${post.readTime}`;
  }

  const viewsEl = document.getElementById('blogViews');
  if (viewsEl) {
    viewsEl.innerHTML = `<i class="bi bi-eye me-1"></i> ${post.views}`;
  }

  // 6. Update Featured Hero Image (exact matching image and alt)
  const heroImgEl = document.getElementById('blogHeroImage');
  if (heroImgEl) {
    heroImgEl.src = post.image;
    heroImgEl.alt = post.imageAlt;
  }

  // 7. Inject Article Body Content
  const contentEl = document.getElementById('blogPostContent');
  if (contentEl) {
    contentEl.innerHTML = post.contentHtml;
  }

  // 8. Update Sidebar Author Widget
  const sidebarAvatar = document.getElementById('sidebarAuthorAvatar');
  if (sidebarAvatar) {
    sidebarAvatar.src = post.author.avatar;
    sidebarAvatar.alt = `${post.author.name} - ${post.author.role}`;
  }

  const sidebarName = document.getElementById('sidebarAuthorName');
  if (sidebarName) {
    sidebarName.textContent = post.author.name;
  }

  const sidebarRole = document.getElementById('sidebarAuthorRole');
  if (sidebarRole) {
    sidebarRole.textContent = post.author.role;
  }

  const sidebarBio = document.getElementById('sidebarAuthorBio');
  if (sidebarBio) {
    sidebarBio.textContent = post.author.bio;
  }

  // 9. Render Related Articles (at bottom of content)
  const relatedContainer = document.getElementById('relatedPostsContainer');
  if (relatedContainer && window.getRelatedBlogPosts) {
    const relatedPosts = window.getRelatedBlogPosts(post.id, 2);
    relatedContainer.innerHTML = relatedPosts.map(rel => `
      <div class="col-md-6">
        <div class="blog-card h-100">
          <div class="blog-thumb-wrap">
            <a href="blog-details.html?id=${encodeURIComponent(rel.id)}" class="d-block w-100 h-100" title="${rel.title}">
              <img src="${rel.image}" alt="${rel.imageAlt}">
            </a>
            <span class="blog-date-badge">${rel.day}<br><small>${rel.month}</small></span>
          </div>
          <div class="blog-body d-flex flex-column">
            <div class="blog-meta mb-2">
              <span><i class="bi bi-tag-fill"></i> ${rel.category}</span>
              <span><i class="bi bi-chat"></i> ${rel.commentsCount} Comments</span>
            </div>
            <h5 class="blog-title">
              <a href="blog-details.html?id=${encodeURIComponent(rel.id)}">${rel.title}</a>
            </h5>
            <p class="blog-excerpt flex-grow-1">${rel.excerpt}</p>
            <a href="blog-details.html?id=${encodeURIComponent(rel.id)}" class="blog-read-more mt-auto">Read Article <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 10. Render Sidebar Recent Posts
  const sidebarRecent = document.getElementById('sidebarRecentPosts');
  if (sidebarRecent && window.BLOG_DATA) {
    const recentList = window.BLOG_DATA.filter(p => p.id !== post.id).slice(0, 3);
    sidebarRecent.innerHTML = recentList.map(rec => `
      <div class="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
        <a href="blog-details.html?id=${encodeURIComponent(rec.id)}" class="flex-shrink-0" title="${rec.title}">
          <img src="${rec.image}" alt="${rec.imageAlt}" class="rounded-3" width="60" height="60" style="object-fit: cover;">
        </a>
        <div>
          <h6 class="mb-0 small fw-bold">
            <a href="blog-details.html?id=${encodeURIComponent(rec.id)}" class="text-dark">${rec.title}</a>
          </h6>
          <small class="text-muted">${rec.date}</small>
        </div>
      </div>
    `).join('');
  }

  // 11. Update Social Sharing Links
  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Read this article on Vaagai Chekku: ${post.title}`);
  
  const waShare = document.getElementById('shareWhatsApp');
  if (waShare) {
    waShare.href = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
  }

  const fbShare = document.getElementById('shareFacebook');
  if (fbShare) {
    fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  }

  const twShare = document.getElementById('shareTwitter');
  if (twShare) {
    twShare.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`;
  }
});

