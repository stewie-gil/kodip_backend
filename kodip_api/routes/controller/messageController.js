const Message = require('../../models/messageModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class messageController{
    async loadChatHistory(req, res){

// we need the sendersid which is the current userid. and the id of receiver.
//with that we will load all their messages 

const {senderID, receiverID} = req.body;
//console.log('sender and receiver', sender, receiver)
//console.log("herr is request ssssssssssssssss", req) 
//console.log(` first time senderID: ${senderID},  receiverID: ${receiverID} `)
//{sender: ObjectId('6536cc58d0f01b6d8c424ad6'), receiver: ObjectId('6536cc58d0f01b6d8c424ad6')}

try {
    // Convert sender and receiver to ObjectId
    //const senderObjectId = new ObjectId(sender);
    //const receiverObjectId = new ObjectId(receiver);

    //a simple way of switching users. eg. when checking messages for sender 7 and receiver 8 or for sender 8 and receiver 7
    let messages;
    messages = await Message.find({sender: new ObjectId(senderID), receiver: new ObjectId(receiverID)});
    
      const sender = new ObjectId(receiverID);
      const receiver = new ObjectId(senderID);
      //console.log(` second time senderID: ${sender},  receiverID: ${receiver} `)
      let messages2 = await Message.find({sender: sender , receiver: receiver});
    messages.push(messages2)

    console.log('Messages:', messages);
    res.json({messages});
  } catch (error) {
    console.error('Error:', error);
  }


  //console.log("messages", messages);
    /*

    // get all the messages the user has sent and received
    async chatHistory(req, res){
        //req.headers.data
        const user = 'john_doe';
        const ChatHistory = await messages.find();
res.json({message:`${user}'s Chat History`, chatHistory});
    }
*/}

// when a user sends a message to another user
async sendMessage(req, res){

    // body will contain : sender id, receiver id and the message. We will 
/*
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      */



   // req should have users id message and receiver id

  //then create an object and save this to the database
  
 const { senderid, receiverid, message } = req.body; 
 
  try {
    // Create a new user document with the provided data
    const newmessage = new Message({
      sender: senderid,
      receiver: receiverid,
      content: message,
    });

    // Save the new user to the database
    await newmessage.save();

    res.status(201).json({ message: 'saved message successfully', messageobj: newmessage});
  } catch (error) {
    console.log({ error: 'saving message failed', message: error.message })
    res.status(500).json({ error: 'saving message failed', message: error.message });
  }
};


}

module.exports = new messageController();