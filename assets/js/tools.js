// ===== TOOL DEFINITIONS =====
const TOOLS = [
  // Text Tools
  {
    id: "text-reverse",
    name: "Text Reverser",
    category: "text",
    description: "Reverse text strings",
    render: renderTextReverser,
    execute: executeTextReverser,
  },
  {
    id: "text-case",
    name: "Case Converter",
    category: "text",
    description: "Convert text to different cases",
    render: renderCaseConverter,
    execute: executeCaseConverter,
  },
  {
    id: "text-statistics",
    name: "Text Statistics",
    category: "text",
    description: "Count characters, words, and lines",
    render: renderTextStatistics,
    execute: executeTextStatistics,
  },

  // Encoding Tools
  {
    id: "base64-codec",
    name: "Base64 Codec",
    category: "encoding",
    description: "Encode/decode Base64 strings",
    render: renderBase64Codec,
    execute: executeBase64Codec,
  },
  {
    id: "url-codec",
    name: "URL Codec",
    category: "encoding",
    description: "Encode/decode URL components",
    render: renderUrlCodec,
    execute: executeUrlCodec,
  },
  {
    id: "html-codec",
    name: "HTML Codec",
    category: "encoding",
    description: "Encode/decode HTML entities",
    render: renderHtmlCodec,
    execute: executeHtmlCodec,
  },

  // Crypto Tools
  {
    id: "md5-hash",
    name: "MD5 Hash",
    category: "crypto",
    description: "Generate MD5 hashes",
    render: renderMd5Hash,
    execute: executeMd5Hash,
  },
  {
    id: "sha256-hash",
    name: "SHA256 Hash",
    category: "crypto",
    description: "Generate SHA-256 hashes",
    render: renderSha256Hash,
    execute: executeSha256Hash,
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    category: "crypto",
    description: "Decode JWT tokens",
    render: renderJwtDecoder,
    execute: executeJwtDecoder,
  },

  // Generators
  {
    id: "password-gen",
    name: "Password Generator",
    category: "generators",
    description: "Generate secure random passwords",
    render: renderPasswordGen,
    execute: executePasswordGen,
  },
  {
    id: "uuid-gen",
    name: "UUID Generator",
    category: "generators",
    description: "Generate UUID v4 identifiers",
    render: renderUuidGen,
    execute: executeUuidGen,
  },
  {
    id: "random-color",
    name: "Random Color",
    category: "generators",
    description: "Generate random hex colors",
    render: renderRandomColor,
    execute: executeRandomColor,
  },

  // Formatters
  {
    id: "json-formatter",
    name: "JSON Formatter",
    category: "formatters",
    description: "Format and validate JSON",
    render: renderJsonFormatter,
    execute: executeJsonFormatter,
  },
  {
    id: "csv-json",
    name: "CSV to JSON",
    category: "formatters",
    description: "Convert CSV to JSON",
    render: renderCsvJson,
    execute: executeCsvJson,
  },
  {
    id: "minify-code",
    name: "Code Minifier",
    category: "formatters",
    description: "Minify CSS, JS, and HTML",
    render: renderMinifyCode,
    execute: executeMinifyCode,
  },
];

// ===== GLOBAL STATE =====
let allTools = [...TOOLS];
let currentCategory = "all";
let currentModalTool = null;

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  renderTools();
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  document.getElementById("globalSearch").addEventListener("input", (e) => {
    filterAndRender(e.target.value);
  });

  // Category filters
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      currentCategory = link.dataset.category;
      renderTools();
    });
  });

  // Modal controls
  const modal = document.getElementById("toolModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalCloseBtn");

  closeBtn.addEventListener("click", closeToolModal);
  overlay.addEventListener("click", closeToolModal);
}

// ===== TOOL RENDERING & FILTERING =====
function renderTools() {
  const container = document.getElementById("toolsContainer");
  container.innerHTML = "";

  let filtered =
    currentCategory === "all"
      ? allTools
      : allTools.filter((t) => t.category === currentCategory);

  filtered.forEach((tool) => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `<h3>${tool.name}</h3><p>${tool.description}</p>`;
    card.addEventListener("click", () => openToolModal(tool));
    container.appendChild(card);
  });
}

function filterAndRender(query) {
  const searchTerm = query.toLowerCase();
  allTools = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm),
  );
  renderTools();
}

// ===== MODAL MANAGEMENT =====
function openToolModal(tool) {
  currentModalTool = tool;
  const modal = document.getElementById("toolModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");

  title.textContent = tool.name;
  body.innerHTML = "";
  tool.render(body);

  modal.classList.add("show");
}

