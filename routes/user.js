const express = require("express");
const router = express.Router();
const limiter = require("../middelware/limiter");

const userCtrlr = require("../controllers/user");
const passwordCtrl = require("../middelware/checkPassword");
const emailCtrl = require("../middelware/checkEmail");

router.post("/login", limiter, userCtrlr.login);
router.post("/signup", emailCtrl, passwordCtrl, userCtrlr.singup);

module.exports = router;
