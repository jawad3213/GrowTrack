const AppError = require("../shared/errors/AppError");

/**
 * Global error handler middleware.
 * Catches AppError subclasses and returns structured JSON responses.
 * In production, hides internal error details.
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(`❌ [${new Date().toISOString()}] ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  // If it's an operational error (our custom AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // For unexpected errors
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

module.exports = errorHandler;
