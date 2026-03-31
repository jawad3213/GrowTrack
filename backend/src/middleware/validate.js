const { validationResult } = require("express-validator");

/**
 * Runs express-validator rules and returns 400 if any fail.
 * Usage: router.post('/', validate(myRules), controller.create)
 */
const validate = (rules) => {
  return async (req, res, next) => {
    for (const rule of rules) {
      await rule.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

module.exports = { validate };
