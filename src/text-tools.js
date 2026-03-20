// ===== TEXT TOOLS =====
import CryptoJS from "crypto-js";
import {
  escaped,
  htmlEntityEncode,
  htmlEntityDecode,
  addCopyButton,
} from "./utils.js";

export function renderRegexTester(container) {
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

export function executeRegexTester() {}

export function renderLoremIpsum(container) {
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

export function executeLoremIpsum() {}

export function renderDiffChecker(container) {
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

export function executeDiffChecker() {}

export function renderStringEscaper(container) {
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

export function executeStringEscaper() {}

export function renderDuplicateRemover(container) {
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

export function executeDuplicateRemover() {}

// ===== NEW ENCODING TOOLS =====

export function renderAsciiUnicode(container) {
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

export function executeAsciiUnicode() {}

export function renderMorseCode(container) {
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

export function executeMorseCode() {}

// ===== NEW CRYPTO TOOLS =====

export function renderSha512Hash(container) {
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

export function executeSha512Hash() {}

export function renderHmacGenerator(container) {
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

export function executeHmacGenerator() {}

export function renderCrc32Checksum(container) {
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

export function executeCrc32Checksum() {}

// ===== NEW GENERATOR TOOLS =====

export function renderQrCode(container) {
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

export function executeQrCode() {}

export function renderSlugGenerator(container) {
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

export function executeSlugGenerator() {}

export function renderCronValidator(container) {
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

  if (!input) {
    resultDiv.innerHTML = `<div class="tool-result error">Please enter a cron expression</div>`;
    return;
  }

  const parts = input.split(/\s+/);
  if (parts.length !== 5) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Invalid</h4>Cron expression must have exactly 5 fields (minute hour day-of-month month day-of-week)</div>`;
    return;
  }

  const [minute, hour, dom, month, dow] = parts;
  const fields = [
    { name: "Minute", value: minute, min: 0, max: 59 },
    { name: "Hour", value: hour, min: 0, max: 23 },
    { name: "Day of Month", value: dom, min: 1, max: 31 },
    { name: "Month", value: month, min: 1, max: 12 },
    { name: "Day of Week", value: dow, min: 0, max: 7 }, // 0,7 = Sunday
  ];

  let isValidOverall = true;
  let html = `
    <div class="tool-result">
      <h4>Cron Expression Analysis</h4>
      <div class="result-grid">
  `;

  for (const field of fields) {
    const result = validateCronField(field.value, field.min, field.max);
    if (!result.valid) isValidOverall = false;

    html += `
      <div class="result-item">
        <div class="result-label">${field.name}</div>
        <div class="result-value ${result.valid ? "valid" : "invalid"}">
          ${field.value}
          <span class="status">${result.valid ? "✓" : "✗"}</span>
          <div class="field-detail">${result.message}</div>
        </div>
      </div>
    `;
  }

  html += `</div>`;

  if (isValidOverall) {
    html += `<div class="overall valid">Overall: Valid cron expression</div>`;
  } else {
    html += `<div class="overall invalid">Overall: Invalid cron expression</div>`;
  }

  html += `</div>`;
  resultDiv.innerHTML = html;
}

// Core field validation logic
function validateCronField(value, min, max) {
  if (value === "*") {
    return { valid: true, message: "any value" };
  }

  // Step values: */5, 1-10/2
  if (value.includes("/")) {
    const [rangePart, step] = value.split("/");
    if (!step || isNaN(step) || Number(step) <= 0) {
      return { valid: false, message: "invalid step value" };
    }
    return validateRangeOrList(rangePart, min, max)
      ? {
          valid: true,
          message: `every ${step} starting from ${rangePart || min}`,
        }
      : { valid: false, message: "invalid range before step" };
  }

  // Ranges: 1-5, 3-12
  if (value.includes("-")) {
    return validateRangeOrList(value, min, max)
      ? { valid: true, message: "range" }
      : { valid: false, message: `range must be ${min}-${max}` };
  }

  // Lists: 1,2,5,10
  if (value.includes(",")) {
    return validateRangeOrList(value, min, max)
      ? { valid: true, message: "list" }
      : { valid: false, message: `all values must be between ${min}-${max}` };
  }

  // Single number
  const num = Number(value);
  if (!isNaN(num) && Number.isInteger(num)) {
    if (num >= min && num <= max) {
      return { valid: true, message: "specific value" };
    }
    return { valid: false, message: `must be between ${min}-${max}` };
  }

  return { valid: false, message: "invalid format" };
}

// Helper: checks ranges, lists and single values inside them
function validateRangeOrList(str, min, max) {
  const items = str.split(",");

  for (const item of items) {
    if (item.includes("-")) {
      const [start, end] = item.split("-").map(Number);
      if (
        isNaN(start) ||
        isNaN(end) ||
        start > end ||
        start < min ||
        end > max
      ) {
        return false;
      }
    } else {
      const num = Number(item);
      if (isNaN(num) || !Number.isInteger(num) || num < min || num > max) {
        return false;
      }
    }
  }
  return true;
}

export function executeCronValidator() {
  // Will be used later for more advanced features (e.g. next run time calculation)
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    updateRegexTester,
    updateLoremIpsum,
    updateDiffChecker,
    updateEscaper,
    updateDuplicateRemover,
    updateAsciiUnicode,
    updateMorseCode,
    updateSha512,
    updateHmacGenerator,
    updateCrc32,
    updateQrCode,
    updateSlugGenerator,
    updateCronValidator,
  });
}
