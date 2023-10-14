const express = require('express');
const router = express.Router();
const authController = require('./controller/authController')
const verifyToken = require('./verify');
const propertyController = require('./controller/propertyController')

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
//messages
//router.post('/message', verifyToken, authController.message)

//logout
router.post('/logout', verifyToken , authController.logout);


module.exports = router;