/**
 * GrowTrack Server Entry Point
 * 
 * This file only starts the HTTP server.
 * All Express configuration is in src/app.js
 */
require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Server Running on http://localhost:${PORT}`);
  });
}

// Export for testing
module.exports = app;
