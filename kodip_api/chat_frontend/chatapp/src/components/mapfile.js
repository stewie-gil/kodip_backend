import React, { useState } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import axios, { all } from 'axios';


function MapComponent(prop) {
  const [infoboxLocation, setInfoboxLocation] = useState(null);
  const [infoboxVisible, setInfoboxVisible] = useState(false);
  const [pushPins, setPushPins] = useState([]);
  const [getemail, setGetEmail] = useState();

  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };




  axios
    .post('http://localhost:3002/api/auth/userswithpin', {})
    .then((response) => {
      
      const extractedData = response.data.users.map((item) => {
  
        const email = item.email
        const { location, infoboxOption } = item.pushpin;
        
        
        const pushpin2 = {
          "location":location, 
          "addHandler":"mouseover",
          "infoboxAddHandler": {"type" : "click", callback: createPinClickHandler(email) }, //on click the pushpin, infobox shown
          "infoboxOption": { 
            title: infoboxOption.title, 
            description: 'Click here to message owners',
          },
          "pushPinOption":{ color: 'brown', description: 'PushPin' },
        }
      
      pushPins.push(pushpin2)     
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });



function handlePinClick(email) {
      prop.setmessagemodal(true, email);
  }

function createPinClickHandler(email) {
    return () => {
    handlePinClick(email);
  };
}


  
  


  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReactBingmaps
        bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
        center={mapOptions.center}
        infoboxesWithPushPins = {pushPins}
      />
    
       
     
    </div>
  );
}

export default MapComponent;
