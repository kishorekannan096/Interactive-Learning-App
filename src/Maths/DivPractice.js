import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../App.css';
import correctGif from '../images/good.gif';
import wrongGif from '../images/try.gif';

function DivPractice() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [quotient, setQuotient] = useState("");
  const [remainder, setRemainder] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const intervalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); // add the useNavigate hook

  const handleAnswer = (event) => {
    event.preventDefault();
    clearInterval(intervalRef.current);
    let remaining = num1;
    let divisor = num2;
    let quot = 0;

    while (remaining >= divisor) {
      const quotientToAdd = Math.floor(remaining / divisor);
      remaining = remaining - (quotientToAdd * divisor);
      quot += quotientToAdd;
    }

    if (parseInt(quotient) === quot && parseInt(remainder) === remaining) {
      setMessage("Correct!");
      setIsCorrect(true); // Set isCorrect state to true
      setScore(score + 1); // Increment the score
      setAnswerSubmitted(true);
    } else {
      setMessage(`Sorry, Try again. The correct answer was Quotient is ${quot} and Remainder is ${remaining}`);
      setIsCorrect(false); // Set isCorrect state to false
      setWrongAnswers(wrongAnswers + 1); // Increment the number of wrong answers
      setAnswerSubmitted(true);
      if (wrongAnswers >= 5) {
        navigate('/Loading', { state: { from: location.pathname } }); // Navigate to "/Loading" if the number of wrong answers is more than 4 times
      }
    }
    setQuestionsAnswered(questionsAnswered + 1);
    setTimeout(() => {
      handleNewNumbers();
    }, 3000); // wait 3 seconds before resetting the numbers
  };

  const handleNewNumbers = () => {

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
    setQuotient("");
    setRemainder("");
    setMessage("");
    setIsCorrect(false); // Reset isCorrect state to false
    setTimeLeft(60); // Reset the timer to 60 seconds
    setAnswerSubmitted(false);
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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setMessage(`Time's up! The correct answer was ${num1 / num2}.`);
      setIsCorrect(false);
      setTimeLeft(60);
      setQuestionsAnswered(questionsAnswered + 1);
      handleNewNumbers();
    }
  }, [num1, num2, questionsAnswered, timeLeft]);

  const handleFinish = () => {
    setShowScore(true);
    setAnswerSubmitted(null);
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <div className="bg-image w-screen h-screen flex flex-col items-center">
        <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">DIVISION PRACTICE</span>
        </section>
        <div className="flex flex-col items-center justify-center h-4/5 w-4/5 bg-slate-100 border-4 border-amber-400 font-sans italic -mt-4">
          {answerSubmitted === false &&
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-3xl font-bold">What is the result of division of <span className="text-orange-600">{num1}</span> and <span className="text-orange-600">{num2}</span>?</p>
              <p className="text-2xl font-semibold">Time left: <span className="text-red-600">{timeLeft} seconds</span></p>
              <form className='flex flex-col items-center justify-center space-y-5' onSubmit={handleAnswer}>
                <label className="text-2xl font-bold">Quotient : </label>
                <input type="text" className="text-xl font-sans italic w-full py-2 rounded-md bg-gray-300 border-2 border-indigo-500 focus:outline-none pl-16" placeholder="Enter the answer" value={quotient} onChange={(e) => setQuotient(e.target.value)} />
                <label className="text-2xl font-bold">Remainder : </label>
                <input className="text-xl font-sans italic w-full py-2 rounded-md bg-gray-300 border-2 border-indigo-500 focus:outline-none pl-16" placeholder="Enter the answer"  type="text" value={remainder} onChange={(e) => setRemainder(e.target.value)} />
                <button className="h-10 w-28 text-2xl font-semibold italic rounded-sm bg-gradient-to-r from-lime-500 to-green-500 hover:border-2 hover:border-black" type="submit">Submit</button>
              </form>
              {questionsAnswered > 0 && (
                <button className="h-10 w-28 text-2xl font-semibold italic rounded-sm bg-gradient-to-r from-violet-500 to-purple-500 hover:border-2 hover:border-black" onClick={handleFinish}>Finish</button>
              )}
            </div>
          }
          {showScore && (
            <p className="text-4xl font-bold">Your score is: <span className="text-green-600">{score}</span> out of <span className="text-red-600">{questionsAnswered}</span></p>
          )}
          <p className="text-3xl font-semibold bg-gradient-to-r from-green-600 via-green-700 to-green-600 inline-block text-transparent bg-clip-text mb-2">{message}</p>
          {answerSubmitted && isCorrect && <img src={correctGif} alt="Correct" className="mt-4 h-64 w-64" />}
          {answerSubmitted && !isCorrect && <img src={wrongGif} alt="Wrong" className="mt-4 h-64 w-64" />}
        </div>
      </div>
    </>
  );
}

export default DivPractice;