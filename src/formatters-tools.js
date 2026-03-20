// ===== FORMATTER TOOLS =====
import { escaped, addCopyButton } from "./utils.js";

export function renderJsonFormatter(container) {
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

export function executeJsonFormatter() {}

export function renderCsvJson(container) {
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

export function executeCsvJson() {}

export function renderMinifyCode(container) {
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

export function executeMinifyCode() {}

// ============== YAML

export function renderYamlJson(container) {
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

export function executeYamlJson() {}

export function renderHtmlMarkdown(container) {
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

export function executeHtmlMarkdown() {}

export function renderXmlFormatter(container) {
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

export function executeXmlFormatter() {}

if (typeof window !== "undefined") {
  Object.assign(window, {
    updateJsonFormatter,
    updateCsvJson,
    updateMinifyCode,
    updateYamlJson,
    updateHtmlMarkdown,
    updateXmlFormatter,
  });
}
