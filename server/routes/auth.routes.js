const express = require("express");
const router = express.Router();

const cAuthCtrl = require("../controllers/auth/register.controller");
const rAuthCtrl = require("../controllers/auth/login.controller");

router.post("/register", cAuthCtrl.insertRegister);
router.post("/login", rAuthCtrl.getValidationLogin);

module.exports = router;
