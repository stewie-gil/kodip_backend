const express = require('express');
const router = express.Router();
const authController = require('./controller/authController')
const verifyToken = require('./verify');

//register a new user
router.post('/register', authController.register);

//login an existing user
router.post('/login', authController.login);

// post property info
router.post('/post', verifyToken, authController.post);

//properties
//router.post('/properties', verifyToken, auth.controller.properties)

//messages
//router.post('/message', verifyToken, authController.message)

//logout
router.post('/logout', verifyToken , authController.logout);


module.exports = router;