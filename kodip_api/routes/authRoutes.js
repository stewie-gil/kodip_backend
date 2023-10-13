const express = require('express');
const router = express.Router();
const authController = require('./controller/authController')


//register a new user
router.post('/register', authController.register);

//login an existing user
//router.post('/login', authController.login);

//logout
//router.post('/logout', authController.logout);

module.exports = router;