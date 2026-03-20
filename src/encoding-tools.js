// ===== ENCODING TOOLS =====
import {
  escaped,
  htmlEntityEncode,
  htmlEntityDecode,
  addCopyButton,
} from "./utils.js";

export function renderBase64Codec(container) {
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

export function executeBase64Codec() {}

export function renderUrlCodec(container) {
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

export function executeUrlCodec() {}

export function renderHtmlCodec(container) {
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

export function executeHtmlCodec() {}

if (typeof window !== "undefined") {
  Object.assign(window, {
    updateBase64,
    updateUrlCodec,
    updateHtmlCodec,
  });
}
