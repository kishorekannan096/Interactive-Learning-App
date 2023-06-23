import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Add() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(null);
    const [carries, setCarries] = useState([]);
    const [numClicks, setNumClicks] = useState(0);
    const [buttonClicked, setButtonClicked] = useState(false);

    const location = useLocation();
    const navigate = useNavigate(); // add the useNavigate hook

    const handleAddition = () => {
        let n1 = num1.toString().split("").reverse();
        let n2 = num2.toString().split("").reverse();
        let res = num1 + num2;
        let carry = [];
         
        setButtonClicked(true);
        //perform addition with carry
        for (let i = 0; i < Math.max(n1.length, n2.length); i++) {
            let sum = (parseInt(n1[i]) || 0) + (parseInt(n2[i]) || 0) + (carry[i] || 0);
            carry.push(Math.floor(sum / 10));
        }

        setResult(res);
        setCarries(carry.reverse());
    };

    const handleNewNumbers = () => {
        setNumClicks(numClicks + 1);
        const n1 = Math.floor(Math.random() * 100) + 1;
        const n2 = Math.floor(Math.random() * 100) + 1;
        if (n2 > n1) {
            setNum1(n2);
            setNum2(n1);
        } else {
            setNum1(n1);
            setNum2(n2);
        }
        setResult(null);
        setCarries([]);
        setButtonClicked(false);

        // navigate to another page after 5 clicks
        if (numClicks + 1 === 5) {
            navigate('/Loading', { state: { from: location.pathname } });
        }
    };

    useEffect(() => {
        const n1 = Math.floor(Math.random() * 100) + 1;
        const n2 = Math.floor(Math.random() * 100) + 1;
        if (n2 > n1) {
            setNum1(n2);
            setNum2(n1);
        }
        else {
            setNum1(n1);
            setNum2(n2);
        }
    }, []);

    return (
        <>
            <div className="bg-image w-screen h-screen flex flex-col items-center">{/*header*/}
                <section className="flex w-full flex-col py-12 space-y-12 items-center text-center">
                    <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
                    <span className="text-2xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">Addition Example</span>
                </section>
                <div className='h-3/5 mx-20 w-3/5 rounded-xl border-4 border-amber-400 shadow-xl bg-teal-100 flex items-center justify-center space-x-20 font-sans italic'>
                    <div className="border-4 border-gray-400 p-4 h-52 w-52 flex flex-col items-center justify-center space-y-3">
                        <p className="text-2xl font-medium">Number 1 : <span className="text-red-600">{num1}</span> </p>
                        <p className="text-2xl font-medium">Number 2 : <span className="text-red-600">{num2}</span> </p>
                        <button className="bg-blue-500 text-white text-xl h-10 w-16 rounded italic hover:bg-pink-600" onClick={handleAddition}>Add</button>
                    </div>
                    {buttonClicked && <div class="border-4 border-gray-400 p-5 h-60 w-56 flex flex-col items-center justify-center space-y-3">
                        {result && (
                            <>
                                {carries.length > 0 && <p className="text-2xl font-medium">Carry: <span className="text-indigo-700">{carries.join(", ")}</span></p>}
                                <p className="text-2xl font-medium">Number 1 : <span className="text-red-600">{num1}</span> </p>
                                <p className="text-2xl font-medium">Number 2 : <span className="text-red-600">{num2}</span> </p>
                                {result && <p className="text-2xl font-medium">Result: <span className="text-blue-600">{result}</span></p>}
                                <button className="bg-pink-500 text-white text-xl h-14 w-40 rounded hover:bg-gray-600 italic" onClick={handleNewNumbers}>New Numbers</button>
                            </>
                        )}
                    </div>}
                </div>
            </div>
        </>
    );
}

export default Add;