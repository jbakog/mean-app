// Get dependencies
const express = require('express');
const path = require('path');
const app = express();
const sockets = require('./server/routes/socket');
var http = require('http').Server(app);
// Adding socket.io
var io = require('socket.io')(http);
const bodyParser = require('body-parser');

var db = require('./server/models/db');
var dbModel = new db();
// setup database and create tables
dbModel.setupDb();

// Load config for RethinkDB and express
const config = require(__dirname+"/server/settings/config");

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./server/middlewares/validateRequest')]);

// Middleware for route
app.use(require('./server/routes/routes'));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/en/index.html'));
});

// socket io
/*
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('subscribe2po', function (message) {
    feed = require('./server/models/feeds')(socket);
  });
});*/
// New socket.io config
feed = require('./server/routes/socket')(io);
//new sockets(socket, []).socketConfig();


http.listen(config.express.port, () => console.log(`API running on localhost:${config.express.port}`));

module.exports = app;