import React, { useRef } from 'react';

function ChildComponent({ emailRef, passwordRef }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  emailRef = 'hey';
  passwordRef= 'passo';

  return (
    <div>
      
    </div>
  );
}

export default ChildComponent;
