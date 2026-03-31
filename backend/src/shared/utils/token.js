const JWT = require("jsonwebtoken");

const signAccessToken = (payload, expiresIn = "15m") => {
  return JWT.sign(payload, process.env.ACCESS_SECRET, { expiresIn });
};

const signRefreshToken = (payload, expiresIn = "7d") => {
  return JWT.sign(payload, process.env.REFRESH_SECRET, { expiresIn });
};

const signResetToken = (payload, expiresIn = "15m") => {
  return JWT.sign(payload, process.env.RESET_SECRET, { expiresIn });
};

const verifyAccessToken = (token) => {
  return JWT.verify(token, process.env.ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return JWT.verify(token, process.env.REFRESH_SECRET);
};

const verifyResetToken = (token) => {
  return JWT.verify(token, process.env.RESET_SECRET);
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  signResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetToken,
};
