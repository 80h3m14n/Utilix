/**
 * Shared utility functions used across tool modules
 */

/**
 * Escapes HTML entities in text
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML text
 */
export function escaped(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;");
}

/**
 * HTML encodes special characters
 * @param {string} text - Text to encode
 * @returns {string} - HTML encoded text
 */
export function htmlEntityEncode(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * HTML decodes entities
 * @param {string} text - HTML text to decode
 * @returns {string} - Decoded text
 */
export function htmlEntityDecode(text) {
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

/**
 * Display result in a container
 * @param {HTMLElement} container - Target container element
 * @param {string} result - HTML result to display
 */
export function showResult(container, result) {
  container.innerHTML = result;
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
  }
}

/**
 * Adds a copy button to a container
 * @param {HTMLElement} container - Container to append button to
 * @param {string} text - Text to copy when button is clicked
 */
export function addCopyButton(container, text) {
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

/**
 * Formats a result item for display
 * @param {string} label - Label for the result
 * @param {string} value - Value to display
 * @returns {string} - HTML string
 */
export function formatResultItem(label, value) {
  return `
    <div class="result-item">
      <div class="result-label">${label}</div>
      <div class="result-value">${value}</div>
    </div>
  `;
}

/**
 * Creates a result grid container
 * @param {string} items - HTML items to place in grid
 * @returns {string} - HTML string
 */
export function createResultGrid(items) {
  return `<div class="result-grid">${items}</div>`;
}

/**
 * Creates a tool result wrapper
 * @param {string} content - Content to wrap
 * @param {boolean} isError - Whether this is an error result
 * @returns {string} - HTML string
 */
export function createToolResult(content, isError = false) {
  const errorClass = isError ? "error" : "";
  return `<div class="tool-result ${errorClass}">${content}</div>`;
}

/**
 * Gets value from input element safely
 * @param {string} elementId - Element ID
 * @returns {string} - Element value or empty string
 */
export function getSafeInputValue(elementId) {
  return document.getElementById(elementId)?.value || "";
}

/**
 * Validates if element exists and has a value
 * @param {string} elementId - Element ID
 * @returns {boolean}
 */
export function hasValue(elementId) {
  const element = document.getElementById(elementId);
  return element && element.value && element.value.trim().length > 0;
}

/**
 * Generates a title case version of text
 * @param {string} text - Text to convert
 * @returns {string} - Title cased text
 */
export function titleCase(text) {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
