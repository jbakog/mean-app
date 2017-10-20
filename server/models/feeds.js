"use strict";

var rethinkdb = require('rethinkdb');
// db driver
var db = require('./db');
var dbObject = new db();

module.exports = function (socket) {
  dbObject.connectToDb(function (err, connection) {
    if (err) {
      return callback(true, "Error connecting to database");
    }
    
    // we are invoking changes() function on pos table.
    // On every change it will give us data.
    rethinkdb.table('po').changes({includeTypes: true, squash: true, includeStates: true}).run(connection, function (err, cursor) {
        if (err) {
        console.log(err);
      }
      // We are scrolling over the cursor data and broadcasting the changes using socket.
      cursor.each(function (err, row) {
        if(err) {
          console.log(err);
        }
        console.log('loop');
        if (row.type === 'remove') {
          // deleted
          socket.broadcast.emit("changeFeed", {"id": row.old_val.id, "type": row.type, "pos": row.old_val});
        } else if (row.type === 'add' || row.type === 'change') {
          socket.broadcast.emit("changeFeed", {"id": row.new_val.id,"type": row.type,"pos": row.new_val});
        }
      });
    });
  });
};
