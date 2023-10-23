import React from 'react';
import styles from './Header.module.css';
import PostData from './postData';
import LoginForm from './loginForm';



//import kodiplus_logo from './kodiplus_logo.png';

function Header(){
return (
<div className = {styles.header}>
    <nav className= {styles.navbar}>
        
        <ul>
            <LoginForm className={styles.PostData}/> 
            <PostData className={styles.PostData}/>
        </ul>
    </nav>
</div>

);

}

export default Header;