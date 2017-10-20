"use strict";

var express = require('express');
var router = express.Router();
// require model file.
var poModel = require('../models/po');

// routing for /api/po
router.route('/api/po')
  .get(function(req,res) {
    // Code to fetch the po's.
    var poObject = new poModel();
    // Calling our model function.
    poObject.getAllPOs(function(err,poResponse) {
      if(err) {
        return res.json({"responseCode" : 1, "responseDesc" : poResponse});
      }
      res.send(JSON.stringify(poResponse));
    });
  });

module.exports = router;