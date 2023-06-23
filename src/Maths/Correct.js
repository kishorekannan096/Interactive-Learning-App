import React from 'react';
import good from '../images/good.gif';

export default function Correct(props) {
    return (
        <>
            <img src={good} alt="Correct answer!" className="h-10 w-10" />
            <button onClick={props.onNewNumbers}>New Numbers</button>
        </>
    );
};