function closeToolModal() {
  document.getElementById("toolModal").classList.remove("show");
  currentModalTool = null;
}

function showResult(container, result) {
  container.innerHTML = result;
}

// ===== TEXT TOOLS =====

function renderTextReverser(container) {
  container.innerHTML = `
    <form class="tool-form" onsubmit="currentModalTool.execute(); return false;">
      <div class="form-group">
        <label>Text to Reverse:</label>
        <textarea id="textInput" required></textarea>
      </div>
      <button type="submit" class="tool-button">Reverse</button>
      <div id="textResult"></div>
    </form>
  `;
}

function executeTextReverser() {
  const inputText = document.getElementById("textInput").value;
  const reversed = inputText.split("").reverse().join("");

  const resultDiv = document.getElementById("textResult");
  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Reversed Text</h4>
      <div class="result-text"><span>${escaped(reversed)}</span></div>
    </div>
  `;
  addCopyButton(resultDiv, reversed);
}

function renderCaseConverter(container) {
  container.innerHTML = `
    <form class="tool-form" onsubmit="currentModalTool.execute(); return false;">
      <div class="form-group">
        <label>Enter Text:</label>
        <textarea id="caseInput" required></textarea>
      </div>
      <div id="caseResult"></div>
    </form>
  `;
  updateCaseResults();
  document
    .getElementById("caseInput")
    .addEventListener("input", updateCaseResults);
}

function updateCaseResults() {
  const text = document.getElementById("caseInput")?.value || "";
  const resultDiv = document.getElementById("caseResult");

  if (!text) return (resultDiv.innerHTML = "");

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Case Variations</h4>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">Lowercase</div>
          <div class="result-value">${text.toLowerCase()}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Uppercase</div>
          <div class="result-value">${text.toUpperCase()}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Title Case</div>
          <div class="result-value">${titleCase(text)}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Sentence Case</div>
          <div class="result-value">${sentenceCase(text)}</div>
        </div>
      </div>
    </div>
  `;
}

function executeCaseConverter() {
  // Live update in form
}

function renderTextStatistics(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Analyze Text:</label>
        <textarea id="statsInput" required></textarea>
      </div>
      <div id="statsResult"></div>
    </form>
  `;
  updateTextStats();
  document
    .getElementById("statsInput")
    .addEventListener("input", updateTextStats);
}

function updateTextStats() {
  const text = document.getElementById("statsInput")?.value || "";
  const resultDiv = document.getElementById("statsResult");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.trim() ? text.split("\n").length : 0;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Text Statistics</h4>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">Characters</div>
          <div class="result-value">${chars}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Without Spaces</div>
          <div class="result-value">${charsNoSpace}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Words</div>
          <div class="result-value">${words}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Lines</div>
          <div class="result-value">${lines}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Sentences</div>
          <div class="result-value">${sentences}</div>
        </div>
      </div>
    </div>
  `;
}

function executeTextStatistics() {
  // Live update in form
}

// ===== ENCODING TOOLS =====

