// Import your User model
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blacklist = require('../../models/blacklisted');

 


class authController {
  async register(req, res) {
    const { username, password, email, UserType } = req.body;
   

    try {
      // Create a new user document with the provided data
      const newUser = new User({
        username,
        password,
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
      console.log('user.name', user.username)

      

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

      res.status(200).json({ 'token': token, 'username': user.username });
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

//getting users from db
async getusers(req, res){
  //sender reciever will have to be email addresses
  //console.log('entire req', req)
  const {sender, receiver} = req.body;
//console.log('sender and reciever', sender, reciever)
  try{
let senderid = await User.findOne({ email:sender });
let receiverid = await User.findOne({ email: receiver });

  res.json({senderID : senderid._id, receiverID: receiverid._id});
  console.log(`senderID : ${senderid._id}, receiverID: ${receiverid._id}`)

  }catch(error){
    console.log(error)
  } 

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
