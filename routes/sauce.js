const express = require('express');
const router = express.Router();

const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');
const checkInput = require('../middelware/checkInput');

const sauceCtrl = require("../controllers/sauce");


router.post('/', auth, multer, checkInput, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getSauce);
router.put('/:id', auth, multer, checkInput, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likDeslikeSauce);

module.exports = router;