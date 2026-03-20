/**
 * App - Main application initialization and coordination
 */
import { TOOLS } from "./toolRegistry.js";
import { setTools, setupEventListeners, renderTools } from "./core.js";

/**
 * Initialize the application
 */
export function initializeApp() {
  try {
    // Set the tools registry
    setTools(TOOLS);

    // Render tools grid
    renderTools();

    // Set up all event listeners
    setupEventListeners();

    console.log(`Utilix loaded with ${TOOLS.length} tools`);
  } catch (error) {
    console.error("Failed to initialize Utilix:", error);
  }
}
