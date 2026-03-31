const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 20,
  message: {
    status: 429,
    message: "Too many attempts, please try again after 30 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const serverLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 500,
  message: {
    status: 429,
    message: "Too many requests, please try again after 60 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, serverLimiter };
