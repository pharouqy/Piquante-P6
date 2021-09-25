const express = require("express");
const router = express.Router();

const userCtrlr = require("../controllers/user");

router.post("/login", userCtrlr.login);
router.post("/signup", userCtrlr.singup);


module.exports = router;