const axios = require('axios');

// Define the data for the new document
const newDocument = {
  propertyType: 'House',
  price: 250000,
  description: 'Beautiful house for sale',
  propertyName: 'Cozy Cottage',
  location: 'Sunnydale',
  amenities: ['Swimming pool', 'Garden'],
  contactInfo: ['John Doe', 'johndoe@example.com'],
  imageUrls: ['image1.jpg', 'image2.jpg']
};

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYTNhMDBhYTE0ZmRiZDk5NWVjYjZmIiwiZW1haWwiOiJqb2huX2RvZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2OTcyNzI2MjIsImV4cCI6MTY5NzI3NjIyMn0.gCLRm8F-NG4mke2LTwZtVDAhGkJus5wVzdZ8MiahPV8'


// Define the URL for your API endpoint
const apiUrl = 'http://localhost:3000/api/auth/properties'; // Replace with your actual API endpoint URL

// Make a POST request to create a new document
axios.post(apiUrl, newDocument, {
headers: { 
    'Authorization': `Bearer ${jwtToken}`,
}

})
  .then((response) => {
    console.log('New document created successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error creating the document:', error);
  });



 // Create a POST request with the JWT token
