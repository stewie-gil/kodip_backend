const axios = require('axios');
/*
//register
const reigsterdata = {
    username: 'some_user',
    email: 'john_doe10@example.com',
password: 'your_passsowrd',
UserType: 'landlord',
}

axios.post('http://localhost:3002/api/auth/register', reigsterdata)
.then((response) =>{
console.log('register successful')
console.log(response.data)

})
.catch((error)=>{
    console.error('register fail:', error)
})
const messdata = {sender: '6536cc58d0f01b6d8c424ad6', receiver: '6536cc58d0f01b6d8c424ad6'}

//login


  axios.post('http://localhost:3002/api/auth/chathistory', messdata)
  .then((response) =>{
  console.log('Login successful')
  console.log(response.data)
  
  })
  .catch((error)=>{
      console.error('login fail:', error)
  })


  // logout
  const apiUrl = 'http://localhost:3002/api/auth/logout'; 
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzMWVkYzg4YjlmYTg2YWQ5NDQyNDliIiwiZW1haWwiOiJqb2huX2RvZTEwQGV4YW1wbGUuY29tIn0sImlhdCI6MTY5Nzc3MTAyNywiZXhwIjoxNjk3Nzc0NjI3fQ.V4XIarkjueKTkxRCU-w1s9NUvpaD1SJB1sRHHSX_hA4'

axios
  .post(apiUrl, {}, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  })
  .then((response) => {
    console.log('Success logged out');
  })
  .catch((error) => {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  });






//try posting when your session is expired or dont have a valid jwtToken

const apiUrl = 'http://localhost:3002/api/auth/post'; // Replace with your actual URL
const jwtToken = 'invalidtoken'

// 
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



const apiUrl = 'http://localhost:3002/api/auth/postdata'; // Replace with your actual URL


// 
axios
  .post(apiUrl, {})
  .then((response) => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  */

  const apiUrl = 'http://localhost:3002/api/auth/userswithpin'; // Replace with your actual URL

  const allpins =[]
  // 
  axios
    .post(apiUrl, {})
    .then((response) => {
      
  
      const extractedData = response.data.users.map((item) => {
        const { location, infoboxOption } = item.pushpin;
        
        const pushpin2 =   
        {
          "location":location, 
          "addHandler":"mouseover",
          "infoboxAddHandler": {"type" : "click" }, //on click the pushpin, infobox shown
          "infoboxOption": { 
            title: infoboxOption.title, 
            description: 'Click here to message owners',
            
          },
          "pushPinOption":{ color: 'brown', description: 'PushPin' },
        }
      
      allpins.push(pushpin2)
      
        
      });
      
  
    })
    

    function waitBeforeExecute(delayInMilliseconds, callback) {
      setTimeout(callback, delayInMilliseconds);
    }

    waitBeforeExecute(5000, () => {
      console.log(allpins);
    });