// require po model file.
var poModel = require('../models/po');
// require emailjs
var email   = require("emailjs/email");

var functions = {

  sendMail: function (req, res) {
    var server = email.server.connect({
      host: "mail.cosmo-one.gr",
      ssl: false
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
      text: "Welcome to my demo app",
      from: "<your userid here>",
      to: req.body.name,
      subject: "Welcome mail"
    }, function (err, message) {
      if (err)
        console.log(err);
      else
        return res.json({
          success: true,
          msg: 'sent'
        });
    });
  },
  getAllPO: function (req, res) {
        // Code to fetch the po's.
        var poObject = new poModel();
        // Calling our model function.
        poObject.getAllPOs(function(err,poResponse) {
          if(err) {
            return res.json({"responseCode" : 1, "responseDesc" : poResponse});
          }
          res.send(JSON.stringify(poResponse));
        });
    }
};

module.exports = functions;
