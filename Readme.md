# Utilix

A comprehensive suite of diagnostic and utility tools designed for developers, network engineers, and security professionals to identify and resolve performance, connectivity, and security issues.


[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/80h3m14n/Utilix)


## Featured Tools

### Text Tools

| Tool | Description |
|------|-------------|
| **Text Reverser** | Reverse text strings |
| **Case Converter** | Convert text to different cases (UPPERCASE, lowercase, Title Case, etc.) |
| **Text Statistics** | Count characters, words, lines, and provide detailed text metrics |
| - **Regex Tester** | – Test and validate regular expressions with live matching and capture groups
| - **Diff Checker** | – Compare two text blocks side-by-side with line-by-line differences
| - **Lorem Ipsum Generator** | – Generate placeholder text for mockups and prototypes
| - **String Escaper/Unescaper** | – Escape/unescape strings for JSON, XML, SQL, and JavaScript contexts
| - **Duplicate Line Remover** | – Remove duplicate lines from text with case-sensitivity options


### Encoding Tools

| Tool | Description |
|------|-------------|
| **Base64 Codec** | Encode and decode Base64 strings |
| **URL Codec** | Encode and decode URL components |
| **HTML Codec** | Encode and decode HTML entities |
| **CSV to JSON** | Convert CSV data to JSON format |
| - **ASCII/Unicode Converter** | – Convert text to ASCII/Unicode code points
| - **Morse Code Converter** | – Convert text to Morse code and vice versa


### Cryptography Tools

| Tool | Description |
|------|-------------|
| **MD5 Hash** | Generate MD5 hashes |
| **SHA256 Hash** | Generate SHA-256 hashes |
| **JWT Decoder** | Decode JSON Web Tokens to inspect payload and header information |
| Tool | Description |
|------|-------------|
| - **SHA-512 Hash** | – Generate SHA-512 hashes
| - **HMAC Generator** | – Generate HMAC signatures with customizable algorithms
| - **CRC-32 Checksum** | – Calculate CRC-32 checksums for file integrity verification

### Generator Tools

| Tool | Description |
|------|-------------|
| **Password Generator** | Generate cryptographically secure random passwords |
| - **UUID Generator** | – Generate version 4 UUIDs |
| - **Random Color** | – Generate random hexadecimal colors |
| - **QR Code Generator** | – Generate QR codes from text, URLs, or structured data
| - **Slug Generator** | – Create URL-friendly slugs from text
| - **Cron Expression Validator** | – Validate and explain cron schedule syntax



### Formatter Tools

| Tool | Description |
|------|-------------|
| **JSON Formatter** | Format, validate, and minify JSON
| **Code Minifier** | Minify CSS, JavaScript, and HTML
| **Color Converter** | Convert colors between HEX, RGB, and HSL formats
| - **YAML/JSON Converter** | – Convert bidirectionally between YAML and JSON formats
| - **HTML/Markdown Converter** | – Convert HTML to Markdown and vice versa
| - **XML Formatter** | – Format, validate, and minify XML documents

### Date & Time Tools

| Tool | Description |
|------|-------------|
| **Unix Timestamp Converter** | Convert Unix timestamps to human-readable dates and vice versa
| **ISO 8601 Date Converter** | Convert between ISO 8601 format and various date formats
| **Timezone Converter** | Convert times across different timezones


### Web Performance & Network

| Tool | Description |
|------|-------------|
| - **Website Speed Test** | – Full page speed test with detailed performance insights
| - **IP Location Finder** | – Lookup geographical location of IP addresses
| - **DNS Checker** | – Query DNS records across multiple nameservers
| - **Ping Test** | – Simultaneous ping from multiple locations
| - **Certificate Checker** | – Decode and validate SSL/TLS certificates



## Project Structure

```
📂Utilix
|── assets/css/
├    ── style.css    
|── src/js/
├    ── app.js  
├    ── core.js               // Main logic
├    ── crypto-tools.js 
├    ── datetime-tools.js
├    ── encoding-tools.js  
├    ── formatters-tools.js 
├    ── generators-tools.js 
├    ── index.js          
├    ── network-tools.js    
├    ── text-tools.js 
├    ── toolRegistry.js  
├    ── utils.js              // Shared helpers   
├── index.html
└──README.md
```

## Build

Install webpack-dev-server

```bash
npm install
npm install --save-dev webpack-dev-server
```

Run the development server

```bash
npm start
# or
npx webpack serve
```

Production build

```bash
npm run build
# or
npx webpack --mode production
```

Github pages deployment

```bash
npm install --save-dev gh-pages
npm run deploy
```


## License

Free to use and modify under the MIT License. See [LICENSE](LICENSE) for details.

## Attribution

- Website speed test inspired by GTmetrix and WebPageTest
- Performance test inspired by KeyCDN's Performance Test
- HTTP header checker inspired by curl command-line tool
- IP location finder inspired by ipinfo.io
- DNS checker inspired by DNSChecker.org
- Ping and traceroute tests inspired by Pingdom and Traceroute tools
- BGP looking glass inspired by bgp.he.net
- Certificate checker inspired by SSL Labs' SSL Test
- Hash generator and checker inspired by online hash tools
- Base64 and URL encoder/decoder inspired by various online tools
- JWT decoder inspired by jwt.io
- Epoch and hex converters inspired by various online utilities
