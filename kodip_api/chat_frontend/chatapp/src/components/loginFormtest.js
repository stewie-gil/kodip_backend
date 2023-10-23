import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { useRef } from 'react';
import styles from './loginform.module.css';


const firebaseConfig = {
  apiKey: "AIzaSyD-KPygBA0nfwNoR7af9D1mRzuz0Ud2KYA",
  authDomain: 'localhost',
  projectId: 'kodiplus-1b34f'
};

const app = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();

const email = 'emailemail';
const passowrd = 'pass';


function LoginForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const exportemailRef = useRef(null);
  const exportpasswordRef = useRef(null);
  const exportnameRef = useRef(null);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged In');
      setLoggedIn(true);
      setName(name);
      setModalOpen(false); // Close the modal after successful login
    } catch (error) {
      console.log(error);
      setloginerror(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      console.log('Signed Up', name);
      setLoggedIn(true);
      setUserName(name);
      setModalOpen(false); // Close the modal after successful sign up
      const exemail = exportemailRef.current.value;
      const expassword = exportpasswordRef.current.value;
      exemail = email;
      expassword = password;
      
    } catch (error) {
      console.log(error);

      setloginerror(error.message);


    }
  };

  const handleLogout = async () => {
    try {

      await auth.signOut();
      setLoggedIn(false);
      console.log('Logged Out');
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
  };


  const toggleDropdownTrue = () => {
    setShowDropdown(true);
  };

const toggleDropdownFalse = () =>
{
  setShowDropdown(false);
}

  return (
    <div>
      {!isLoggedIn && (
        <button onClick={handleClick} className={styles.text}>Login</button>
      )}
      {
        isLoggedIn && (

                <div>
          {/* Dropdown Menu */}
          <div className={styles.dropdownContainer}>
            {!showDropdown && <button onClick={toggleDropdownTrue} className={styles.text} style={{fontSize: '18px'}}>
              Welcome 😊!
            </button>}

            {showDropdown && <button onClick={toggleDropdownFalse} className={styles.text} style={{fontSize: '18px'}}>
              Welcome 😊!
            </button>}

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button onClick={handleLogout} className={styles.text} style={{fontSize: '12px'}}>
                  Logout?
                </button>
              </div>
            )}
          </div>
        </div>



        )
      }
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        className={styles.modal}
      >
        {!displayName && (
          <form onSubmit={handleLogin} className={styles.form}>
          <p style = {{fontWeight: 'bold'}}> Welcome back! Login with your details below 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button} onClick = {toggleDropdownFalse}>Log in</button>
            <button onClick={() => setDisplayName(true)} className={styles.button}>Sign Up</button>
          {loginerror && (
  <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>
)}

          </form>
        )}
        {displayName && (
          <form onSubmit={handleSignUp} className={styles.form}>
          <p style = {{fontWeight : 'bold'}}> New to Kodip? Sign up today 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="How should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />


            <button type="submit" className={styles.button} style = {{padding : '0 px', margin : '4px 0'}}>Sign up</button>

            <p style = {{padding : '0 px', margin: '4px 0'}}> Or </p>

            <button onClick={() => setDisplayName(false)} className={styles.button} style = {{padding : '0 px', margin : '0 px'}}>Login</button>
            {loginerror && (
  <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>
)}



          </form>
        )}
      </Modal>
    </div>
  );
}

export {LoginForm, email, password};

