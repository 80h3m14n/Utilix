// ===== TOOL DEFINITIONS =====
import { escaped, addCopyButton, titleCase } from "./utils.js";

// ===== GLOBAL STATE =====
let allTools = [];
let masterTools = [];
let currentCategory = "all";

/**
 * Set the TOOLS array - called by app.js during initialization
 * @param {Array} tools - The TOOLS array from toolRegistry
 */
export function setTools(tools) {
  masterTools = [...tools];
  allTools = [...tools];
}

export function setupEventListeners() {
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
export function renderTools() {
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
  allTools = masterTools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm),
  );
  renderTools();
}

// ===== MODAL MANAGEMENT =====

function openToolModal(tool) {
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
}

// ===== TEXT TOOLS =====

export function renderTextReverser(container) {
  container.innerHTML = `
    <form class="tool-form" id="reverseForm">
      <div class="form-group">
        <label>Text to Reverse:</label>
        <textarea id="textInput" required></textarea>
      </div>
      <button type="submit" class="tool-button">Reverse</button>
      <div id="textResult"></div>
    </form>
  `;
  document.getElementById("reverseForm").addEventListener("submit", (e) => {
    e.preventDefault();
    executeTextReverser();
  });
}

export function executeTextReverser() {
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

export function renderCaseConverter(container) {
  container.innerHTML = `
    <form class="tool-form">
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

function sentenceCase(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function executeCaseConverter() {
  // Live update in form
}

export function renderTextStatistics(container) {
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

export function executeTextStatistics() {
  // Live update in form
}
