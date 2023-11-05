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


//get users object. takes in email returns a users obj
async usersobj(req, res){
const {usersemail} = req.body;
try{
  let userobj = await User.findOne({email: usersemail});

  res.json({userobj});
  console.log('userobj', userobj)

} catch(error){
  res.json({Error : error})
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







async postdata (req, res) {
  


// Define a filter to uniquely identify the document you want to update
const filter = { username: 'user6' }; // Replace 'username' and 'user7' with your filter criteria

// Define the data you want to set in the 'listing' field
const { listing, pushpin1} = req.body
const listingData = {
  propertyType: 'Apartment',
  price: 4999,
  description: 'Luxury apartment with stunning city views',
  propertyName: 'Lux Apartmentz',
  location: 'Nakuru, Kenya',
};


const pushpin = {
  location: [-1.3217, 36.6764], // Latitude and longitude
  infoboxOption: {
    title: 'Karen',
    description: 'Karen Ridge',
  },
}
// Use Mongoose's updateOne method to add the 'listing' field to the document

const updateQuery = User.updateOne(filter, { pushpin: pushpin });

// Execute the query using the `exec()` method
updateQuery.exec()
  .then((result) => {
    console.log('Document updated:', result);
    res.json({message: 'updated'})
  })
  .catch((err) => {
    console.error('Update failed:', err);
    res.json({message: err})
  });

//console.log(response)
//res.json({message:response})


}





//get all users users from db
async userswithpin(req, res){
  //console.log('triggererd');
  //sender reciever will have to be email addresses
  //console.log('entire req', req)
  //const {sender, receiver} = req.body;
//console.log('sender and reciever', sender, reciever)
  try{
  const users = await User.find({ pushpin: { $exists: true }});

  res.json({users: users});
  //console.log('users', users)

  }catch(error){
    //console.log('users', users)
    //console.log(error)
  } 



}





}
 
module.exports = new authController();
