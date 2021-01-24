const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
const pembeliController = require("../controllers/pembeli.controller");

const {
  validateLogin,
} = require("../middleware/validators/pembeliValidator.middleware");

//Retrieve Info Pembeli
router.get(
  "/:IDpembeli",
  auth(),
  awaitHandlerFactory(pembeliController.getPembeliById)
);

router.post(
  "/login",
  validateLogin,
  awaitHandlerFactory(pembeliController.login)
);

module.exports = router;
