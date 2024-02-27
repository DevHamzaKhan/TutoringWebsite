import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import Tutor from "./Tutor"; // Adjust the import path if needed
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import "./index.css"

const FindTutor = () => {
    const [tutors, setTutors] = useState([]);

    const fetchTutors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tutors"));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTutors(newData);
            console.log(newData);
        } catch (error) {
            console.error("Error fetching tutors: ", error);
        }
    }

    useEffect(() => {
        fetchTutors();
    }, [])

    return (
        <>
            <Navigation></Navigation>
            <h1>Find a Tutor</h1>
            <p>Find a tutor today</p>

            <a href="/findtutor">Become a Tutor Today!</a>
            <div className="todo-content">
                {tutors?.map((tutor, i) => (
                    <p key={i}>
                        {tutor.subject} | {tutor.tutorName} | {tutor.price} | {tutor.gradeLevel} | {tutor.subjectDetails}
                    </p>
                ))}
            </div>
        </>
    );
};

export default FindTutor;
