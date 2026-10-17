/**
 * VeriHome - Customer Dashboard Logic & Persistence
 * Manages Inspections, Bookings, Profile Settings, PDF Generation, and Gallery
 */

(function () {
  'use strict';

  // LocalStorage Keys
  const STORAGE_KEY_INSPECTIONS = 'verihome_inspections';
  const STORAGE_KEY_PROFILE = 'verihome_profile';

  // Default Sample Inspections
  const DEFAULT_INSPECTIONS = [
    {
      id: 'VH-2026-889',
      address: '482 Maple Avenue',
      cityState: 'Oakridge, IL',
      zip: '60126',
      sqft: 2850,
      serviceName: 'Comprehensive Pre-Purchase Assessment',
      serviceCode: 'prepurchase',
      addons: ['Roof & Attic Audit', 'Thermal Moisture Scan'],
      price: 489,
      date: '2026-10-28',
      formattedDate: 'Oct 28, 2026',
      timeSlot: 'Morning (9:00 AM - 1:00 PM)',
      inspector: 'John R. Davis, CMI®',
      inspectorTitle: 'Lead Certified Master Inspector',
      inspectorPhone: '(800) 555-4663 ext. 104',
      inspectorPhoto: 'assets/images/inspector-1.jpg',
      status: 'Report Ready',
      statusBadge: 'bg-success-subtle text-success',
      hasReport: true,
      reportUrl: 'sample-report.html',
      score: 94,
      findings: {
        major: 1,
        safety: 2,
        minor: 3,
        passed: 386
      },
      notes: 'Chimney step flashing uplift and breaker panel double-tap documented for seller repair addendum.'
    },
    {
      id: 'VH-2026-942',
      address: '104 Willow Ridge Road',
      cityState: 'Naperville, IL',
      zip: '60540',
      sqft: 3200,
      serviceName: 'Comprehensive + Sewer Scope',
      serviceCode: 'elite',
      addons: ['Sewer Lateral Scope (+$195)'],
      price: 684,
      date: '2026-11-03',
      formattedDate: 'Nov 3, 2026',
      timeSlot: 'Morning (10:00 AM - 1:30 PM)',
      inspector: 'Sarah Jenkins, P.E.',
      inspectorTitle: 'Senior Structural Specialist',
      inspectorPhone: '(800) 555-4663 ext. 108',
      inspectorPhoto: 'assets/images/inspector-2.jpg',
      status: 'Inspection Scheduled',
      statusBadge: 'bg-warning-subtle text-warning-emphasis',
      hasReport: false,
      reportUrl: null,
      score: null,
      findings: null,
      notes: 'Inspection confirmed. Arrival window: 9:45 AM - 10:00 AM. Thermal scan and sewer lateral equipment pre-checked.'
    },
    {
      id: 'VH-2025-412',
      address: '712 North Clark St, #4B',
      cityState: 'Chicago, IL',
      zip: '60654',
      sqft: 1450,
      serviceName: 'Condo / Townhome Inspection',
      serviceCode: 'condo',
      addons: [],
      price: 299,
      date: '2025-08-14',
      formattedDate: 'Aug 14, 2025',
      timeSlot: 'Afternoon (1:30 PM - 5:30 PM)',
      inspector: 'John R. Davis, CMI®',
      inspectorTitle: 'Lead Certified Master Inspector',
      inspectorPhone: '(800) 555-4663 ext. 104',
      inspectorPhoto: 'assets/images/inspector-1.jpg',
      status: 'Archived',
      statusBadge: 'bg-secondary-subtle text-dark dark-text-light',
      hasReport: true,
      reportUrl: 'sample-report.html',
      score: 91,
      findings: {
        major: 0,
        safety: 1,
        minor: 4,
        passed: 215
      },
      notes: 'Archived pre-purchase condo evaluation. HVAC condensate drain advisory issued.'
    }
  ];

  // Default Profile Data
  const DEFAULT_PROFILE = {
    firstName: 'David',
    lastName: 'Miller',
    email: 'david@example.com',
    phone: '(555) 345-6789',
    agentName: 'Samantha Lawrence (Compass)',
    agentEmail: 'samantha@compass.com'
  };

  // Inspection Photos (Reusing local blog photos)
  const INSPECTION_PHOTOS = [
    {
      id: 'photo-1',
      title: 'Roof: Shingle Uplift & Step Flashing Gap',
      category: 'Major Defect',
      badgeClass: 'badge-major-defect',
      image: 'assets/images/blog-card-roof-defects.jpg',
      caption: 'Measured 1.5" shingle gap with active moisture intrusion at chimney base and compromised step flashing.',
      property: '482 Maple Avenue, Oakridge, IL'
    },
    {
      id: 'photo-2',
      title: 'Electrical: Double Tap Slot A16 & Neutral Overload',
      category: 'Safety Hazard',
      badgeClass: 'badge-safety-hazard',
      image: 'assets/images/blog-card-electrical-safety.jpg',
      caption: 'Attention tag placed on kitchen branch circuit; multitester resistance detected on neutral bus bar.',
      property: '482 Maple Avenue, Oakridge, IL'
    },
    {
      id: 'photo-3',
      title: 'Thermal Imaging: Wall Insulation Voids',
      category: 'Thermal Scan',
      badgeClass: 'bg-info text-white',
      image: 'assets/images/blog-card-thermal-moisture.jpg',
      caption: 'Infrared FLIR radiometric scan confirms temperature delta and missing batts behind master bath drywall.',
      property: '482 Maple Avenue, Oakridge, IL'
    },
    {
      id: 'photo-4',
      title: 'Foundation: Exterior Masonry Step Cracks',
      category: 'Structural Finding',
      badgeClass: 'badge-maintenance',
      image: 'assets/images/blog-card-foundation-cracks.jpg',
      caption: '3mm diagonal stair-step crack along southwest foundation wall requiring monitoring for hydrostatic settlement.',
      property: '104 Willow Ridge Road, Naperville, IL'
    },
    {
      id: 'photo-5',
      title: 'Plumbing: Sewer Lateral Root Intrusion',
      category: 'Plumbing Assessment',
      badgeClass: 'bg-primary text-white',
      image: 'assets/images/blog-card-sewer-scope-inspection.jpg',
      caption: 'High-resolution bore-scope video captured fine root intrusion 34 feet down line near city sewer main junction.',
      property: '104 Willow Ridge Road, Naperville, IL'
    },
    {
      id: 'photo-6',
      title: 'HVAC: Attic Air Handler Condensate Pan Corrosion',
      category: 'Maintenance Advisory',
      badgeClass: 'badge-maintenance',
      image: 'assets/images/blog-card-inspection-negotiation.jpg',
      caption: 'Secondary drain pan shows surface oxidation and missing overflow float safety shutoff switch.',
      property: '712 North Clark St, Chicago, IL'
    }
  ];

  /* --------------------------------------------------------------------------
     Data Access Helpers
     -------------------------------------------------------------------------- */

  function getInspections() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INSPECTIONS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading inspections from localStorage:', e);
    }
    // Seed default inspections
    localStorage.setItem(STORAGE_KEY_INSPECTIONS, JSON.stringify(DEFAULT_INSPECTIONS));
    return DEFAULT_INSPECTIONS;
  }

  function saveInspections(list) {
    try {
      localStorage.setItem(STORAGE_KEY_INSPECTIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving inspections to localStorage:', e);
    }
  }

  function getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Object.assign({}, DEFAULT_PROFILE, parsed);
      }
    } catch (e) {
      console.warn('Error reading profile from localStorage:', e);
    }
    // Seed default profile
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }

  function saveProfile(data) {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving profile to localStorage:', e);
    }
  }

  /* --------------------------------------------------------------------------
     Tab Switching Navigation
     -------------------------------------------------------------------------- */

  window.switchCustomerTab = function (tabId, clickedEl) {
    const cleanId = (tabId || '').replace('#', '');
    const tabPanes = document.querySelectorAll('.customer-view-tab');
    tabPanes.forEach(pane => {
      pane.style.display = 'none';
    });

    const targetPane = document.getElementById(cleanId);
    if (targetPane) {
      targetPane.style.display = 'block';
    }

    // Update active sidebar link
    document.querySelectorAll('.dash-nav-item').forEach(link => {
      link.classList.remove('active');
    });

    let navTargetId = cleanId;
    if (cleanId === 'tab-report-view') {
      navTargetId = 'tab-reports';
    }

    const matchingNav = document.querySelector(`.dash-sidebar a[href="#${navTargetId}"]`);
    if (matchingNav) {
      matchingNav.classList.add('active');
    } else if (clickedEl && clickedEl.classList.contains('dash-nav-item')) {
      clickedEl.classList.add('active');
    }

    // Update active tablet nav tab button (Issue 13)
    document.querySelectorAll('.dash-tablet-nav .dash-tab-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === navTargetId) {
        btn.classList.add('active');
      }
    });

    // Close mobile sidebar drawer if open
    const sidebar = document.getElementById('dashSidebar');
    const backdrop = document.getElementById('dashBackdrop');
    if (sidebar && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      if (backdrop) backdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    // Update window hash cleanly
    try {
      const hashName = cleanId.replace('tab-', '');
      if (window.history.replaceState) {
        window.history.replaceState(null, null, '#' + hashName);
      }
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* --------------------------------------------------------------------------
     Profile Management
     -------------------------------------------------------------------------- */

  function renderProfileUI() {
    const profile = getProfile();

    // 1. Header user avatar & name
    const initials = ((profile.firstName ? profile.firstName[0] : '') +
                      (profile.lastName ? profile.lastName[0] : '')).toUpperCase() || 'DM';
    const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'David Miller';

    document.querySelectorAll('.user-avatar-initials').forEach(el => {
      el.textContent = initials;
    });

    document.querySelectorAll('.user-profile-fullname').forEach(el => {
      el.textContent = fullName;
    });

    document.querySelectorAll('.user-profile-email').forEach(el => {
      el.textContent = profile.email || 'david@example.com';
    });

    // 2. Overview banner greeting
    const overviewGreeting = document.getElementById('overviewGreeting');
    if (overviewGreeting) {
      overviewGreeting.textContent = `Welcome Back, ${profile.firstName || 'Client'}!`;
    }

    // 3. Fill profile form inputs
    const fnInput = document.getElementById('profileFirstName');
    const lnInput = document.getElementById('profileLastName');
    const emInput = document.getElementById('profileEmail');
    const phInput = document.getElementById('profilePhone');
    const agnInput = document.getElementById('profileAgentName');
    const ageInput = document.getElementById('profileAgentEmail');

    if (fnInput) fnInput.value = profile.firstName || '';
    if (lnInput) lnInput.value = profile.lastName || '';
    if (emInput) emInput.value = profile.email || '';
    if (phInput) phInput.value = profile.phone || '';
    if (agnInput) agnInput.value = profile.agentName || '';
    if (ageInput) ageInput.value = profile.agentEmail || '';
  }

  function initProfileForm() {
    const profileForm = document.getElementById('customerProfileForm');
    if (!profileForm) return;

    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = (document.getElementById('profileFirstName')?.value || '').trim();
      const lastName = (document.getElementById('profileLastName')?.value || '').trim();
      const email = (document.getElementById('profileEmail')?.value || '').trim();
      const phone = (document.getElementById('profilePhone')?.value || '').trim();
      const agentName = (document.getElementById('profileAgentName')?.value || '').trim();
      const agentEmail = (document.getElementById('profileAgentEmail')?.value || '').trim();

      if (!firstName || !lastName || !email) {
        if (window.showToast) {
          window.showToast('Validation Error', 'First name, last name, and email address are required.', 'danger');
        }
        return;
      }

      const updatedProfile = {
        firstName,
        lastName,
        email,
        phone,
        agentName,
        agentEmail
      };

      saveProfile(updatedProfile);
      renderProfileUI();

      if (window.showToast) {
        window.showToast('Profile Updated', 'Your profile details and real estate agent contact have been saved.', 'success');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Booking Form & Pricing Calculator
     -------------------------------------------------------------------------- */

  const SERVICE_PRICES = {
    prepurchase: { name: 'Comprehensive Pre-Purchase Assessment', base: 489 },
    standard: { name: 'Standard Full Home Inspection', base: 349 },
    condo: { name: 'Condo / Townhome Inspection', base: 299 },
    elite: { name: 'Elite Shield Bundle (Inspection + Radon + Sewer)', base: 749 }
  };

  function calculateBookingPrice() {
    const scopeSelect = document.getElementById('bookInspectionScope');
    const sewerCheck = document.getElementById('bookAddonSewer');
    const radonCheck = document.getElementById('bookAddonRadon');
    const priceDisplay = document.getElementById('bookCalculatedPrice');

    if (!scopeSelect || !priceDisplay) return 489;

    const selectedScope = scopeSelect.value || 'prepurchase';
    const pkg = SERVICE_PRICES[selectedScope] || SERVICE_PRICES.prepurchase;
    let total = pkg.base;

    if (sewerCheck && sewerCheck.checked) total += 195;
    if (radonCheck && radonCheck.checked) total += 175;

    priceDisplay.textContent = '$' + total;
    return total;
  }

  function initBookingForm() {
    const form = document.getElementById('inspectionBookingForm');
    const scopeSelect = document.getElementById('bookInspectionScope');
    const sewerCheck = document.getElementById('bookAddonSewer');
    const radonCheck = document.getElementById('bookAddonRadon');

    if (scopeSelect) scopeSelect.addEventListener('change', calculateBookingPrice);
    if (sewerCheck) sewerCheck.addEventListener('change', calculateBookingPrice);
    if (radonCheck) radonCheck.addEventListener('change', calculateBookingPrice);
    calculateBookingPrice();

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const address = (document.getElementById('bookAddress')?.value || '').trim();
      const cityState = (document.getElementById('bookCityState')?.value || '').trim();
      const zip = (document.getElementById('bookZip')?.value || '').trim();
      const sqft = parseInt(document.getElementById('bookSqft')?.value, 10);
      const scopeCode = document.getElementById('bookInspectionScope')?.value || 'prepurchase';
      const date = document.getElementById('bookDate')?.value;
      const timeSlotSelect = document.getElementById('bookTimeSlot');
      const timeSlotValue = timeSlotSelect ? timeSlotSelect.value : 'morning';

      // Validation
      if (!address || !cityState || !zip || !sqft || sqft < 100 || !date) {
        if (window.showToast) {
          window.showToast('Booking Incomplete', 'Please fill in all required property, square footage, and date fields.', 'warning');
        }
        return;
      }

      // Collect Add-ons
      const addons = [];
      if (sewerCheck && sewerCheck.checked) addons.push('Sewer Lateral Scope (+$195)');
      if (radonCheck && radonCheck.checked) addons.push('48-Hr Radon Test (+$175)');

      const serviceInfo = SERVICE_PRICES[scopeCode] || SERVICE_PRICES.prepurchase;
      const totalPrice = calculateBookingPrice();

      // Format Date
      let formattedDate = date;
      try {
        const parts = date.split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      } catch (err) {}

      const timeSlotText = timeSlotValue === 'morning' ? 'Morning (9:00 AM - 1:00 PM)' : 'Afternoon (1:30 PM - 5:30 PM)';

      // Unique ID
      const newId = 'VH-2026-' + Math.floor(100 + Math.random() * 900);

      const newRecord = {
        id: newId,
        address,
        cityState,
        zip,
        sqft,
        serviceName: serviceInfo.name,
        serviceCode: scopeCode,
        addons,
        price: totalPrice,
        date,
        formattedDate,
        timeSlot: timeSlotText,
        inspector: 'Sarah Jenkins, P.E.',
        inspectorTitle: 'Senior Structural Specialist',
        inspectorPhone: '(800) 555-4663 ext. 108',
        inspectorPhoto: 'assets/images/inspector-2.jpg',
        status: 'Inspection Scheduled',
        statusBadge: 'bg-warning-subtle text-warning-emphasis',
        hasReport: false,
        reportUrl: null,
        score: null,
        findings: null,
        notes: `New booking submitted via Client Portal on ${new Date().toLocaleDateString()}. Dispatch team notified.`
      };

      // Save to localStorage
      const list = getInspections();
      list.unshift(newRecord);
      saveInspections(list);

      // Reset form
      form.reset();
      calculateBookingPrice();

      // Show genuine success message
      if (window.showToast) {
        window.showToast(
          'Booking Confirmed!',
          `Your inspection for ${address} has been successfully scheduled (#${newId}).`,
          'success'
        );
      }

      // Re-render table and update dashboard
      renderInspectionsTable();
      updateOverviewWidgets();

      // Navigate to My Inspections tab
      window.switchCustomerTab('tab-appointments');
    });
  }

  /* --------------------------------------------------------------------------
     My Inspections Table Rendering & Action Buttons
     -------------------------------------------------------------------------- */

  function renderInspectionsTable() {
    const tbody = document.getElementById('myInspectionsTableBody');
    if (!tbody) return;

    const list = getInspections();
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-5 text-muted">
            <i class="bi bi-calendar-x fs-1 d-block mb-2 text-secondary opacity-50"></i>
            No inspection appointments found. Click <strong>"Book New Inspection"</strong> to schedule one.
          </td>
        </tr>
      `;
      return;
    }

    list.forEach(item => {
      const tr = document.createElement('tr');

      // Addon badges
      let addonsHtml = '';
      if (item.addons && item.addons.length > 0) {
        addonsHtml = `<div class="mt-1 d-flex flex-wrap gap-1">` +
          item.addons.map(a => `<span class="badge bg-secondary-subtle text-secondary" style="font-size: 0.7rem;">${escapeHtml(a.replace(/\s*\(\+.*\)/, ''))}</span>`).join('') +
          `</div>`;
      }

      // Action buttons
      let reportBtn = '';
      if (item.hasReport) {
        reportBtn = `
          <button type="button" class="vh-dash-btn vh-dash-btn-primary" onclick="window.openDigitalReport('${escapeHtml(item.id)}')" title="View interactive digital diagnostic report">
            <i class="bi bi-file-earmark-check"></i>View Report
          </button>
        `;
      } else {
        reportBtn = `
          <button class="vh-dash-btn vh-dash-btn-outline text-muted" onclick="window.showReportPendingModal('${escapeHtml(item.id)}')" title="Inspection is in progress / report pending">
            <i class="bi bi-clock-history"></i>In Progress
          </button>
        `;
      }

      let downloadBtn = '';
      if (item.hasReport) {
        downloadBtn = `
          <button class="vh-dash-btn vh-dash-btn-outline" onclick="window.downloadInspectionReport('${escapeHtml(item.id)}')" title="Download official certified PDF inspection report">
            <i class="bi bi-download"></i>Download
          </button>
        `;
      } else {
        downloadBtn = `
          <button class="vh-dash-btn vh-dash-btn-disabled" disabled title="Official PDF report will become available once the on-site inspection is completed.">
            <i class="bi bi-download"></i>Download
          </button>
        `;
      }

      tr.innerHTML = `
        <td class="ps-4">
          <strong class="d-block text-dark dark-text-light">${escapeHtml(item.address)}</strong>
          <small class="text-muted">${escapeHtml(item.cityState)} ${escapeHtml(item.zip)} • ${item.sqft ? item.sqft.toLocaleString() + ' sq ft' : ''}</small>
        </td>
        <td>
          <span class="d-block fw-semibold text-dark dark-text-light">${escapeHtml(item.serviceName)}</span>
          <small class="text-primary fw-bold">$${item.price}</small>
          ${addonsHtml}
        </td>
        <td>
          <span class="d-block fw-semibold text-dark dark-text-light">${escapeHtml(item.formattedDate || item.date)}</span>
          <small class="text-muted">${escapeHtml(item.timeSlot || 'Morning Window')}</small>
        </td>
        <td>
          <span class="d-block fw-semibold text-dark dark-text-light">${escapeHtml(item.inspector || 'John R. Davis, CMI®')}</span>
          <small class="text-muted">${escapeHtml(item.inspectorTitle || 'Certified Inspector')}</small>
        </td>
        <td>
          <span class="badge ${item.statusBadge || 'bg-secondary-subtle text-dark'}">${escapeHtml(item.status)}</span>
        </td>
        <td class="text-end pe-4 text-nowrap">
          <div class="d-inline-flex align-items-center gap-1">
            <button class="vh-dash-btn vh-dash-btn-secondary" onclick="window.openInspectionDetails('${escapeHtml(item.id)}')" title="View complete property and inspection details">
              <i class="bi bi-info-circle"></i>Details
            </button>
            ${reportBtn}
            ${downloadBtn}
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  /* --------------------------------------------------------------------------
     Overview Widgets Update
     -------------------------------------------------------------------------- */

  function updateOverviewWidgets() {
    const list = getInspections();
    if (list.length === 0) return;

    // Upcoming inspection card
    const upcoming = list.find(i => i.status === 'Inspection Scheduled' || i.status === 'Booking Requested');
    const upcomingContainer = document.getElementById('overviewUpcomingCard');
    if (upcomingContainer && upcoming) {
      upcomingContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Upcoming Booking</h5>
          <span class="badge ${upcoming.statusBadge}">${escapeHtml(upcoming.status)}</span>
        </div>
        <h6 class="fw-bold text-primary mb-1">${escapeHtml(upcoming.address)}</h6>
        <p class="text-muted small mb-3">${escapeHtml(upcoming.cityState)} • ${upcoming.sqft ? upcoming.sqft.toLocaleString() + ' sq ft' : ''}</p>
        
        <div class="p-3 rounded-3 bg-light mb-3 small" style="background-color: var(--vh-bg-subtle) !important;">
          <div><i class="bi bi-calendar-event me-2 text-primary"></i><strong>${escapeHtml(upcoming.formattedDate || upcoming.date)}</strong></div>
          <div><i class="bi bi-clock me-2 text-primary"></i>${escapeHtml(upcoming.timeSlot)}</div>
          <div><i class="bi bi-person-badge me-2 text-primary"></i>Inspector: ${escapeHtml(upcoming.inspector)}</div>
        </div>

        <button class="btn btn-sm btn-vh-outline w-100" onclick="window.openInspectionDetails('${escapeHtml(upcoming.id)}')">
          <i class="bi bi-info-circle me-1"></i>View Appointment Details
        </button>
      `;
    }
  }

  /* --------------------------------------------------------------------------
     Inspection Details Modal
     -------------------------------------------------------------------------- */

  window.openInspectionDetails = function (id) {
    const list = getInspections();
    const item = list.find(i => i.id === id);
    if (!item) return;

    const modalTitle = document.getElementById('detailsModalTitle');
    const modalBody = document.getElementById('detailsModalBody');

    if (modalTitle) {
      modalTitle.textContent = `Inspection Details — ${item.address}`;
    }

    let reportSection = '';
    if (item.hasReport) {
      reportSection = `
        <div class="p-3 rounded-3 border bg-success-subtle mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <strong class="text-success"><i class="bi bi-patch-check-fill me-1"></i>Digital Diagnostic Report Published</strong>
            <span class="badge bg-success">Overall Score: ${item.score || 94}/100</span>
          </div>
          <p class="small text-muted mb-2">The full interactive diagnostic report, high-resolution photo evidence, and repair estimates are ready for viewing.</p>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-vh-primary" onclick="window.openDigitalReportFromModal('${escapeHtml(item.id)}')">
              <i class="bi bi-eye me-1"></i>Open Full Report
            </button>
            <button class="btn btn-sm btn-vh-outline" onclick="window.downloadInspectionReport('${escapeHtml(item.id)}')">
              <i class="bi bi-download me-1"></i>Download Official PDF
            </button>
          </div>
        </div>
      `;
    } else {
      reportSection = `
        <div class="p-3 rounded-3 border bg-warning-subtle mb-3">
          <strong class="text-warning-emphasis"><i class="bi bi-hourglass-split me-1"></i>Report In Progress</strong>
          <p class="small text-muted mb-0 mt-1">This inspection is scheduled for <strong>${escapeHtml(item.formattedDate || item.date)}</strong>. Once the certified inspector completes on-site diagnostics, the digital report and downloadable PDF will be published here within 24 hours.</p>
        </div>
      `;
    }

    let addonsList = 'None';
    if (item.addons && item.addons.length > 0) {
      addonsList = item.addons.join(', ');
    }

    if (modalBody) {
      modalBody.innerHTML = `
        <div class="d-flex justify-content-between align-items-start mb-3 border-bottom pb-3">
          <div>
            <h5 class="fw-bold mb-0 text-primary">${escapeHtml(item.address)}</h5>
            <small class="text-muted">${escapeHtml(item.cityState)} ${escapeHtml(item.zip)} • Approx. ${item.sqft ? item.sqft.toLocaleString() + ' sq ft' : 'N/A'}</small>
          </div>
          <span class="badge ${item.statusBadge || 'bg-secondary'} fs-6">${escapeHtml(item.status)}</span>
        </div>

        ${reportSection}

        <div class="row g-3 mb-3">
          <div class="col-sm-6">
            <div class="p-3 rounded-3 border bg-light h-100" style="background-color: var(--vh-bg-subtle) !important;">
              <small class="text-muted d-block fw-semibold">ORDER INFORMATION</small>
              <div class="fw-bold text-dark dark-text-light mt-1">Order #${escapeHtml(item.id)}</div>
              <div class="small text-muted mt-1">Package: <strong>${escapeHtml(item.serviceName)}</strong></div>
              <div class="small text-muted">Add-ons: ${escapeHtml(addonsList)}</div>
              <div class="small text-primary fw-bold mt-2">Total Service Fee: $${item.price}.00</div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 rounded-3 border bg-light h-100" style="background-color: var(--vh-bg-subtle) !important;">
              <small class="text-muted d-block fw-semibold">APPOINTMENT SCHEDULE</small>
              <div class="fw-bold text-dark dark-text-light mt-1">${escapeHtml(item.formattedDate || item.date)}</div>
              <div class="small text-muted mt-1"><i class="bi bi-clock me-1"></i>${escapeHtml(item.timeSlot || 'Morning')}</div>
              <div class="small text-muted mt-2"><i class="bi bi-person-badge me-1"></i>Inspector: <strong>${escapeHtml(item.inspector || 'John R. Davis')}</strong></div>
              <div class="small text-muted">${escapeHtml(item.inspectorTitle || 'Certified Master Inspector')}</div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-3 border bg-light small" style="background-color: var(--vh-bg-subtle) !important;">
          <small class="text-muted d-block fw-semibold">INSPECTOR & DISPATCH NOTES</small>
          <p class="text-muted mb-0 mt-1">${escapeHtml(item.notes || 'No extra notes.')}</p>
        </div>
      `;
    }

    const modalEl = document.getElementById('inspectionDetailsModal');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  };

  window.showReportPendingModal = function (id) {
    const list = getInspections();
    const item = list.find(i => i.id === id);
    const title = item ? item.address : 'Inspection';
    const date = item ? (item.formattedDate || item.date) : 'Upcoming date';

    if (window.showToast) {
      window.showToast(
        'Report In Progress',
        `The inspection report for ${title} is scheduled for ${date}. Digital reports are published within 24 hours of on-site evaluation.`,
        'warning'
      );
    }
  };

  /* --------------------------------------------------------------------------
     Client-Side PDF Generation & Download (PDF 1.4 Standard Binary)
     -------------------------------------------------------------------------- */

  function sanitizePdfText(str) {
    if (!str) return '';
    return String(str).replace(/[\\()]/g, '');
  }

  function generateInspectionPdfBlob(inspection, profile) {
    const address = sanitizePdfText(inspection.address || '482 Maple Avenue');
    const cityState = sanitizePdfText(inspection.cityState || 'Oakridge, IL');
    const zip = sanitizePdfText(inspection.zip || '60126');
    const id = sanitizePdfText(inspection.id || 'VH-2026-889');
    const dateStr = sanitizePdfText(inspection.formattedDate || inspection.date || 'Oct 28, 2026');
    const service = sanitizePdfText(inspection.serviceName || 'Comprehensive Pre-Purchase Assessment');
    const addons = (inspection.addons && inspection.addons.length) ? sanitizePdfText(inspection.addons.join(', ')) : 'None';
    const sqft = inspection.sqft ? inspection.sqft.toLocaleString() : '2,850';
    const price = inspection.price || 489;
    const inspector = sanitizePdfText(inspection.inspector || 'John R. Davis, CMI');
    const status = sanitizePdfText(inspection.status || 'Report Ready');
    const clientName = sanitizePdfText((profile && (profile.firstName + ' ' + profile.lastName)) || 'David Miller');
    const clientEmail = sanitizePdfText((profile && profile.email) || 'david@example.com');

    const streamLines = [
      '0.05 0.12 0.20 rg 0 710 612 82 re f',
      '0.96 0.62 0.04 rg 0 706 612 4 re f',
      'BT /F1 18 Tf 1 1 1 rg 36 752 Td (VERIHOME PROPERTY ASSESSMENT REPORT) Tj ET',
      'BT /F2 10 Tf 0.90 0.92 0.95 rg 36 732 Td (Official Certified Pre-Purchase Inspection Documentation) Tj ET',
      '0.96 0.97 0.99 rg 36 615 540 76 re f',
      '0.85 0.88 0.92 RG 1 w 36 615 540 76 re S',
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 48 672 Td (Inspection Order: ) Tj /F2 10 Tf (${id}) Tj ET`,
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 310 672 Td (Inspection Date: ) Tj /F2 10 Tf (${dateStr}) Tj ET`,
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 48 652 Td (Property Address: ) Tj /F2 10 Tf (${address}, ${cityState} ${zip}) Tj ET`,
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 310 652 Td (Report Status: ) Tj /F1 10 Tf 0.10 0.65 0.35 rg (${status}) Tj ET`,
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 48 632 Td (Client: ) Tj /F2 10 Tf (${clientName} [${clientEmail}]) Tj ET`,
      `BT /F1 10 Tf 0.08 0.15 0.25 rg 310 632 Td (Inspector: ) Tj /F2 10 Tf (${inspector}) Tj ET`,
      'BT /F1 12 Tf 0.08 0.15 0.25 rg 36 584 Td (1. INSPECTION SCOPE & SPECIFICATIONS) Tj ET',
      '0.85 0.88 0.92 RG 1 w 36 576 540 0.5 re S',
      `BT /F1 9.5 Tf 0.2 0.2 0.2 rg 44 558 Td (Service Scope:) Tj /F2 9.5 Tf ( ${service}) Tj ET`,
      `BT /F1 9.5 Tf 0.2 0.2 0.2 rg 44 542 Td (Included Add-Ons:) Tj /F2 9.5 Tf ( ${addons}) Tj ET`,
      `BT /F1 9.5 Tf 0.2 0.2 0.2 rg 44 526 Td (Square Footage:) Tj /F2 9.5 Tf ( ${sqft} sq ft) Tj ET`,
      `BT /F1 9.5 Tf 0.2 0.2 0.2 rg 310 526 Td (Total Fee:) Tj /F2 9.5 Tf ( $${price}.00) Tj ET`,
      'BT /F1 12 Tf 0.08 0.15 0.25 rg 36 492 Td (2. EXECUTIVE FINDINGS SUMMARY) Tj ET',
      '0.85 0.88 0.92 RG 1 w 36 484 540 0.5 re S',
      'BT /F1 10.5 Tf 0.10 0.65 0.35 rg 44 466 Td (Overall Property Condition Score: 94 / 100 [PASSED / ACCEPTABLE]) Tj ET',
      'BT /F1 9.5 Tf 0.85 0.20 0.20 rg 44 446 Td ([MAJOR DEFECT] Roof & Chimney Flashing Gap) Tj ET',
      'BT /F2 9 Tf 0.3 0.3 0.3 rg 56 433 Td (Active 1.5 inch shingle gap with degraded step flashing observed at south chimney saddle.) Tj ET',
      'BT /F1 9.5 Tf 0.85 0.20 0.20 rg 44 414 Td ([SAFETY HAZARD] Main Circuit Breaker Panel Double-Tap) Tj ET',
      'BT /F2 9 Tf 0.3 0.3 0.3 rg 56 401 Td (Breaker slot A16 contains double-tapped conductors violating NEC 408.54. Licensed electrician required.) Tj ET',
      'BT /F1 9.5 Tf 0.90 0.55 0.10 rg 44 382 Td ([SAFETY HAZARD] Water Heater TPR Discharge Pipe) Tj ET',
      'BT /F2 9 Tf 0.3 0.3 0.3 rg 56 369 Td (Temperature-Pressure Relief valve drain terminates >6 inches above floor grade. Simple extension needed.) Tj ET',
      'BT /F1 9.5 Tf 0.25 0.45 0.70 rg 44 350 Td ([MINOR ADVISORY] Exterior Condenser Fin Wear & Trim Paint) Tj ET',
      'BT /F2 9 Tf 0.3 0.3 0.3 rg 56 337 Td (Exterior AC condenser coils show minor fin distortion; cosmetic weathering on north fascia trim.) Tj ET',
      'BT /F1 9.5 Tf 0.10 0.65 0.35 rg 44 318 Td ([VERIFIED SOUND] 386 Standard Diagnostic Systems Checked & Passed) Tj ET',
      'BT /F2 9 Tf 0.3 0.3 0.3 rg 56 305 Td (Foundation, attic framing, plumbing supply, sewer lateral, and interior fixtures operating properly.) Tj ET',
      'BT /F1 12 Tf 0.08 0.15 0.25 rg 36 270 Td (3. VERIHOME CERTIFICATION & ACCREDITATION) Tj ET',
      '0.85 0.88 0.92 RG 1 w 36 262 540 0.5 re S',
      'BT /F2 8.5 Tf 0.35 0.35 0.35 rg 44 246 Td (This comprehensive home inspection was conducted strictly adhering to InterNACHI and ASHI Standards) Tj ET',
      'BT /F2 8.5 Tf 0.35 0.35 0.35 rg 44 234 Td (of Practice. High-definition radiometric thermal photography and digital records are stored securely) Tj ET',
      'BT /F2 8.5 Tf 0.35 0.35 0.35 rg 44 222 Td (in the VeriHome Cloud Vault. For questions or contractor referrals, contact VeriHome Client Services.) Tj ET',
      `BT /F1 9.5 Tf 0.08 0.15 0.25 rg 44 195 Td (Certified Inspector: ${inspector}) Tj ET`,
      'BT /F2 8.5 Tf 0.4 0.4 0.4 rg 44 182 Td (National Home Inspector Lic. #IL-450-00892 | InterNACHI Certified Master Inspector) Tj ET',
      'BT /F1 9.5 Tf 0.08 0.15 0.25 rg 310 195 Td (Client Support Hotline:) Tj ET',
      'BT /F2 8.5 Tf 0.4 0.4 0.4 rg 310 182 Td ((800) 555-4663 | support@verihome.com) Tj ET',
      '0.96 0.97 0.99 rg 0 0 612 36 re f',
      '0.85 0.88 0.92 RG 1 w 0 36 612 0.5 re S',
      `BT /F2 8 Tf 0.5 0.5 0.5 rg 36 14 Td (VeriHome Inspection Services - Confidential Client Document - ${address}) Tj ET`,
      'BT /F2 8 Tf 0.5 0.5 0.5 rg 520 14 Td (Page 1 of 1) Tj ET'
    ];

    const contentStream = streamLines.join('\n');
    const streamLength = new TextEncoder().encode(contentStream).length;

    let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets = [];

    function addObj(str) {
      offsets.push(new TextEncoder().encode(pdf).length);
      pdf += str + '\n';
    }

    addObj('1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n>>\nendobj');
    addObj('2 0 obj\n<<\n  /Type /Pages\n  /Kids [3 0 R]\n  /Count 1\n>>\nendobj');
    addObj('3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 612 792]\n  /Resources <<\n    /Font <<\n      /F1 4 0 R\n      /F2 5 0 R\n    >>\n  >>\n  /Contents 6 0 R\n>>\nendobj');
    addObj('4 0 obj\n<<\n  /Type /Font\n  /Subtype /Type1\n  /BaseFont /Helvetica-Bold\n  /Encoding /WinAnsiEncoding\n>>\nendobj');
    addObj('5 0 obj\n<<\n  /Type /Font\n  /Subtype /Type1\n  /BaseFont /Helvetica\n  /Encoding /WinAnsiEncoding\n>>\nendobj');
    addObj(`6 0 obj\n<<\n  /Length ${streamLength}\n>>\nstream\n${contentStream}\nendstream\nendobj`);

    const xrefOffset = new TextEncoder().encode(pdf).length;
    pdf += 'xref\n0 7\n0000000000 65535 f \n';
    for (let i = 0; i < offsets.length; i++) {
      pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    }
    pdf += `trailer\n<<\n  /Size 7\n  /Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    // Convert to Uint8Array safely (handles binary bytes)
    const bytes = new Uint8Array(pdf.length);
    for (let i = 0; i < pdf.length; i++) {
      bytes[i] = pdf.charCodeAt(i) & 0xff;
    }

    return new Blob([bytes], { type: 'application/pdf' });
  }

  window.downloadInspectionReport = function (id) {
    const list = getInspections();
    const item = list.find(i => i.id === id);

    if (!item) {
      if (window.showToast) window.showToast('Error', 'Inspection record not found.', 'danger');
      return;
    }

    if (!item.hasReport) {
      window.showReportPendingModal(id);
      return;
    }

    const profile = getProfile();
    const blob = generateInspectionPdfBlob(item, profile);

    // Slugify filename
    const slug = (item.address || 'inspection-report')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const filename = `inspection-report-${slug}.pdf`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);

    if (window.showToast) {
      window.showToast(
        'Report Downloaded',
        `Official PDF report for ${item.address} downloaded successfully (${filename}).`,
        'success'
      );
    }
  };

  /* --------------------------------------------------------------------------
     Inspection Photos Gallery & Lightbox
     -------------------------------------------------------------------------- */

  function renderPhotosGallery() {
    const container = document.getElementById('inspectionPhotosGrid');
    if (!container) return;

    container.innerHTML = '';
    INSPECTION_PHOTOS.forEach(photo => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6';
      col.setAttribute('data-property', photo.property);
      col.innerHTML = `
        <div class="vh-card vh-photo-card p-2">
          <div class="vh-photo-img-wrapper rounded-3 mb-2 position-relative cursor-pointer" onclick="window.openPhotoPreview('${photo.id}')" title="Click to view high-resolution photo">
            <img src="${photo.image}" alt="${escapeHtml(photo.title)}" loading="lazy">
            <span class="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-white">
              <i class="bi bi-zoom-in me-1"></i>HD Photo
            </span>
          </div>
          <div class="p-2 d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="badge ${photo.badgeClass}">${escapeHtml(photo.category)}</span>
              <small class="text-muted" style="font-size: 0.72rem;">${escapeHtml(photo.property.split(',')[0])}</small>
            </div>
            <h6 class="fw-bold mb-1 small text-dark dark-text-light">${escapeHtml(photo.title)}</h6>
            <p class="text-muted small mb-3 flex-grow-1" style="font-size: 0.8rem; line-height: 1.35;">${escapeHtml(photo.caption)}</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
              <button class="btn btn-xs btn-outline-primary" onclick="window.openPhotoPreview('${photo.id}')">
                <i class="bi bi-arrows-fullscreen me-1"></i>Enlarge
              </button>
              <a href="${photo.image}" download class="btn btn-xs btn-vh-outline text-muted" title="Download original high-res photo">
                <i class="bi bi-download me-1"></i>Save
              </a>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  window.filterPhotosByProperty = function (propertyQuery, btnEl) {
    if (btnEl) {
      document.querySelectorAll('#photoPropertyFilters .photo-prop-filter').forEach(b => {
        b.classList.remove('active', 'btn-vh-primary');
        b.classList.add('btn-vh-outline');
      });
      btnEl.classList.add('active', 'btn-vh-primary');
      btnEl.classList.remove('btn-vh-outline');
    }

    const container = document.getElementById('inspectionPhotosGrid');
    if (!container) return;

    const cols = container.children;
    const query = (propertyQuery || 'all').toLowerCase().trim();

    Array.from(cols).forEach(col => {
      if (query === 'all') {
        col.style.display = 'block';
      } else {
        const prop = (col.getAttribute('data-property') || '').toLowerCase();
        if (prop.includes(query)) {
          col.style.display = 'block';
        } else {
          col.style.display = 'none';
        }
      }
    });
  };

  window.viewPhotosForProperty = function (propertyQuery) {
    window.switchCustomerTab('tab-photos');
    const cleanSearch = (propertyQuery || '').split(',')[0].trim();
    let matchedBtn = null;
    document.querySelectorAll('#photoPropertyFilters .photo-prop-filter').forEach(b => {
      const btnText = b.textContent.toLowerCase();
      const firstWord = cleanSearch.toLowerCase().split(' ')[0] || '';
      const secondWord = cleanSearch.toLowerCase().split(' ')[1] || '';
      if (btnText.includes(firstWord) || (secondWord && btnText.includes(secondWord))) {
        matchedBtn = b;
      }
    });
    window.filterPhotosByProperty(cleanSearch || 'all', matchedBtn);
  };

  window.openPhotoPreview = function (id) {
    const photo = INSPECTION_PHOTOS.find(p => p.id === id);
    if (!photo) return;

    const modalTitle = document.getElementById('photoPreviewTitle');
    const modalImg = document.getElementById('photoPreviewImage');
    const modalCaption = document.getElementById('photoPreviewCaption');
    const modalDownload = document.getElementById('photoPreviewDownload');

    if (modalTitle) modalTitle.textContent = photo.title;
    if (modalImg) modalImg.src = photo.image;
    if (modalCaption) {
      modalCaption.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge ${photo.badgeClass}">${escapeHtml(photo.category)}</span>
          <small class="text-muted">${escapeHtml(photo.property)}</small>
        </div>
        <p class="mb-0 text-dark dark-text-light">${escapeHtml(photo.caption)}</p>
      `;
    }
    if (modalDownload) modalDownload.href = photo.image;

    const modalEl = document.getElementById('photoPreviewModal');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  };

  /* --------------------------------------------------------------------------
     Inspector Direct Messages
     -------------------------------------------------------------------------- */

  function initMessages() {
    const form = document.getElementById('customerMessageForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const textarea = form.querySelector('textarea');
      const text = (textarea?.value || '').trim();
      if (!text) return;

      const thread = document.getElementById('inspectorMessageThread');
      if (thread) {
        const profile = getProfile();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'd-flex align-items-start gap-3 mb-3 p-3 rounded-3 vh-message-bubble vh-message-bubble-user border';
        msgDiv.innerHTML = `
          <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style="width: 40px; height: 40px;">
            ${(profile.firstName[0] || 'D') + (profile.lastName[0] || 'M')}
          </div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <strong class="text-dark dark-text-light">${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)} (You)</strong>
              <small class="text-muted">Just now</small>
            </div>
            <p class="text-dark dark-text-light small mt-1 mb-0">${escapeHtml(text)}</p>
          </div>
        `;
        thread.appendChild(msgDiv);
      }

      form.reset();
      if (window.showToast) {
        window.showToast('Message Sent', 'Your inquiry has been dispatched to Lead Inspector John R. Davis.', 'success');
      }
    });
  }

  /* --------------------------------------------------------------------------
     HTML Escaping Helper
     -------------------------------------------------------------------------- */

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* --------------------------------------------------------------------------
     In-Page Digital Inspection Report Logic & Findings
     -------------------------------------------------------------------------- */

  let currentActiveReportInspectionId = 'VH-2026-889';

  const REPORT_FINDINGS = [
    {
      id: 'finding-1',
      system: 'roof',
      systemName: 'Section 2.1 - Roof Coverings',
      severity: 'MAJOR DEFECT',
      severityBadge: 'badge-major-defect',
      borderClass: 'major-border',
      statusText: 'Requires Immediate Action',
      statusClass: 'text-danger',
      statusIcon: 'bi-clock-history',
      title: 'Cracked Shingles & Damaged Flashing Around Chimney',
      description: '<strong>Finding:</strong> Asphalt architectural shingles adjacent to the chimney flashing on the south slope exhibit broken seal tabs and cracked flashing sealant. With an inspector ruler gauge, approximately 1.5 inches of shingle uplift was recorded. Active signs of moisture intrusion were noted on the roof deck underlayment.',
      recommendation: 'Engage a licensed roofing contractor to replace affected shingles and reinstall galvanized step flashing before closing. Estimated repair cost: $800 - $1,400.',
      image: 'assets/images/defect-roof.jpg',
      photoCaption: 'Photo 2.1A: 1.5" shingle gap measured'
    },
    {
      id: 'finding-2',
      system: 'electrical',
      systemName: 'Section 5.3 - Service Panel',
      severity: 'SAFETY HAZARD',
      severityBadge: 'badge-safety-hazard',
      borderClass: 'safety-border',
      statusText: 'Fire & Shock Hazard',
      statusClass: 'text-danger',
      statusIcon: 'bi-lightning-charge',
      title: 'Double-Tapped Circuit Breaker in Kitchen Branch Line',
      description: '<strong>Finding:</strong> Inside the main 200A Siemens electrical breaker panel, breaker slot A16 (Kitchen Outlets) has two conductors attached under a single terminal lug that is only rated for one wire. Klein Tools digital multimeter recorded resistance variance and potential arcing risk under high load.',
      recommendation: 'A licensed master electrician must properly pigtail the wires or install an approved tandem/piggyback breaker. Estimated repair cost: $150 - $250.',
      image: 'assets/images/defect-electrical.jpg',
      photoCaption: 'Photo 5.3B: Attention Required tag on slot A16'
    },
    {
      id: 'finding-3',
      system: 'plumbing',
      systemName: 'Section 6.4 - Water Heating Equipment',
      severity: 'SAFETY HAZARD',
      severityBadge: 'badge-safety-hazard',
      borderClass: 'safety-border',
      statusText: 'Scald / Pressure Hazard',
      statusClass: 'text-warning-emphasis',
      statusIcon: 'bi-shield-exclamation',
      title: 'Water Heater TPR Relief Valve Missing Discharge Tube',
      description: '<strong>Finding:</strong> The 50-gallon gas water heater in the basement has an operational Temperature & Pressure Relief (TPR) valve, but the discharge port lacks an extension pipe directed downward to within 6 inches of the floor drain. If excess pressure builds, scalding hot steam could project outward horizontally.',
      recommendation: 'Install a rigid 3/4-inch copper or CPVC discharge pipe extending downward to prevent scalding. Estimated repair cost: $60 - $120.',
      image: 'assets/images/defect-water-heater-tpr.jpg',
      photoCaption: 'Photo 6.4A: Unpiped TPR relief discharge valve'
    },
    {
      id: 'finding-4',
      system: 'hvac',
      systemName: 'Section 7.2 - Cooling Equipment',
      severity: 'MINOR DEFECT',
      severityBadge: 'badge-minor-defect',
      borderClass: 'minor-border',
      statusText: 'Maintenance Needed',
      statusClass: 'text-muted',
      statusIcon: 'bi-info-circle',
      title: 'AC Exterior Condenser Coil Fins Bent & Restricted Airflow',
      description: '<strong>Finding:</strong> The outdoor condensing unit has roughly 15% crushed aluminum coil fins along the lower perimeter, likely caused by weed trimmers. System operated normally with a 18°F temperature differential, but reduced airflow lowers seasonal energy efficiency.',
      recommendation: 'Comb coil fins straight using an HVAC fin comb tool during routine spring service. Estimated cost: $80 - $150.',
      image: 'assets/images/defect-ac-condenser-fins.jpg',
      photoCaption: 'Photo 7.2A: Bent aluminum condenser coil fins'
    },
    {
      id: 'finding-5',
      system: 'plumbing',
      systemName: 'Section 6.2 - Fixtures & Drain Waste Vent',
      severity: 'MINOR DEFECT',
      severityBadge: 'badge-minor-defect',
      borderClass: 'minor-border',
      statusText: 'Minor Seepage',
      statusClass: 'text-muted',
      statusIcon: 'bi-droplet-half',
      title: 'Under-Sink PVC P-Trap Slip-Nut Seepage',
      description: '<strong>Finding:</strong> Moisture testing beneath the primary bathroom vanity revealed active dripping along the slip-joint nut of the 1-1/2" PVC P-trap during continuous drainage testing. Rubber gasket has dry-rotted. Minor wood swelling noted on vanity cabinet base.',
      recommendation: 'Replace rubber slip-joint beveled washer and hand-tighten PVC compression nut. Estimated repair cost: $40 - $75.',
      image: 'assets/images/defect-plumbing-ptrap.jpg',
      photoCaption: 'Photo 6.2B: Active water droplet on PVC trap'
    },
    {
      id: 'finding-6',
      system: 'structure',
      systemName: 'Section 1.1 - Foundation & Framing',
      severity: 'SATISFACTORY',
      severityBadge: 'badge-satisfactory',
      borderClass: 'passed-border',
      statusText: 'Structurally Sound',
      statusClass: 'text-success',
      statusIcon: 'bi-check-circle-fill',
      title: 'Poured Concrete Foundation & Main Steel Support I-Beam',
      description: '<strong>Finding:</strong> Foundation walls, crawlspace stem walls, and steel support posts were inspected and verified with a Zip-Level digital altimeter. Minor hairline curing cracks (< 1/16") were observed, which are typical for concrete hydration. No settlement displacement or water efflorescence was found.',
      recommendation: 'Structure and load-bearing framing meet InterNACHI standards in good serviceable condition. No structural repairs needed.',
      image: 'assets/images/satisfactory-foundation.jpg',
      photoCaption: 'Photo 1.1A: Plumb poured concrete foundation wall'
    },
    {
      id: 'finding-7',
      system: 'electrical',
      systemName: 'Section 5.1 - Main Service Equipment',
      severity: 'SATISFACTORY',
      severityBadge: 'badge-satisfactory',
      borderClass: 'passed-border',
      statusText: 'Fully Compliant',
      statusClass: 'text-success',
      statusIcon: 'bi-check-circle-fill',
      title: '200-Amp Main Service Disconnect & Grounding Electrode System',
      description: '<strong>Finding:</strong> Main service copper conductors, 200A main breaker disconnect, neutral/ground bonding bus, and dual driven ground rods were inspected. Dead front panel was removed; thermal imaging confirmed normal baseline operating temperatures under full simulated load.',
      recommendation: 'Clean, code-compliant residential electrical distribution panel with proper wire gauges and clear labeling.',
      image: 'assets/images/satisfactory-electrical-panel.jpg',
      photoCaption: 'Photo 5.1A: Clean 200A service panel interior'
    }
  ];

  /* --------------------------------------------------------------------------
     Condo Specific Report Findings (712 North Clark St, #4B - VH-2025-412)
     -------------------------------------------------------------------------- */

  const REPORT_FINDINGS_712_CLARK = [
    {
      id: 'clark-finding-1',
      system: 'electrical',
      systemName: 'Section 4.2 - Interior Subpanel',
      severity: 'SAFETY HAZARD',
      severityBadge: 'badge-safety-hazard',
      borderClass: 'safety-border',
      statusText: 'Abrasion / Short Risk',
      statusClass: 'text-danger',
      statusIcon: 'bi-lightning-charge',
      title: 'Missing Protective Romex Cable Clamp at 100A Subpanel Knockout',
      description: '<strong>Finding:</strong> Inside the hallway flush-mount 100A Square D subpanel, 12/2 NM-B Romex branch circuits enter through an open stamped metal knockout without an approved plastic insulating bushing or two-screw cable clamp. Vibration or cable movement over time poses an insulation abrasion and short circuit hazard.',
      recommendation: 'A licensed electrician should de-energize the subpanel, install approved push-in snap bushings or twin-screw NM clamps, and secure all branch conductors. Estimated repair cost: $95 - $160.',
      image: 'assets/images/blog-card-electrical-safety.jpg',
      photoCaption: 'Photo 4.2A: Unclamped NM cable entry at upper right panel knockout'
    },
    {
      id: 'clark-finding-2',
      system: 'hvac',
      systemName: 'Section 5.1 - Living Area PTAC Heat Pump',
      severity: 'MINOR DEFECT',
      severityBadge: 'badge-minor-defect',
      borderClass: 'minor-border',
      statusText: 'Maintenance Advisory',
      statusClass: 'text-warning-emphasis',
      statusIcon: 'bi-droplet-half',
      title: 'Condensate Drain Pan Biofilm Sludge & Washable Filter Bypass',
      description: '<strong>Finding:</strong> The Packaged Terminal Air Conditioner (PTAC) unit servicing the living room showed standing condensate sludge in the drain pan and loose perimeter seal on the washable mesh filter. Condensate gravity drain discharged slowly during 20-minute operational test.',
      recommendation: 'Clean drain pan with antimicrobial pan tablets, blow out condensate line, and reseat/replace washable filtration cartridge. Estimated service cost: $75 - $125.',
      image: 'assets/images/blog-card-inspection-negotiation.jpg',
      photoCaption: 'Photo 5.1B: Surface residue in PTAC condensate collector pan'
    },
    {
      id: 'clark-finding-3',
      system: 'structure',
      systemName: 'Section 3.4 - Balcony & Exterior Openings',
      severity: 'MINOR DEFECT',
      severityBadge: 'badge-minor-defect',
      borderClass: 'minor-border',
      statusText: 'Mechanical Resistance',
      statusClass: 'text-muted',
      statusIcon: 'bi-door-open',
      title: 'Balcony Heavy Roller Resistance & Scored Sliding Door Track',
      description: '<strong>Finding:</strong> The 8-foot exterior aluminum sliding glass door leading to the private balcony requires excessive effort (>25 lbs of pull force) to operate. Inspection revealed debris buildup, salt air oxidation, and worn lower nylon tandem rollers riding directly on the track stainless cap.',
      recommendation: 'Clean track assembly, replace worn bottom tandem roller wheels, and lubricate with dry silicone spray. Estimated repair cost: $140 - $220.',
      image: 'assets/images/blog-card-foundation-cracks.jpg',
      photoCaption: 'Photo 3.4A: Scored lower slider track & worn nylon wheel'
    },
    {
      id: 'clark-finding-4',
      system: 'plumbing',
      systemName: 'Section 6.3 - Laundry Supply Connections',
      severity: 'MINOR DEFECT',
      severityBadge: 'badge-minor-defect',
      borderClass: 'minor-border',
      statusText: 'Stem Packing Weep',
      statusClass: 'text-muted',
      statusIcon: 'bi-droplet',
      title: 'Ball Valve Stem Packing Moisture at Laundry Cold Supply',
      description: '<strong>Finding:</strong> During static water pressure testing, minor moisture seepage was observed around the stem packing nut of the cold water washing machine shut-off ball valve when exercised. Braided stainless steel hoses are in good condition.',
      recommendation: 'Snug valve stem packing nut 1/4 turn or replace valve assembly if weeping persists. Estimated repair cost: $50 - $90.',
      image: 'assets/images/defect-plumbing-ptrap.jpg',
      photoCaption: 'Photo 6.3B: Water droplet at valve stem packing nut'
    },
    {
      id: 'clark-finding-5',
      system: 'structure',
      systemName: 'Section 1.3 - Shared Demising Wall',
      severity: 'SATISFACTORY',
      severityBadge: 'badge-satisfactory',
      borderClass: 'passed-border',
      statusText: '1-Hour Fire Rated',
      statusClass: 'text-success',
      statusIcon: 'bi-shield-check',
      title: 'Double 5/8" Type-X Fire-Rated Gypsum Wallboard Intact',
      description: '<strong>Finding:</strong> Demising wall separating Unit 4B from common corridor was inspected for penetrations and integrity. Acoustic sealant joints, electrical penetration putty pads, and fire-caulk seals are intact with no breaches or unsealed penetrations.',
      recommendation: 'Demising firewall meets condominium building code standards and provides proper 1-hour fire separation. In sound condition.',
      image: 'assets/images/satisfactory-foundation.jpg',
      photoCaption: 'Photo 1.3A: Code-compliant fire separation assembly'
    },
    {
      id: 'clark-finding-6',
      system: 'electrical',
      systemName: 'Section 7.1 - Life Safety Devices',
      severity: 'SATISFACTORY',
      severityBadge: 'badge-satisfactory',
      borderClass: 'passed-border',
      statusText: 'Fully Operational',
      statusClass: 'text-success',
      statusIcon: 'bi-check-circle-fill',
      title: '10-Year Sealed Lithium Battery Smoke & CO Alarms Operational',
      description: '<strong>Finding:</strong> All smoke alarms in bedrooms and hallway tested with aerosol detector tester; strobe and 85dB alarm horn responded simultaneously across all units. CO detector in hallway is within 7-year manufacturer service life.',
      recommendation: 'Life safety detection systems fully operational and compliant with municipal condominium ordinances. No action required.',
      image: 'assets/images/satisfactory-electrical-panel.jpg',
      photoCaption: 'Photo 7.1A: Tested operational life safety alarms'
    }
  ];

  /* --------------------------------------------------------------------------
     Inspection Cards Generator (Matching Screenshot Exactly)
     -------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     1. My Inspections: Appointment Tracking Card Generator
     (Focus: Appointment logistics, status, inspector assignments, and details)
     -------------------------------------------------------------------------- */

  function createAppointmentCardHtml(item) {
    const isCompleted = !!item.hasReport;

    // Inspection Status Badge
    let statusBadgeHtml = '';
    if (item.status === 'Report Ready' || item.status === 'Completed') {
      statusBadgeHtml = `<span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-bold"><i class="bi bi-check-circle-fill me-1"></i>Completed</span>`;
    } else if (item.status === 'Archived') {
      statusBadgeHtml = `<span class="badge bg-secondary-subtle text-dark dark-text-light border border-secondary-subtle rounded-pill px-3 py-1 fw-bold"><i class="bi bi-archive me-1"></i>Archived</span>`;
    } else {
      statusBadgeHtml = `<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-1 fw-bold"><i class="bi bi-calendar-event me-1"></i>Scheduled</span>`;
    }

    // Delivery Status Text & Score Pill
    let deliveryStatusText = '';
    let conditionScorePill = '';
    let secondaryActionBtn = '';

    if (isCompleted) {
      deliveryStatusText = `<strong class="text-success small d-block"><i class="bi bi-patch-check-fill me-1"></i>Report Published (${escapeHtml(item.formattedDate || item.date)})</strong>`;
      conditionScorePill = `<span class="badge bg-success text-white fw-bold px-2 py-1">Score: ${item.score}/100</span>`;
      secondaryActionBtn = `
        <button type="button" class="btn btn-vh-outline" onclick="window.switchCustomerTab('tab-reports')" title="Go to Digital Reports page">
          <i class="bi bi-file-earmark-check me-1"></i>Go to Report
        </button>
      `;
    } else {
      deliveryStatusText = `<strong class="text-warning-emphasis small d-block"><i class="bi bi-hourglass-split me-1"></i>Pending (Guaranteed 24h Turnaround)</strong>`;
      conditionScorePill = `<span class="badge bg-secondary-subtle text-muted px-2 py-1">Awaiting On-Site</span>`;
      secondaryActionBtn = `
        <button type="button" class="btn btn-vh-outline" onclick="window.showReportPendingModal('${escapeHtml(item.id)}')" title="View expected delivery timeline">
          <i class="bi bi-clock-history me-1"></i>Delivery Info
        </button>
      `;
    }

    // Addons snippet
    let addonsHtml = '';
    if (item.addons && item.addons.length > 0) {
      addonsHtml = `<div class="d-flex flex-wrap gap-1 mt-1">` +
        item.addons.map(a => `<span class="badge bg-secondary-subtle text-secondary" style="font-size: 0.7rem;">${escapeHtml(a.replace(/\s*\(\+.*\)/, ''))}</span>`).join('') +
        `</div>`;
    }

    return `
      <div class="col-lg-6 col-12 d-flex">
        <div class="vh-appointment-tracking-card shadow-sm h-100 w-100">
          <!-- Card Header: Order ID + Status -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="badge bg-secondary-subtle text-dark dark-text-light px-2 py-1 rounded small fw-mono">
              <i class="bi bi-hash"></i>${escapeHtml(item.id)}
            </span>
            ${statusBadgeHtml}
          </div>

          <!-- Property Title & Specs -->
          <h5 class="fw-bold mb-1 text-dark dark-text-light">${escapeHtml(item.address)}</h5>
          <p class="text-muted small mb-3">${escapeHtml(item.cityState)} ${escapeHtml(item.zip)} • ${item.sqft ? item.sqft.toLocaleString() + ' sq ft' : 'Residential Property'}</p>

          <!-- Appointment Logistics Box -->
          <div class="p-3 rounded-3 mb-3 small vh-dash-info-box">
            <div class="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
              <span class="text-muted"><i class="bi bi-card-checklist text-primary me-2"></i>Service Scope:</span>
              <strong class="text-dark dark-text-light text-end">${escapeHtml(item.serviceName)}</strong>
            </div>
            ${addonsHtml ? `<div class="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between"><span class="text-muted"><i class="bi bi-plus-circle text-primary me-2"></i>Add-ons:</span>${addonsHtml}</div>` : ''}
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted"><i class="bi bi-calendar3 text-primary me-2"></i>Inspection Date:</span>
              <span class="fw-semibold text-dark dark-text-light">${escapeHtml(item.formattedDate || item.date)}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted"><i class="bi bi-clock text-primary me-2"></i>Time Window:</span>
              <span class="text-dark dark-text-light">${escapeHtml(item.timeSlot || 'Morning Window')}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="text-muted"><i class="bi bi-person-badge text-primary me-2"></i>Assigned Inspector:</span>
              <span class="fw-semibold text-primary">${escapeHtml(item.inspector)}</span>
            </div>
          </div>

          <!-- Status & Delivery Summary Strip -->
          <div class="p-2 px-3 rounded-3 mb-3 small d-flex justify-content-between align-items-center border" style="background-color: var(--vh-bg-surface) !important;">
            <div>
              <small class="text-muted d-block" style="font-size: 0.72rem;">Report Delivery Status:</small>
              ${deliveryStatusText}
            </div>
            ${conditionScorePill}
          </div>

          <!-- Actions Footer: Prioritizes Appointment Details & Booking -->
          <div class="d-flex gap-2 mt-auto pt-2">
            <button type="button" class="btn btn-vh-primary flex-grow-1" onclick="window.openInspectionDetails('${escapeHtml(item.id)}')">
              <i class="bi bi-info-circle me-1"></i>View Inspection Details
            </button>
            ${secondaryActionBtn}
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     2. Digital Reports: Report Delivery & Publication Card Generator
     (Focus: Report availability, cloud viewing, PDF downloads, and photos)
     -------------------------------------------------------------------------- */

  function createDigitalReportCardHtml(item) {
    const isCompleted = !!item.hasReport;

    // Report Publication Badge
    let reportBadgeHtml = '';
    if (item.status === 'Report Ready') {
      reportBadgeHtml = `<span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-bold">Report Published</span>`;
    } else if (item.status === 'Archived') {
      reportBadgeHtml = `<span class="badge bg-secondary-subtle text-dark dark-text-light border border-secondary-subtle rounded-pill px-3 py-1 fw-bold">Archived Report</span>`;
    } else {
      reportBadgeHtml = `<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-1 fw-bold"><i class="bi bi-hourglass-split me-1"></i>Report In Progress</span>`;
    }

    // Subtitle & Point Count
    let subtitle = item.serviceName;
    if (item.id === 'VH-2025-412') {
      subtitle += ' (215 Points Evaluated)';
    } else {
      subtitle += ' (400 Points Evaluated)';
    }

    // Date notice
    const dateNotice = isCompleted ? (item.formattedDate || item.date) : `Expected Delivery: Nov 4, 2026`;

    // Condition Score Box or Pending Delivery Box
    let scoreOrPendingBoxHtml = '';
    let photoAccessSnippet = '';
    let reportActionButtons = '';

    if (isCompleted) {
      scoreOrPendingBoxHtml = `
        <div class="p-3 rounded-3 mb-3 small d-flex justify-content-between align-items-center vh-dash-score-box">
          <div>
            <span class="text-muted fw-medium d-block">Overall Condition Score</span>
            <small class="text-success"><i class="bi bi-shield-check me-1"></i>Verified InterNACHI® SOP Audit</small>
          </div>
          <strong class="text-success h4 mb-0 fw-bold">${item.score} / 100</strong>
        </div>
      `;

      const photoCount = item.id === 'VH-2025-412' ? '1 HD Photo' : '3 HD Photos';
      photoAccessSnippet = `
        <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1" onclick="window.viewPhotosForProperty('${escapeHtml(item.address)}')">
          <span>View ${photoCount}</span><i class="bi bi-arrow-right"></i>
        </button>
      `;

      reportActionButtons = `
        <button type="button" class="btn btn-vh-primary flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2" onclick="window.openDigitalReport('${escapeHtml(item.id)}')">
          <i class="bi bi-eye"></i><span>View Digital Report</span>
        </button>
        <button type="button" class="btn btn-vh-outline px-3" onclick="window.downloadInspectionReport('${escapeHtml(item.id)}')" title="Download official certified PDF report">
          <i class="bi bi-download"></i>
        </button>
      `;
    } else {
      scoreOrPendingBoxHtml = `
        <div class="p-3 rounded-3 mb-3 small d-flex justify-content-between align-items-center vh-dash-score-box">
          <div>
            <span class="text-muted fw-medium d-block">Report Delivery Status</span>
            <small class="text-warning-emphasis"><i class="bi bi-clock-history me-1"></i>On-Site Assessment: ${escapeHtml(item.formattedDate || item.date)}</small>
          </div>
          <span class="badge bg-warning text-dark px-2 py-1 fw-bold">In Preparation</span>
        </div>
      `;

      photoAccessSnippet = `<span class="text-muted fst-italic">Capturing during inspection</span>`;

      reportActionButtons = `
        <button type="button" class="btn btn-vh-outline text-muted flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2" onclick="window.showReportPendingModal('${escapeHtml(item.id)}')">
          <i class="bi bi-lock me-1"></i><span>Report In Preparation</span>
        </button>
        <button type="button" class="btn btn-vh-outline text-muted px-3" disabled title="Download will unlock once certified on-site assessment is completed and published.">
          <i class="bi bi-download opacity-50"></i>
        </button>
      `;
    }

    return `
      <div class="col-lg-6 col-12 d-flex">
        <div class="vh-digital-report-card shadow-sm h-100 w-100">
          <!-- Top Row: Report Status Pill + Publication Date / ETA -->
          <div class="d-flex justify-content-between align-items-start mb-3">
            ${reportBadgeHtml}
            <span class="text-muted small fw-medium">${escapeHtml(dateNotice)}</span>
          </div>

          <!-- Report Property Title -->
          <h5 class="fw-bold mb-1 text-dark dark-text-light">${escapeHtml(item.address)}</h5>
          <p class="text-muted small mb-2">${escapeHtml(subtitle)}</p>
          <div class="small text-muted mb-3 d-flex align-items-center gap-2 flex-wrap" style="font-size: 0.78rem;">
            <span><i class="bi bi-file-earmark-text text-primary me-1"></i>Report #${escapeHtml(item.id)}</span>
            <span>•</span>
            <span>Inspector: ${escapeHtml(item.inspector)}</span>
          </div>

          <!-- Score or In Preparation Box -->
          <div class="mt-auto">
            ${scoreOrPendingBoxHtml}

            <!-- Associated Photo Access Strip -->
            <div class="d-flex justify-content-between align-items-center mb-3 p-2 px-3 rounded-3 bg-light border small" style="background-color: var(--vh-bg-subtle) !important;">
              <span class="text-muted"><i class="bi bi-camera-fill text-primary me-1"></i>Photo Evidence:</span>
              ${photoAccessSnippet}
            </div>

            <!-- Actions Footer: Prioritizes Report Viewing & PDF Download -->
            <div class="d-flex gap-2">
              ${reportActionButtons}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderInspectionCards() {
    const container = document.getElementById('myInspectionsCardsContainer');
    if (!container) return;

    const list = getInspections();
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-calendar-x fs-1 d-block mb-2 text-secondary opacity-50"></i>
          No inspection records found. Click <strong>"Book New Inspection"</strong> to schedule one.
        </div>
      `;
      return;
    }

    list.forEach(item => {
      container.innerHTML += createAppointmentCardHtml(item);
    });
  }

  function renderDigitalReportsCards() {
    const container = document.getElementById('digitalReportsCardsContainer');
    if (!container) return;

    const list = getInspections();
    container.innerHTML = '';

    list.forEach(item => {
      container.innerHTML += createDigitalReportCardHtml(item);
    });
  }

  window.switchInspectionViewMode = function (mode) {
    const cardsContainer = document.getElementById('myInspectionsCardsContainer');
    const tableContainer = document.getElementById('myInspectionsTableContainer');
    const btnCards = document.getElementById('btnViewModeCards');
    const btnTable = document.getElementById('btnViewModeTable');

    if (mode === 'table') {
      if (cardsContainer) cardsContainer.style.display = 'none';
      if (tableContainer) tableContainer.style.display = 'block';
      if (btnCards) btnCards.classList.remove('active');
      if (btnTable) btnTable.classList.add('active');
    } else {
      if (cardsContainer) cardsContainer.style.display = 'flex';
      if (tableContainer) tableContainer.style.display = 'none';
      if (btnCards) btnCards.classList.add('active');
      if (btnTable) btnTable.classList.remove('active');
    }
  };

  window.showReportPendingModal = function (id) {
    const list = getInspections();
    const item = list.find(i => i.id === id) || {
      address: '104 Willow Ridge Road',
      serviceName: 'Comprehensive + Sewer Scope Inspection',
      cityState: 'Naperville, IL',
      formattedDate: 'Thursday, Nov 3, 2026'
    };

    const modalAddress = document.getElementById('pendingModalAddress');
    const modalDetails = document.getElementById('pendingModalDetails');
    const modalDate = document.getElementById('pendingModalDate');

    if (modalAddress) modalAddress.textContent = item.address;
    if (modalDetails) modalDetails.textContent = `${item.serviceName} • ${item.cityState}`;
    if (modalDate) modalDate.textContent = item.formattedDate || item.date;

    const modalEl = document.getElementById('reportPendingModal');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  };

  /* --------------------------------------------------------------------------
     Digital Inspection Report View (Property-Specific Findings)
     -------------------------------------------------------------------------- */

  function renderDigitalReportView(inspection) {
    const container = document.getElementById('digitalReportDynamicContainer');
    if (!container) return;

    const profile = getProfile();
    const isCondo = (inspection.id === 'VH-2025-412');
    const activeFindings = isCondo ? REPORT_FINDINGS_712_CLARK : REPORT_FINDINGS;
    const score = inspection.score || (isCondo ? 91 : 94);
    const findings = inspection.findings || (isCondo ? { major: 0, safety: 1, minor: 4, passed: 215 } : { major: 1, safety: 2, minor: 3, passed: 386 });

    const propType = isCondo ? 'Condominium (4th Floor Unit 4B)' : 'Single Family (2-Story)';
    const yearBuilt = isCondo ? '2018' : '2014';
    const totalPoints = isCondo ? 215 : 400;
    const frontImg = isCondo ? 'assets/images/blog-card-inspection-negotiation.jpg' : 'assets/images/hero-property.jpg';
    const frontCaption = isCondo ? 'Balcony & Unit Façade Photo' : 'Front Elevation Photo';
    const associatedPhotoCount = isCondo ? 1 : 3;

    // Collect systems for filter buttons
    const systemsMap = {};
    activeFindings.forEach(f => {
      systemsMap[f.system] = (systemsMap[f.system] || 0) + 1;
    });

    const systemLabels = {
      roof: 'Roof & Exterior',
      electrical: 'Electrical',
      plumbing: 'Plumbing',
      hvac: 'HVAC / Heating',
      structure: isCondo ? 'Structure & Balcony' : 'Structure & Foundation'
    };

    let filtersHtml = `<button class="btn btn-sm btn-vh-primary report-dash-filter-btn active" data-filter="all">All Systems (${activeFindings.length})</button>`;
    Object.keys(systemsMap).forEach(sys => {
      filtersHtml += `<button class="btn btn-sm btn-vh-outline report-dash-filter-btn" data-filter="${sys}">${systemLabels[sys] || sys} (${systemsMap[sys]})</button>`;
    });

    container.innerHTML = `
      <!-- Report Header Card -->
      <div class="p-4 rounded-4 border bg-white shadow-sm mb-4" style="background-color: var(--vh-bg-surface) !important;">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <span class="badge bg-success mb-1"><i class="bi bi-check-circle me-1"></i>Official Verified Report #${escapeHtml(inspection.id)}</span>
            <h4 class="fw-bold mb-1 text-dark dark-text-light">${isCondo ? 'Condo / Townhome Assessment' : 'Pre-Purchase Property Assessment'}: ${escapeHtml(inspection.address)}</h4>
            <p class="text-muted small mb-0">${escapeHtml(inspection.cityState)} ${escapeHtml(inspection.zip)} • Inspected on ${escapeHtml(inspection.formattedDate || inspection.date)} by ${escapeHtml(inspection.inspector)}</p>
          </div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <button type="button" class="btn btn-sm btn-vh-outline" onclick="window.viewPhotosForProperty('${escapeHtml(inspection.address)}')">
              <i class="bi bi-images me-1"></i>Associated Photos (${associatedPhotoCount})
            </button>
            <span class="badge bg-success-subtle text-success fs-6 px-3 py-2">Status: ${escapeHtml(inspection.status)}</span>
          </div>
        </div>
      </div>

      <!-- Report Paper Container -->
      <div class="vh-report-paper mb-4">
        <!-- Overview Banner -->
        <div class="report-header-banner">
          <div class="row align-items-center g-4">
            <div class="col-md-3 text-center border-end-md">
              <div class="score-circle mx-auto mb-2">
                <div class="score-circle-inner">
                  <span>${score}%</span>
                  <small style="font-size: 0.65rem; color: #64748b;">SCORE</small>
                </div>
              </div>
              <strong class="text-success d-block">Good Overall Condition</strong>
              <small class="text-muted">${totalPoints} Points Evaluated</small>
            </div>

            <div class="col-md-6">
              <h5 class="fw-bold mb-3 text-dark dark-text-light">Property & Inspection Overview</h5>
              <div class="row g-2 small text-muted">
                <div class="col-sm-6"><strong>Property Type:</strong> ${propType}</div>
                <div class="col-sm-6"><strong>Year Built:</strong> ${yearBuilt}</div>
                <div class="col-sm-6"><strong>Square Footage:</strong> ${inspection.sqft ? inspection.sqft.toLocaleString() + ' sq ft' : (isCondo ? '1,450 sq ft' : '2,850 sq ft')}</div>
                <div class="col-sm-6"><strong>Weather:</strong> ${isCondo ? '72°F, Clear' : '64°F, Clear & Dry'}</div>
                <div class="col-sm-6"><strong>Client Name:</strong> ${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</div>
                <div class="col-sm-6"><strong>Lead Inspector:</strong> ${escapeHtml(inspection.inspector)}</div>
              </div>
            </div>

            <div class="col-md-3 text-center">
              <img src="${frontImg}" alt="${escapeHtml(inspection.address)}" class="img-fluid rounded-3 shadow-sm border mb-2 w-100 object-fit-cover" style="height: 120px;">
              <small class="text-muted d-block">${frontCaption}</small>
            </div>
          </div>
        </div>

        <!-- Defect Summary Counters -->
        <div class="row g-3 mb-4 text-center">
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3 border bg-danger-subtle border-danger-subtle">
              <div class="display-6 fw-bold text-danger">${findings.major || 0}</div>
              <div class="fw-bold text-danger small">Major Defect</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3 border bg-danger-subtle border-danger-subtle">
              <div class="display-6 fw-bold text-danger">${findings.safety || 0}</div>
              <div class="fw-bold text-danger small">Safety Hazards</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3 border bg-warning-subtle border-warning-subtle">
              <div class="display-6 fw-bold text-warning-emphasis">${findings.minor || 0}</div>
              <div class="fw-bold text-warning-emphasis small">Minor Defects</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3 border bg-success-subtle border-success-subtle">
              <div class="display-6 fw-bold text-success">${findings.passed || (isCondo ? 215 : 386)}</div>
              <div class="fw-bold text-success small">Passed / Satisfactory</div>
            </div>
          </div>
        </div>

        <!-- System Filter Buttons -->
        <div class="d-flex gap-2 flex-wrap mb-4 pb-3 border-bottom" id="dashboardReportFilters">
          ${filtersHtml}
        </div>

        <!-- Findings List -->
        <div id="dashboardFindingsContainer">
          ${activeFindings.map(finding => `
            <div class="finding-card ${finding.borderClass}" data-system="${finding.system}">
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div>
                  <span class="badge ${finding.severityBadge} rounded-pill px-3 py-1 me-2">${finding.severity}</span>
                  <span class="badge bg-secondary-subtle text-dark dark-text-light">${finding.systemName}</span>
                </div>
                <span class="${finding.statusClass} fw-bold small"><i class="bi ${finding.statusIcon} me-1"></i>${finding.statusText}</span>
              </div>

              <div class="row g-4 align-items-center">
                <div class="col-md-8">
                  <h5 class="fw-bold mb-2 text-dark dark-text-light">${escapeHtml(finding.title)}</h5>
                  <p class="text-muted small mb-3">${finding.description}</p>
                  <div class="p-3 bg-light rounded-3 border small" style="background-color: var(--vh-bg-subtle) !important;">
                    <strong class="text-primary d-block mb-1"><i class="bi bi-wrench-adjustable-circle me-1"></i>Inspector Recommendation:</strong>
                    <span class="text-dark dark-text-light">${escapeHtml(finding.recommendation)}</span>
                  </div>
                </div>
                <div class="col-md-4 text-center">
                  <img src="${finding.image}" alt="${escapeHtml(finding.title)}" class="img-fluid rounded-3 shadow-sm border w-100 object-fit-cover cursor-pointer" style="height: 180px;" onclick="window.openPhotoPreviewDirect('${finding.image}', '${escapeHtml(finding.title)}', '${finding.systemName}', '${escapeHtml(inspection.address)}')">
                  <small class="text-muted d-block mt-1">${finding.photoCaption}</small>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Inspector Certification Sign-off -->
        <div class="p-4 rounded-4 border bg-light mt-4" style="background-color: var(--vh-bg-subtle) !important;">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center gap-3">
              <img src="${inspection.inspectorPhoto || 'assets/images/inspector-1.jpg'}" alt="${escapeHtml(inspection.inspector)}" class="rounded-circle shadow border border-2 border-primary" style="width: 54px; height: 54px; object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0 text-dark dark-text-light">${escapeHtml(inspection.inspector)}</h6>
                <small class="text-muted">${escapeHtml(inspection.inspectorTitle || 'Lead Certified Master Inspector')} #9876543</small>
              </div>
            </div>
            <div class="text-md-end">
              <div class="badge bg-success-subtle text-success fw-bold mb-1"><i class="bi bi-award-fill me-1"></i>InterNACHI SOP Verified</div>
              <small class="text-muted d-block">Digitally Signed & Archived: ${escapeHtml(inspection.formattedDate || inspection.date)}</small>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach system filter buttons
    const filterBtns = container.querySelectorAll('.report-dash-filter-btn');
    const findingCards = container.querySelectorAll('.finding-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'btn-vh-primary');
          b.classList.add('btn-vh-outline');
        });
        this.classList.add('active', 'btn-vh-primary');
        this.classList.remove('btn-vh-outline');

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

  window.openDigitalReport = function (id) {
    const list = getInspections();
    const item = list.find(i => i.id === id);

    if (!item) {
      if (window.showToast) window.showToast('Report Not Found', 'The requested inspection record does not exist.', 'danger');
      return;
    }

    if (!item.hasReport) {
      // User rule: Do not allow users to open reports that are unavailable or not authorized for them
      window.showReportPendingModal(item.id);
      return;
    }

    currentActiveReportInspectionId = item.id;
    renderDigitalReportView(item);
    window.switchCustomerTab('tab-report-view');
  };

  window.openDigitalReportFromModal = function (id) {
    const modalEl = document.getElementById('inspectionDetailsModal');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
    }
    setTimeout(() => {
      window.openDigitalReport(id);
    }, 250);
  };

  window.downloadCurrentReport = function () {
    window.downloadInspectionReport(currentActiveReportInspectionId || 'VH-2026-889');
  };

  window.printDigitalReport = function () {
    window.print();
  };

  window.openPhotoPreviewDirect = function (imageSrc, title, category, property) {
    const modalTitle = document.getElementById('photoPreviewTitle');
    const modalImg = document.getElementById('photoPreviewImage');
    const modalCaption = document.getElementById('photoPreviewCaption');
    const modalDownload = document.getElementById('photoPreviewDownload');

    if (modalTitle) modalTitle.textContent = title;
    if (modalImg) modalImg.src = imageSrc;
    if (modalCaption) {
      modalCaption.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="badge bg-primary text-white">${escapeHtml(category)}</span>
          <small class="text-muted">${escapeHtml(property)}</small>
        </div>
        <p class="mb-0 text-dark dark-text-light">${escapeHtml(title)}</p>
      `;
    }
    if (modalDownload) modalDownload.href = imageSrc;

    const modalEl = document.getElementById('photoPreviewModal');
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  };

  /* --------------------------------------------------------------------------
     Initialization on DOM Ready
     -------------------------------------------------------------------------- */

  function initDashboard() {
    // 1. Initial Profile Rendering
    renderProfileUI();
    initProfileForm();

    // 2. Initial Inspections Rendering (Both Table and Cards)
    renderInspectionsTable();
    renderInspectionCards();
    renderDigitalReportsCards();
    initBookingForm();
    updateOverviewWidgets();

    // 3. Initial Photos Rendering
    renderPhotosGallery();

    // 4. Initial Messages
    initMessages();

    // 5. Handle initial hash (e.g. #book, #appointments, #reports)
    const hash = (typeof window !== 'undefined' && window.location && window.location.hash) ? window.location.hash.replace('#', '') : '';
    if (hash) {
      const targetTab = hash.startsWith('tab-') ? hash : 'tab-' + hash;
      const tabEl = document.getElementById(targetTab);
      if (tabEl) {
        window.switchCustomerTab(targetTab);
      } else {
        window.switchCustomerTab('tab-overview');
      }
    } else {
      window.switchCustomerTab('tab-overview');
    }
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }

})();
