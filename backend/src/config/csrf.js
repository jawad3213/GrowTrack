const { doubleCsrf } = require("csrf-csrf");

const {
  invalidCsrfTokenError,
  generateCsrfToken,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => process.env.ACCESS_SECRET || "default_csrf_secret_for_dev",
  cookieName: "x-csrf-token",
  cookieOptions: {
    sameSite: "Lax",
    path: "/",
    secure: false,
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
  getSessionIdentifier: () => "stateless",
});

module.exports = {
  invalidCsrfTokenError,
  generateCsrfToken,
  doubleCsrfProtection,
};
