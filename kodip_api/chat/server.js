const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {


  res.sendFile(__dirname + '/index2.html')
});

const userSocketMap = {};


io.on('connection', (socket) => { 
  let userName = '';

socket.emit('user list', Object.keys(userSocketMap));

socket.on('set username', (name) => {
userName = name;


// work on selecting users and sending a message to a specific user.

userSocketMap[userName] = socket;
console.log(userSocketMap);
io.emit('user list', Object.keys(userSocketMap));
})


socket.on('chat message', (message, recipient) => {

  const recipientSocket = userSocketMap[recipient];

  if(recipientSocket){
recipientSocket.emit('chat message', `${userName}: ${message}`)

  }
})



socket.on('disconnect', () => {
  // Remove the user from the mapping when they disconnect
  delete userSocketMap[userName];
});


})


server.listen(3000, () => {
console.log('listening on Port 3000')

});


