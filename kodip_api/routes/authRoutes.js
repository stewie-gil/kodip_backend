const express = require('express');
const router = express.Router();
const authController = require('./controller/authController')
const verifyToken = require('./verify');
const propertyController = require('./controller/propertyController');
const messageController = require('./controller/messageController');


//register a new user
router.post('/register', authController.register);

//login an existing user
router.post('/login', authController.login);

// post property info
router.post('/post', verifyToken, authController.post);

//post a new property
router.post('/properties', verifyToken, propertyController.post)

//Get all properties
router.get('/properties', propertyController.get);

//logout
router.post('/logout', verifyToken , authController.logout);

//message app
//router.get('/messageapp', messageController.messageapp);

//get messages
//router.get('/chathistory', messageController.chatHistory);

router.post('/sendmessage', messageController.sendMessage);

module.exports = router;