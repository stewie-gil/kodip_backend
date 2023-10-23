import React, { useRef } from 'react';
import ChildComponent from './testrefchild';

function ParentComponent() {
  // Create refs for child component's variables
  const emailRef = useRef();
  const passwordRef = useRef();

  // Access child component's variables
  const handleButtonClick = () => {
    console.log("Email in Parent:", emailRef.current.value);
    console.log("Password in Parent:", passwordRef.current.value);
  };

  handleButtonClick
  return (
    <div>
      <ChildComponent
        emailRef={emailRef}
        passwordRef={passwordRef}
      />
      
    </div>
  );
}

export default ParentComponent;
