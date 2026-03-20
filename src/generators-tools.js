// ===== GENERATORS =====
import { addCopyButton } from "./utils.js";

export function renderPasswordGen(container) {
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

export function executePasswordGen() {}

export function renderUuidGen(container) {
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

export function executeUuidGen() {}

export function renderRandomColor(container) {
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

export function executeRandomColor() {}

if (typeof window !== "undefined") {
  Object.assign(window, {
    updatePasswordGen,
    updateUuidGen,
    updateRandomColor,
  });
}
