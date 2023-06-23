import React, { useState, useEffect, useRef } from "react";
import MathsQuestion from './MathsQuiz.json';
import '../../App.css';
import correctGif from '../../images/good.gif';
import wrongGif from '../../images/try.gif';

function MathsQuiz() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionsAttended, setQuestionsAttended] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const intervalRef = useRef(null);

  function Question() {
    const randomIndex = Math.floor(Math.random() * MathsQuestion.questions.length);
    setQuestion(MathsQuestion.questions[randomIndex].question);
    setCorrectAnswer(MathsQuestion.questions[randomIndex].answer);
    setFeedback("");
    setAnswer("");
    setTimeLeft(60);
    setIsCorrect(false);
    setAnswerSubmitted(false);
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MathsQuestion.questions.length);
    setQuestion(MathsQuestion.questions[randomIndex].question);
    setCorrectAnswer(MathsQuestion.questions[randomIndex].answer);
    setTimeLeft(60);
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
      setFeedback("Time's up! The correct answer was: " + correctAnswer);
      setQuestionsAttended(questionsAttended + 1);
      setTimeLeft(60);
      setTimeout(() => {
        Question();
      }, 3000); // wait 3 seconds before resetting the quiz
    }
  }, [timeLeft, correctAnswer, questionsAttended]);

  function handleAnswerChange(event) {
    setAnswer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearInterval(intervalRef.current);
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setQuestionsAttended(questionsAttended + 1);
      setCorrect(correct + 1);
      setAnswerSubmitted(true);
      setIsCorrect(true);
      setFeedback("Correct! Great Keep going ... ");
      setTimeout(() => {
        Question();
      }, 2500); // wait 3 seconds before resetting the quiz
    } else {
      setFeedback("Incorrect.The correct answer was: " + correctAnswer);
      setQuestionsAttended(questionsAttended + 1);
      setAnswerSubmitted(true);
      setTimeout(() => {
        Question();
      }, 2500); // wait 3 seconds before resetting the quiz
    }
  }

  function finishQuiz() {
    setQuizFinished(true);
    setQuestion(null);
    setCorrectAnswer(null);
    setAnswerSubmitted(null);
    setTimeLeft(null);
    clearInterval(intervalRef.current);
  }

  return (
    <div className="bg-image w-screen h-screen flex flex-col items-center">
      <section className="flex w-full flex-col py-10 space-y-12 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-2xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">MATHS QUIZ</span>
      </section>
      <div className="flex flex-col items-center justify-center h-3/5 w-4/5 bg-slate-100 border-4 border-amber-400 font-sans italic">
        {answerSubmitted === false &&
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-3xl font-bold">{question}</p>
            {timeLeft !== null && <p className="text-2xl font-semibold">Time left: <span className="text-red-600">{timeLeft} seconds</span></p>}
            <form className='flex flex-col items-center justify-center space-y-5' onSubmit={handleSubmit}>
              <label className="text-2xl font-bold">Answer:</label>
              <input type="text" className="text-xl font-sans italic w-full py-2 rounded-md bg-gray-300 border-2 border-indigo-500 focus:outline-none pl-16" placeholder="Enter the answer" value={answer} onChange={handleAnswerChange} />
              <button className="h-10 w-28 text-2xl font-semibold italic rounded-sm bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-2 hover:border-black" type="submit">Submit</button>
            </form>
            {!quizFinished && (
              <div className="-mb-1">
                <button className="h-10 w-28 text-2xl font-semibold italic rounded-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:border-2 hover:border-black" onClick={finishQuiz}>Finish</button>
              </div>
            )}
          </div>}
        {quizFinished && (
          <div>
            <p className="text-4xl font-bold">Score: <span className="text-green-600">{correct}</span> out of <span className="text-red-600">{questionsAttended}</span></p>
          </div>
        )}
        <p className="text-3xl font-semibold bg-gradient-to-r from-green-600 via-green-700 to-green-600 inline-block text-transparent bg-clip-text mb-2">{feedback}</p>
        {answerSubmitted && isCorrect && <img src={correctGif} alt="Correct" className="mt-4 h-64 w-64" />}
        {answerSubmitted && !isCorrect && <img src={wrongGif} alt="Wrong" className="mt-4 h-64 w-64" />}
      </div>
    </div>
  );
}

export default MathsQuiz;