// ===== DATE & TIME TOOLS =====
import { addCopyButton } from "./utils.js";

export function renderUnixTimestamp(container) {
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

export function executeUnixTimestamp() {}

export function renderIso8601Converter(container) {
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

export function executeIso8601Converter() {}

export function renderTimezoneConverter(container) {
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

export function executeTimezoneConverter() {}

if (typeof window !== "undefined") {
  Object.assign(window, {
    updateUnixTimestamp,
    updateIso8601Converter,
    updateTimezoneConverter,
  });
}
