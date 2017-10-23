var express = require('express');
var actions = require('../methods/actions');

var router = express.Router();

router.get('/api/po', actions.getAllPO);
router.post('/sendmail', actions.sendMail);

module.exports = router;