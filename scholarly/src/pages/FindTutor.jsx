import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import { NavLink, Link } from "react-router-dom";
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import "./FindTutor.css"

const FindTutor = () => {
    const [tutors, setTutors] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const fetchTutors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tutors"));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTutors(newData);
        } catch (error) {
            console.error("Error fetching tutors: ", error);
        }
    }

    useEffect(() => {
        fetchTutors();
    }, [])

    const handleSubjectChange = (subject) => {
        // Toggle the selected state of the subject
        setSelectedSubjects((prevSubjects) => {
            if (prevSubjects.includes(subject)) {
                return prevSubjects.filter((prevSubject) => prevSubject !== subject);
            } else {
                return [...prevSubjects, subject];
            }
        });
    }

    const filterTutors = (tutor) => {
        const priceFilter = (minPrice === '' || tutor.price >= minPrice) && (maxPrice === '' || tutor.price <= maxPrice);
        const gradeFilter = (grade === '' || tutor.gradeLevel === parseInt(grade));
        const subjectFilter = selectedSubjects.length === 0 || selectedSubjects.includes(tutor.subject);
        return priceFilter && gradeFilter && subjectFilter;
    }

    return (
        <>
            <Navigation></Navigation>
            <h1>Find a Tutor</h1>
            <p>Find a tutor today</p>
            <Link to={"/tutor"}>Become a tutor today</Link>
            <div>
                <label>Min Price:</label>
                <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>
            <div>
                <label>Max Price:</label>
                <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <div>
                <label>Grade Level:</label>
                <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                />
            </div>
            <div>
                <label>Subjects:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="Math"
                            checked={selectedSubjects.includes("Math")}
                            onChange={() => handleSubjectChange("Math")}
                        />
                        Math
                    </label>
                    {/* Other subject checkboxes */}
                </div>
            </div>
            <div className="todo-content">
                {tutors
                    .filter(filterTutors)
                    .map((tutor, i) => (
                    <p key={i}>
                        {tutor.subject} | {tutor.tutorName} | {tutor.price} | {tutor.gradeLevel} | {tutor.subjectDetails}| {tutor.tutorId}{" "}
                        <NavLink to={{ pathname: "/chathome", state: { initialUser: tutor.tutorId } }}>
                            <button>Chat with me today</button>
                        </NavLink>
                    </p>
                ))}
            </div>
        </>
    );
};

export default FindTutor;
