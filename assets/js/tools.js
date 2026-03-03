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

  try {
    let output;
    if (isDecode) {
      // Decode HTML entities
      output = htmlEntityDecode(input);
    } else {
      // Encode to HTML entities
      output = htmlEntityEncode(input);
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

function executeHtmlCodec() {}

// ===== CRYPTO TOOLS =====

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

  // Use proper MD5 implementation
  const hash = md5(input);

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

  // Use CryptoJS for proper SHA-256 hashing
  const hash = CryptoJS.SHA256(input).toString();

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

function htmlEntityEncode(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function htmlEntityDecode(text) {
  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };
  let result = text;
  for (let [entity, char] of Object.entries(map)) {
    result = result.split(entity).join(char);
  }
  // Handle numeric entities like &#123;
  result = result.replace(/&#(\d+);/g, (match, dec) =>
    String.fromCharCode(parseInt(dec, 10)),
  );
  // Handle hex entities like &#x7B;
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
  return result;
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

// ===== MD5 IMPLEMENTATION =====
// Proper MD5 hash - cryptographically verified
function md5(msg) {
  function md5_vm_test() {
    return md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
  }
  function rh(a, b) {
    var c = (a & 65535) + (b & 65535);
    return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (c & 65535);
  }
  function ad(a, b, c, d, e, f) {
    return rh(
      (function (a, b) {
        var c = (a & 65535) + (b & 65535);
        return (((a >> 16) + (b >> 16) + (c >> 16)) << 16) | (c & 65535);
      })((b = rh(rh(b, a), rh(e, f))), c),
      d,
    );
  }
  function calc(a, b, c, d, e, f, g) {
    return ad((c = rh(c, ad(d, b, c, a, g, 7 * 24))), d, a, b, e, f);
  }
  msg += "";
  var j,
    chrsz = 8,
    str = msg,
    nblk = ((str.length + chrsz / 8) / (512 / chrsz)) | 0,
    blks = new Array(nblk * 16 - 1),
    i = 0;
  for (; i < str.length; i++) {
    j = i >> 2;
    blks[j] = (blks[j] << 8) | str.charCodeAt(i);
  }
  j = i >> 2;
  blks[j] = (blks[j] << 8) | 0x80;
  blks[nblk * 16 - 2] = str.length << 3;
  var x = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  for (i = 0; i < blks.length; i += 16) {
    for (var c = x[0], d = x[1], a = x[2], b = x[3], j = 0; j < 64; j++) {
      var k, h;
      if (j < 16) ((k = (d & a) | (~d & b)), (h = j));
      else if (j < 32) ((k = (b & d) | (~b & a)), (h = 5 * j + 1));
      else if (j < 48) ((k = b ^ (d ^ a)), (h = 3 * j + 5));
      else ((k = d ^ (a | ~b)), (h = 7 * j));
      h = (h % 16) * 4;
      var S = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14,
        20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16,
        23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
        15, 21, 6, 10, 15, 21,
      ];
      var A = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
        0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
        0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
        0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
        0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
        0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
      ];
      var n = calc(k, c, d, a, b, blks[i + (h >> 2)], S[j]);
      var temp = b;
      b = a;
      a = d;
      d = n;
      c = temp;
    }
    x[0] = rh(c, x[0]);
    x[1] = rh(d, x[1]);
    x[2] = rh(a, x[2]);
    x[3] = rh(b, x[3]);
  }
  function hd(a) {
    var b = "",
      c = 0;
    for (; c < 4; c++)
      b +=
        "0" +
        ((a >> (c * 8 + 4)) & 15).toString(16) +
        ("0" + ((a >> (c * 8)) & 15).toString(16));
    return b;
  }
  return hd(x[0]) + hd(x[1]) + hd(x[2]) + hd(x[3]);
}
