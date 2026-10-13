/**
 * VeriHome - Modern Home Inspection & Pre-Purchase Assessment Service
 * Core JavaScript Functions
 */

function initVeriHome() {
  'use strict';

  // 1. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('vhThemeToggle');
  const htmlEl = document.documentElement;

  // Retrieve saved theme or prefer-color-scheme
  const savedTheme = localStorage.getItem('vh-theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = htmlEl.getAttribute('data-bs-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-bs-theme', theme);
    localStorage.setItem('vh-theme', theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill text-primary';
          themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    }
  }

  // 2. RTL / LTR Toggle
  const rtlToggleBtn = document.getElementById('vhRtlToggle');
  const savedDir = localStorage.getItem('vh-direction') || 'ltr';
  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', function () {
      const currentDir = htmlEl.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      setDirection(newDir);
    });
  }

  function setDirection(dir) {
    htmlEl.setAttribute('dir', dir);
    localStorage.setItem('vh-direction', dir);
    if (rtlToggleBtn) {
      rtlToggleBtn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      const textSpan = rtlToggleBtn.querySelector('.rtl-text');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    }
    // Propagate direction and alignment to form inputs (tel, date, text, textarea, select)
    document.querySelectorAll('input, textarea, select, .form-control, .vh-auth-input').forEach(function(el) {
      el.setAttribute('dir', dir);
      if (dir === 'rtl') {
        el.style.textAlign = 'right';
      } else {
        el.style.textAlign = '';
      }
    });
  }

  // 3. Inspection Cost Estimator Calculator
  const sqftInput = document.getElementById('calcSqft');
  const sqftDisplay = document.getElementById('calcSqftDisplay');
  const packageSelect = document.getElementById('calcPackage');
  const priceDisplay = document.getElementById('calcTotalPrice');
  const timeDisplay = document.getElementById('calcTimeDisplay');

  function updateCostEstimator() {
    if (!sqftInput || !packageSelect || !priceDisplay) return;
    const sqft = parseInt(sqftInput.value, 10) || 2000;
    if (sqftDisplay) sqftDisplay.textContent = sqft.toLocaleString() + ' sq ft';

    const basePackage = packageSelect.value;
    let baseRate = 349;
    let duration = '2.5 - 3.0 Hours';

    if (basePackage === 'condo') {
      baseRate = 299;
      duration = '1.5 - 2.0 Hours';
    } else if (basePackage === 'prepurchase') {
      baseRate = 489;
      duration = '3.5 - 4.5 Hours';
    } else if (basePackage === 'commercial') {
      baseRate = 799;
      duration = '5.0 - 7.0 Hours';
    }

    // Incremental pricing for larger properties (> 2000 sq ft)
    let extra = 0;
    if (sqft > 2000) {
      extra = Math.round(((sqft - 2000) / 500) * 45);
    }

    const total = baseRate + extra;
    priceDisplay.textContent = '$' + total;
    if (timeDisplay) timeDisplay.textContent = duration;
  }

  if (sqftInput) {
    sqftInput.addEventListener('input', updateCostEstimator);
  }
  if (packageSelect) {
    packageSelect.addEventListener('change', updateCostEstimator);
  }
  updateCostEstimator();

  // 4. Sample Report Category Filter
  const reportFilterBtns = document.querySelectorAll('.report-filter-btn');
  const findingCards = document.querySelectorAll('.finding-card');

  if (reportFilterBtns.length > 0) {
    // Dynamic count calculation from actual findings in DOM
    const counts = { all: findingCards.length };
    findingCards.forEach(card => {
      const sys = (card.getAttribute('data-system') || '').trim().toLowerCase();
      if (sys) {
        counts[sys] = (counts[sys] || 0) + 1;
      }
    });

    const categoryLabels = {
      all: 'All Systems',
      roof: 'Roof & Exterior',
      electrical: 'Electrical',
      plumbing: 'Plumbing',
      hvac: 'HVAC / Heating',
      structure: 'Structure & Foundation'
    };

    reportFilterBtns.forEach(btn => {
      const filter = (btn.getAttribute('data-filter') || '').trim().toLowerCase();
      if (filter && categoryLabels[filter] && counts[filter] !== undefined) {
        btn.textContent = `${categoryLabels[filter]} (${counts[filter]})`;
      }
    });

    reportFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Swap active classes and primary/outline styles immediately
        reportFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.classList.remove('btn-vh-primary');
          b.classList.add('btn-vh-outline');
        });
        this.classList.add('active');
        this.classList.remove('btn-vh-outline');
        this.classList.add('btn-vh-primary');

        const filter = (this.getAttribute('data-filter') || '').trim().toLowerCase();
        findingCards.forEach(card => {
          const sys = (card.getAttribute('data-system') || '').trim().toLowerCase();
          if (filter === 'all' || sys === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Global Toast Notification Helper
  window.showToast = function (title, message, type = 'success') {
    let toastContainer = document.getElementById('vhToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'vhToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1090';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast_' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : 
                    type === 'danger' ? 'bg-danger text-white' : 
                    type === 'warning' ? 'bg-warning text-dark' : 'bg-primary text-white';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${title}</strong>: ${message}
          </div>
          <button type="button" class="btn-close ${type === 'warning' ? '' : 'btn-close-white'} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
    }
  };

  // 6. Blog Dynamic Category Counts, Live Search & Category Filter
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-post-item');
  const noBlogResults = document.getElementById('noBlogResults');
  const searchQueryText = document.getElementById('searchQueryText');
  const resetBlogSearchBtn = document.getElementById('resetBlogSearchBtn');
  const catItems = document.querySelectorAll('.vh-cat-item');

  let activeCategory = null;

  // Calculate each category count dynamically from actual article records
  function updateCategoryCounts() {
    const currentCards = document.querySelectorAll('.blog-post-item');
    const currentCatItems = document.querySelectorAll('.vh-cat-item');
    if (!currentCatItems.length) return;

    const counts = {};
    currentCards.forEach(item => {
      const cat = (item.getAttribute('data-category') || '').trim().toLowerCase();
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    currentCatItems.forEach(item => {
      const filterKey = (item.getAttribute('data-filter') || '').trim().toLowerCase();
      const badge = item.querySelector('.vh-cat-badge');
      if (badge && filterKey) {
        badge.textContent = counts[filterKey] !== undefined ? counts[filterKey] : 0;
      }
    });
  }

  // Expose globally so external or test scripts can trigger dynamic recount
  window.updateBlogCategoryCounts = updateCategoryCounts;
  updateCategoryCounts();

  function applyBlogFilters() {
    const q = (blogSearchInput ? blogSearchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    blogCards.forEach(item => {
      const title = (item.getAttribute('data-title') || '').toLowerCase();
      const desc = (item.getAttribute('data-desc') || '').toLowerCase();
      const cat = (item.getAttribute('data-category') || '').toLowerCase();
      const text = item.textContent.toLowerCase();

      // Check category match
      const matchesCategory = !activeCategory || cat === activeCategory;

      // Check text search query match
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || cat.includes(q) || text.includes(q);

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noBlogResults) {
      if (visibleCount === 0) {
        noBlogResults.classList.remove('d-none');
        if (searchQueryText) {
          const activeItem = document.querySelector(`.vh-cat-item[data-filter="${activeCategory}"] .vh-cat-name`);
          searchQueryText.textContent = q || (activeItem ? activeItem.innerText.trim() : 'selected filters');
        }
      } else {
        noBlogResults.classList.add('d-none');
      }
    }
  }

  if (blogCards.length > 0) {
    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', applyBlogFilters);
      blogSearchInput.addEventListener('keyup', applyBlogFilters);
    }

    if (resetBlogSearchBtn) {
      resetBlogSearchBtn.addEventListener('click', function () {
        if (blogSearchInput) blogSearchInput.value = '';
        activeCategory = null;
        catItems.forEach(c => c.classList.remove('active'));
        applyBlogFilters();
      });
    }

    catItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const filterVal = (this.getAttribute('data-filter') || '').trim().toLowerCase();
        const wasActive = this.classList.contains('active');
        catItems.forEach(c => c.classList.remove('active'));

        if (wasActive) {
          activeCategory = null;
        } else {
          this.classList.add('active');
          activeCategory = filterVal;
        }
        applyBlogFilters();
      });
    });
  }

  // 7. Navbar Active Link & Smooth Scroll
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Desktop Hover Dropdown Controller (Hover to open, mouseleave to close, no flicker)
  const navDropdowns = document.querySelectorAll('.navbar-nav .nav-item.dropdown');
  navDropdowns.forEach(dropdown => {
    let hideTimeout = null;

    const showDropdown = () => {
      if (window.innerWidth >= 992) {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        dropdown.classList.add('is-hover');
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (menu) menu.classList.add('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const hideDropdown = () => {
      if (window.innerWidth >= 992) {
        hideTimeout = setTimeout(() => {
          dropdown.classList.remove('is-hover');
          const menu = dropdown.querySelector('.dropdown-menu');
          const toggle = dropdown.querySelector('.dropdown-toggle');
          if (menu) menu.classList.remove('show');
          if (toggle) {
            toggle.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }, 100);
      }
    };

    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', () => {
      hideDropdown();
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) menu.classList.remove('has-item-hover');
    });

    // When hovering over an item, mark menu so non-hovered active items yield background
    const items = dropdown.querySelectorAll('.dropdown-item');
    const menu = dropdown.querySelector('.dropdown-menu');
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (menu) menu.classList.add('has-item-hover');
      });
    });
    if (menu) {
      menu.addEventListener('mouseleave', () => {
        menu.classList.remove('has-item-hover');
      });
    }

    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth >= 992) {
          e.preventDefault();
          const menu = dropdown.querySelector('.dropdown-menu');
          if (menu && menu.classList.contains('show')) {
            hideDropdown();
          } else {
            showDropdown();
          }
        }
      });
    }
  });

  // 8. Dummy Form Submissions with feedback
  const dummyForms = document.querySelectorAll('.vh-dummy-form');
  dummyForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const actionMessage = this.getAttribute('data-success-msg') || 'Action completed successfully!';
      window.showToast('Inspection Portal', actionMessage, 'success');
      this.reset();
    });
  });

  // 9. External Footer Social Links in New Tab (Guaranteed Cross-Browser Behavior)
  function setupFooterSocialLinks() {
    const socialLinks = document.querySelectorAll(`
      .vh-footer a[href^="http"],
      .vh-footer a[href*="facebook.com"],
      .vh-footer a[href*="twitter.com"],
      .vh-footer a[href*="x.com"],
      .vh-footer a[href*="linkedin.com"],
      .vh-footer a[href*="instagram.com"],
      .vh-footer a[aria-label="Facebook"],
      .vh-footer a[aria-label="Twitter"],
      .vh-footer a[aria-label="LinkedIn"],
      .vh-footer a[aria-label="Instagram"]
    `);

    socialLinks.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href') || this.href;
        if (url && url !== '#') {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  setupFooterSocialLinks();

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVeriHome);
} else {
  initVeriHome();
}
