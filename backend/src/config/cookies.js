// Cookie options shared across auth controllers
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

module.exports = { cookieOptions };
