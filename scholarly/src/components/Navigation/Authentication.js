import React, {useEffect, useState} from "react";
import {auth, app} from "../../firebase"
import Nav from 'react-bootstrap/Nav';import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { onAuthStateChanged, signOut} from "firebase/auth";

const Authentication = () => {
  const [authenticatedUser, setauthenticatedUser] = useState("");

  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) =>{
      if (user){
        setauthenticatedUser(user)
      } else {
        setauthenticatedUser(null)
      }
    }
    )
    return () => {
      listenAuth();
    }
  },[])
  
  const userSignOut = () => {
    signOut(auth)
  }

  return (
    <>
    {authenticatedUser == null ? 
    <>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Signup</Nav.Link>
      
    </> : 
      <>
        <Nav.Link href="/" onClick={userSignOut}>Sign Out</Nav.Link>
        <Nav.Link href="/tutor">Tutor</Nav.Link>
      </>
      }
    </>
  );
}

export default Authentication;