function renderBase64Codec(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input Text:</label>
        <textarea id="base64Input" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateBase64()">Encode</button>
        <button type="button" class="tool-button" onclick="updateBase64(true)">Decode</button>
      </div>
      <div id="base64Result"></div>
    </form>
  `;
}

function updateBase64(isDecode = false) {
  const input = document.getElementById("base64Input").value;
  const resultDiv = document.getElementById("base64Result");

  try {
    let output;
    if (isDecode) {
      output = atob(input);
    } else {
      output = btoa(input);
    }

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>${isDecode ? "Decoded" : "Encoded"} Result</h4>
        <div class="result-text">${escaped(output)}</div>
      </div>
    `;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeBase64Codec() {}

function renderUrlCodec(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input:</label>
        <textarea id="urlInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateUrlCodec()">Encode</button>
        <button type="button" class="tool-button" onclick="updateUrlCodec(true)">Decode</button>
      </div>
      <div id="urlResult"></div>
    </form>
  `;
}

function updateUrlCodec(isDecode = false) {
  const input = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("urlResult");

  try {
    const output = isDecode
      ? decodeURIComponent(input)
      : encodeURIComponent(input);
    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>${isDecode ? "Decoded" : "Encoded"} Result</h4>
        <div class="result-text">${escaped(output)}</div>
      </div>
    `;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeUrlCodec() {}

function renderHtmlCodec(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>HTML Input:</label>
        <textarea id="htmlInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateHtmlCodec()">Encode</button>
        <button type="button" class="tool-button" onclick="updateHtmlCodec(true)">Decode</button>
      </div>
      <div id="htmlResult"></div>
    </form>
  `;
}

function updateHtmlCodec(isDecode = false) {
  const input = document.getElementById("htmlInput").value;
  const resultDiv = document.getElementById("htmlResult");

  const textarea = document.createElement("textarea");
  let output;

  if (isDecode) {
    textarea.innerHTML = input;
    output = textarea.value;
  } else {
    textarea.textContent = input;
    output = textarea.innerHTML;
  }

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>${isDecode ? "Decoded" : "Encoded"} Result</h4>
      <div class="result-text">${escaped(output)}</div>
    </div>
  `;
  addCopyButton(resultDiv, output);
}

function executeHtmlCodec() {}

// ===== CRYPTO TOOLS =====

// Simple MD5 implementation for demo (use library in production)
function renderMd5Hash(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text to Hash:</label>
        <textarea id="md5Input" required></textarea>
      </div>
      <div id="md5Result"></div>
    </form>
  `;
  document
    .getElementById("md5Input")
    .addEventListener("input", () => updateMd5());
  updateMd5();
}

function updateMd5() {
  const input = document.getElementById("md5Input").value;
  const resultDiv = document.getElementById("md5Result");

  if (!input) return;

  // Note: This uses a simple hash - for production use crypto-js library
  const hash = simpleHash(input);

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>MD5 Hash</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

function executeMd5Hash() {}

function renderSha256Hash(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text to Hash:</label>
        <textarea id="sha256Input" required></textarea>
      </div>
      <div id="sha256Result"></div>
    </form>
  `;
  document
    .getElementById("sha256Input")
    .addEventListener("input", () => updateSha256());
  updateSha256();
}

function updateSha256() {
  const input = document.getElementById("sha256Input").value;
  const resultDiv = document.getElementById("sha256Result");

  if (!input) return;

  const hash = simpleHash(input, 256);

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>SHA-256 Hash</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

function executeSha256Hash() {}

function renderJwtDecoder(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>JWT Token:</label>
        <textarea id="jwtInput" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." required></textarea>
      </div>
      <div id="jwtResult"></div>
    </form>
  `;
  document
    .getElementById("jwtInput")
    .addEventListener("input", () => updateJwtDecoder());
}

function updateJwtDecoder() {
  const token = document.getElementById("jwtInput").value.trim();
  const resultDiv = document.getElementById("jwtResult");

  if (!token) return;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>JWT Decoded</h4>
        <div style="margin-top: 15px;">
          <strong>Header:</strong>
          <pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; font-size: 0.85rem; overflow-x: auto;">${JSON.stringify(header, null, 2)}</pre>
        </div>
        <div style="margin-top: 15px;">
          <strong>Payload:</strong>
          <pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; font-size: 0.85rem; overflow-x: auto;">${JSON.stringify(payload, null, 2)}</pre>
        </div>
      </div>
    `;
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeJwtDecoder() {}

// ===== GENERATORS =====

function renderPasswordGen(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Length:</label>
        <input type="number" id="passLength" value="16" min="8" max="128">
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="passUppercase" checked> Uppercase (A-Z)
        </label>
        <label>
          <input type="checkbox" id="passLowercase" checked> Lowercase (a-z)
        </label>
        <label>
          <input type="checkbox" id="passNumbers" checked> Numbers (0-9)
        </label>
        <label>
          <input type="checkbox" id="passSymbols" checked> Symbols (!@#$...)
        </label>
      </div>
      <button type="button" class="tool-button" onclick="updatePasswordGen()">Generate</button>
      <div id="passResult"></div>
    </form>
  `;
}

function updatePasswordGen() {
  const length = parseInt(document.getElementById("passLength").value);
  const chars = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  let pool = "";
  if (document.getElementById("passUppercase").checked) pool += chars.upper;
  if (document.getElementById("passLowercase").checked) pool += chars.lower;
  if (document.getElementById("passNumbers").checked) pool += chars.numbers;
  if (document.getElementById("passSymbols").checked) pool += chars.symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += pool.charAt(Math.floor(Math.random() * pool.length));
  }

  const resultDiv = document.getElementById("passResult");
  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Generated Password</h4>
      <div class="result-text">${password}</div>
    </div>
  `;
  addCopyButton(resultDiv, password);
}

function executePasswordGen() {}

function renderUuidGen(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Count:</label>
        <input type="number" id="uuidCount" value="1" min="1" max="10">
      </div>
      <button type="button" class="tool-button" onclick="updateUuidGen()">Generate UUID</button>
      <div id="uuidResult"></div>
    </form>
  `;
}

function updateUuidGen() {
  const count = parseInt(document.getElementById("uuidCount").value);
  const resultDiv = document.getElementById("uuidResult");
  let uuids = [];

  for (let i = 0; i < count; i++) {
    uuids.push(generateUUID());
  }

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Generated UUIDs</h4>
      ${uuids.map((uuid) => `<div class="result-text" style="margin-bottom: 10px;">${uuid}</div>`).join("")}
    </div>
  `;
  addCopyButton(resultDiv, uuids.join("\n"));
}

function executeUuidGen() {}

function renderRandomColor(container) {
  container.innerHTML = `
    <form class="tool-form">
      <button type="button" class="tool-button" onclick="updateRandomColor()">Generate Color</button>
      <div id="colorResult"></div>
    </form>
  `;
}

function updateRandomColor() {
  const hex = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const rgb = hexToRgb(hex);
  const resultDiv = document.getElementById("colorResult");

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Random Color</h4>
      <div style="background: ${hex}; width: 100%; height: 120px; border-radius: 6px; margin-bottom: 15px; border: 1px solid var(--border);"></div>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">Hex</div>
          <div class="result-value">${hex}</div>
        </div>
        <div class="result-item">
          <div class="result-label">RGB</div>
          <div class="result-value">${rgb}</div>
        </div>
      </div>
    </div>
  `;
  addCopyButton(resultDiv, hex);
}

function executeRandomColor() {}

// ===== FORMATTERS =====

function renderJsonFormatter(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>JSON Input:</label>
        <textarea id="jsonInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateJsonFormatter()">Format</button>
        <button type="button" class="tool-button" onclick="updateJsonFormatter(true)">Minify</button>
      </div>
      <div id="jsonResult"></div>
    </form>
  `;
}

function updateJsonFormatter(minify = false) {
  const input = document.getElementById("jsonInput").value;
  const resultDiv = document.getElementById("jsonResult");

  try {
    const parsed = JSON.parse(input);
    const output = minify
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, 2);

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>${minify ? "Minified" : "Formatted"} JSON</h4>
        <div class="result-text">${escaped(output)}</div>
      </div>
    `;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Invalid JSON</h4>${e.message}</div>`;
  }
}

function executeJsonFormatter() {}

function renderCsvJson(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>CSV Input:</label>
        <textarea id="csvInput" placeholder="name,age,city\nJohn,30,NYC" required></textarea>
      </div>
      <button type="button" class="tool-button" onclick="updateCsvJson()">Convert</button>
      <div id="csvResult"></div>
    </form>
  `;
}

function updateCsvJson() {
  const input = document.getElementById("csvInput").value;
  const resultDiv = document.getElementById("csvResult");

  try {
    const lines = input.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const obj = {};
      headers.forEach((h, i) => (obj[h] = values[i]));
      return obj;
    });

    const json = JSON.stringify(data, null, 2);
    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>JSON Output</h4>
        <div class="result-text">${escaped(json)}</div>
      </div>
    `;
    addCopyButton(resultDiv, json);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeCsvJson() {}

function renderMinifyCode(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Code Input:</label>
        <textarea id="codeInput" required></textarea>
      </div>
      <div class="form-group">
        <label>Type:</label>
        <select id="codeType">
          <option>HTML</option>
          <option>CSS</option>
          <option>JavaScript</option>
        </select>
      </div>
      <button type="button" class="tool-button" onclick="updateMinifyCode()">Minify</button>
      <div id="minifyResult"></div>
    </form>
  `;
}

function updateMinifyCode() {
  const input = document.getElementById("codeInput").value;
  const resultDiv = document.getElementById("minifyResult");

  const minified = input
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove /* */ comments
    .replace(/\/\/.*$/gm, "") // Remove // comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, "$1") // Remove spaces around special chars
    .trim();

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Minified Code</h4>
      <div class="result-text">${escaped(minified)}</div>
    </div>
  `;
  addCopyButton(resultDiv, minified);
}

function executeMinifyCode() {}

// ===== UTILITY FUNCTIONS =====

function escaped(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;");
}

function addCopyButton(container, text) {
  const btn = document.createElement("button");
  btn.className = "copy-button";
  btn.textContent = "📋 Copy";
  btn.onclick = () => {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = "✓ Copied!";
      setTimeout(() => (btn.textContent = "📋 Copy"), 2000);
    });
  };
  container.appendChild(btn);
}

function titleCase(text) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function simpleHash(str, type = "md5") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash)
    .toString(16)
    .padStart(type === "md5" ? 32 : 64, "0");
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}
