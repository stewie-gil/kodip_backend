const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({




    UserType: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      
      listing: {
        propertyType: String,
        price: Number,
        description: String,
        propertyName: String,
        location: String,
        amenities: Number, // Nested array of amenities
        contactInfo: Number, // Nested array of contact info
        imageUrls: String,
      },
      pushpin: {
        location: [Number, Number], // Latitude and longitude
        infoboxOption: {
          title: String,
          description: String,
        },
      },
      
});

const user = mongoose.model('User', userSchema);

module.exports = user; 