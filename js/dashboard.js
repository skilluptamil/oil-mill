/* ===================================================================
   VAAGAI CHEKKU - ADMIN DASHBOARD CONTROLLER
   js/dashboard.js
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Sidebar Toggle for Mobile ---
  const sidebar = document.querySelector('.dash-sidebar');
  const toggleBtn = document.getElementById('dashSidebarToggle');
  const backdrop = document.getElementById('dashBackdrop');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  // --- Dashboard Section Tab Navigation ---
  const navItems = document.querySelectorAll('.dash-nav-item[data-target-view]');
  const viewSections = document.querySelectorAll('.dash-view-section');

  navItems.forEach(item => {
    item.addEventListener('click', function () {
      const targetView = this.getAttribute('data-target-view');
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      viewSections.forEach(section => {
        if (section.id === targetView) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });

      // Close sidebar on mobile after navigation
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

  // --- Dashboard Table Search ---
  const dashSearchInput = document.getElementById('dashTableSearch');
  if (dashSearchInput) {
    dashSearchInput.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      const rows = document.querySelectorAll('.dash-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // --- Draw Vanilla Canvas Charts ---
  function drawSalesChart() {
    const canvas = document.getElementById('salesTrendChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = 260 * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 260;
    const padding = { top: 30, right: 25, bottom: 40, left: 45 };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [14200, 18500, 22100, 21800, 26900, 31400, 29800, 35600, 38900, 42100, 48500, 53200];
    const maxVal = 60000;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#2A362A' : '#E8EFE3';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (height - padding.top - padding.bottom) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#8CA086' : '#718072';
      ctx.font = '11px sans-serif';
      const labelVal = Math.round((maxVal * (4 - i)) / 4 / 1000) + 'k';
      ctx.fillText('$' + labelVal, 5, y + 4);
    }

    // Coordinates
    const points = data.map((val, idx) => {
      const x = padding.left + (width - padding.left - padding.right) * (idx / (data.length - 1));
      const y = height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom);
      return { x, y };
    });

    // Area Fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(46, 78, 28, 0.35)');
    gradient.addColorStop(1, 'rgba(46, 78, 28, 0.02)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line Path
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#D4A017';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Data dots & month labels
    points.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2E4E1C';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFF';
      ctx.stroke();

      // Month text
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#A3B19B' : '#718072';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(months[idx], p.x, height - 15);
    });
  }

  function drawOilProductionBarChart() {
    const canvas = document.getElementById('oilProductionChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = 260 * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 260;
    const padding = { top: 25, right: 20, bottom: 40, left: 35 };

    const categories = ['Groundnut', 'Sesame', 'Coconut', 'Mustard', 'Sunflower', 'Castor'];
    const volumes = [3850, 2900, 3100, 1600, 1950, 950]; // Litres
    const colors = ['#2E4E1C', '#D4A017', '#4A7C2E', '#6D4C41', '#E5A93C', '#8D6E63'];
    const maxVal = 4500;

    ctx.clearRect(0, 0, width, height);

    const availableWidth = width - padding.left - padding.right;
    const barWidth = Math.min(42, (availableWidth / categories.length) * 0.6);
    const step = availableWidth / categories.length;

    categories.forEach((cat, idx) => {
      const barHeight = (volumes[idx] / maxVal) * (height - padding.top - padding.bottom);
      const x = padding.left + idx * step + (step - barWidth) / 2;
      const y = height - padding.bottom - barHeight;

      // Bar
      ctx.fillStyle = colors[idx % colors.length];
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]);
      ctx.fill();

      // Value label on top
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#EBF2E8' : '#202421';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(volumes[idx] + 'L', x + barWidth / 2, y - 6);

      // Category text
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#A3B19B' : '#718072';
      ctx.font = '10px sans-serif';
      ctx.fillText(cat, x + barWidth / 2, height - 16);
    });
  }

  // Initial draw & resize handler
  drawSalesChart();
  drawOilProductionBarChart();

  window.addEventListener('resize', function () {
    drawSalesChart();
    drawOilProductionBarChart();
  });

  // Re-draw on theme switch for optimal contrast
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        drawSalesChart();
        drawOilProductionBarChart();
      }, 100);
    });
  });
});

