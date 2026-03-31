const MESSAGES = {
  // Auth
  LOGIN_SUCCESS: "Connected Successfully!",
  LOGIN_FAILED: "Email or Password is incorrect",
  LOGOUT_SUCCESS: "Logout successful",
  NO_TOKEN: "No token was found, please login again!",
  TOKEN_EXPIRED: "Access token has expired.",
  TOKEN_INVALID: "Invalid token structure.",
  REFRESH_SUCCESS: "The new access token is set!",
  REFRESH_INVALID: "Invalid or expired refresh token!",

  // General
  SERVER_ERROR: "Server Error, please try again later!",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access denied",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation failed",

  // CRUD
  CREATED: (resource) => `${resource} created successfully`,
  UPDATED: (resource) => `${resource} updated successfully`,
  DELETED: (resource) => `${resource} deleted successfully`,
  FETCHED: (resource) => `${resource} retrieved successfully`,

  // Password Reset
  RESET_EMAIL_SENT: "A password reset email has been sent. Please check your inbox or spam folder.",
  RESET_SUCCESS: "The password was updated successfully!",
  USER_NOT_FOUND: "User not found",
};

module.exports = { MESSAGES };
