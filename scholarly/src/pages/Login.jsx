import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import { auth, app, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Redirect to the signup page if the user does not exist in the database
        navigate("/signup");
      } else {
        // Redirect to the home page if the user exists in the database
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation/>
            <div className="container-signin">
                <section class = "wrapper">
                    <div class = "heading">
                        <h1 class = "text text-large"><strong>Sign In</strong></h1>
                        <p class = "text text-normal">New user?<span><a href="/signup" class = "text text-links">Create an account</a></span>
                        </p>
                    </div>
                    <form onSubmit={signIn}>
                        <div class="input-control">
                            <input
                                type = "email" placeholder="Enter your email" value={email} onChange = {(e) => setEmail(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <div class="input-control">
                            <input
                                type = "password" placeholder="Enter your password" value={password} onChange = {(e) => setPassword(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <button onClick={signInWithGoogle}>Sign in with google</button>
                        <button type = "submit" name = "submit" class = "input-submit" value = "Sign in">Sign In</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export default Login;