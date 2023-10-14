const axios = require('axios');

const loginData ={
email: 'john_doe@example.com',
password: 'your_passsowrd',

};


const reigsterdata = {
    username: 'some_user',
    email: 'john_doe@example.com',
password: 'your_passsowrd',
UserType: 'landlord',
}

axios.post('http://localhost:3000/api/auth/login', loginData)
.then((response) =>{
console.log('login successful')
console.log(response.data)

})
.catch((error)=>{
    console.error('login fail:', error)
})


//axios.post('http://localhost:3000/api/auth/login', loginData)


// Define the API URL and the JWT token
/*
const apiUrl = 'http://localhost:3000/api/auth/post'; // Replace with your actual URL
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyYTNhMDBhYTE0ZmRiZDk5NWVjYjZmIiwiZW1haWwiOiJqb2huX2RvZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2OTcyNjk0NDQsImV4cCI6MTY5NzI3MzA0NH0.AYkcw36MxlfU-ahSlL-IX89aKy3yuTih43O0l_zmtQU';
// Create a POST request with the JWT token
axios
  .post(apiUrl, {}, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  })
  .then((response) => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
*/