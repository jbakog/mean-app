"use strict";
var rethinkdb = require('rethinkdb');
var db = require('./db');
var async = require('async');

var dbModel = new db();
class po {
  getAllPOs(callback) {
    async.waterfall([
      function (callback) {
        dbModel.connectToDb(function (err, connection) {
          if (err) {
            return callback(true, "Error connecting to database");
          }
          callback(null, connection);
        });
      },
      function (connection, callback) {
        rethinkdb.table('po').run(connection, function (err, cursor) {
          connection.close();
          if (err) {
            return callback(true, "Error fetching po's from database. Error: " + err);
          }
          cursor.toArray(function (err, result) {
            if (err) {
              return callback(true, "Error reading cursor");
            }
            callback(null, result);
          });
        });
      }
    ], function (err, data) {
      callback(err === null ? false : true, data);
    });
  }
}

module.exports = po;
