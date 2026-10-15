/* =========================================================
   MP UADD — Building Permission Dashboard
   Rules: ABPAS 3.0 + MP Bhumi Vikas Rules 2012
   Data : 2026-27 guideline (Nagar Parishad Mau, Bhind)
   Karmkar Fee as per MPIGR Collector Guideline

   - All editable fields default = 0
   - Non-FAR Area auto-estimated as per MP Bhumi Vikas Rules
   - Total Slab Area = Built-up + Non-FAR
   - Construction Cost = Slab Area × Estimated Rate
   - Karmkar = 1% of Construction Cost
   ========================================================= */

/* ---------- Ward master ---------- */
const wardMaster = [
  { ward: 1,  name: "Sanjay Ward",              zone: 1 },
  { ward: 2,  name: "Gandhi Ward",              zone: 1 },
  { ward: 3,  name: "Bhagat Singh Ward",        zone: 1 },
  { ward: 4,  name: "Ambedkar Ward",            zone: 1 },
  { ward: 5,  name: "Subhash Ward",             zone: 1 },
  { ward: 6,  name: "Nehru Ward",               zone: 1 },
  { ward: 7,  name: "Tilak Ward",               zone: 1 },
  { ward: 8,  name: "Shastri Ward",             zone: 1 },
  { ward: 9,  name: "Indira Gandhi Ward",       zone: 1 },
  { ward: 10, name: "Chandrashekhar Azad Ward", zone: 1 },
  { ward: 11, name: "Sardar Patel Ward",        zone: 1 },
  { ward: 12, name: "Narsingh Ward",            zone: 1 },
  { ward: 13, name: "Lala Lajpat Rai Ward",     zone: 1 },
  { ward: 14, name: "Balmiki Ward",             zone: 1 },
  { ward: 15, name: "Rajeev Salampura Ward",    zone: 1 }
];

