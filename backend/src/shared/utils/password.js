const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hash) => {
  // Handle legacy $2y$ prefix from PHP bcrypt
  const normalizedHash = /^\$2y\$/.test(hash)
    ? "$2a$" + hash.slice(4)
    : hash;
  return bcrypt.compare(password, normalizedHash);
};

module.exports = { hashPassword, comparePassword };
