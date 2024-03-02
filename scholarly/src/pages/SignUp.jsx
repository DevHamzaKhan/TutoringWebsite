import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore"; // Update the import statement
import "./index.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User UID:", user.uid);

        // Add additional user information to Firestore
        addDoc(collection(db, "Users"), {  // Use collection() and addDoc() correctly
          firstName: firstName,
          lastName: lastName,
          country: country,
          city: city,
          age: parseInt(age, 10),
        })
          .then(() => {
            console.log("User information added to Firestore successfully!");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error adding user information to Firestore:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <>
      <Navigation />
      <div className="container-signin">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">
              <strong>Sign Up</strong>
            </h1>
            <p className="text text-normal">
              Already a user?
              <span>
                <a href="/login" className="text text-links">
                  Log In
                </a>
              </span>
            </p>
          </div>
          <form onSubmit={signUp}>
                        <div class="input-control">
                            <input
                                type = "text" placeholder="Enter your first name" value={firstName} onChange = {(e) => setFirstName(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <div class="input-control">
                            <input
                                type = "text" placeholder="Enter your last name" value={lastName} onChange = {(e) => setLastName(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <div class="input-control">
                            <input
                                type = "text" placeholder="Enter your country" value={country} onChange = {(e) => setCountry(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <div class="input-control">
                            <input
                                type = "text" placeholder="Enter your city" value={city} onChange = {(e) => setCity(e.target.value)} class="input-field">
                            </input>
                        </div>
                        <div className="input-control">
                            <input
                                type="number" // Change the input type for age
                                placeholder="Enter your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="input-field"
                            />
                        </div>
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
                        <button type = "submit" name = "submit" class = "input-submit" value = "Sign In">Submit</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export default SignUp;