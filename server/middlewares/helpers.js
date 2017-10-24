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
  }
};

module.exports = functions;
