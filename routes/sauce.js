const express = require("express");
const router = express.Router();

const auth = require("../middelware/auth");
const multer = require("../middelware/multer-config");
const checkInputs = require("../middelware/checkInputs");

const sauceCtrl = require("../controllers/sauce");

router.post("/", auth, multer, checkInputs, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getSauce);
router.put("/:id", auth, multer, checkInputs, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likDeslikeSauce);

module.exports = router;
