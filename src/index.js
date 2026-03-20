/**
 * Utilix - Main Entry Point
 * Webpack entry point for bundling the application
 */

// Import styles
import "../assets/css/style.css";

// Import and initialize app
import { initializeApp } from "./app.js";

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});
