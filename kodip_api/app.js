const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
//const propertyRoutes = require('./routes/propertyRoutes');
const mongoose = require('mongoose');


//uri
const uri = "mongodb+srv://stewie-gil:777Stephen!@cluster0.ez5jfzu.mongodb.net/?retryWrites=true&w=majority"


//connect to mongodb
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };




// middleware 
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
//app.use('api/property', propertyRoutes);


app.get('/help', (req, res) => {

    res.send('hello');
});

connectDB().then(() => {

  app.listen(port, () => {
console.log(`Api is running on port ${port}`);

});  

})

