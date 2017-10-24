var express = require('express');
var helpers = require('../middlewares/helpers');
var purchaseorder = require('../middlewares/purchaseorder');
var auth = require('./auth.js');

var router = express.Router();

router.post('/authenticate', auth.login);
router.get('/api/v1/po', purchaseorder.getAllPO);
router.post('/api/v1/sendmail', helpers.sendMail);

module.exports = router;