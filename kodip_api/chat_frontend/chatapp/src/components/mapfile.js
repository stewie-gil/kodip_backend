import React from "react";
import { ReactBingmaps } from 'react-bingmaps';

function MapComponent() {
  const mapOptions = {
    center: [13.0827, 80.2707],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  const pushPins = [
    {
      location: [ -1.164194, 36.945139],
      option: { color: "red" },
      metadata: {
        title: "Pin 1",
        description: "This is the first pin.",
      },
    },
    {
      "location":[13.0827, 80.2707], 
      addHandler: handlePinClick, //on mouseover the pushpin, infobox shown
      infoboxOption: { title: 'Infobox Title', description: 'Infobox' },
      "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
      "infoboxAddHandler": {"type" : "click", callback: handlePinClick },
      "pushPinAddHandler": {"type" : "click", callback: handlePinClick }
    },


    {/*
      "location":[ -1.265714, 36.804767], 
      "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
      "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
      "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
      "infoboxAddHandler": {"type" : "click", callback: handlePinClick},
      "pushPinAddHandler": {"type" : "click", callback: handlePinClick }
  */}
    // Add more pushpins as needed
  ];

function handlePinClick(){
console.log('clicked pin');
}




  return (
    <div style={{ width: "100%", height: "100%" }}>
      
      <ReactBingmaps
        bingmapKey="AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv"
        center={mapOptions.center}
        pushPins={pushPins}
        pushpinClicked={handlePinClick}
      />
    </div>
  );
}

export default MapComponent;
