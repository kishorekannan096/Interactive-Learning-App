import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Multiplication() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(null);
    const [multiply, setMultiply] = useState([]);
    const [numClicks, setNumClicks] = useState(0);
    const [buttonClicked, setButtonClicked] = useState(false);

    const location = useLocation();
    const navigate = useNavigate(); // add the useNavigate hook

    const handleMultiply = () => {
        let res = num1 * num2;
        let n2 = num2.toString().split("");
        let mul_result = [];
        let mul = 0;

        setButtonClicked(true);

        // multiplication
        for (let i = 0; i < n2.length; i++) {
            mul = parseInt(n2[i]) * num1;
            mul_result.unshift(mul);
        }
        setResult(res);
        setMultiply(mul_result);
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
        setMultiply([]);
        setButtonClicked(false);

        // navigate to another page after 5 clicks
        if (numClicks + 1 === 5) {
            navigate('/Loading', { state: { from: location.pathname } });
        }
    }

    useEffect(() => {
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 100);
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
            <div className="bg-image w-screen h-screen flex flex-col items-center">
                <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
                    <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
                    <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">MULTIPLICATION</span>
                </section>
                <div className='h-3/5 mx-20 w-3/5 rounded-xl border-4 border-amber-400 shadow-xl bg-teal-100 flex items-center justify-center space-x-20 font-sans italic'>
                    <div className="border-4 border-gray-400 p-4 h-52 w-52 flex flex-col items-center justify-center space-y-3">
                        <p className="text-2xl font-medium">Number 1 : <span className="text-red-600">{num1}</span> </p>
                        <p className="text-2xl font-medium">Number 2 : <span className="text-red-600">{num2}</span> </p>
                        <button className="bg-blue-500 text-white text-xl h-10 w-20 rounded italic hover:bg-pink-600" onClick={handleMultiply}>Multiply</button>
                    </div>
                    {buttonClicked && <div className="border-4 border-gray-400 p-5 h-80 w-56 flex flex-col items-center justify-center space-y-3 font-medium">
                        {result &&
                            <>
                                <p className="text-2xl font-medium">Number 1 : <span className="text-red-600">{num1}</span> </p>
                                <p className="text-2xl font-medium">Number 2 : <span className="text-red-600">{num2}</span> </p>
                                {result && (
                                    <div className='flex flex-col items-center'>
                                        <p className='text-2xl text-blue-800'>Result:</p>
                                        {multiply.map((mul, i) => (
                                            <p className="text-2xl text-pink-800" key={i} >{mul} {multiply.length > 1  && i === multiply.length - 1 && "+"}</p>
                                        ))}
                                        <p>__________________________</p>
                                        <p className="text-2xl text-blue-600 -ml-1">{result}</p>
                                        <p className='-mt-2'>__________________________</p>
                                    </div>
                                )}
                                <button className="bg-pink-500 text-white text-xl h-16 w-40 rounded hover:bg-gray-600 italic -mt-1" onClick={handleNewNumbers}>New Numbers</button>
                            </>
                        }
                    </div>}
                    {multiply.length > 0 && (
                        <p className='text-2xl font-medium'>
                            Multiplication:
                            {multiply
                                .map((mul, i) => (
                                    <p key={i}>
                                        {num1} x {num2.toString().split("").reverse().join("")[i]} = {mul}
                                    </p>
                                ))}
                        </p>
                    )}
                </div>
            </div>
        </>
    );

}

export default Multiplication;