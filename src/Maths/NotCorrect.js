import React from 'react';
import again from '../images/try.gif';

export default function NotCorrect(props) {

    return (
        <>
            <img src={again} alt="Try Again!" className="h-10 w-10" />
            <button onClick={props.onNewNumbers}>New Numbers</button>
        </>
    );
};