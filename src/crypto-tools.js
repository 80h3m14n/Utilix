// ===== CRYPTO TOOLS =====
import CryptoJS from "crypto-js";
import { addCopyButton } from "./utils.js";

export function renderMd5Hash(container) {
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

  const hash = CryptoJS.MD5(input).toString();

  resultDiv.innerHTML = `
    <div class="tool-result">
      <h4>MD5 Hash</h4>
      <div class="result-text">${hash}</div>
    </div>
  `;
  addCopyButton(resultDiv, hash);
}

export function executeMd5Hash() {}

export function renderSha256Hash(container) {
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

export function executeSha256Hash() {}

export function renderJwtDecoder(container) {
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

export function executeJwtDecoder() {}
