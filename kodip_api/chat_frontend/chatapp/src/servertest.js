const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3002;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
