'use strict';
var feed = require('../models/feeds');

module.exports = function (io) {
let users = [];
var feedModel = new feed();
    io.on('connect', (socket) => {

      socket.on('user-join', (data) => {
        socket.join(data.username);
        users.push({
            id : socket.id,
            username : data.username
        });
        console.log('received user-join: ' + data.username + '|' + socket.id);
      });

      socket.on('subscribe2po', function (data) {
        for(let i=0; i < users.length; i++){    
            if(users[i].id === socket.id){
                console.log('received subscribe2po: ' + socket.id);
                feedModel.setFeed(socket, data.username);
            }
          }
      });

      socket.on('disconnect',()=>{
          for(let i=0; i < users.length; i++){    
            if(users[i].id === socket.id){
                console.log('received disconnect: ' + users[i].username + '|' + users[i].id);
                socket.leave(users[i].username);
                users.splice(i,1); 
            }
          }
    });

    });
  };