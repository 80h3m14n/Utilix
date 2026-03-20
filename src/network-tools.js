// ===== WEB PERFORMANCE & NETWORK TOOLS =====
// ────────────────────────────────────────────────

export function renderIpLocation(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>IP Address (leave blank for your own):</label>
        <input type="text" id="ipInput" placeholder="8.8.8.8 or blank">
      </div>
      <button type="button" class="tool-button" onclick="lookupIpLocation()">Lookup</button>
      <div id="ipResult"></div>
    </form>
  `;
}

async function lookupIpLocation() {
  const ip = document.getElementById("ipInput").value.trim();
  const resultDiv = document.getElementById("ipResult");

  resultDiv.innerHTML = `<div class="loading-spinner" style="margin: 40px auto;"></div>`;

  try {
    const endpoint = ip
      ? `https://ipapi.co/${ip}/json/`
      : `https://ipapi.co/json/`;

    const res = await fetch(endpoint, {
      headers: { "User-Agent": "Utilix-IP-Lookup/1.0" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.error) throw new Error(data.reason || "API error");

    resultDiv.innerHTML = `
      <div class="tool-result success">
        <h4>IP Location: ${data.ip}</h4>
        <div class="result-grid">
          <div class="result-item"><div class="result-label">City</div><div class="result-value">${data.city || "—"}</div></div>
          <div class="result-item"><div class="result-label">Region</div><div class="result-value">${data.region || "—"} (${data.region_code || "—"})</div></div>
          <div class="result-item"><div class="result-label">Country</div><div class="result-value">${data.country_name || "—"} (${data.country_code || "—"})</div></div>
          <div class="result-item"><div class="result-label">ISP / Org</div><div class="result-value">${data.org || data.asn || "—"}</div></div>
          <div class="result-item"><div class="result-label">Latitude / Longitude</div><div class="result-value">${data.latitude || "—"} / ${data.longitude || "—"}</div></div>
          <div class="result-item"><div class="result-label">Timezone</div><div class="result-value">${data.timezone || "—"}</div></div>
        </div>
      </div>
    `;
  } catch (err) {
    resultDiv.innerHTML = `
      <div class="tool-result error">
        <h4>Error</h4>
        <p>${err.message || "Could not fetch location data"}</p>
        <p style="font-size:0.85rem; margin-top:12px;">Try again later or use a different IP.</p>
      </div>
    `;
  }
}

export function executeIpLocation() {
  lookupIpLocation();
}

// ────────────────────────────────────────────────

export function renderDnsChecker(container) {
  container.innerHTML = `
    <form class="tool-form">
      <div class="form-group">
        <label>Domain name:</label>
        <input type="text" id="dnsDomain" placeholder="example.com" required>
      </div>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="runDnsLookup('A')">A Records</button>
        <button type="button" class="tool-button" onclick="runDnsLookup('AAAA')">AAAA Records</button>
        <button type="button" class="tool-button" onclick="runDnsLookup('MX')">MX Records</button>
      </div>
      <div id="dnsResult"></div>
    </form>
  `;
}

async function runDnsLookup(type = "A") {
  const domain = document.getElementById("dnsDomain").value.trim();
  const resultDiv = document.getElementById("dnsResult");

  if (!domain) {
    resultDiv.innerHTML = `<div class="tool-result error"><h4>Error</h4>Enter a domain name</div>`;
    return;
  }

  resultDiv.innerHTML = `
    <div class="loading-spinner" style="margin: 40px auto;"></div>
    <p style="text-align:center;">Querying ${type} records for <strong>${domain}</strong> via Cloudflare DoH...</p>
  `;

  try {
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`;
    const res = await fetch(url, {
      headers: { accept: "application/dns-json" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.Status !== 0) {
      throw new Error(`DNS error: ${data.Comment || "rcode " + data.Status}`);
    }

    let html = `
      <div class="tool-result success">
        <h4>${type} Records for ${domain}</h4>
    `;

    if (!data.Answer || data.Answer.length === 0) {
      html += `<p style="color:var(--text-muted);">No ${type} records found.</p>`;
    } else {
      html += `<div class="result-grid">`;
      data.Answer.forEach((record) => {
        html += `
          <div class="result-item">
            <div class="result-label">${record.name}</div>
            <div class="result-value">${record.data} (TTL: ${record.TTL}s)</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `</div>`;
    resultDiv.innerHTML = html;
  } catch (err) {
    resultDiv.innerHTML = `
      <div class="tool-result error">
        <h4>Error</h4>
        <p>${err.message}</p>
      </div>
    `;
  }
}

export function executeDnsChecker() {
  runDnsLookup("A"); // default
}

// ────────────────────────────────────────────────

export function renderPingTest(container) {
  container.innerHTML = `
    <div class="tool-result">
      <h4>Ping Test (Client-side)</h4>
      <p style="color:var(--text-muted); margin: 16px 0;">
        True ICMP ping is not possible from browser JavaScript due to security restrictions.<br>
        This tool measures HTTP round-trip time to common global endpoints.
      </p>
      <div class="button-group">
        <button type="button" class="tool-button" onclick="runSimplePingTest()">Run HTTP RTT Test</button>
      </div>
      <div id="pingResult" style="margin-top:20px;"></div>
    </div>
  `;
}

async function runSimplePingTest() {
  const targets = [
    {
      name: "Google",
      url:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png?_=" +
        Date.now(),
    },
    {
      name: "Cloudflare",
      url:
        "https://www.cloudflare.com/img/logo-cloudflare-dark.svg?_=" +
        Date.now(),
    },
    {
      name: "Your region CDN",
      url:
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js?_=" +
        Date.now(),
    },
  ];

  const resultDiv = document.getElementById("pingResult");
  resultDiv.innerHTML = `<div class="loading-spinner" style="margin: 40px auto;"></div>`;

  let html = `<div class="tool-result success"><h4>HTTP Round-Trip Times</h4><div class="result-grid">`;

  for (const target of targets) {
    try {
      const start = performance.now();
      await fetch(target.url, { mode: "no-cors", cache: "no-store" });
      const time = (performance.now() - start).toFixed(0);
      html += `
        <div class="result-item">
          <div class="result-label">${target.name}</div>
          <div class="result-value">${time} ms</div>
        </div>
      `;
    } catch (e) {
      html += `
        <div class="result-item">
          <div class="result-label">${target.name}</div>
          <div class="result-value error">Failed</div>
        </div>
      `;
    }
  }

  html += `</div><p style="margin-top:16px; font-size:0.9rem;">Note: These are HTTP fetch times (not ICMP ping). Real network latency may differ.</p></div>`;
  resultDiv.innerHTML = html;
}

export function executePingTest() {
  runSimplePingTest();
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    lookupIpLocation,
    runDnsLookup,
    runSimplePingTest,
  });
}
