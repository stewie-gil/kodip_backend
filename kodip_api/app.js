const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
 
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
}); 

const port = 3002;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const users = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('user login', (userobj) => {
    
    console.log('Someone logged in: ', userobj.userusername);
    users.push({ socket, userobj });
    
    io.emit('online users', users.map((user) => user.userobj));
    //console.log('after user push', users)
  });
 
  
  socket.on('private message', ({ to, message, from, email }) => {
    console.log("users who are online ", users)
    const recipientUser = users.find((user) => user.userobj.userusername === to.userusername);
    const senderUser = users.find((user) => user.userobj.userusername === from);
  console.log(`recipientUser: ${recipientUser}, users: ${users} to: ${to}`)
    if (recipientUser) {
      const recipientSocket = recipientUser.socket;
      recipientSocket.emit('A private message', { from, message, email }); // Send the message to the recipient
      console.log('Sending a private message:', from, 'to', to, message);
      

    } else {
      console.log(`Recipient user '${to}' not found.`);
    }
  
    if (senderUser) {
      const senderSocket = senderUser.socket;
      senderSocket.emit('A private message', { to, message, email }); // Send a confirmation message to the sender
      console.log('Sent a confirmation message to:', from);
    } else {
      console.log(`Sender user '${from}' not found.`);
    }
    
  });
  
  
});  

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/welcome.html');
});


 
const uri = "mongodb+srv://stewie-gil:###@cluster0.ez5jfzu.mongodb.net/";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    //console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connected!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


connectDB().then(() => {
  server.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });
});

/*
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
*/
