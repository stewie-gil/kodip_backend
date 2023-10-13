
// Import your User model
const User = require('../../models/userModel')

class authController {
  async register(req, res) {
    const { username, password, email, userType } = req.body;

    try {
      // Create a new user document with the provided data
      const newUser = new User({
        username,
        password,
        email,
        UserType: userType, // Set the UserType field
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: error.message });
    }
  }
}

module.exports = new authController();
