import React, { useState, useEffect } from 'react';
import Navigation from "../components/Navigation/Navigation";
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./index.css"

const Tutor = () => {
    const [subject, setSubject] = useState("");
    const [tutorName, setTutorName] = useState("");
    const [price, setPrice] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [subjectDetails, setSubjectDetails] = useState("");
    const [id, setId] = useState("");
    const [tutors, setTutors] = useState([]);

    const addTutor = async (e) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        const currentUserId = currentUser.uid;
        setId(currentUserId);
        try {
            const docRef = await addDoc(collection(db, "Tutors"), {
                subject,
                tutorName,
                id,
                price: Number(price),
                gradeLevel: Number(gradeLevel),
                subjectDetails,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const fetchTutors = async () => {
        await getDocs(collection(db, "Tutors"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTutors(newData);
                console.log(tutors, newData);
            })
    }

    useEffect(() => {
        fetchTutors();
    }, [])

    return (
        <>
            <Navigation></Navigation>
            <section className="todo-container">
                <div className="todo">
                    <h1 className="header">
                        Tutor-App
                    </h1>

                    <div>
                        <form>
                            <div>
                                <label>Subject:</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Tutor Name:</label>
                                <input
                                    type="text"
                                    value={tutorName}
                                    onChange={(e) => setTutorName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Price:</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Grade Level:</label>
                                <input
                                    type="number"
                                    value={gradeLevel}
                                    onChange={(e) => setGradeLevel(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Subject Details:</label>
                                <textarea
                                    value={subjectDetails}
                                    onChange={(e) => setSubjectDetails(e.target.value)}
                                />
                            </div>

                            <div className="btn-container">
                                <button
                                    type="submit"
                                    className="btn"
                                    onClick={addTutor}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tutor;