const { body, check } = require("express-validator");

exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
];
