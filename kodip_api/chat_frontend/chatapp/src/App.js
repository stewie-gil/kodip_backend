import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
//import './cssfile.css';
import Header from './components/header';
//import user from '../../../models/userModel';
import LoginForm from './components/loginForm';
import MapComponent from './components/mapfile';

import axios from 'axios';
import SearchBox from './SearchBox';
import './chatapp.css';
import Sidebar from './components/sidebar';
//import './components/Sidebar.css';
//import './components/loginmodal.css'

const serverURL = 'http://localhost:3002';

const socket = io(serverURL);

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  

  const openMessageModal = () => {
    if (isMessageModalOpen){
      setMessageModalOpen(false);
    } else{
      setMessageModalOpen(true);
    }
    
  };





  useEffect(() => {
    // Handle connecting to the server and receiving online users
    socket.on('connect', () => {
      console.log('Socket.io connection established');
    });

    socket.on('online users', (users) => {
      console.log("online users received", users);
      setOnlineUsers(users);
    });
  }, []);



  // Handle receiving private messages from the server
 
  useEffect(() => {
    socket.on('A private message', ({ from, message, email}) => {
      const newReceivedMessage = {
        from,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
     
      //console.log('message counter', messageCounter);
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
      console.log('message received', message);
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
      console.log('message received', message);
    });
  }, []);

  
  const sendMessage = () => {
   

    if (selectedUser) {
      socket.emit('private message', {
        to: selectedUser,
        message: newMessage,
        from: userName,
        email: email,

      });
     
      setSentMessage(newMessage);
      setNewMessage('');
    }
 //look for the selected user in mongodb users database by querying the api.
const sender = email;
const receiver = selectedUser.useremail;
const reqdata = {
  sender,
  receiver,
}
console.log('req', reqdata);

async function mes(){
try {
const response = await axios.post('http://localhost:3002/api/auth/getusers', reqdata)

const {senderID, receiverID} = response.data;
console.log("senders id and receirs id", response.data)

const messdata = {
  senderid: senderID,
  receiverid: receiverID,
  message: newMessage,
  }
console.log('messdata bf .then', messdata)
//match with their id and then create your axios post
return messdata;
//now we will have the senders id and the receiversid . we now create a post to the messagecontroller asking it to save the message obj to database

}catch(error){
  console.log('send message error', error);
}

  }

  mes(reqdata)
  .then((messdata)=> {
    console.log('what we are sending', messdata)
      const messresponse = axios.post('http://localhost:3002/api/auth/sendmessage', messdata)
      console.log('send message response', messresponse)

  })
  .catch((error) => {
    console.log('messdata error', error)
  })






  };



const details = (mail, pass, username1) => {  
    setEmail(mail);
    setPassword(pass);
    //lets now get user's username from db!! and associate a message/something with them.
    
    setUserName(username1);
    
   const userobj ={
    useremail: mail,
    userpassword: pass,
    userusername:username1,
   }
    //when we get a user we check db for name, we update our list
    
    setUsers([...users, userobj]);
    socket.emit('user login', userobj);
    console.log(userobj);


    //if (mail, pass, username1)

    
  }


  async function getchathistory(email, emailselect){
const emaildata = {
  sender: email,
  receiver: emailselect,
}
console.log('what we are sending to getusers', emaildata)
//expected  res.json({senderID : senderid._id, receiverID: receiverid._id});
axios.post('http://localhost:3002/api/auth/getusers', emaildata)
.then((response) => {


//we take the ids and then ask for their chats with chathistory api endpoint
///chathistory'
axios.post('http://localhost:3002/api/auth/chathistory', response.data)
.then((resp) => {
console.log("chathistory success:", resp.data.messages);
setChatHistory(resp);
//once we have the response from the api we sort the messages and place them in an array
let messagesArray = resp.data.messages

let hist = []
for(let i = 0; i < messagesArray.length; i++){

 hist.push(messagesArray[i].content);

 
}
console.log(hist);
setChatHistory(hist)


})
.catch ((error) => {
console.log('chathistory api endpiont error', error);
})


// once we have the id we do load cht history
//getusers  /chathistory

  })
  .catch((error) => {
    console.log('error gettting users:', error);
  })
}  










return (
  <div className="Entirepage">

<div style={{position:'relative', left:'100px'}}>    <LoginForm getUser={details} />
        </div>

    <div className="sidebar">   
   
    

    <div> 
      <button className="message-button" onClick={openMessageModal}>
        Messages
      </button>
    
      {isMessageModalOpen && (
        <>
         

          <div className="message-app">
            
            
            
            <div className="contacts">
              <div>
                
                <h1>Contacts</h1>
                <ul id="contact-list">
                  {onlineUsers.map((user) => (
                    <li key={user.email}>
                      <h2
                        onClick={() => {
                          setChatHistory('');
                          setSelectedUser(user);
                          getchathistory(email, user.useremail);
                        }}
                        className={selectedUser.userusername === '' ? 'active-contact' : ''}
                      >
                        {user.userusername}
                      </h2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>



            <div className="chat-container">
              <div className="chat-messages">
                {selectedUser.userusername ? (
                  <h2>Sending a message to {selectedUser.userusername || 'None'}</h2>
                ) : null}

                <div>
                  {chatHistory.length > 0 && (
                    <div>
                      {(() => {
                        const chatElements = [];
                        for (let i = 0; i < chatHistory.length; i++) {
                          chatElements.push(<p key={i}>{chatHistory[i]}</p>);
                        }
                        return chatElements;
                      })()}
                    </div>
                  )}
                </div>

                {messages.map((message, index) => (
                  <div key={index} className="message">
                    <p>
                      <strong>{message.from || 'You'}: </strong>
                      {message.message}
                    </p>
                  </div>
                ))}
              </div>
              <div >
                <input
                className="chat-input"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
              </div>
            </div>




          </div>

        </>
      )}



    </div>
    </div>

    <div className="Map">
      <MapComponent />

    
    </div>

    <div className="search-bar">
      <SearchBox />

      
    
    </div>


    
  </div>
);





}

export default ChatComponent;
