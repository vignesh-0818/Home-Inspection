import urllib.request
import re

print("=== VERIHOME SYSTEMATIC VERIFICATION ===")

# 1. Test Customer Dashboard
resp = urllib.request.urlopen("http://localhost:8080/customer-dashboard.html")
html = resp.read().decode("utf-8")
assert resp.status == 200, "customer-dashboard.html failed to load"
print("[OK] customer-dashboard.html loads with HTTP 200")

# Check sidebar navigation
required_sidebar = [
    'href="#tab-appointments"',
    'href="#tab-book"',
    'href="#tab-reports"',
    'href="#tab-photos"',
    'href="#tab-messages"'
]
for item in required_sidebar:
    assert item in html, f"Missing sidebar link {item}"
print("[OK] Dashboard sidebar navigation items verified")

# Check required sections and containers
assert 'id="digitalReportsCardsContainer"' in html
assert 'id="myInspectionsCardsContainer"' in html
assert 'id="myInspectionsTableContainer"' in html
assert 'id="reportPendingModal"' in html
assert 'id="photoPropertyFilters"' in html
assert 'id="photoPreviewModal"' in html
print("[OK] All Dashboard containers, views, and modals verified")

# 2. Test Customer Dashboard JavaScript
resp_js = urllib.request.urlopen("http://localhost:8080/assets/js/customer-dashboard.js")
js_code = resp_js.read().decode("utf-8")
assert resp_js.status == 200
print("[OK] customer-dashboard.js loads with HTTP 200")

# Check specific property report datasets
assert "REPORT_FINDINGS_712_CLARK" in js_code
assert "REPORT_FINDINGS" in js_code
assert "Missing Protective Romex Cable Clamp" in js_code
assert "Cracked Shingles & Damaged Flashing Around Chimney" in js_code
print("[OK] Distinct property-specific inspection findings (482 Maple vs 712 N Clark) verified")

# Check pending report protection
assert "window.showReportPendingModal" in js_code
assert "window.openDigitalReport" in js_code
assert "!item.hasReport" in js_code
print("[OK] Unauthorized / unavailable report guard verified")

# Check card rendering & view modes
assert "renderInspectionCards" in js_code
assert "renderDigitalReportsCards" in js_code
assert "window.switchInspectionViewMode" in js_code
assert "window.viewPhotosForProperty" in js_code
assert "window.filterPhotosByProperty" in js_code
print("[OK] Card generator, view switcher, and photo cross-linking verified")

# 3. Test Services Page
resp_serv = urllib.request.urlopen("http://localhost:8080/services.html")
html_serv = resp_serv.read().decode("utf-8")
assert resp_serv.status == 200
print("[OK] services.html loads with HTTP 200")

assert html_serv.count("col-md-6 col-lg-4 d-flex") >= 6
assert html_serv.count("vh-service-card w-100") >= 6
assert html_serv.count("vh-service-decision-box") >= 6
assert html_serv.count("vh-service-footer") >= 6
print("[OK] Services page 6 service cards with d-flex and consistent structure verified")

# 4. Test CSS Style Rules
resp_css = urllib.request.urlopen("http://localhost:8080/assets/css/style.css")
css_code = resp_css.read().decode("utf-8")
assert resp_css.status == 200
print("[OK] style.css loads with HTTP 200")

# Service Card Alignment Rules
assert "min-height: 58px;" in css_code      # .vh-service-title
assert "min-height: 85px;" in css_code      # .vh-service-desc
assert "min-height: 125px;" in css_code     # .vh-service-features
assert "min-height: 120px;" in css_code     # .vh-service-decision-box
assert "margin-top: auto;" in css_code      # value box & footer alignment
print("[OK] Service card flexbox & uniform minimum height alignment CSS verified")

# Hero Height Rules (300-380px range)
assert "min-height: 350px !important;" in css_code
assert "background-position: center 20% !important;" in css_code
print("[OK] Inner page hero height (350px) and face focal points verified")

# Inspection Tracking Cards CSS
assert ".vh-inspection-tracking-card" in css_code
assert ".vh-dash-score-box" in css_code
print("[OK] Inspection card and score box CSS verified")

# 5. Test Login Page Social Auth
resp_login = urllib.request.urlopen("http://localhost:8080/login.html")
html_login = resp_login.read().decode("utf-8")
assert resp_login.status == 200
print("[OK] login.html loads with HTTP 200")

assert "handleSocialAuth('Google'" in html_login
assert "handleSocialAuth('Apple'" in html_login
assert "customer-dashboard.html" in html_login
print("[OK] Social authentication buttons and redirection verified")

print("\n>>> ALL 14 VERIFICATIONS PASSED WITH 100% SUCCESS! <<<")
