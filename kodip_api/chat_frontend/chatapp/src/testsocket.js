const io = require('socket.io-client');

// Replace with your server URL
const serverURL = 'http://localhost:3002';

const socket = io(serverURL);

socket.on('connect', () => {
  console.log('Connected to the server');

  // Send a test message to the server
  socket.emit('message', 'Hello from the client!');
});

socket.on('message', (data) => {
  console.log('Received message from the server:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
