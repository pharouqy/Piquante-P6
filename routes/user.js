const express = require("express");
const router = express.Router();

const userCtrlr = require("../controllers/user");
const passwordCtrl = require("../middelware/checkPassword");
const emailCtrl = require("../middelware/checkEmail");

router.post("/login", userCtrlr.login);
router.post("/signup", emailCtrl, passwordCtrl, userCtrlr.singup);

module.exports = router;
