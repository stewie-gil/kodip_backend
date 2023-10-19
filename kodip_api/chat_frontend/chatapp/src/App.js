import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './cssfile.css';
//import user from '../../../models/userModel';

const serverURL = 'http://localhost:3002';

const socket = io(serverURL);

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [sentMessage, setSentMessage] = useState('');




  useEffect(() => {
    // Handle connecting to the server and receiving online users
    socket.on('connect', () => {
      console.log('Socket.io connection established');
    });

    socket.on('online users', (users) => {
      setOnlineUsers(users);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, userName]);
    socket.emit('user login', userName);
  };

  // Handle receiving private messages from the server
 
  useEffect(() => {
    socket.on('A private message', ({ from, message }) => {
      const newReceivedMessage = {
        from,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
     
      //console.log('message counter', messageCounter);
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      console.log('message recieved', message);
    });
  }, []);


  useEffect(() => {
    socket.on('An private message', ({ from, message }) => {
      const newReceivedMessage = {
        from,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
     
      //console.log('message counter', messageCounter);
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      console.log('message recieved', message);
    });
  }, []);

  
  const sendMessage = () => {
    if (selectedUser) {
      socket.emit('private message', {
        to: selectedUser,
        message: newMessage,
        from: userName,

      });
      
      setSentMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="parent-container">
      <div className="contacts">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>

          <label>
            <p>
            User Name:
            </p>
              
              <input
                
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>
            <label>
              <p>
              Email:
              </p>
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            
            <label>
              <p>
              Password:
              </p>
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>

          <h1>Contacts</h1>
        <ul id="contact-list">
          {onlineUsers.map((user) => (
            <li key={user}>
              <h2
                onClick={() => setSelectedUser(user)}
                className={selectedUser === user ? 'active-contact' : ''}
              >
                {user}
              </h2>
            </li>
          ))}
        </ul>
        </div>
      
      </div>


      <div className="chat-container">
        <div className="chat-messages">
          <h2>Sending a message to {selectedUser || 'None'}</h2>

          {messages.map((message, index) => (
            <div key={index} className="message">

              <p>
              <strong>{message.from || 'You'}: </strong>{message.message}
             
              



              </p>
             



            </div>
            
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
