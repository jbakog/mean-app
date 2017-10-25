'use strict';

module.exports = function (io) {
let users = [];

    io.on('connect', (socket) => {

       /* socket.on('subscribe2po', (data) => {
            for(let i=0; i < users.length; i++){    
                if(users[i].username === socket.id){
                    console.log('disconnected user: ' + users[i].username + '|' + users[i].id);  
                    users.splice(i,1); 
                }
              }
            socket.broadcast.to(data.toid).emit('sendMsg',{
                msg:data.msg,
                name:data.name
            });
        });
*/
      socket.on('user-join', (data) => {
        socket.join(data.username);
        users.push({
            id : socket.id,
            username : data.username
        });
        io.emit('new-user', socket.id);
        console.log('connected user: ' + data.username + '|' + socket.id);
      });

      socket.on('subscribe2po', function (data) {
        for(let i=0; i < users.length; i++){    
            if(users[i].id === socket.id){
                feed = require('../models/feeds')(socket, socket.id);
            }
          }
      });

      socket.on('disconnect',()=>{
          for(let i=0; i < users.length; i++){    
            if(users[i].id === socket.id){
                console.log('disconnected user: ' + users[i].username + '|' + users[i].id);  
                users.splice(i,1); 
            }
          }
          //this.io.emit('exit',this.users);
    });

    });
  };