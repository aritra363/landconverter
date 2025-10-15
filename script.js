// ------------------------------
// Indian Land Converter - SEO Optimized
// ------------------------------

const states = [
  "West Bengal", "Bihar", "Assam", "Uttar Pradesh", "Haryana", "Punjab",
  "Rajasthan", "Gujarat", "Maharashtra", "Karnataka", "Kerala", "Tamil Nadu",
  "Andhra Pradesh", "Telangana", "Himachal Pradesh", "Jammu & Kashmir",
  "Odisha", "Jharkhand"
];

const landUnitsData = {
  "West Bengal": { units: { bigha: 0.3306, katha: 0.0165, chatak: 0.00103125, gonda: 0.0002578125, decimal: 0.01 } },
  Bihar: { units: { bigha: 0.625, katha: 0.03125, dhur: 0.00078125, decimal: 0.01 } },
  Assam: { units: { bigha: 0.3306, katha: 0.01653, lessa: 0.0006612 } },
  "Uttar Pradesh": { units: { bigha: 0.625, katha: 0.03125, dhur: 0.00078125 } },
  Haryana: { units: { kanal: 0.125, marla: 0.00625, bigha: 0.25 } },
  Punjab: { units: { kanal: 0.125, marla: 0.00625, ghumaon: 0.33 } },
  Rajasthan: { units: { bigha: 0.625, biswa: 0.03125 } },
  Gujarat: { units: { bigha: 0.625, guntha: 0.025 } },
  Maharashtra: { units: { guntha: 0.025, acre: 1 } },
  Karnataka: { units: { guntha: 0.025, cent: 0.01 } },
  Kerala: { units: { cent: 0.01, acre: 1 } },
  "Tamil Nadu": { units: { ground: 0.055, cent: 0.01, acre: 1 } },
  "Andhra Pradesh": { units: { ankanam: 0.0022957, guntha: 0.025 } },
  Telangana: { units: { ankanam: 0.0022957, guntha: 0.025 } },
  "Himachal Pradesh": { units: { bigha: 0.4, biswa: 0.02 } },
  "Jammu & Kashmir": { units: { kanal: 0.125, marla: 0.00625 } },
  Odisha: { units: { decimal: 0.01, acre: 1 } },
  Jharkhand: { units: { decimal: 0.01, dhur: 0.00078125 } },
};

const globalUnits = {
  acre: 1,
  hectare: 2.47105,
  sqfeet: 0.00002296,
  sqm: 0.000247105,
};

// ------------------------------
// DOM Elements
// ------------------------------
const input = document.getElementById("landInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const stateSelect = document.getElementById("stateSelect");
const result = document.getElementById("result");
const langSelect = document.getElementById("langSelect");
const themeToggle = document.getElementById("theme-toggle");

// Populate State Dropdown
states.forEach(s => {
  const opt = document.createElement("option");
  opt.textContent = s;
  opt.value = s;
  stateSelect.appendChild(opt);
});

// ------------------------------
// Multilingual Support
// ------------------------------
const translations = {
  en: { enterValid: "Please enter a valid number.", basedOn: "Based on conversion rate for", resultText: "Result" },
  hi: { enterValid: "कृपया सही संख्या दर्ज करें।", basedOn: "परिवर्तन दर आधारित है", resultText: "परिणाम" },
  bn: { enterValid: "অনুগ্রহ করে একটি সঠিক সংখ্যা লিখুন।", basedOn: "রূপান্তর হার নির্ভর করছে", resultText: "ফলাফল" },
};
let currentLang = "en";

// ------------------------------
// Functions
// ------------------------------
function populateUnitsForState(state) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  const units = landUnitsData[state]?.units || {};
  const allUnits = { ...units, ...globalUnits };

  Object.keys(allUnits).forEach((unit) => {
    const opt1 = document.createElement("option");
    opt1.value = unit;
    opt1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
    const opt2 = opt1.cloneNode(true);
    fromUnit.appendChild(opt1);
    toUnit.appendChild(opt2);
  });

  if (fromUnit.querySelector('option[value="bigha"]')) fromUnit.value = "bigha";
  if (toUnit.querySelector('option[value="acre"]')) toUnit.value = "acre";
}

function convertLand() {
  const val = parseFloat(input.value);
  if (isNaN(val)) {
    result.textContent = translations[currentLang].enterValid;
    return;
  }

  const state = stateSelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const units = { ...globalUnits, ...(landUnitsData[state]?.units || {}) };

  const fromInAcre = val * (units[from] || 1);
  const converted = fromInAcre / (units[to] || 1);

  result.innerHTML = `<strong>${translations[currentLang].resultText}:</strong><br/>${val} ${from} = <b>${converted.toFixed(4)} ${to}</b><br/>(${translations[currentLang].basedOn} ${state})`;

  updateSEOMeta(state, from, to); // 🔥 Auto SEO Update
}

// ------------------------------
// Dynamic SEO Updater
// ------------------------------
function updateSEOMeta(state, from, to) {
  const pageTitle = `${from.toUpperCase()} to ${to.toUpperCase()} Converter for ${state} | Indian Land Area Tool`;
  const pageDesc = `Instantly convert ${from} to ${to} for ${state}. Accurate ${state} land measurement conversion — Bigha, Katha, Decimal, Acre, Cent & more.`;
  const keywords = `${from} to ${to}, ${state} land converter, bigha to acre ${state}, katha to decimal, indian land area units, ${state} land measurement`;

  document.title = pageTitle;

  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement("meta");
    descTag.setAttribute("name", "description");
    document.head.appendChild(descTag);
  }
  descTag.setAttribute("content", pageDesc);

  let kwTag = document.querySelector('meta[name="keywords"]');
  if (!kwTag) {
    kwTag = document.createElement("meta");
    kwTag.setAttribute("name", "keywords");
    document.head.appendChild(kwTag);
  }
  kwTag.setAttribute("content", keywords);
}

// ------------------------------
// Theme Toggle
// ------------------------------
themeToggle.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

if (localStorage.getItem("theme")) {
  const saved = localStorage.getItem("theme");
  document.body.dataset.theme = saved;
  themeToggle.textContent = saved === "dark" ? "☀️" : "🌙";
}

// ------------------------------
// Event Listeners
// ------------------------------
langSelect.addEventListener("change", (e) => {
  currentLang = e.target.value;
  convertLand();
});

[input, fromUnit, toUnit, stateSelect].forEach((el) =>
  el.addEventListener("input", convertLand)
);

stateSelect.addEventListener("change", (e) => {
  populateUnitsForState(e.target.value);
  convertLand();
});

document.addEventListener("DOMContentLoaded", () => {
  populateUnitsForState(stateSelect.value || "West Bengal");
  convertLand();
});
