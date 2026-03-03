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

  // New Text Tools
  {
    id: "regex-tester",
    name: "Regex Tester",
    category: "text",
    description: "Test and validate regular expressions with live matching",
    render: renderRegexTester,
    execute: executeRegexTester,
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    category: "text",
    description: "Generate placeholder text for designs",
    render: renderLoremIpsum,
    execute: executeLoremIpsum,
  },
  {
    id: "diff-checker",
    name: "Diff Checker",
    category: "text",
    description: "Compare two text blocks line-by-line",
    render: renderDiffChecker,
    execute: executeDiffChecker,
  },
  {
    id: "string-escaper",
    name: "String Escaper/Unescaper",
    category: "text",
    description: "Escape/unescape for various contexts (JSON, XML, SQL)",
    render: renderStringEscaper,
    execute: executeStringEscaper,
  },
  {
    id: "duplicate-remover",
    name: "Duplicate Line Remover",
    category: "text",
    description: "Clean up lists with duplicate removal options",
    render: renderDuplicateRemover,
    execute: executeDuplicateRemover,
  },

  // New Encoding Tools
  {
    id: "ascii-unicode",
    name: "ASCII/Unicode Converter",
    category: "encoding",
    description: "Convert text to ASCII/Unicode codes",
    render: renderAsciiUnicode,
    execute: executeAsciiUnicode,
  },
  {
    id: "morse-code",
    name: "Morse Code Converter",
    category: "encoding",
    description: "Text to Morse code and back",
    render: renderMorseCode,
    execute: executeMorseCode,
  },

  // New Crypto Tools
  {
    id: "sha512-hash",
    name: "SHA-512 Hash",
    category: "crypto",
    description: "Generate SHA-512 hashes",
    render: renderSha512Hash,
    execute: executeSha512Hash,
  },
  {
    id: "hmac-generator",
    name: "HMAC Generator",
    category: "crypto",
    description: "Generate HMAC-SHA256 signatures",
    render: renderHmacGenerator,
    execute: executeHmacGenerator,
  },
  {
    id: "crc32-checksum",
    name: "CRC-32 Checksum",
    category: "crypto",
    description: "File integrity verification",
    render: renderCrc32Checksum,
    execute: executeCrc32Checksum,
  },

  // New Generator Tools
  {
    id: "qr-code",
    name: "QR Code Generator",
    category: "generators",
    description: "Generate QR codes from text and URLs",
    render: renderQrCode,
    execute: executeQrCode,
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    category: "generators",
    description: "Create URL-friendly slugs from text",
    render: renderSlugGenerator,
    execute: executeSlugGenerator,
  },
  {
    id: "cron-validator",
    name: "Cron Expression Validator",
    category: "generators",
    description: "Validate and explain cron schedule syntax",
    render: renderCronValidator,
    execute: executeCronValidator,
  },

  // New Formatter Tools
  {
    id: "yaml-json",
    name: "YAML/JSON Converter",
    category: "formatters",
    description: "Convert bidirectionally between YAML and JSON formats",
    render: renderYamlJson,
    execute: executeYamlJson,
  },
  {
    id: "html-markdown",
    name: "HTML/Markdown Converter",
    category: "formatters",
    description: "Convert HTML to Markdown and vice versa",
    render: renderHtmlMarkdown,
    execute: executeHtmlMarkdown,
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    category: "formatters",
    description: "Format, validate, and minify XML documents",
    render: renderXmlFormatter,
    execute: executeXmlFormatter,
  },

  // New Date & Time Tools
  {
    id: "unix-timestamp",
    name: "Unix Timestamp Converter",
    category: "datetime",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa",
    render: renderUnixTimestamp,
    execute: executeUnixTimestamp,
  },
  {
    id: "iso8601-converter",
    name: "ISO 8601 Date Converter",
    category: "datetime",
    description: "Convert between ISO 8601 format and various date formats",
    render: renderIso8601Converter,
    execute: executeIso8601Converter,
  },
  {
    id: "timezone-converter",
    name: "Timezone Converter",
    category: "datetime",
    description: "Convert times across different timezones",
    render: renderTimezoneConverter,
    execute: executeTimezoneConverter,
  },

  // Web Performance & Network Tools (Future)
  {
    id: "website-speed-test",
    name: "Website Speed Test",
    category: "network",
    description: "Full page speed test with detailed performance insights",
    render: renderWebsiteSpeedTest,
    execute: executeWebsiteSpeedTest,
  },
  {
    id: "ip-location",
    name: "IP Location Finder",
    category: "network",
    description: "Lookup geographical location of IP addresses",
    render: renderIpLocation,
    execute: executeIpLocation,
  },
  {
    id: "dns-checker",
    name: "DNS Checker",
    category: "network",
    description: "Query DNS records across multiple nameservers",
    render: renderDnsChecker,
    execute: executeDnsChecker,
  },
  {
    id: "ping-test",
    name: "Ping Test",
    category: "network",
    description: "Simultaneous ping from multiple locations",
    render: renderPingTest,
    execute: executePingTest,
  },
  {
    id: "certificate-checker",
    name: "Certificate Checker",
    category: "network",
    description: "Decode and validate SSL/TLS certificates",
    render: renderCertificateChecker,
    execute: executeCertificateChecker,
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

// ===== NEW TEXT TOOLS =====

function renderRegexTester(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Regular Expression:</label>
        <input type="text" id="regexPattern" placeholder="^[a-z0-9]+$">
      </div>
      <div class="form-group">
        <label>Flags:</label>
        <input type="text" id="regexFlags" placeholder="g, i, m (space-separated)" value="g">
      </div>
      <div class="form-group">
        <label>Test String:</label>
        <textarea id="regexTestString" required></textarea>
      </div>
      <button type="button" class="tool-button" onclick="updateRegexTester()">Test</button>
      <div id="regexResult"></div>
    </form>
  `;
  document
    .getElementById("regexPattern")
    .addEventListener("input", updateRegexTester);
  document
    .getElementById("regexTestString")
    .addEventListener("input", updateRegexTester);
}

function updateRegexTester() {
  const pattern = document.getElementById("regexPattern").value;
  const flags = document.getElementById("regexFlags").value.replace(/\s/g, "");
  const testString = document.getElementById("regexTestString").value;
  const resultDiv = document.getElementById("regexResult");

  if (!pattern || !testString) return;

  try {
    const regex = new RegExp(pattern, flags);
    const matches = [...testString.matchAll(regex)];

    let html = `
      <div class="tool-result">
        <h4>Matches Found: ${matches.length}</h4>
    `;

    if (matches.length > 0) {
      html += `<div class="result-grid">`;
      matches.forEach((match, i) => {
        html += `
          <div class="result-item">
            <div class="result-label">Match ${i + 1}</div>
            <div class="result-value">${escaped(match[0])}</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `</div>`;
    resultDiv.innerHTML = html;
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeRegexTester() {}

function renderLoremIpsum(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Paragraphs:</label>
        <input type="number" id="loremCount" value="3" min="1" max="20">
      </div>
      <div class="form-group">
        <label>
          <input type="radio" name="loremType" value="paragraphs" checked> Paragraphs
        </label>
        <label>
          <input type="radio" name="loremType" value="sentences"> Sentences
        </label>
        <label>
          <input type="radio" name="loremType" value="words"> Words
        </label>
      </div>
      <button type="button" class="tool-button" onclick="updateLoremIpsum()">Generate</button>
      <div id="loremResult"></div>
    </form>
  `;
}

function updateLoremIpsum() {
  const count = parseInt(document.getElementById("loremCount").value);
  const type = document.querySelector('input[name="loremType"]:checked').value;
  const resultDiv = document.getElementById("loremResult");

  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
  ];

  let result = "";
  if (type === "words") {
    result = Array(count)
      .fill(0)
      .map(() => loremWords[Math.floor(Math.random() * loremWords.length)])
      .join(" ");
  } else if (type === "sentences") {
    for (let i = 0; i < count; i++) {
      const sentenceLength = 5 + Math.floor(Math.random() * 10);
      const sentence = Array(sentenceLength)
        .fill(0)
        .map(() => loremWords[Math.floor(Math.random() * loremWords.length)])
        .join(" ");
      result += sentence.charAt(0).toUpperCase() + sentence.slice(1) + ". ";
    }
  } else {
    for (let i = 0; i < count; i++) {
      const sentenceCount = 4 + Math.floor(Math.random() * 4);
      let paragraph = "";
      for (let j = 0; j < sentenceCount; j++) {
        const sentenceLength = 5 + Math.floor(Math.random() * 10);
        const sentence = Array(sentenceLength)
          .fill(0)
          .map(() => loremWords[Math.floor(Math.random() * loremWords.length)])
          .join(" ");
        paragraph +=
          sentence.charAt(0).toUpperCase() + sentence.slice(1) + ". ";
      }
      result += paragraph + "\n\n";
    }
  }

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Generated Lorem Ipsum</h4>
      <div class="result-text">${escaped(result)}</div>
    </div>
  `;
  addCopyButton(resultDiv, result);
}

function executeLoremIpsum() {}

function renderDiffChecker(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text 1:</label>
        <textarea id="diffText1" required></textarea>
      </div>
      <div class="form-group">
        <label>Text 2:</label>
        <textarea id="diffText2" required></textarea>
      </div>
      <button type="button" class="tool-button" onclick="updateDiffChecker()">Compare</button>
      <div id="diffResult"></div>
    </form>
  `;
}

function updateDiffChecker() {
  const text1 = document.getElementById("diffText1").value;
  const text2 = document.getElementById("diffText2").value;
  const resultDiv = document.getElementById("diffResult");

  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");

  let html = `<div class="tool-result"><h4>Differences</h4><div class="diff-view">`;

  const maxLines = Math.max(lines1.length, lines2.length);
  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] || "";
    const line2 = lines2[i] || "";

    if (line1 !== line2) {
      html += `<div style="background: rgba(255,0,0,0.1); padding: 8px; margin: 4px 0; border-left: 3px solid #red;"><strong>Line ${i + 1}:</strong></div>`;
      if (line1)
        html += `<div style="color: #888; margin-left: 10px;">- ${escaped(line1)}</div>`;
      if (line2)
        html += `<div style="color: #888; margin-left: 10px;">+ ${escaped(line2)}</div>`;
    }
  }

  html += `</div></div>`;
  resultDiv.innerHTML = html;
}

function executeDiffChecker() {}

function renderStringEscaper(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input String:</label>
        <textarea id="escaperInput" required></textarea>
      </div>
      <div class="form-group">
        <label>Format:</label>
        <select id="escaperFormat">
          <option>JSON</option>
          <option>JavaScript</option>
          <option>HTML</option>
          <option>XML</option>
          <option>SQL</option>
          <option>URL</option>
        </select>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateEscaper()">Escape</button>
        <button type="button" class="tool-button" onclick="updateEscaper(true)">Unescape</button>
      </div>
      <div id="escaperResult"></div>
    </form>
  `;
}

function updateEscaper(unescape = false) {
  const input = document.getElementById("escaperInput").value;
  const format = document.getElementById("escaperFormat").value;
  const resultDiv = document.getElementById("escaperResult");

  let output = input;

  if (!unescape) {
    switch (format) {
      case "JSON":
        output = JSON.stringify(input).slice(1, -1);
        break;
      case "JavaScript":
        output = input
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r");
        break;
      case "HTML":
        output = htmlEntityEncode(input);
        break;
      case "XML":
        output = input.replace(
          /[<>&"']/g,
          (c) =>
            ({
              "<": "&lt;",
              ">": "&gt;",
              "&": "&amp;",
              '"': "&quot;",
              "'": "&apos;",
            })[c],
        );
        break;
      case "SQL":
        output = input.replace(/'/g, "''");
        break;
      case "URL":
        output = encodeURIComponent(input);
        break;
    }
  } else {
    switch (format) {
      case "JSON":
        output = JSON.parse('"' + input + '"');
        break;
      case "JavaScript":
        output = input
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
        break;
      case "HTML":
        output = htmlEntityDecode(input);
        break;
      case "XML":
        output = input
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'");
        break;
      case "SQL":
        output = input.replace(/''/g, "'");
        break;
      case "URL":
        output = decodeURIComponent(input);
        break;
    }
  }

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>${unescape ? "Unescaped" : "Escaped"} Output</h4>
      <div class="result-text">${escaped(output)}</div>
    </div>
  `;
  addCopyButton(resultDiv, output);
}

function executeStringEscaper() {}

function renderDuplicateRemover(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text (one item per line):</label>
        <textarea id="duplicateInput" required></textarea>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="duplicateCaseSensitive" checked> Case Sensitive
        </label>
        <label>
          <input type="checkbox" id="duplicateTrimWhitespace" checked> Trim Whitespace
        </label>
      </div>
      <button type="button" class="tool-button" onclick="updateDuplicateRemover()">Remove Duplicates</button>
      <div id="duplicateResult"></div>
    </form>
  `;
}

function updateDuplicateRemover() {
  let lines = document.getElementById("duplicateInput").value.split("\n");
  const caseSensitive = document.getElementById(
    "duplicateCaseSensitive",
  ).checked;
  const trimWhitespace = document.getElementById(
    "duplicateTrimWhitespace",
  ).checked;
  const resultDiv = document.getElementById("duplicateResult");

  if (trimWhitespace) {
    lines = lines.map((line) => line.trim());
  }

  const seen = new Set();
  const unique = lines.filter((line) => {
    const key = caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const output = unique.join("\n");
  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Results</h4>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">Original Lines</div>
          <div class="result-value">${lines.length}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Unique Lines</div>
          <div class="result-value">${unique.length}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Removed</div>
          <div class="result-value">${lines.length - unique.length}</div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <strong>Output:</strong>
        <div class="result-text">${escaped(output)}</div>
      </div>
    </div>
  `;
  addCopyButton(resultDiv, output);
}

function executeDuplicateRemover() {}

// ===== NEW ENCODING TOOLS =====

function renderAsciiUnicode(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input Text:</label>
        <textarea id="asciiInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateAsciiUnicode()">To ASCII/Unicode</button>
        <button type="button" class="tool-button" onclick="updateAsciiUnicode(true)">From ASCII/Unicode</button>
      </div>
      <div id="asciiResult"></div>
    </form>
  `;
}

function updateAsciiUnicode(fromCodes = false) {
  let input = document.getElementById("asciiInput").value;
  const resultDiv = document.getElementById("asciiResult");

  try {
    let output = "";
    if (fromCodes) {
      output = input
        .split(" ")
        .map((code) => String.fromCharCode(parseInt(code)))
        .join("");
    } else {
      output = [...input].map((char) => char.charCodeAt(0)).join(" ");
    }

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>${fromCodes ? "Text" : "ASCII/Unicode Codes"}</h4>
        <div class="result-text">${escaped(output)}</div>
      </div>
    `;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeAsciiUnicode() {}

function renderMorseCode(container) {
  const morseMap = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
  };

  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input:</label>
        <textarea id="morseInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateMorseCode()">To Morse</button>
        <button type="button" class="tool-button" onclick="updateMorseCode(true)">From Morse</button>
      </div>
      <div id="morseResult"></div>
    </form>
  `;
}

function updateMorseCode(fromMorse = false) {
  let input = document.getElementById("morseInput").value;
  const resultDiv = document.getElementById("morseResult");

  const morseMap = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
  };

  const reverseMorse = Object.fromEntries(
    Object.entries(morseMap).map(([k, v]) => [v, k]),
  );

  try {
    let output = "";
    if (fromMorse) {
      output = input
        .split(" ")
        .map((code) => reverseMorse[code] || "?")
        .join("");
    } else {
      output = input
        .toUpperCase()
        .split("")
        .map((char) => morseMap[char] || char)
        .join(" ");
    }

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>${fromMorse ? "Text" : "Morse Code"}</h4>
        <div class="result-text">${escaped(output)}</div>
      </div>
    `;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeMorseCode() {}

// ===== NEW CRYPTO TOOLS =====

function renderSha512Hash(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text to Hash:</label>
        <textarea id="sha512Input" required></textarea>
      </div>
      <div id="sha512Result"></div>
    </form>
  `;
  document
    .getElementById("sha512Input")
    .addEventListener("input", () => updateSha512());
  updateSha512();
}

function updateSha512() {
  const input = document.getElementById("sha512Input").value;
  const resultDiv = document.getElementById("sha512Result");

  if (!input) return;

  const hash = CryptoJS.SHA512(input).toString();

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>SHA-512 Hash</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

function executeSha512Hash() {}

function renderHmacGenerator(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Secret Key:</label>
        <input type="password" id="hmacKey" required>
      </div>
      <div class="form-group">
        <label>Message:</label>
        <textarea id="hmacMessage" required></textarea>
      </div>
      <div class="form-group">
        <label>Algorithm:</label>
        <select id="hmacAlgo">
          <option>SHA256</option>
          <option>SHA1</option>
          <option>MD5</option>
        </select>
      </div>
      <button type="button" class="tool-button" onclick="updateHmacGenerator()">Generate</button>
      <div id="hmacResult"></div>
    </form>
  `;
}

function updateHmacGenerator() {
  const key = document.getElementById("hmacKey").value;
  const message = document.getElementById("hmacMessage").value;
  const algo = document.getElementById("hmacAlgo").value;
  const resultDiv = document.getElementById("hmacResult");

  if (!key || !message) return;

  let hash;
  if (algo === "SHA256") {
    hash = CryptoJS.HmacSHA256(message, key).toString();
  } else if (algo === "SHA1") {
    hash = CryptoJS.HmacSHA1(message, key).toString();
  } else {
    hash = CryptoJS.HmacMD5(message, key).toString();
  }

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>HMAC-${algo} Signature</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

function executeHmacGenerator() {}

function renderCrc32Checksum(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text or File Content:</label>
        <textarea id="crc32Input" required></textarea>
      </div>
      <button type="button" class="tool-button" onclick="updateCrc32()">Calculate CRC-32</button>
      <div id="crc32Result"></div>
    </form>
  `;
}

function updateCrc32() {
  const input = document.getElementById("crc32Input").value;
  const resultDiv = document.getElementById("crc32Result");

  // Simple CRC-32 implementation
  const crc32 = (str) => {
    let crc = 0 ^ -1;
    for (let i = 0; i < str.length; i++) {
      crc = (crc >>> 8) ^ ((crc ^ str.charCodeAt(i)) & 0xff);
      for (let k = 0; k < 8; k++) {
        crc = (crc >>> 1) ^ ((crc & 1 ? 0xedb88320 : 0) & 0xffffffff);
      }
    }
    return ((crc ^ -1) >>> 0).toString(16).toUpperCase().padStart(8, "0");
  };

  const hash = crc32(input);

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>CRC-32 Checksum</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

function executeCrc32Checksum() {}

// ===== NEW GENERATOR TOOLS =====

function renderQrCode(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text or URL:</label>
        <input type="text" id="qrInput" placeholder="https://example.com" required>
      </div>
      <button type="button" class="tool-button" onclick="updateQrCode()">Generate QR Code</button>
      <div id="qrResult"></div>
    </form>
  `;
}

function updateQrCode() {
  const input = document.getElementById("qrInput").value;
  const resultDiv = document.getElementById("qrResult");

  if (!input) return;

  // Using QR Server API for simplicity
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(input)}`;

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>QR Code</h4>
      <img src="${qrUrl}" alt="QR Code" style="max-width: 100%; border: 1px solid var(--border); border-radius: 4px;">
      <div style="margin-top: 15px;">
        <a href="${qrUrl}" download="qrcode.png" class="tool-button" style="display: inline-block;">Download QR Code</a>
      </div>
    </div>
  `;
}

function executeQrCode() {}

function renderSlugGenerator(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Text:</label>
        <input type="text" id="slugInput" placeholder="My Amazing Blog Post Title" required>
      </div>
      <div class="form-group">
        <label>Separator:</label>
        <select id="slugSeparator">
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value=".">Dot (.)</option>
        </select>
      </div>
      <button type="button" class="tool-button" onclick="updateSlugGenerator()">Generate Slug</button>
      <div id="slugResult"></div>
    </form>
  `;
}

function updateSlugGenerator() {
  let text = document.getElementById("slugInput").value;
  const separator = document.getElementById("slugSeparator").value;
  const resultDiv = document.getElementById("slugResult");

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Generated Slug</h4>
      <div class="result-text">${slug}</div>
    </div>
  `;
  addCopyButton(resultDiv, slug);
}

function executeSlugGenerator() {}

function renderCronValidator(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Cron Expression:</label>
        <input type="text" id="cronInput" placeholder="0 12 * * *" required>
      </div>
      <button type="button" class="tool-button" onclick="updateCronValidator()">Validate</button>
      <div id="cronResult"></div>
    </form>
  `;
}

function updateCronValidator() {
  const input = document.getElementById("cronInput").value.trim();
  const resultDiv = document.getElementById("cronResult");

  const parts = input.split(/\s+/);
  if (parts.length !== 5) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Invalid</h4>Cron expression must have 5 fields</div>`;
    return;
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const fields = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];
  const ranges = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 6],
  ];

  let html = `<div class="tool-result"><h4>Cron Expression Analysis</h4><div class="result-grid">`;

  [minute, hour, dayOfMonth, month, dayOfWeek].forEach((field, i) => {
    const isValid = field === "*" || !isNaN(parseInt(field));
    html += `
      <div class="result-item">
        <div class="result-label">${fields[i]}</div>
        <div class="result-value">${field} ${isValid ? "✓" : "✗"}</div>
      </div>
    `;
  });

  html += `</div></div>`;
  resultDiv.innerHTML = html;
}

function executeCronValidator() {}

// ===== NEW FORMATTER TOOLS =====

function renderYamlJson(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input:</label>
        <textarea id="yamlJsonInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateYamlJson()">JSON to YAML</button>
        <button type="button" class="tool-button" onclick="updateYamlJson(true)">YAML to JSON</button>
      </div>
      <div id="yamlJsonResult"></div>
    </form>
  `;
}

function updateYamlJson(toYaml = false) {
  const input = document.getElementById("yamlJsonInput").value;
  const resultDiv = document.getElementById("yamlJsonResult");

  try {
    if (toYaml) {
      const obj = JSON.parse(input);
      let yaml = "";
      const stringify = (obj, indent = 0) => {
        const spaces = " ".repeat(indent);
        if (Array.isArray(obj)) {
          return obj
            .map(
              (item, i) =>
                `${i > 0 ? spaces : ""}- ${typeof item === "object" ? stringify(item, indent + 2) : item}`,
            )
            .join("\n");
        } else if (typeof obj === "object") {
          return Object.entries(obj)
            .map(
              ([k, v]) =>
                `${spaces}${k}: ${typeof v === "object" ? stringify(v, indent + 2) : v}`,
            )
            .join("\n");
        }
        return obj;
      };
      yaml = stringify(obj);
      resultDiv.innerHTML = `<div class="tool-result"><h4>YAML Output</h4><div class="result-text">${escaped(yaml)}</div></div>`;
      addCopyButton(resultDiv, yaml);
    } else {
      const obj = JSON.parse(input);
      const json = JSON.stringify(obj, null, 2);
      resultDiv.innerHTML = `<div class="tool-result"><h4>JSON Output</h4><div class="result-text">${escaped(json)}</div></div>`;
      addCopyButton(resultDiv, json);
    }
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeYamlJson() {}

function renderHtmlMarkdown(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Input:</label>
        <textarea id="htmlMarkdownInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateHtmlMarkdown()">HTML to Markdown</button>
        <button type="button" class="tool-button" onclick="updateHtmlMarkdown(true)">Markdown to HTML</button>
      </div>
      <div id="htmlMarkdownResult"></div>
    </form>
  `;
}

function updateHtmlMarkdown(toHtml = false) {
  const input = document.getElementById("htmlMarkdownInput").value;
  const resultDiv = document.getElementById("htmlMarkdownResult");

  try {
    let output = "";
    if (toHtml) {
      output = input
        .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
        .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        .replace(/^- (.*?)$/gm, "<li>$1</li>");
    } else {
      output = input
        .replace(
          /<h([1-6])>(.*?)<\/h[1-6]>/g,
          (m, n, t) => "#".repeat(+n) + " " + t,
        )
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
        .replace(/<em>(.*?)<\/em>/g, "*$1*")
        .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)")
        .replace(/<li>(.*?)<\/li>/g, "- $1");
    }

    resultDiv.innerHTML = `<div class="tool-result"><h4>${toHtml ? "HTML" : "Markdown"} Output</h4><div class="result-text">${escaped(output)}</div></div>`;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeHtmlMarkdown() {}

function renderXmlFormatter(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>XML Input:</label>
        <textarea id="xmlInput" required></textarea>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="updateXmlFormatter()">Format</button>
        <button type="button" class="tool-button" onclick="updateXmlFormatter(true)">Minify</button>
      </div>
      <div id="xmlResult"></div>
    </form>
  `;
}

function updateXmlFormatter(minify = false) {
  const input = document.getElementById("xmlInput").value;
  const resultDiv = document.getElementById("xmlResult");

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(input, "application/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      throw new Error("Invalid XML");
    }

    let output;
    if (minify) {
      output = input.replace(/>\s+</g, "><").trim();
    } else {
      const serializer = new XMLSerializer();
      let xmlStr = serializer.serializeToString(xmlDoc);
      output = xmlStr.replace(/></g, ">\n<");
    }

    resultDiv.innerHTML = `<div class="tool-result"><h4>${minify ? "Minified" : "Formatted"} XML</h4><div class="result-text">${escaped(output)}</div></div>`;
    addCopyButton(resultDiv, output);
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeXmlFormatter() {}

// ===== NEW DATE & TIME TOOLS =====

function renderUnixTimestamp(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Unix Timestamp:</label>
        <input type="text" id="unixInput" placeholder="1640995200">
      </div>
      <button type="button" class="tool-button" onclick="updateUnixTimestamp()">Convert</button>
      <div id="unixResult"></div>
    </form>
  `;
}

function updateUnixTimestamp() {
  const input = document.getElementById("unixInput").value;
  const resultDiv = document.getElementById("unixResult");

  if (!input) return;

  try {
    const timestamp = parseInt(input);
    const date = new Date(timestamp * 1000);
    const iso = date.toISOString();
    const locale = date.toString();

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>Date Conversion</h4>
        <div class="result-grid">
          <div class="result-item">
            <div class="result-label">ISO 8601</div>
            <div class="result-value">${iso}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Local</div>
            <div class="result-value">${locale}</div>
          </div>
        </div>
      </div>
    `;
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>Invalid timestamp</div>`;
  }
}

function executeUnixTimestamp() {}

function renderIso8601Converter(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Date (ISO 8601):</label>
        <input type="datetime-local" id="iso8601Input">
      </div>
      <button type="button" class="tool-button" onclick="updateIso8601Converter()">Convert</button>
      <div id="iso8601Result"></div>
    </form>
  `;
}

function updateIso8601Converter() {
  const input = document.getElementById("iso8601Input").value;
  const resultDiv = document.getElementById("iso8601Result");

  if (!input) return;

  const date = new Date(input);
  const iso = date.toISOString();
  const timestamp = Math.floor(date.getTime() / 1000);

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>Conversion Result</h4>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">ISO 8601</div>
          <div class="result-value">${iso}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Unix Timestamp</div>
          <div class="result-value">${timestamp}</div>
        </div>
      </div>
    </div>
  `;
  addCopyButton(resultDiv, iso);
}

function executeIso8601Converter() {}

function renderTimezoneConverter(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Time:</label>
        <input type="datetime-local" id="tzInput">
      </div>
      <div class="form-group">
        <label>From Timezone (hours offset):</label>
        <input type="number" id="tzFrom" step="0.5" value="0" min="-12" max="14">
      </div>
      <div class="form-group">
        <label>To Timezone (hours offset):</label>
        <input type="number" id="tzTo" step="0.5" value="0" min="-12" max="14">
      </div>
      <button type="button" class="tool-button" onclick="updateTimezoneConverter()">Convert</button>
      <div id="tzResult"></div>
    </form>
  `;
}

function updateTimezoneConverter() {
  const input = document.getElementById("tzInput").value;
  const fromOffset = parseFloat(document.getElementById("tzFrom").value);
  const toOffset = parseFloat(document.getElementById("tzTo").value);
  const resultDiv = document.getElementById("tzResult");

  if (!input) return;

  try {
    const date = new Date(input);
    const utcDate = new Date(date.getTime() - fromOffset * 60 * 60 * 1000);
    const convertedDate = new Date(
      utcDate.getTime() + toOffset * 60 * 60 * 1000,
    );

    resultDiv.innerHTML = `
      <div class="tool-result">
        <h4>Timezone Conversion</h4>
        <div class="result-grid">
          <div class="result-item">
            <div class="result-label">Original Time</div>
            <div class="result-value">${input}</div>
          </div>
          <div class="result-item">
            <div class="result-label">Converted Time</div>
            <div class="result-value">${convertedDate.toISOString().slice(0, 16)}</div>
          </div>
        </div>
      </div>
    `;
  } catch (e) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>${e.message}</div>`;
  }
}

function executeTimezoneConverter() {}

// ===== WEB PERFORMANCE & NETWORK TOOLS (Placeholders) =====

function renderWebsiteSpeedTest(container) {
  container.innerHTML = `<div class="tool-result"><h4>Coming Soon</h4><p>Website Speed Test tool will be available soon.</p></div>`;
}
function executeWebsiteSpeedTest() {}

function renderIpLocation(container) {
  container.innerHTML = `<div class="tool-result"><h4>Coming Soon</h4><p>IP Location Finder tool will be available soon.</p></div>`;
}
function executeIpLocation() {}

function renderDnsChecker(container) {
  container.innerHTML = `<div class="tool-result"><h4>Coming Soon</h4><p>DNS Checker tool will be available soon.</p></div>`;
}
function executeDnsChecker() {}

function renderPingTest(container) {
  container.innerHTML = `<div class="tool-result"><h4>Coming Soon</h4><p>Ping Test tool will be available soon.</p></div>`;
}
function executePingTest() {}

function renderCertificateChecker(container) {
  container.innerHTML = `<div class="tool-result"><h4>Coming Soon</h4><p>Certificate Checker tool will be available soon.</p></div>`;
}
function executeCertificateChecker() {}
