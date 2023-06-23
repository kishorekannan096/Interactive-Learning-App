import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';
import '../../App.css';
import axios from 'axios';


function RandomWords() {
  const [pairs, setPairs] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSyn, setCurrentSyn] = useState();
  const [antonymsStatus, setAntonymsStatus] = useState();
  const [message, setMessage] = useState('');
  const [currentAntonymIndex, setCurrentAntonymIndex] = useState(-1);
  const [match, setMatch] = useState(0);
  const [attempt, setAttempt] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(0);

  async function generateWords() {
    let newWords = randomWords({ exactly: 5 });
    const newPairs = [];
    const newantonyms = [];
    const newantonymsStatus = [];
    for (let i = 0; i < newWords.length; i++) {
      const word = newWords[i];
      const response = await axios.get(
        `https://api.datamuse.com/words?rel_ant=${word}`
      );
      let antonym = response.data[0]?.word;
      if (!antonym) {
        newWords = [...newWords.slice(0, i), ...newWords.slice(i + 1), randomWords({ exactly: 1 })[0],
        ];
        i--;
        continue;
      }
      newPairs.push({ word, antonym });
      newantonyms.push(antonym);
      newantonymsStatus.push(false);
    }
    // Fisher-Yates shuffle algorithm
    for (let i = newantonyms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newantonyms[i], newantonyms[j]] = [newantonyms[j], newantonyms[i]];
      [newantonymsStatus[i], newantonymsStatus[j]] = [newantonymsStatus[j],
      newantonymsStatus[i],
      ];
    }
    setPairs(newPairs);
    setAntonyms(newantonyms);
    setAntonymsStatus(newantonymsStatus);
    setMessage('');
    setMatch(0);
    setCurrentIndex();
    setCurrentAntonymIndex();
    setScore(0);
    setAttempt(false);
    setCorrect(0);
    setWrong(0);
  }

  useEffect(() =>{
    generateWords();
  },[]);
  
  useEffect(() => {
    console.log(`correct: ${correct}, wrong: ${wrong}, score: ${score}`);
    if (score === 5) {
      document.getElementById("generate-button").click();
    }
  }, [currentIndex, currentSyn, pairs, antonymsStatus, score, correct, wrong]);

  function handleClick(antonymIndex) {
    const answer = pairs[currentIndex];
    const selectedantonym = antonyms[antonymIndex];
    if (answer.antonym === selectedantonym) {
      const newPairs = pairs.map((pair, index) => {
        if (index === currentIndex) {
          return { ...pair, correct: true };
        }
        return pair;
      });
      const newantonymsStatus = antonymsStatus.map((status, index) => {
        if (index === antonymIndex) {
          return true;
        }
        return status;
      });
      setPairs(newPairs);
      setAntonymsStatus(newantonymsStatus);
      setMessage('Matched');
      setCorrect(correct + 1);
      setMatch(match + 1);
      setScore(score + 1);
      if (match === 4) {
        document.getElementById("generate-button").click();
      }
    }
    else {
      setMessage("Selected Word and antonym not matched");
      setAttempt(true);
      if (attempt === true) {
        const newPairs = pairs.map((pair, index) => {
          if (index === currentIndex) {
            return { ...pair, attemptLimit: true };
          }
          return pair;
        });
        setPairs(newPairs);
        setWrong(wrong + 1);
        setScore(score + 1);
      }
    }
  }

  return (
    <div className="bg-image w-screen h-screen flex flex-col items-center overflow-auto">
      <section className="flex w-full flex-col py-10 space-y-8 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">Match the Antonyms</span>
      </section>
      <div className='flex flex-col justify-center items-center h-4/5 w-4/5 -mt-3.5 bg-slate-100 border-4 border-amber-400 font-sans italic'>
        <div className="flex flex-col items-center">
          <p className="mb-4 text-3xl font-bold text-red-600">Antonyms</p>
          <div className='flex flex-row px-4 space-x-12 text-xl font-semibold'>
            <div className='space-y-4'>
              <p className='text-2xl font-semibold pl-16 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>Words</p>
              <ul className="list-inside">
                {pairs.map((pair, index) => (
                  <li key={index} className="mb-2">
                    {/* {console.log(index,pair)} */}
                    <button
                      className={`rounded-sm bg-amber-400 w-48 h-12 text-2xl ${pair.correct ? "bg-green-500" : ""} 
                         ${index === currentIndex || pair.attemptLimit === false ? "border-4 border-blue-500" : ""} ${pair.attemptLimit === true ? "bg-red-500" : ""}`}
                      onClick={() => setCurrentIndex(index)}
                      disabled={pair.correct || pair.attemptLimit}>
                      {pair.word}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='space-y-4'>
              <p className='text-2xl font-semibold pl-12 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>Antonym</p>
              <ul className="list-inside">
                {antonyms.map((antonym, index) => (
                  <li key={index} className="mb-2">
                    <button
                      className={`rounded-sm bg-amber-400 w-48 h-12 text-2xl ${antonymsStatus[index] ? "bg-green-500" : ""}
                        ${index === currentAntonymIndex ? "border-4 border-blue-500" : ""}`}
                      onClick={() => { setCurrentAntonymIndex(index); setCurrentSyn(antonym); handleClick(index); }}
                      disabled={antonymsStatus[index]}>
                      {antonym}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {message !== "" && <p className='text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>{message}</p>}
        {match === 5 ? <><p className='text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-red-500 to-pink-500 text-transparent bg-clip-text'>Congratulations You have matched all the words</p></> : ""}
        {score !== 0 && <p className='text-2xl font-semibold'>Your score is <span className='text-rose-600'>{correct}</span> out of <span>5</span></p>}
      </div>
      <button id="generate-button" onClick={generateWords} className="text-2xl italic mt-4 py-2 px-4 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded">
        Generate
      </button>
    </div>
  );
}

export default RandomWords;