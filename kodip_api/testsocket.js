import io from 'socket.io-client';


const socket = io('http://localhost:3001');

socket.on('connect', () => {
    console.log('Socket.io connection established');
  });