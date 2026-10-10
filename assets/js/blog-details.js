/**
 * VeriHome - Blog Details Dynamic Article Controller
 * Supports all 6 comprehensive Home Inspection articles
 */

(function () {
  'use strict';

  const blogArticlesData = {
    1: {
      id: 1,
      title: "10 Critical Red Flags Every Homebuyer Must Check Before Closing",
      category: "Roof & Exterior Diagnostics",
      badge: "Buyer Warning",
      badgeClass: "badge-soft-primary",
      date: "October 28, 2026",
      readTime: "7 Min Read",
      author: "John R. Davis, CMI®",
      authorRole: "Founder & InterNACHI Certified Master Inspector",
      authorBio: "John is the Founder of VeriHome and an InterNACHI Certified Master Inspector with 18+ years of forensic property assessment experience across the Midwest.",
      authorImg: "assets/images/inspector-1.jpg",
      mainImg: "assets/images/blog-card-roof-defects.jpg",
      mainImgAlt: "Roof Defect Inspection - Flashing and Shingle Uplift",
      lead: "When you fall in love with a home, it's easy to admire the brand-new quartz countertops and newly refinished hardwood floors. But cosmetic upgrades frequently mask severe, five-figure defects lying dormant in the attic, crawlspace, or electrical panel.",
      intro: "As licensed Master Inspectors who have evaluated more than 14,000 properties, we have seen hundreds of buyers almost close on homes with structural hazards that sellers hoped would go unnoticed. Below are the top red flags you must look out for during your escrow inspection contingency.",
      sections: [
        {
          heading: "1. Compromised Chimney Flashing & Shingle Uplift",
          text: "The intersection where a brick chimney penetrates asphalt shingle roofing is the #1 source of hidden roof leaks. If step flashing is rusted or sealed with temporary tar mastic, water slowly rots the roof deck sheathing. In severe cases, attic rafters deteriorate before any water stains show through the interior ceiling.",
          tip: "Always verify that your inspector either walked the roof or deployed an aerial 4K drone to check the mortar crown and flashing at close proximity."
        },
        {
          heading: "2. Double-Tapped Circuit Breakers & Overamped Panels",
          text: "A 'double tap' occurs when an amateur DIYer or unlicensed handyman connects two separate circuit wires into a single circuit breaker slot. Unless the breaker is specifically engineered for two conductors (like select Square D QO models), this creates loose connections, arcing, and severe house fire hazards."
        },
        {
          heading: "3. Foundation Slope & Lateral Wall Bowing",
          text: "Not all foundation cracks are created equal. Minor vertical hairline cracks (< 1/16\") are typically harmless shrinkage from initial concrete curing. However, horizontal stair-step cracks in block foundations or bowing greater than 1 inch indicate hydrostatic soil pressure that could require $15,000 to $40,000 in carbon fiber straps or steel piers."
        },
        {
          heading: "4. Missing Water Heater TPR Discharge Tubes",
          text: "Water heaters can build immense steam pressure if the thermostat fails. Every unit has a Temperature & Pressure Relief (TPR) valve. If this valve lacks an unthreaded copper or CPVC discharge pipe pointing within 6 inches of the floor, high-pressure boiling water can discharge directly into anyone standing nearby."
        }
      ],
      negotiationTitle: "How to Use These Findings in Negotiation",
      negotiationText: "When our digital report identifies any of these red flags, do not panic. Use the built-in <strong>VeriHome Repair Request Addendum</strong> tool. Select the defect, attach our photo proof, and have your agent submit a request for an escrow credit or licensed contractor repair before your contingency period closes."
    },
    2: {
      id: 2,
      title: "Federal Pacific & Zinsco Breaker Panels: Why Insurers Reject Them",
      category: "Electrical & Fire Safety",
      badge: "Safety Hazard",
      badgeClass: "badge-soft-warning",
      date: "October 24, 2026",
      readTime: "6 Min Read",
      author: "John R. Davis, CMI®",
      authorRole: "Founder & InterNACHI Certified Master Inspector",
      authorBio: "John is the Founder of VeriHome and an InterNACHI Certified Master Inspector with 18+ years of forensic property assessment experience across the Midwest.",
      authorImg: "assets/images/inspector-1.jpg",
      mainImg: "assets/images/blog-card-electrical-safety.jpg",
      mainImgAlt: "Electrical Safety Inspection - Federal Pacific and Zinsco Panels",
      lead: "When buying an existing home built between 1950 and 1985, circuit breaker safety is often overlooked. Outdated electrical panels—specifically Federal Pacific Electric (FPE) Stab-Lok and Zinsco/Sylvania models—are one of the top reasons property insurers reject coverage during escrow.",
      intro: "Unlike modern panels engineered with modern thermal-magnetic trip curves, legacy panels contain verified design defects that cause breakers to jam in the ON position during direct overloads, creating catastrophic house fire risks.",
      sections: [
        {
          heading: "1. The Infamous Stab-Lok Failure to Trip Rate",
          text: "In extensive Consumer Product Safety Commission (CPSC) investigations and independent laboratory tests conducted by electrical engineer Jesse Aronstein, up to 60% of FPE two-pole 240-volt breakers failed to trip under direct dead short circuits. Instead of disconnecting power, the breakers remained engaged while internal copper conductors superheated inside wall cavities.",
          tip: "Never assume an electrical panel is safe just because lights turn on. A breaker's only job is to trip during an abnormal spike—which is precisely when defective legacy units fail."
        },
        {
          heading: "2. Zinsco Aluminum Bus Bar Melting & Welding",
          text: "Zinsco and Sylvania breaker panels suffer from a critical metallurgical flaw: the bus bar is fabricated from soft aluminum rather than plated copper. Over time, electrical vibration and thermal expansion cause breaker clips to loosen, causing high-resistance micro-arcing. In severe cases, the breaker casing melts and permanently welds directly to the bus bar."
        },
        {
          heading: "3. 4-Point Insurance Inspections and Policy Cancellations",
          text: "In today's tightened real estate insurance underwriting environment, carriers routinely require a mandatory 4-Point Inspection (Roof, Electrical, Plumbing, HVAC) on homes older than 25 years. The moment an underwriter spots 'Federal Pacific' or 'Zinsco' on the report, coverage is denied until a licensed electrician replaces the panel."
        },
        {
          heading: "4. Replacement Costs & Negotiating the Seller Credit",
          text: "Upgrading a legacy 100-amp panel to a modern 200-amp service with Square D QO or Eaton CH breakers and whole-home surge protection costs between $2,800 and $4,500 depending on utility line work. Because this is an unambiguous fire and life-safety defect, sellers almost always grant a full closing credit when presented with our certified inspector's diagnostic proof."
        }
      ],
      negotiationTitle: "How to Secure an Electrical Panel Replacement Credit",
      negotiationText: "Request that your real estate attorney or agent issue a formal Repair Addendum specifying: 'Seller shall credit Buyer $3,500 at closing toward whole-home 200A electrical service panel replacement by a licensed master electrician.' Do not allow the seller to hire an unlicensed handyman."
    },
    3: {
      id: 3,
      title: "How Infrared Thermal Imaging Uncovers Invisible Leaks Behind Tile",
      category: "Thermal Imaging & Drones",
      badge: "Diagnostic Tech",
      badgeClass: "badge-soft-primary",
      date: "October 18, 2026",
      readTime: "5 Min Read",
      author: "Sarah Jenkins, P.E.",
      authorRole: "Lead Building Science Engineer",
      authorBio: "Sarah Jenkins is a licensed Professional Engineer specializing in forensic building enclosure assessments, non-destructive thermography, and moisture intrusion analysis.",
      authorImg: "assets/images/inspector-2.jpg",
      mainImg: "assets/images/blog-card-thermal-moisture.jpg",
      mainImgAlt: "Infrared Thermal Imaging - Concealed Moisture Detection",
      lead: "Fresh paint, newly laid subway tiles, and pristine ceiling drywall can easily conceal five-figure plumbing leaks and hidden ceiling rot. Infrared thermography enables inspectors to see through solid surfaces by detecting microscopic thermal temperature differentials caused by moisture evaporation.",
      intro: "Water is the single greatest enemy of residential structures. By the time water stains or buckling flooring become visible to the naked eye, mold colonization and structural timber decay have typically been active for months. Here is how building science diagnostic cameras prevent catastrophic buyer surprises.",
      sections: [
        {
          heading: "1. The Physics of Evaporative Cooling in Building Science",
          text: "Infrared cameras do not see 'through' walls like X-rays; rather, they visualize subtle infrared radiant heat emissions across surfaces. Moisture trapped behind tile or drywall slowly evaporates into the ambient room air. This latent heat of vaporization creates a localized surface temperature drop of 2°F to 6°F, which displays on our calibrated screen as a distinctive deep-purple thermal signature.",
          tip: "Our master inspectors run all plumbing fixtures under full hot and cold volume for 15 minutes before scanning adjacent baseboards and subfloors with calibrated thermography."
        },
        {
          heading: "2. Tile Shower Enclosures & Pan Membrane Failures",
          text: "A widespread misconception among buyers is that ceramic tile and grout are waterproof. In reality, grout is highly porous. The true moisture barrier is the waterproof pan liner hidden underneath the mortar bed. If a contractor punctured the liner with finish nails or failed to seal the clamping ring around the drain flange, water seeps directly into the timber subfloor with zero outward sign."
        },
        {
          heading: "3. Hidden Flat Roof & Ceiling Envelope Insulation Voids",
          text: "Thermal imaging is equally indispensable for roof assemblies. During late afternoon sunset, exterior building materials release stored solar heat. Moist cellulose or fiberglass insulation retains heat significantly longer than dry framing, creating bright radiant heat plumes on ceiling surfaces that pinpoint hidden flashing leaks."
        },
        {
          heading: "4. Dual Verification with Radio Frequency Moisture Meters",
          text: "Thermal anomalies can occasionally stem from missing insulation or localized air drafts. At VeriHome, we never classify a finding as a leak based on thermal imagery alone. We immediately verify every cold plume using non-invasive Tramex radio-frequency pinless moisture meters to confirm moisture content above the 18% wood rot threshold."
        }
      ],
      negotiationTitle: "Turning Concealed Moisture into Negotiated Credits",
      negotiationText: "Rebuilding a leaking custom tile shower pan involves tearing out the lower surround, mortar bed, and subfloor—typically running $7,000 to $12,000. Our empirical thermal imaging diagrams leave sellers with zero room to deny active leakage, giving you ironclad leverage to demand closing credits."
    },
    4: {
      id: 4,
      title: "How to Turn an Inspection Report into a $15,000 Closing Credit",
      category: "Pre-Purchase Due Diligence",
      badge: "Negotiation Tips",
      badgeClass: "badge-soft-success",
      date: "October 12, 2026",
      readTime: "8 Min Read",
      author: "John R. Davis, CMI®",
      authorRole: "Founder & InterNACHI Certified Master Inspector",
      authorBio: "John is the Founder of VeriHome and an InterNACHI Certified Master Inspector with 18+ years of forensic property assessment experience across the Midwest.",
      authorImg: "assets/images/inspector-1.jpg",
      mainImg: "assets/images/blog-card-inspection-negotiation.jpg",
      mainImgAlt: "Home Inspection Report - Closing Credit Repair Negotiation",
      lead: "Receiving a 45-page property inspection report with 20 defect items can feel overwhelming. However, sophisticated homebuyers and top real estate agents understand that an objective, photo-documented inspection report is their most powerful financial lever at the negotiation table.",
      intro: "A pre-purchase assessment is not a pass/fail exam—it is an empirical inventory of the home's physical condition. When negotiated strategically, it frequently yields five-figure closing credits that offset your upfront cash required to close.",
      sections: [
        {
          heading: "1. The $1,000+ Rule: Focus Exclusively on Material & Safety Defects",
          text: "The quickest way to alienate a seller and kill negotiations is to submit a petty punch-list of loose doorknobs, chipped paint, or worn carpet. Focus 100% of your repair request on major structural, roofing, HVAC, electrical, and plumbing defects that each exceed $1,000 in certified contractor replacement cost.",
          tip: "Group your requests under code and safety mandates: 'Life Safety Hazards' and 'Major Systemic Deficiencies'. Sellers feel ethically bound to address hazards that would be flagged for future buyers anyway."
        },
        {
          heading: "2. Price Reduction vs. Closing Cost Escrow Credit",
          text: "Many buyers mistakenly ask for a $15,000 reduction in the home's purchase price. On a 30-year fixed mortgage at 6.5%, reducing the purchase price by $15,000 only saves you about $95 per month. In stark contrast, negotiating a $15,000 seller-paid closing cost credit directly reduces the cash you must bring to the settlement table on closing day."
        },
        {
          heading: "3. Never Let the Seller Hire the Repair Contractor",
          text: "When a seller agrees to 'fix the chimney flashing' or 'repair the electrical panel' before closing, their legal incentive is to hire the cheapest, fastest handyman available. The repairs are frequently unpermitted and substandard. Always demand cash credits or escrow holdbacks so you can hire your own licensed, insured specialists after closing."
        },
        {
          heading: "4. Using the VeriHome One-Click Repair Addendum Tool",
          text: "Our interactive digital inspection report platform features a built-in Repair Request Addendum generator. In just 3 clicks, you can select critical defect items, attach our high-definition photo proof, input contractor quote estimates, and export a legally compliant PDF addendum ready for your agent to submit to the listing broker."
        }
      ],
      negotiationTitle: "Key Strategy for Escrow Contingency Success",
      negotiationText: "Submit your inspection addendum at least 48 hours prior to your contingency expiration date. Provide the seller with the direct VeriHome report share link so their listing agent can clearly see the empirical photo evidence and severity ratings."
    },
    5: {
      id: 5,
      title: "Foundation Settlement vs. Curing Shrinkage Cracks: The True Difference",
      category: "Foundation & Framing",
      badge: "Structural Engineering",
      badgeClass: "badge-soft-primary",
      date: "October 05, 2026",
      readTime: "6 Min Read",
      author: "Sarah Jenkins, P.E.",
      authorRole: "Lead Building Science Engineer",
      authorBio: "Sarah Jenkins is a licensed Professional Engineer specializing in forensic building enclosure assessments, non-destructive thermography, and moisture intrusion analysis.",
      authorImg: "assets/images/inspector-2.jpg",
      mainImg: "assets/images/blog-card-foundation-cracks.jpg",
      mainImgAlt: "Foundation Wall Inspection - Concrete Shrinkage vs Settlement",
      lead: "When buyers spot cracks running along the basement concrete or crawlspace stem wall, immediate visions of total structural collapse come to mind. While some foundation cracks represent catastrophic soil displacement, the vast majority are benign shrinkage lines that occur during normal concrete hydration.",
      intro: "Understanding how licensed structural engineers and master inspectors evaluate foundation cracks will help you distinguish between harmless cosmetic curing blemishes and five-figure structural settlement hazards.",
      sections: [
        {
          heading: "1. Concrete Hydration Physics: Why Vertical Hairline Cracks Occur",
          text: "As freshly poured concrete cures over its first 90 days, it loses free moisture and naturally shrinks by approximately 0.05% of its length. Because concrete is held in place by footing rebar and form friction, this shrinkage produces minor vertical or diagonal hairline fissures (< 1/16\" wide) running from top to bottom. These are structurally inert and require only simple sealant to block radon or water vapor.",
          tip: "Inspect whether the crack planes are flush. If you can run your finger across the crack without feeling an offset ledge, the crack is almost certainly cosmetic shrinkage."
        },
        {
          heading: "2. Horizontal Fissures & Inward Lateral Wall Bowing",
          text: "When concrete block (CMU) or poured walls exhibit horizontal cracks along the mid-height mortar line, excessive hydrostatic water pressure in surrounding expansive clay soil is pushing against the foundation laterally. If inward bowing exceeds 1 inch across a 10-foot span, the wall has suffered shear failure and requires immediate reinforcement."
        },
        {
          heading: "3. Differential Settlement & Drywall Shear Angles",
          text: "When one corner of a footing sinks into poorly compacted backfill or washed-out soil, differential settlement occurs. This manifests inside the home as diagonal drywall shear cracks extending upward from door headers, sticking doors that swing open spontaneously, and unlevel floors detectable with our digital Zip-Level manometer surveys."
        },
        {
          heading: "4. Structural Repair Methodologies and Costs ($5k–$30k)",
          text: "While vertical shrinkage cracks can be sealed with low-pressure polyurethane foam injection for $400, lateral wall bowing demands carbon fiber Kevlar strapping ($5,000–$10,000) or steel I-beam soldier columns. Active downward settlement requires hydraulic steel push piers driven to load-bearing bedrock at $1,800 to $2,500 per pier."
        }
      ],
      negotiationTitle: "Handling Foundation Defects During Escrow",
      negotiationText: "If our inspection uncovers horizontal cracks or differential elevation variance greater than 1.5 inches, require a seller credit covering a licensed structural engineer's formal evaluation and piering allowance before releasing your contingency."
    },
    6: {
      id: 6,
      title: "Sewer Scope Video Diagnostics: Avoiding $15,000 Mainline Pipe Collapses",
      category: "Roof & Exterior Diagnostics",
      badge: "Roof & Exterior",
      badgeClass: "badge-soft-danger",
      date: "September 28, 2026",
      readTime: "5 Min Read",
      author: "John R. Davis, CMI®",
      authorRole: "Founder & InterNACHI Certified Master Inspector",
      authorBio: "John is the Founder of VeriHome and an InterNACHI Certified Master Inspector with 18+ years of forensic property assessment experience across the Midwest.",
      authorImg: "assets/images/inspector-1.jpg",
      mainImg: "assets/images/blog-card-sewer-scope.jpg",
      mainImgAlt: "Sewer Scope Inspection - Lateral Video Push Camera Diagnostics",
      lead: "Standard home inspection standards of practice (SOP) only require testing accessible interior plumbing fixtures. They completely exclude the 100 feet of buried lateral pipe connecting the house to the municipal street main—a buried pipeline that costs upwards of $15,000 to replace when it fails.",
      intro: "Municipal sewer laterals running beneath front lawns, driveways, and sidewalks are 100% the private homeowner's financial responsibility. Discover why a high-definition fiber optic video scope is the most cost-effective $200 inspection add-on you can invest in.",
      sections: [
        {
          heading: "1. Clay Tile & Cast Iron Lifespans in Pre-1980 Homes",
          text: "Vitrified clay pipes commonly installed in homes built before 1975 have mechanical slip joints every 3 to 5 feet. Over decades, surrounding soil shifts, causing joint offsets where mature tree roots aggressively penetrate seeking water and nutrients. Cast iron pipes also suffer from tuberculation and bottom channel rot.",
          tip: "Always order a sewer scope for any property older than 20 years, or any home with mature oak, maple, or willow trees planted anywhere between the house and the street curb."
        },
        {
          heading: "2. The Danger of Bellied and Low-Slope Lateral Lines",
          text: "When buried pipes settle unevenly in shifting backfill, a low spot or 'pipe belly' develops. Because sewage flow relies strictly on gravity pitch (1/4\" per foot), water and solid waste pool in the depression, creating recurring chronic backups that no chemical drain cleaner or plumbing snake can permanently clear."
        },
        {
          heading: "3. High-Definition Self-Leveling Fiber Optic Cameras",
          text: "Our push-camera system features a self-leveling 1080p camera head, 512Hz locating sonde transmitter, and digital footage recording. We can pinpoint the exact depth, footage distance, and GPS location of root blockages or cracked transitions on the front lawn without digging an inch of soil."
        },
        {
          heading: "4. Trenchless Pipe Relining vs. Full Street Excavation",
          text: "Traditional open-cut trench excavation requires ripping up mature landscaping, pavers, and municipal asphalt, easily costing $12,000–$25,000. Discovering root intrusion during escrow contingency allows you to negotiate a $6,000 credit for trenchless CIPP (cured-in-place pipe) epoxy relining, which restores the pipe without excavation."
        }
      ],
      negotiationTitle: "Sewer Scope Findings as a Closing Condition",
      negotiationText: "Because broken main lines represent an immediate public health and habitability issue, sellers are legally obligated to disclose our video proof to all subsequent buyers if your contract cancels. This gives you nearly 100% leverage to demand a full credit or professional relining before closing."
    }
  };

  function renderArticle(id) {
    const article = blogArticlesData[id] || blogArticlesData[1];

    // 0. Update Hero Banner background to the consistent shared Blog Details photograph
    const heroBannerEl = document.getElementById('articleHeroBanner');
    if (heroBannerEl) {
      heroBannerEl.className = 'vh-inner-banner vh-banner-blog-details';
      heroBannerEl.style.backgroundImage = "url('assets/images/hero-blog-details-shared.jpg')";
      heroBannerEl.style.backgroundSize = "cover";
      heroBannerEl.style.backgroundPosition = "center center";
    }

    // 1. Update Document Title
    document.title = `${article.title} | VeriHome`;

    // 1b. Update Breadcrumb
    const bcEl = document.getElementById('articleBreadcrumb');
    if (bcEl) bcEl.textContent = 'Article';

    // 2. Update Badge & Category
    const badgeEl = document.getElementById('articleBadge');
    if (badgeEl) {
      badgeEl.textContent = article.category;
      badgeEl.className = `badge-pill-soft ${article.badgeClass || 'badge-soft-primary'} mb-2`;
    }

    // 3. Update Hero Title & Content Title
    const heroTitleEl = document.getElementById('blogHeroTitle');
    if (heroTitleEl) {
      heroTitleEl.textContent = 'Blog Details';
    }
    const titleEl = document.getElementById('articleTitle');
    if (titleEl) titleEl.textContent = article.title;

    // 4. Update Meta Line
    const metaEl = document.getElementById('articleMeta');
    if (metaEl) {
      metaEl.innerHTML = `
        <span><i class="bi bi-person me-1 text-primary"></i>By ${article.author}</span>
        <span>•</span>
        <span><i class="bi bi-calendar3 me-1 text-primary"></i>Updated ${article.date}</span>
        <span>•</span>
        <span><i class="bi bi-clock me-1 text-primary"></i>${article.readTime}</span>
      `;
    }

    // 5. Update Main Featured Image (Synchronized with Hero Background)
    const mainImgEl = document.getElementById('articleMainImg');
    if (mainImgEl) {
      mainImgEl.src = article.mainImg;
      mainImgEl.alt = article.mainImgAlt;
    }

    // 6. Update Article Body HTML
    const contentEl = document.getElementById('articleBodyContent');
    if (contentEl) {
      let bodyHtml = `
        <p class="lead text-dark dark-text-light">${article.lead}</p>
        <p class="text-muted">${article.intro}</p>
      `;

      article.sections.forEach(sec => {
        bodyHtml += `<h3 class="fw-bold mt-5 mb-3">${sec.heading}</h3>`;
        bodyHtml += `<p class="text-muted">${sec.text}</p>`;

        if (sec.tip) {
          bodyHtml += `
            <div class="p-3 bg-light rounded-3 border-start border-4 border-danger my-4" style="background-color: var(--vh-bg-subtle) !important;">
              <strong class="text-danger d-block mb-1"><i class="bi bi-exclamation-triangle-fill me-1"></i>Inspector Tip:</strong>
              ${sec.tip}
            </div>
          `;
        }
      });

      if (article.negotiationTitle) {
        bodyHtml += `
          <div class="p-4 rounded-4 border bg-primary-subtle border-primary-subtle my-5">
            <h5 class="fw-bold text-primary mb-2"><i class="bi bi-shield-check me-2"></i>${article.negotiationTitle}</h5>
            <p class="small text-muted mb-0">${article.negotiationText}</p>
          </div>
        `;
      }

      contentEl.innerHTML = bodyHtml;
    }

    // 7. Update Author Bio Box
    const authorImgEl = document.getElementById('articleAuthorImg');
    if (authorImgEl) authorImgEl.src = article.authorImg;

    const authorNameEl = document.getElementById('articleAuthorName');
    if (authorNameEl) authorNameEl.textContent = article.author;

    const authorRoleEl = document.getElementById('articleAuthorRole');
    if (authorRoleEl) authorRoleEl.textContent = article.authorRole;

    const authorBioEl = document.getElementById('articleAuthorBio');
    if (authorBioEl) authorBioEl.textContent = article.authorBio;
  }

  // Read URL query parameter
  function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id'), 10) || window.DEFAULT_ARTICLE_ID || 1;
    renderArticle(idParam);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
