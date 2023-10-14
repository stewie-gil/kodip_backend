// Import your User model
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blacklist = require('../../models/blacklisted');

class authController {
  async register(req, res) {
    const { username, password, email, UserType } = req.body;

    // Check whether email exists, return an error if it does
    // Check the username if it only contains letters
    // Check the password if it is secure

    // Hashing password

    //console.log('password: ', password)
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // Create a new user document with the provided data
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        UserType: UserType, // Set the UserType field
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: error.message });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log(' login password: ', password)
      console.log('user.password', user.password)

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Creating an auth session for the user with jwt
      const payload = { 
        user: {
          id: user.id,
          email: user.email
        },
      };
      const secret = 'secretkey';

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      console.log('Generated token: ', token);

      res.status(200).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };


//post new property info
  async post(req, res){
    //Authorization tokens checked in blacklist.
    const token =  req.headers.authorization.replace('Bearer ', '');
   
  const checkToken = await Blacklist.findOne({token});



  if (checkToken){
    return res.json({message: 'Please Login'});
  }
    res.json({ message: 'Authenticated User', user: req.user });

  }

//logout

async logout(req, res){

  const authtoken =  req.headers.authorization.replace('Bearer ', '');
   
  const blacklist = new Blacklist({
    token: authtoken,
  }
  )

  await blacklist.save();

  
  res.json({message: 'Logged out:', user: req.user});
}

}
 
module.exports = new authController();
