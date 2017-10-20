"use strict";

// Load config for RethinkDB and express
const config = require("../settings/config.js");
var rethinkdb = require('rethinkdb');
var async = require('async');

class db {
    setupDb() {
        var self = this;
        async.waterfall([
            function(callback) {
                self.connectToRethinkDbServer(function(err, connection){
                    if(err) {
                        return callback(true, "Error in connecting to Rethink database");
                    }
                    callback(null, connection);
                });
            },
            function(connection, callback) {
                rethinkdb.dbCreate('som').run(connection, function(err, result) {
                    if(err) {
                        console.log("Database already created");
                    } else {
                        console.log("Created new database");
                    }
                    callback(null, connection);
                });
            },
            function(connection, callback) {
                rethinkdb.db('som').tableCreate('po').run(connection, function(err, result){
                    connection.close();
                    if(err) {
                        console.log("table already created");
                    } else {
                        console.log("created new table");
                    }
                    callback(null,"Database is setup successfully");
                });
            }
        ], function(err, data) {
            console.log(data);
        });
    }

    connectToRethinkDbServer(callback) {
        rethinkdb.connect(config.rethinkdb, function(err, connection) {
            callback(err, connection);
        });
    }

    connectToDb(callback) {
        rethinkdb.connect(config.rethinkdb, function(err,connection) {
          callback(err,connection);
        });
      }
}

module.exports = db;