/* ---------- Location Data ----------
   PDF column mapping:
     plotRes  = (3) आवासीय
     plotCom  = (4) व्यवसायिक
     rcc      = (6) आर.सी.सी (Residential)
     rbc      = (7) आर.बी.सी
     tin      = (8) टिन शेड
     kachcha  = (9) कच्चा कवेलू
     shop     = (10) दुकान
     office   = (11) कार्यालय
     godown   = (12) गोडाउन
*/
const locationData = {
  1: {
    "Aadarsh Mohalla evam Aas Paas Ka Kshetra":    { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000,  plotCom:12000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Rest House Ke Aas Paas Ka Kshetra":           { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000,  plotCom:12000 },
    "Sadar Bazar evam Aas Paas Ka Kshetra":        { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000,  plotCom:12000 },
    "Shaskiya Chikitsalay Ke Aas Paas Ka Kshetra": { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000,  plotCom:12000 }
  },
  2: {
    "Lohar Pura Ka Kshetra":                       { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Radha Krishna Mandir Ke Aas Paas Ka Kshetra": { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Ramlila Bhavan Ke Aas Paas Ka Kshetra":       { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  3: {
    "Karigar Mohalla":                             { rcc:16000, rbc:11800, tin:10200, kachcha:9400, shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Loharpura Ka Kshetra":                        { rcc:15000, rbc:10800, tin:9200,  kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  4: {
    "Karigar Mohalla":                             { rcc:16000, rbc:11800, tin:10200, kachcha:9400, shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Lohar Pura Ka Kshetra":                       { rcc:15000, rbc:10800, tin:9200,  kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  5: {
    "Dahgawan Road evam Aas Paas Ka Kshetra":      { rcc:16000, rbc:11800, tin:10200, kachcha:9400,  shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Karigar Mohalla":                             { rcc:16000, rbc:11800, tin:10200, kachcha:9400,  shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Kiti Road evam Aas Paas Ka Kshetra":          { rcc:16000, rbc:11800, tin:10200, kachcha:9400,  shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Mehgaon Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Mehgaon Sewda Main Road Se Andar Ka Kshetra": { rcc:15000, rbc:10800, tin:9200,  kachcha:8400,  shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Talav Ke Paas Kraswa Mohalla":                { rcc:16500, rbc:12300, tin:10700, kachcha:9900,  shop:25300, office:23700, godown:23700, plotRes:7500, plotCom:15000 }
  },
  6: {
    "Muslim Aawadi":                               { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Ramlila Bhavan Ke Aas Paas Ka Kshetra":       { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  7: {
    "Katra Mohalla Ke Aas Paas Ka Kshetra":        { rcc:16000, rbc:11800, tin:10200, kachcha:9400, shop:24300, office:22700, godown:22700, plotRes:7000, plotCom:14000 },
    "Khatik Mohalla Ke Aas Paas Ka Kshetra":       { rcc:16500, rbc:12300, tin:10700, kachcha:9900, shop:25300, office:23700, godown:23700, plotRes:7500, plotCom:15000 }
  },
  8: {
    "Jain Mandir Ke Aas Paas Ka Kshetra":          { rcc:14000, rbc:9800,  tin:8200,  kachcha:7400, shop:20300, office:18700, godown:18700, plotRes:5000, plotCom:10000 },
    "Mehgaon Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Purane Thane Ke Aas Paas Ka Kshetra":         { rcc:14000, rbc:9800,  tin:8200,  kachcha:7400, shop:20300, office:18700, godown:18700, plotRes:5000, plotCom:10000 }
  },
  9: {
    "Bus Stand Ke Aas Paas Ka Kshetra":            { rcc:15000, rbc:10800, tin:9200,  kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Gayatri Mandir Ke Aas Paas Ka Kshetra":       { rcc:14000, rbc:9800,  tin:8200,  kachcha:7400, shop:20300, office:18700, godown:18700, plotRes:5000, plotCom:10000 },
    "Goriyan Tola Mohalla":                        { rcc:15000, rbc:10800, tin:9200,  kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 }
  },
  10: {
    "Goriyan Tola Mohalla":                        { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Purana Hatwara evam Aas Paas Ka Kshetra":     { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  11: {
    "Goriyan Tola Mohalla":                        { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Mehgaon Sewda Main Road Se Andar Ka Kshetra": { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 }
  },
  12: {
    "Deemar Mohalla":                              { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 },
    "Mehgaon Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Vyas Mohalla":                                { rcc:15000, rbc:10800, tin:9200, kachcha:8400, shop:22300, office:20700, godown:20700, plotRes:6000, plotCom:12000 }
  },
  13: {
    "Behat Road":                                  { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Dwarkapuri Mohalla":                          { rcc:17000, rbc:12800, tin:11200, kachcha:10400, shop:26300, office:24700, godown:24700, plotRes:8000,  plotCom:16000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Naye Thane Ke Paas":                          { rcc:17000, rbc:12800, tin:11200, kachcha:10400, shop:26300, office:24700, godown:24700, plotRes:8000,  plotCom:16000 },
    "Ratwa Road":                                  { rcc:17000, rbc:12800, tin:11200, kachcha:10400, shop:26300, office:24700, godown:24700, plotRes:8000,  plotCom:16000 }
  },
  14: {
    "Behat Road":                                  { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Mehgaon-Sewda Main Road":                     { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Nagar Palika Bhavan Ke Aas Paas":             { rcc:18000, rbc:13800, tin:12200, kachcha:11400, shop:28300, office:26700, godown:26700, plotRes:9000,  plotCom:18000 }
  },
  15: {
    "Mau Gohad Road":                              { rcc:19000, rbc:14800, tin:13200, kachcha:12400, shop:30300, office:28700, godown:28700, plotRes:10000, plotCom:20000 },
    "Salampura evam Aas Paas Ka Kshetra":          { rcc:15500, rbc:11300, tin:9700,  kachcha:8900,  shop:23300, office:21700, godown:21700, plotRes:6500,  plotCom:13000 }
  }
};

/* ---------- District → ULB ---------- */
const districtData = {
  "Bhind": { "Nagar Parishad Mau": wardMaster }
};

/* ---------- DOM ---------- */
const districtSel = document.getElementById("district");
const bodySel     = document.getElementById("urbanBody");
const zoneSel     = document.getElementById("zone");
const wardSel     = document.getElementById("ward");
const colonySel   = document.getElementById("colony");

Object.keys(districtData).forEach(d => {
  const o = document.createElement("option");
  o.value = d; o.textContent = d;
  districtSel.appendChild(o);
});

function populateBodies() {
  bodySel.innerHTML = "";
  Object.keys(districtData[districtSel.value] || {}).forEach(b => {
    const o = document.createElement("option");
    o.value = b; o.textContent = b;
    bodySel.appendChild(o);
  });
  populateZones();
}

function populateZones() {
  zoneSel.innerHTML = "";
  const wards = districtData[districtSel.value][bodySel.value] || [];
  [...new Set(wards.map(w => w.zone))].sort((a,b)=>a-b).forEach(z => {
    const o = document.createElement("option");
    o.value = z; o.textContent = "Zone " + z;
    zoneSel.appendChild(o);
  });
  populateWards();
}

function populateWards() {
  wardSel.innerHTML = "";
  const wards = districtData[districtSel.value][bodySel.value] || [];
  wards.filter(w => String(w.zone) === String(zoneSel.value)).forEach(w => {
    const o = document.createElement("option");
    o.value = w.ward;
    o.textContent = `${w.ward} — ${w.name}`;
    wardSel.appendChild(o);
  });
  populateColonies();
}

function populateColonies() {
  colonySel.innerHTML = "";
  const wardId = wardSel.value;
  const colonies = locationData[wardId] ? Object.keys(locationData[wardId]) : [];
  if (colonies.length === 0) {
    const o = document.createElement("option");
    o.value = ""; o.textContent = "— No guideline data available —";
    colonySel.appendChild(o);
    clearRates();
    return;
  }
  colonies.forEach(c => {
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    colonySel.appendChild(o);
  });
  showRates();
}

function showRates() {
  const data = (locationData[wardSel.value] || {})[colonySel.value];
  if (!data) { clearRates(); return; }
  document.getElementById("rate_plotRes").value  = data.plotRes || 0;
  document.getElementById("rate_plotCom").value  = data.plotCom || 0;
  document.getElementById("rate_rcc").value      = data.rcc;
  document.getElementById("rate_rbc").value      = data.rbc;
  document.getElementById("rate_tin").value      = data.tin;
  document.getElementById("rate_kachcha").value  = data.kachcha;
  document.getElementById("rate_shop").value     = data.shop;
  document.getElementById("rate_office").value   = data.office;
  document.getElementById("rate_godown").value   = data.godown;
}

function clearRates() {
  ["rate_plotRes","rate_plotCom","rate_rcc","rate_rbc","rate_tin","rate_kachcha","rate_shop","rate_office","rate_godown"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = "—"; });
}

districtSel.addEventListener("change", populateBodies);
bodySel.addEventListener("change", populateZones);
zoneSel.addEventListener("change", populateWards);
wardSel.addEventListener("change", populateColonies);
colonySel.addEventListener("change", showRates);

/* =========================================================
   AREA CONVERSION
   ========================================================= */
const FT_TO_M   = 0.3048;
const SQFT_TO_M = 0.09290304;

function calcGrossArea() {
  const wFt = parseFloat(document.getElementById("plotWidthFt").value)  || 0;
  const lFt = parseFloat(document.getElementById("plotLengthFt").value) || 0;
  const wM = +(wFt * FT_TO_M).toFixed(3);
  const lM = +(lFt * FT_TO_M).toFixed(3);
  const areaSqFt = +(wFt * lFt).toFixed(2);
  const areaSqM  = +(areaSqFt * SQFT_TO_M).toFixed(2);
  document.getElementById("plotWidthM").value  = wM;
  document.getElementById("plotLengthM").value = lM;
  document.getElementById("grossAreaFt").value = areaSqFt;
  document.getElementById("grossArea").value   = areaSqM;
  document.getElementById("netArea").value     = areaSqM;
  /* Re-calc FAR & Coverage limits on plot change */
  updateFARLimit();
}

/* =========================================================
   NON-FAR AREA — auto-estimated as per MP Bhumi Vikas Rules
   Components:
     • Staircase (open) ≈ 3.5% of built-up
     • Water Tank        ≈ 2.5 sq.m
     • Mumty             ≈ 4.5 sq.m
   Total ≈ 3.5% of built-up + 7 sq.m (min)
   ========================================================= */
function calcSlabArea() {
  const bu = parseFloat(document.getElementById("proposedArea").value) || 0;

  let autoNonFAR = 0;
  if (bu > 0) {
    const staircase = +(bu * 0.035).toFixed(2);  // 3.5% of built-up
    const waterTank = 2.5;
    const mumty     = 4.5;
    autoNonFAR = +(staircase + waterTank + mumty).toFixed(2);
  }

  document.getElementById("nonFARArea").value = autoNonFAR;
  document.getElementById("slabArea").value   = +(bu + autoNonFAR).toFixed(2);

  /* Re-calc FAR limit */
  updateFARLimit();
}

/* =========================================================
   FAR & COVERAGE AUTO-LIMIT UPDATE
   ========================================================= */
function updateFARLimit() {
  const landUse = document.getElementById("landUse").value;
  const netArea = parseFloat(document.getElementById("netArea").value) || 0;
  const permFAR = getPermissibleFAR(landUse);
  document.getElementById("permFAR").value  = permFAR;
  document.getElementById("totalPerm").value = +(netArea * permFAR).toFixed(2);
}

document.getElementById("plotWidthFt").addEventListener("input", calcGrossArea);
document.getElementById("plotLengthFt").addEventListener("input", calcGrossArea);
document.getElementById("proposedArea").addEventListener("input", calcSlabArea);
document.getElementById("landUse").addEventListener("change", updateFARLimit);

document.addEventListener("DOMContentLoaded", () => {
  calcGrossArea();
  calcSlabArea();
  updateFARLimit();
});

/* ---------- Navigation ---------- */
function goToPage2() {
  if (!wardSel.value || !colonySel.value) {
    alert("Please select Ward and Colony.");
    return;
  }
  document.getElementById("sumDistrict").textContent = districtSel.value;
  document.getElementById("sumBody").textContent     = bodySel.value;
  document.getElementById("sumZone").textContent     = "Zone " + zoneSel.value;
  document.getElementById("sumWard").textContent     = wardSel.options[wardSel.selectedIndex].textContent;
  document.getElementById("sumColony").textContent   = colonySel.value;

  document.getElementById("page1").classList.remove("active");
  document.getElementById("page2").classList.add("active");
  document.getElementById("stepTab2").classList.add("active");
  document.getElementById("stepLine").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToPage1() {
  document.getElementById("page2").classList.remove("active");
  document.getElementById("page1").classList.add("active");
  document.getElementById("stepTab2").classList.remove("active");
  document.getElementById("stepLine").classList.remove("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   FAR / COVERAGE
   ========================================================= */
function getPermissibleFAR(landUse) {
  switch (landUse) {
    case "Residential":     return 1.50;
    case "Commercial zone": return 1.25;
    case "Industrial":      return 1.00;
    case "Mixed":           return 1.50;
    default:                return 1.50;
  }
}
function getPermissibleCoverage(landUse) {
  switch (landUse) {
    case "Residential":     return 60;
    case "Commercial zone": return 60;
    case "Industrial":      return 55;
    case "Mixed":           return 60;
    default:                return 60;
  }
}

/* =========================================================
   PERMISSION FEE SLAB
   ========================================================= */
function permissionFee(area) {
  if (area <= 0)    return 0;
  if (area <= 75)   return 750;
  if (area <= 150)  return 1500;
  if (area <= 300)  return 3000;
  if (area <= 500)  return 5000;
  if (area <= 1000) return 8000;
  return 8000 + (area - 1000) * 10;
}

/* =========================================================
   RAINWATER HARVESTING SLAB
   ========================================================= */
function waterHarvestingCharges(plotAreaSqM) {
  const a = parseFloat(plotAreaSqM) || 0;
  if (a < 140)   return 0;
  if (a <= 200)  return 7000;
  if (a <= 300)  return 10000;
  if (a <= 400)  return 12000;
  return 15000;
}

/* =========================================================
   LABOUR CESS
   ========================================================= */
function labourCessAmount(constructionCost, buildingUse) {
  const value = parseFloat(constructionCost) || 0;
  const isCommercial =
    buildingUse === "Mercantile" ||
    buildingUse === "Office" ||
    buildingUse === "Godown" ||
    buildingUse === "Industrial";

  if (isCommercial)      return +(value * 0.01).toFixed(2);
  if (value >= 1000000)  return +(value * 0.01).toFixed(2);
  return 0;
}

/* =========================================================
   MAIN CALCULATION
   ========================================================= */
function calculateRequirements() {
  const landUse          = document.getElementById("landUse").value;
  const buildingUse      = document.getElementById("buildingUse").value;
  const activity         = document.getElementById("activity").value;
  const structure        = document.getElementById("structure").value;
  const netArea          = parseFloat(document.getElementById("netArea").value) || 0;
  const proposedArea     = parseFloat(document.getElementById("proposedArea").value) || 0;
  const nonFARArea       = parseFloat(document.getElementById("nonFARArea").value) || 0;
  const slabArea         = parseFloat(document.getElementById("slabArea").value) || 0;
  const floors           = parseInt(document.getElementById("floors").value) || 0;
  const consFAR          = parseFloat(document.getElementById("consFAR").value) || 0;
  const propCoverage     = parseFloat(document.getElementById("propCoverage").value) || 0;

  /* ---- Requirement ---- */
  const permFAR      = getPermissibleFAR(landUse);
  const permCoverage = getPermissibleCoverage(landUse);
  const totalPerm    = +(netArea * permFAR).toFixed(2);
  const maxCoverage  = +(netArea * permCoverage / 100).toFixed(2);
  document.getElementById("permFAR").value   = permFAR;
  document.getElementById("totalPerm").value = totalPerm;

  const farOK      = consFAR <= permFAR;
  const coverageOK = propCoverage <= permCoverage;
  const areaOK     = proposedArea <= totalPerm;

  /* ---- Commercial? ---- */
  const isCommercial =
    buildingUse === "Mercantile" ||
    buildingUse === "Office" ||
    buildingUse === "Godown" ||
    buildingUse === "Industrial" ||
    landUse === "Commercial zone";

  /* ---- Rate auto-pick ---- */
  const data = (locationData[wardSel.value] || {})[colonySel.value] || {};

  /* =========================================================
     CONSTRUCTION RATE — Building Use + Structure ke hisaab se
     ========================================================= */
  let buildingRateForKarmkar = 0;
  let plotRateForDeduction  = 0;
  let buildingLabel = "";
  let plotLabel = "";

  if (isCommercial) {
    plotRateForDeduction = data.plotCom || 0;
    plotLabel = "Plot Commercial";
    if (buildingUse === "Mercantile") {
      buildingRateForKarmkar = data.shop || 0;
      buildingLabel = "Shop";
    } else if (buildingUse === "Office") {
      buildingRateForKarmkar = data.office || 0;
      buildingLabel = "Office";
    } else if (buildingUse === "Godown" || buildingUse === "Industrial") {
      buildingRateForKarmkar = data.godown || 0;
      buildingLabel = "Godown";
    } else {
      buildingRateForKarmkar = data.shop || 0;
      buildingLabel = "Shop (default)";
    }
  } else {
    plotRateForDeduction = data.plotRes || 0;
    plotLabel = "Plot Residential";
    if (structure === "RCC") {
      buildingRateForKarmkar = data.rcc || 0;
      buildingLabel = "Residential RCC";
    } else if (structure === "RBC") {
      buildingRateForKarmkar = data.rbc || 0;
      buildingLabel = "Residential RBC";
    } else if (structure === "Tin Shed") {
      buildingRateForKarmkar = data.tin || 0;
      buildingLabel = "Residential Tin Shed";
    } else if (structure === "Kachcha Kavelu") {
      buildingRateForKarmkar = data.kachcha || 0;
      buildingLabel = "Residential Kachcha Kavelu";
    } else {
      buildingRateForKarmkar = data.rcc || 0;
      buildingLabel = "Residential RCC (default)";
    }
  }

  const estimatedRate = Math.max(0, buildingRateForKarmkar - plotRateForDeduction);

  document.getElementById("buildingRCC").value   = buildingRateForKarmkar;
  document.getElementById("plotRes").value       = plotRateForDeduction;
  document.getElementById("estimatedRate").value = estimatedRate;

  /* =========================================================
     AREA BASE — ALWAYS Total Slab Area
     ========================================================= */
  const areaForKarmkar = slabArea;

  /* =========================================================
     PERMISSION FEE
     ========================================================= */
  let permFeeAmount = permissionFee(proposedArea);
  if (activity === "Alteration & Addition") {
    permFeeAmount = +(permFeeAmount / 3).toFixed(2);
  }

  /* =========================================================
     CONSTRUCTION COST = Slab Area × Estimated Rate
     ========================================================= */
  const constructionValue = +(areaForKarmkar * estimatedRate).toFixed(2);

  /* =========================================================
     RAINWATER HARVESTING — only Compounding
     ========================================================= */
  let waterHarvesting = 0;
  if (activity === "Compounding") {
    waterHarvesting = waterHarvestingCharges(netArea);
  }

  /* =========================================================
     COMPOUNDING FEE = Multiplier × Permission Fee
     ========================================================= */
  let compoundingFee = 0;
  let compoundingMultiplier = 0;
  if (activity === "Compounding") {
    compoundingMultiplier = isCommercial ? 6 : 5;
    const fullPermFee = permissionFee(proposedArea);
    compoundingFee = +(compoundingMultiplier * fullPermFee).toFixed(2);
  }

  /* =========================================================
     KARMAKAR FEES = 1% of Construction Cost (Slab-based)
     ========================================================= */
  let karmkarFee = 0;
  if (activity === "Alteration & Addition" || activity === "Compounding") {
    karmkarFee = labourCessAmount(constructionValue, buildingUse);
  }

  /* =========================================================
     GRAND TOTAL
     ========================================================= */
  const grandTotal = +(
    permFeeAmount + waterHarvesting + compoundingFee + karmkarFee
  ).toFixed(2);

  /* ---- Requirement Render ---- */
  const req = document.getElementById("requirementResult");
  req.style.display = "block";
  req.innerHTML = `
    <h3>Building Requirement Summary</h3>
    <table>
      <tr><td>Permissible FAR (${landUse})</td><td>${permFAR}</td></tr>
      <tr><td>Consumed FAR</td><td>${consFAR} ${farOK ? "✅" : "❌"}</td></tr>
      <tr><td>Total Permissible Built-up Area</td><td>${totalPerm} sq.m</td></tr>
      <tr><td>Proposed Built-up (FAR) Area</td><td>${proposedArea} sq.m ${areaOK ? "✅" : "❌"}</td></tr>
      <tr><td>Non-FAR Area (auto)</td><td>${nonFARArea} sq.m</td></tr>
      <tr><td>Total Slab Area</td><td>${slabArea} sq.m</td></tr>
      <tr><td>Permissible Ground Coverage</td><td>${permCoverage}% (max ${maxCoverage} sq.m)</td></tr>
      <tr><td>Proposed Ground Coverage</td><td>${propCoverage}% ${coverageOK ? "✅" : "❌"}</td></tr>
      <tr><td>Building Use</td><td>${buildingUse}</td></tr>
      <tr><td>Activity Type</td><td>${activity}</td></tr>
      <tr><td>Structure Type</td><td>${structure}</td></tr>
      <tr><td>No. of Floors</td><td>${floors}</td></tr>
      <tr><td>Building Rate Used (${buildingLabel})</td><td>₹ ${buildingRateForKarmkar} / sq.m</td></tr>
      <tr><td>Deduction (${plotLabel})</td><td>₹ ${plotRateForDeduction} / sq.m</td></tr>
      <tr><td><b>Estimated Construction Rate</b></td><td><b>₹ ${estimatedRate} / sq.m</b></td></tr>
      <tr><td>Karmkar Area Base</td><td>Total Slab Area (${areaForKarmkar} sq.m)</td></tr>
      <tr><td><b>Estimated Construction Cost</b></td><td><b>₹ ${constructionValue.toFixed(2)}</b></td></tr>
    </table>
    <p class="note">✅ = within permissible limits, ❌ = exceeds permissible limits.</p>
  `;

  /* ---- Fee Render ---- */
  let feeRows = `
    <tr><td><b>Permission Fee</b> ${activity === "Alteration & Addition" ? "(1/3 of slab)" : "(as per slab)"}</td><td>₹ ${permFeeAmount.toFixed(2)}</td></tr>
  `;

  if (activity === "Compounding") {
    feeRows += `
      <tr><td>Rainwater Harvesting Charges (RWH)</td><td>₹ ${waterHarvesting.toFixed(2)}</td></tr>
      <tr><td>Compounding Fee (${compoundingMultiplier}× Permission Fee)</td><td>₹ ${compoundingFee.toFixed(2)}</td></tr>
    `;
  }

  if (activity === "Alteration & Addition" || activity === "Compounding") {
    let cessNote = "";
    if (isCommercial)                          cessNote = "(Commercial — 1%)";
    else if (constructionValue < 1000000)      cessNote = "(Residential < ₹10L — Exempt)";
    else                                        cessNote = "(Residential ≥ ₹10L — 1%)";
    feeRows += `
      <tr><td>Karmkar Fees (Labour Cess) ${cessNote}</td><td>₹ ${karmkarFee.toFixed(2)}</td></tr>
    `;
  }

  feeRows += `
    <tr class="total-row"><td><b>Grand Total</b></td><td><b>₹ ${grandTotal.toFixed(2)}</b></td></tr>
  `;

  const fee = document.getElementById("feeResult");
  fee.style.display = "block";
  fee.innerHTML = `
    <h3>Estimated Fee — ${activity}</h3>
    <table>${feeRows}</table>
    <p class="note">
      Estimated Construction Rate: ₹ ${estimatedRate} / sq.m (${buildingLabel} − ${plotLabel})<br>
      Karmkar Area Base: Total Slab Area = ${areaForKarmkar} sq.m<br>
      Construction Cost: ₹ ${constructionValue.toFixed(2)}<br>
      Fee structure as per ABPAS 3.0 & MPIGR Collector Guideline.
    </p>
  `;

  fee.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Initial ---------- */
populateBodies();