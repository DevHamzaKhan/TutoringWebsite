//https://youtu.be/SdGk1PICxdg
import React from "react";
import Navigation from "../components/Navigation/Navigation";
import {Button} from "react-bootstrap";

const Tutor = () => {
    return (
        <>
            <Navigation></Navigation>
            <h1>Tutor</h1>
            <p>Want to be a tutor? Start today!</p>
            <Button variabt="online-sucess">Become A Tutor</Button>
        </>
    );
};

export default Tutor;