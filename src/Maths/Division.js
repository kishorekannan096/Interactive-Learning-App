import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Division() {
  const [dividend, setDividend] = useState(0);
  const [divisor, setDivisor] = useState(0);
  const [quotient, setQuotient] = useState(null);
  const [steps, setSteps] = useState([]);
  const [numClicks, setNumClicks] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // add the useNavigate hook

  const handleDivide = () => {
    let remaining = dividend;
    let quotient = 0;
    let stepResults = [];
    setButtonClicked(true);

    while (remaining >= divisor) {
      const quotientToAdd = Math.floor(remaining / divisor);
      remaining = remaining - (quotientToAdd * divisor);
      quotient += quotientToAdd;
      stepResults.push({
        divisor: divisor,
        quotientToAdd: quotientToAdd,
        remaining: remaining
      });
    }

    setQuotient(quotient);
    setSteps(stepResults);
  };

  const handleNewNumbers = () => {
    setNumClicks(numClicks + 1);
    const n1 = Math.floor(Math.random() * 100) + 1;
        const n2 = Math.floor(Math.random() * 100) + 1;
        if (n2 > n1) {
            setDividend(n2);
            setDivisor(n1);
        } else {
            setDividend(n1);
            setDivisor(n2);
        }
    setQuotient(null);
    setSteps([]);
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
      setDividend(n2);
      setDivisor(n1);
    }
    else {
      setDividend(n1);
      setDivisor(n2);
    }
  }, []);

  return (
    <>
      <div className="bg-image w-screen h-screen flex flex-col items-center">
        <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">DIVISION EXAMPLE</span>
        </section>
        <div className='h-3/5 mx-20 w-3/5 rounded-xl border-4 border-amber-400 shadow-xl bg-teal-100 flex items-center justify-center space-x-20 font-sans italic'>
          <div className="border-4 border-gray-400 p-4 h-52 w-52 flex flex-col items-center justify-center space-y-3">
            <p className="text-2xl font-medium">Divide <span className="text-red-600">{dividend}</span> by <span className="text-red-600">{divisor}</span></p>
            <button className="bg-blue-500 text-white text-xl h-10 w-20 rounded italic hover:bg-pink-600" onClick={handleDivide}>Divide</button>
          </div>
          {buttonClicked && <div className="border-4 border-gray-400 p-5 h-80 w-56 flex flex-col items-center justify-center space-y-3 font-medium">
            {quotient !== null && (
              <>
                <p className='text-2xl'>Quotient: <span className="text-blue-600">{quotient}</span></p>
                <p className='text-2xl'>Steps:</p>
                <ul className='text-2xl'>
                  {steps.map((step, index) => (
                    <li key={index}>
                      {dividend} ÷ {step.divisor} = {step.quotientToAdd}
                      <p className='text-red-500'>Note : Use multiplication of {step.divisor}</p>
                    </li>
                  ))}
                  <li>Remainder: <span className='text-blue-600'>{steps[steps.length - 1].remaining}</span></li>
                </ul>
                <button className="bg-pink-500 text-white text-xl h-10 w-40 rounded hover:bg-gray-600 italic -mt-1" onClick={handleNewNumbers}>New Numbers</button>
              </>
            )}
          </div>}
        </div>
      </div>
    </>
  );
}

export default Division;