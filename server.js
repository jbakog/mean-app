// Get dependencies
const express = require('express');
const path = require('path');
const app = express();
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

// Middleware for route
app.use(require('./server/controllers/po'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//app.set('port', config.express.port);

// socket io
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('me', function (message) {
    console.log('test message: ' + message);
  });
  socket.on('subscribe2po', function (message) {
    feed = require('./server/models/feeds')(socket);
  });
});

http.listen(config.express.port, () => console.log(`API running on localhost:${config.express.port}`));

module.exports = app;