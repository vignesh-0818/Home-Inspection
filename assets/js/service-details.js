/**
 * VeriHome - Service Details Dynamic Controller
 * Supports all 6 comprehensive Home Inspection services
 */

(function () {
  'use strict';

  const servicesData = {
    1: {
      id: 1,
      slug: 'comprehensive',
      title: "Comprehensive Home Inspection",
      badge: "Core Service",
      badgeClass: "badge-soft-primary",
      tagline: "A meticulous 400-point physical examination of the home's structure, roof, attic, HVAC systems, plumbing, and electrical panel.",
      image: "assets/images/hero-property.jpg",
      imageAlt: "Comprehensive Home Inspection Property",
      price: "$349",
      priceNote: "/ up to 2,500 sq ft",
      overviewTitle: "Complete Forensic Property Evaluation From Roof to Foundation",
      overviewText: [
        "Whether you are purchasing your first home or maintaining an existing property, an independent 400-point inspection provides an unbiased forensic health assessment of every major system. Cosmetic remodeling frequently masks aged mechanicals, ungrounded wiring, and attic ventilation deficiencies.",
        "Our licensed Master Inspectors spend 3 to 4 hours physically traversing crawlspaces, climbing attics, testing GFCI circuits, evaluating water heater TPR valves, and operating the heating and cooling equipment under full load to give you complete peace of mind."
      ],
      benefitsHeading: "Key Benefits of a Comprehensive Inspection",
      benefits: [
        { icon: "bi-search", color: "text-primary", title: "400-Point Audit", desc: "Exhaustive physical check of structure, mechanicals, exterior drainage, and interior living zones." },
        { icon: "bi-file-earmark-check", color: "text-success", title: "24-Hour Express Report", desc: "Interactive digital report delivered within 24 hours with annotated HD photos and severity filters." },
        { icon: "bi-camera-fill", color: "text-warning", title: "Thermal Moisture Scan", desc: "FLIR infrared thermal scan included to spot latent moisture behind showers and ceilings." },
        { icon: "bi-shield-check", color: "text-danger", title: "InterNACHI Guarantee", desc: "Backed by InterNACHI $10,000 Honor Guarantee and 90-day comprehensive structural warranty." }
      ],
      inspected: [
        "Roof covering, flashing, valleys, gutters, and downspouts",
        "Foundation walls, crawlspace framing, joists, and subflooring",
        "200-Amp electrical service panel, breakers, GFCI/AFCI outlets",
        "Furnace, central AC, heat pump, thermostat, and air ducts",
        "Plumbing supply, DWV drain waste vent pipes, water heater & fixtures",
        "Attic insulation depth, ventilation baffles, and roof rafters",
        "Interior doors, windows, fireplace damper, and smoke detectors"
      ],
      exclusions: [
        "Concealed underground sewer laterals (Available as Sewer Scope Add-on)",
        "Continuous 48-hour radon gas monitoring (Available as Radon Add-on)",
        "Detached outbuildings or swimming pool mechanicals (Add-on available)",
        "Destructive wall or concealed structural testing",
        "Phase I environmental hazardous material testing"
      ],
      pricingFeatures: [
        "Comprehensive 400-Point Audit",
        "FLIR® Thermal Infrared Scan Included",
        "Appliance Recall & Safety Check",
        "24-Hour Express Digital Delivery",
        "$10,000 InterNACHI Guarantee"
      ],
      faqs: [
        { q: "How long does a Comprehensive Home Inspection take?", a: "A standard single-family home (1,500 - 2,500 sq ft) takes approximately 3 to 3.5 hours on-site. Larger or historic homes may take up to 4.5 hours." },
        { q: "Should the buyer attend the inspection?", a: "Yes! We strongly encourage you to attend the final 45 to 60 minutes for a personalized walkthrough where our inspector explains all findings and shutoff locations." },
        { q: "How quickly do I get the digital report?", a: "We guarantee delivery within 24 hours of inspection completion. You will receive an email and text message with a secure link to your interactive report." }
      ]
    },
    2: {
      id: 2,
      slug: 'prepurchase',
      title: "Pre-Purchase Property Assessment",
      badge: "Buyer Essential",
      badgeClass: "badge-soft-warning",
      tagline: "The most comprehensive forensic evaluation designed specifically for prospective buyers in the escrow contingency period.",
      image: "assets/images/prepurchase-niche.jpg",
      imageAlt: "Pre-Purchase Property Assessment",
      price: "$489",
      priceNote: "/ up to 2,500 sq ft",
      overviewTitle: "Why You Need a Pre-Purchase Assessment Before Closing",
      overviewText: [
        "A standard cosmetic walkthrough is not enough when buying real estate. The most expensive hazards—foundation structural fissures, unpermitted electrical subpanels, concealed ceiling water damage, and cracked heat exchangers—are completely invisible during open houses.",
        "Our licensed Master Inspectors spend 3 to 4 hours physically traversing crawlspaces, climbing attics, testing all GFCI circuits, evaluating water heater pressure relief valves, and operating the HVAC system under full load to protect your escrow investment."
      ],
      benefitsHeading: "Key Benefits for Prospective Buyers",
      benefits: [
        { icon: "bi-cash-coin", color: "text-primary", title: "Negotiation Leverage", desc: "Uncover repair estimates backed by empirical photos to request escrow credits, price drops, or seller repairs before closing." },
        { icon: "bi-shield-check", color: "text-success", title: "Contingency Protection", desc: "24-hour express report delivery ensures you have actionable findings well before your contract contingency expiration." },
        { icon: "bi-camera-fill", color: "text-warning", title: "Infrared Thermal Scans", desc: "Included at no extra charge. We scan all bathrooms, kitchens, and ceilings for latent water leaks and insulation gaps." },
        { icon: "bi-exclamation-triangle-fill", color: "text-danger", title: "Safety Hazard Alerts", desc: "Immediate detection of high-risk hazards: carbon monoxide leaks, missing handrails, lead piping, and live electrical panels." }
      ],
      inspected: [
        "Roof shingles, flashing, gutters & downspouts",
        "Foundation walls, crawlspace, joists & subflooring",
        "200-Amp main electrical panel, breakers & wiring",
        "Furnace, heat pump, central AC & ductwork",
        "Water supply, drain lines, water heater & fixtures",
        "Attic insulation depth, ventilation & roof rafters",
        "Interior doors, windows, fireplace & smoke detectors"
      ],
      exclusions: [
        "Concealed in-wall piping (Requires Sewer Scope add-on)",
        "Underground gas line integrity",
        "Radon soil gas levels (Requires 48-hr CRM test add-on)",
        "Swimming pool equipment & pumps (Add-on available)",
        "Environmental lead/asbestos destructive testing"
      ],
      pricingFeatures: [
        "Comprehensive 400-Point Audit",
        "FLIR® Thermal Infrared Scan",
        "4K Aerial Drone Roof Scan",
        "24-Hour Digital Report Guarantee",
        "$10,000 InterNACHI Buy-Back Guarantee"
      ],
      faqs: [
        { q: "Should I attend the inspection in person?", a: "Yes, absolutely! While you don't need to be there for the entire 3.5 hours, we strongly recommend attending the final 45 to 60 minutes for the on-site walkthrough. The inspector will physically show you shutoff valves, explain any defects found, and answer all questions." },
        { q: "When will I receive my digital inspection report?", a: "We guarantee delivery of your full interactive report within 24 hours of inspection completion. You will receive an instant SMS and email with a secure link to view the report on your computer, tablet, or phone, along with a 1-click PDF download option." },
        { q: "Can my real estate agent use this report to negotiate repairs?", a: "Yes! Our digital reports include a built-in 'Create Repair Request' tool. Your agent can check off specific items from the report and automatically generate a formal PDF repair addendum with descriptions and photos to send to the seller." }
      ]
    },
    3: {
      id: 3,
      slug: 'thermal-drone',
      title: "Thermal Infrared & Drone Roof Audit",
      badge: "High Tech Diagnostic",
      badgeClass: "badge-soft-info",
      tagline: "Advanced diagnostic scanning utilizing FLIR® thermography to identify missing insulation and leaks, paired with 4K drone roof imaging.",
      image: "assets/images/thermal-drone.jpg",
      imageAlt: "Thermal Infrared & Drone Roof Audit",
      price: "$249",
      priceNote: "Standalone or $150 Add-on",
      overviewTitle: "High-Resolution Building Science & Aerial Thermography",
      overviewText: [
        "Human vision is limited to surface cosmetics. Building science thermography detects microscopic temperature differences caused by evaporative cooling from hidden water leaks, insulation voids, and overloaded electrical circuits.",
        "Combined with FAA Part 107-licensed 4K aerial drone scans, we capture ultra-high-definition imagery of steep, fragile, or multi-story roof planes without walking on delicate shingles or risking inspector injury."
      ],
      benefitsHeading: "Key Benefits of Thermal & Drone Scans",
      benefits: [
        { icon: "bi-airplane-fill", color: "text-primary", title: "Aerial Drone Mapping", desc: "4K close-up inspection of steep pitches, tall chimney crowns, and complex multi-tier flashing." },
        { icon: "bi-thermometer-half", color: "text-warning", title: "FLIR® Thermal Scans", desc: "Pinpoint hidden moisture plumes behind tiles, tubs, and beneath flat roof membranes." },
        { icon: "bi-lightning-charge-fill", color: "text-danger", title: "Electrical Hotspot Check", desc: "Identify overloaded breakers, loose bus bar lugs, and high-resistance fire hazards." },
        { icon: "bi-snow", color: "text-success", title: "Energy Loss & Insulation", desc: "Locate missing attic insulation, thermal bridging, and drafty window seals." }
      ],
      inspected: [
        "All roof planes, ridges, chimney flashing, and parapet walls via 4K drone",
        "Ceilings, bathroom shower surrounds, and kitchen plumbing walls via FLIR",
        "Main electrical panel bus bar and breakers for abnormal thermal spikes",
        "Attic knee walls, rim joists, and top plates for insulation voids",
        "Exterior windows, door perimeters, and siding thermal envelope seals"
      ],
      exclusions: [
        "Flight operations during active rain, heavy snow, or winds exceeding 20 mph",
        "Destructive opening of finished drywall or tile enclosures",
        "Underground subterranean piping or septic field thermal scans"
      ],
      pricingFeatures: [
        "High-Resolution 4K Aerial Roof Scans",
        "Calibrated FLIR® E8 Thermal Camera Sweeps",
        "Dual-Verification Pinless Moisture Metering",
        "Thermal Color Palette Radiometric Photos",
        "Same-Day Digital Findings Summary"
      ],
      faqs: [
        { q: "How does infrared thermography detect water leaks?", a: "Water evaporation creates a localized cooling effect (2°F to 6°F temperature drop). Our calibrated FLIR cameras detect this thermal gradient, displaying a distinctive cold signature that we confirm with radio-frequency moisture meters." },
        { q: "Are your drone pilots licensed and insured?", a: "Yes. All VeriHome remote drone pilots hold FAA Part 107 Commercial Remote Pilot licenses and carry $1M in commercial aviation liability insurance." },
        { q: "What if it rains on the day of the inspection?", a: "Per FAA regulations, drones cannot fly in heavy rain or high winds. In such cases, we inspect accessible roof areas from ladders and return for the drone flight as soon as weather permits at no extra charge." }
      ]
    },
    4: {
      id: 4,
      slug: 'commercial',
      title: "Commercial Property Assessment",
      badge: "Commercial PCA",
      badgeClass: "badge-soft-dark",
      tagline: "ASTM E2018-compliant Property Condition Assessments (PCA) for offices, retail plazas, multi-family units, and industrial facilities.",
      image: "assets/images/commercial-property.jpg",
      imageAlt: "Commercial Property Assessment",
      price: "$799",
      priceNote: "/ up to 5,000 sq ft",
      overviewTitle: "Institutional Property Due Diligence & Capital Reserve Planning",
      overviewText: [
        "Commercial real estate investments require thorough engineering and financial risk assessment. Our Property Condition Assessments follow ASTM E2018 guidelines to evaluate deferred maintenance, structural soundness, and remaining useful life (RUL) of critical building components.",
        "We provide investors, lenders, and portfolio managers with an executive summary and an itemized Capital Replacement Reserve Table projecting short-term (1-2 year) and long-term (3-10 year) expenditure requirements."
      ],
      benefitsHeading: "Key Benefits for Commercial Investors",
      benefits: [
        { icon: "bi-table", color: "text-primary", title: "Capital Reserve Tables", desc: "Detailed 10-year capital expenditure forecast itemizing immediate and long-term replacement reserves." },
        { icon: "bi-building", color: "text-success", title: "ASTM E2018 Standards", desc: "Nationally recognized standard for commercial Property Condition Assessments (PCA)." },
        { icon: "bi-fan", color: "text-warning", title: "Commercial HVAC & Roof", desc: "Evaluation of rooftop package units (RTUs), commercial boilers, and flat TPO/EPDM membranes." },
        { icon: "bi-universal-access", color: "text-info", title: "ADA Accessibility Review", desc: "Visual baseline review of parking stalls, ramps, curb cuts, and entry clearance." }
      ],
      inspected: [
        "Building structure, foundation piers, steel framing, and exterior envelope",
        "Commercial flat roof systems (TPO, EPDM, built-up tar & gravel, modified bitumen)",
        "3-Phase commercial electrical switchgear, transformers, and distribution panels",
        "Commercial HVAC package units (RTUs), chillers, cooling towers, and split systems",
        "Commercial plumbing, backflow preventers, booster pumps, and commercial restrooms",
        "Life safety systems: fire alarm panels, emergency lighting, and exit pathways",
        "ADA Title III accessibility visual baseline (parking, ramps, walkways, doors)"
      ],
      exclusions: [
        "Phase I Environmental Site Assessment (ESA) (Available via partner network)",
        "Destructive core sampling of concrete or asphalt",
        "Municipal code compliance warranty or zoning legal determinations"
      ],
      pricingFeatures: [
        "Full ASTM E2018-Compliant PCA Report",
        "10-Year Capital Reserve Expenditure Schedule",
        "FLIR Infrared Scans of Roof & Switchgear",
        "High-Res Photographic Defect Inventory",
        "48 to 72-Hour Express Executive Delivery"
      ],
      faqs: [
        { q: "What property types do you assess?", a: "We inspect office buildings, retail strip centers, mixed-use properties, multi-family apartment communities (4 to 100+ units), light industrial warehouses, and medical clinics." },
        { q: "What is the turnaround time for a commercial PCA report?", a: "Commercial reports typically take 48 to 72 hours due to the extensive engineering review, photographic compilation, and capital reserve calculation." },
        { q: "Does the report satisfy SBA and commercial lender requirements?", a: "Yes. Our reports are formatted to comply with ASTM E2018-15 standards and are accepted by institutional lenders, banks, and SBA loan underwriters nationwide." }
      ]
    },
    5: {
      id: 5,
      slug: 'radon',
      title: "Radon Gas & Air Quality Testing",
      badge: "Environmental Safety",
      badgeClass: "badge-soft-danger",
      tagline: "Continuous CRM radon monitoring over 48 hours to measure picocuries per liter (pCi/L), plus certified indoor mold spore testing.",
      image: "assets/images/radon-testing.jpg",
      imageAlt: "Radon Gas & Air Quality Testing",
      price: "$175",
      priceNote: "Standalone or $125 Add-on",
      overviewTitle: "Protect Your Family's Health with Certified Environmental Testing",
      overviewText: [
        "Radon is an odorless, invisible, naturally occurring radioactive gas released by decaying uranium in bedrock and soil. According to the EPA and Surgeon General, radon is the second leading cause of lung cancer in the United States and the #1 cause among non-smokers, claiming over 21,000 lives annually.",
        "Because radon enters homes through basement floor joints, sump pits, and crawlspace soils, you cannot detect it without calibrated testing equipment. We deploy Continuous Radon Monitors (CRM) that record hourly fluctuations to provide an indisputable 48-hour average for escrow negotiations."
      ],
      benefitsHeading: "Key Benefits of Environmental Testing",
      benefits: [
        { icon: "bi-activity", color: "text-danger", title: "Hourly Data Logging", desc: "Electronic continuous monitors record hourly pCi/L readings, temperature, and barometric pressure." },
        { icon: "bi-shield-check", color: "text-success", title: "Tamper Detection", desc: "Onboard motion sensors ensure test validity and prevent seller tampering during escrow." },
        { icon: "bi-virus", color: "text-warning", title: "Mold Spore Air Sampling", desc: "Dual indoor and outdoor baseline air cassette sampling analyzed by an AIHA-accredited laboratory." },
        { icon: "bi-clock-history", color: "text-primary", title: "Rapid Escrow Delivery", desc: "Same-day electronic results generated immediately upon completion of the 48-hour monitoring window." }
      ],
      inspected: [
        "Continuous 48-hour radon measurement in lowest livable level per EPA protocol",
        "Continuous hourly barometric pressure, relative humidity, and temperature logging",
        "Tamper-evident verification monitoring with multi-axis tilt sensors",
        "Visual assessment of sump basin seals, foundation floor seams, and crawlspace vapor barriers",
        "Optional indoor air cassette spore trap sampling for airborne fungal colonization"
      ],
      exclusions: [
        "Radon mitigation installation (We provide independent third-party verification)",
        "Destructive sub-slab soil extraction",
        "Testing periods under 48 hours (Strict EPA minimum protocol)"
      ],
      pricingFeatures: [
        "NRPP & InterNACHI Certified Inspectors",
        "EPA-Approved Continuous CRM Electronic Monitors",
        "Comprehensive Hourly Graph & Averages Report",
        "Instant Same-Day Digital PDF at Test Conclusion",
        "Mitigation Consultation & Cost Guidance"
      ],
      faqs: [
        { q: "What radon level requires mitigation?", a: "The EPA recommends mitigating when radon levels reach or exceed 4.0 picocuries per liter (pCi/L). Levels between 2.0 and 4.0 pCi/L also warrant consideration for mitigation." },
        { q: "What are closed-building conditions during testing?", a: "EPA protocol requires keeping all exterior windows and doors closed for 12 hours prior to and during the 48-hour test, except for normal entry and exit. Central HVAC heating and cooling can run normally." },
        { q: "What happens if test results exceed 4.0 pCi/L during escrow?", a: "High radon is considered an environmental safety defect. Buyers customarily submit our official report to request a seller credit or escrow holdback of $1,200 to $1,800 to install an active sub-slab depressurization system." }
      ]
    },
    6: {
      id: 6,
      slug: 'sewer',
      title: "Sewer Lateral Video Scope",
      badge: "Plumbing Diagnostic",
      badgeClass: "badge-soft-secondary",
      tagline: "High-definition fiber-optic camera scope running 100+ feet from main cleanout to city sewer main to detect tree roots and collapsed clay pipes.",
      image: "assets/images/sewer-scope.jpg",
      imageAlt: "Sewer Lateral Video Scope",
      price: "$195",
      priceNote: "Standalone or $145 Add-on",
      overviewTitle: "Avoid $15,000 Underground Mainline Sewer Pipe Surprises",
      overviewText: [
        "Standard home inspection standards of practice (SOP) strictly exclude buried underground plumbing. Homeowners are 100% financially responsible for the sewer lateral connecting the home's foundation to the municipal street sewer.",
        "Over time, mature tree roots infiltrate clay pipe seams, soil settlement causes sagging pipe 'bellies' that trap waste, and older cast iron pipes corrode and collapse. Excavating front lawns, driveways, or city sidewalks costs between $8,000 and $25,000. Our HD video push-camera discovers these catastrophic defects before closing."
      ],
      benefitsHeading: "Key Benefits of a Sewer Video Scope",
      benefits: [
        { icon: "bi-camera-video-fill", color: "text-primary", title: "100+ Ft HD Video Scope", desc: "Full-color 1080p camera with self-leveling head traverses the full lateral to the city connection." },
        { icon: "bi-broadcast-pin", color: "text-success", title: "512Hz Sonde Locating", desc: "Pinpoint exact underground depth and surface location of pipe damage without digging." },
        { icon: "bi-tree-fill", color: "text-danger", title: "Root & Belly Detection", desc: "Expose root intrusion, low slope bellies, grease accumulation, and offset clay joints." },
        { icon: "bi-film", color: "text-warning", title: "Recorded Video & Report", desc: "Full color MP4 digital video recording provided alongside detailed diagnostic findings." }
      ],
      inspected: [
        "Main cleanout access point to municipal sewer main or septic tank junction",
        "Pipe interior condition: clay tile, cast iron, ABS plastic, PVC, or Orangeburg",
        "Mechanical joint alignment, offsets, and root intrusion penetration points",
        "Grade slope consistency, low-water depressions ('pipe bellies'), and sediment buildup",
        "Cracks, fractures, shear breaks, corrosion channeling, and collapsed sections"
      ],
      exclusions: [
        "Clearing or jetting heavy clogs preventing camera passage (Plumbing scope only)",
        "Individual interior 1.5\" branch drain lines (sink, tub, or toilet branches)",
        "City main trunkline beyond private property connection"
      ],
      pricingFeatures: [
        "Full-Length 100+ Foot Push Camera Traversal",
        "Self-Leveling 1080p High-Definition Optics",
        "512Hz Underground Sonde Depth Transmitter",
        "MP4 Video Recording Download Link",
        "Written Diagnostic Addendum for Real Estate Escrow"
      ],
      faqs: [
        { q: "Why isn't a sewer scope included in a standard home inspection?", a: "Standard home inspections are strictly visual and non-invasive. Underground pipes buried 6 to 10 feet below ground cannot be evaluated without deploying specialized fiber-optic push-camera systems." },
        { q: "Do I get a copy of the sewer video?", a: "Yes! You will receive a direct streaming and download link to the complete high-definition video recording with inspector commentary, which you can easily share with your agent and contractors." },
        { q: "Can severe sewer issues be negotiated with the seller?", a: "Absolutely. Sewer collapses represent an immediate health and habitability issue. Armed with our video evidence, buyers frequently negotiate full credits or professional trenchless epoxy relining prior to closing." }
      ]
    }
  };

  // Map slugs and names to id
  const slugMap = {
    'comprehensive': 1,
    'comprehensive-home-inspection': 1,
    'prepurchase': 2,
    'pre-purchase': 2,
    'pre-purchase-property-assessment': 2,
    'thermal-drone': 3,
    'thermal': 3,
    'drone': 3,
    'thermal-infrared-drone-roof-audit': 3,
    'commercial': 4,
    'commercial-property-assessment': 4,
    'radon': 5,
    'radon-testing': 5,
    'radon-gas-air-quality-testing': 5,
    'sewer': 6,
    'sewer-scope': 6,
    'sewer-lateral-video-scope': 6
  };

  function renderService(key) {
    let serviceId = 1;
    if (typeof key === 'number' && servicesData[key]) {
      serviceId = key;
    } else if (typeof key === 'string') {
      const lower = key.toLowerCase().trim();
      if (servicesData[lower]) {
        serviceId = parseInt(lower, 10);
      } else if (slugMap[lower]) {
        serviceId = slugMap[lower];
      }
    }

    const s = servicesData[serviceId] || servicesData[1];

    // 0. Update Hero Banner background to the shared Service Details photograph
    const heroBannerEl = document.getElementById('serviceHeroBanner');
    if (heroBannerEl) {
      heroBannerEl.className = `vh-inner-banner vh-banner-service-details`;
      heroBannerEl.style.backgroundImage = "url('assets/images/hero-service-details-shared.jpg')";
      heroBannerEl.style.backgroundSize = "cover";
      heroBannerEl.style.backgroundPosition = "center center";
    }

    // 1. Title tag
    document.title = `${s.title} | VeriHome Inspection Services`;

    // 2. Breadcrumb
    const bcEl = document.getElementById('serviceBreadcrumb');
    if (bcEl) bcEl.textContent = 'Service Details';

    // 3. Header Badge, Title, Tagline
    const badgeEl = document.getElementById('serviceBadge');
    if (badgeEl) {
      badgeEl.textContent = s.badge;
      badgeEl.className = `badge-pill-soft ${s.badgeClass || 'badge-soft-primary'} mb-2`;
    }

    const heroTitleEl = document.getElementById('serviceHeroTitle');
    if (heroTitleEl) heroTitleEl.textContent = 'Service Details';

    const titleEl = document.getElementById('serviceTitle');
    if (titleEl) titleEl.textContent = s.title;

    const taglineEl = document.getElementById('serviceTagline');
    if (taglineEl) taglineEl.textContent = s.tagline;

    // 4. Main Featured Image
    const imgEl = document.getElementById('serviceMainImg');
    if (imgEl) {
      imgEl.src = s.image;
      imgEl.alt = s.imageAlt;
    }

    // 5. Overview Title & Paragraphs
    const ovTitleEl = document.getElementById('serviceOverviewTitle');
    if (ovTitleEl) ovTitleEl.textContent = s.overviewTitle;

    const ovContentEl = document.getElementById('serviceOverviewContent');
    if (ovContentEl) {
      ovContentEl.innerHTML = s.overviewText.map(p => `<p class="text-muted">${p}</p>`).join('');
    }

    // 6. Key Benefits
    const benHeadingEl = document.getElementById('serviceBenefitsHeading');
    if (benHeadingEl) benHeadingEl.textContent = s.benefitsHeading || 'Key Benefits';

    const benContainer = document.getElementById('serviceBenefits');
    if (benContainer) {
      benContainer.innerHTML = s.benefits.map(b => `
        <div class="col-md-6">
          <div class="p-3 rounded-3 border bg-white dark-bg-dark h-100" style="background-color: var(--vh-bg-surface) !important;">
            <h6 class="fw-bold ${b.color}"><i class="bi ${b.icon} me-2"></i>${b.title}</h6>
            <p class="text-muted small mb-0">${b.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // 7. Checklist: Inspected & Exclusions
    const inspList = document.getElementById('serviceInspectedList');
    if (inspList) {
      inspList.innerHTML = s.inspected.map(item => `
        <li><i class="bi bi-check2 text-success me-2 fw-bold"></i>${item}</li>
      `).join('');
    }

    const exclList = document.getElementById('serviceExclusionsList');
    if (exclList) {
      exclList.innerHTML = s.exclusions.map(item => `
        <li><i class="bi bi-dash-circle text-danger me-2"></i>${item}</li>
      `).join('');
    }

    // 8. Sidebar Pricing Card
    const priceEl = document.getElementById('servicePrice');
    if (priceEl) priceEl.textContent = s.price;

    const priceNoteEl = document.getElementById('servicePriceNote');
    if (priceNoteEl) priceNoteEl.textContent = s.priceNote;

    const featuresList = document.getElementById('servicePricingFeatures');
    if (featuresList) {
      featuresList.innerHTML = s.pricingFeatures.map(feat => `
        <li><i class="bi bi-check-circle text-success me-2"></i>${feat}</li>
      `).join('');
    }

    // 9. FAQs Accordion
    const faqContainer = document.getElementById('serviceFaqAccordion');
    if (faqContainer) {
      faqContainer.innerHTML = s.faqs.map((f, idx) => {
        const collapseId = `faqCollapse_${idx}`;
        const isFirst = idx === 0;
        return `
          <div class="accordion-item" style="background-color: var(--vh-bg-surface);">
            <h2 class="accordion-header" id="faqHeading_${idx}">
              <button class="accordion-button ${isFirst ? '' : 'collapsed'} fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isFirst ? 'true' : 'false'}" aria-controls="${collapseId}">
                ${f.q}
              </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" aria-labelledby="faqHeading_${idx}" data-bs-parent="#serviceFaqAccordion">
              <div class="accordion-body text-muted small">
                ${f.a}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('id') || urlParams.get('service') || window.DEFAULT_SERVICE_ID || 1;
    renderService(param);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
