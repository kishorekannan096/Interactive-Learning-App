import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';
import '../../App.css';
import axios from 'axios';

function RandomWords() {
  const [pairs, setPairs] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSyn, setCurrentSyn] = useState();
  const [synonymsStatus, setSynonymsStatus] = useState();
  const [message, setMessage] = useState('');
  const [currentSynonymIndex, setCurrentSynonymIndex] = useState(-1);
  const [match, setMatch] = useState(0);
  const [attempt, setAttempt] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [score, setScore] = useState(0);

  async function generateWords() {
    let newWords = randomWords({ exactly: 5 });
    const newPairs = [];
    const newSynonyms = [];
    const newSynonymsStatus = [];
    for (let i = 0; i < newWords.length; i++) {
      const word = newWords[i];
      const response = await axios.get(
        `https://api.datamuse.com/words?rel_syn=${word}`
      );
      let synonym = response.data[0]?.word;
      if (!synonym) {
        newWords = [...newWords.slice(0, i), ...newWords.slice(i + 1), randomWords({ exactly: 1 })[0],
        ];
        i--;
        continue;
      }
      newPairs.push({ word, synonym });
      newSynonyms.push(synonym);
      newSynonymsStatus.push(false);
    }
    // Fisher-Yates shuffle algorithm
    for (let i = newSynonyms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSynonyms[i], newSynonyms[j]] = [newSynonyms[j], newSynonyms[i]];
      [newSynonymsStatus[i], newSynonymsStatus[j]] = [newSynonymsStatus[j],
      newSynonymsStatus[i],
      ];
    }
    setPairs(newPairs);
    setSynonyms(newSynonyms);
    setSynonymsStatus(newSynonymsStatus);
    setMessage('');
    setMatch(0);
    setCurrentIndex();
    setCurrentSynonymIndex();
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
  }, [currentIndex, currentSyn, pairs, synonymsStatus, score, correct, wrong]);

  function handleClick(synonymIndex) {
    const answer = pairs[currentIndex];
    const selectedSynonym = synonyms[synonymIndex];
    if (answer.synonym === selectedSynonym) {
      const newPairs = pairs.map((pair, index) => {
        if (index === currentIndex) {
          return { ...pair, correct: true };
        }
        return pair;
      });
      const newSynonymsStatus = synonymsStatus.map((status, index) => {
        if (index === synonymIndex) {
          return true;
        }
        return status;
      });
      setPairs(newPairs);
      setSynonymsStatus(newSynonymsStatus);
      setMessage('Matched');
      setCorrect(correct + 1);
      setMatch(match + 1);
      setScore(score + 1);
      if (match === 4) {
        document.getElementById("generate-button").click();
      }
    }
    else {
      setMessage("Selected Word and Synonym not matched");
      setAttempt(true);
      if (attempt === true) {
        const newPairs = pairs.map((pair, index) => {
          if (index === currentIndex) {
            return { ...pair, attemptLimit: true };
          }
          return pair;
        });
        console.log(pairs)
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
        <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">Match the Synonyms</span>
      </section>
      <div className='flex flex-col justify-center items-center h-4/5 w-4/5 -mt-3.5 bg-slate-100 border-4 border-amber-400 font-sans italic'>
        <div className='flex flex-col items-center'>
          <p className="mb-4 text-3xl font-bold text-red-600">Synonyms</p>
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
              <p className='text-2xl font-semibold pl-14 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text'>Synonym</p>
              <ul className="list-inside">
                {synonyms.map((synonym, index) => (
                  <li key={index} className="mb-2">
                    <button
                      className={`rounded-sm bg-amber-400 w-48 h-12 text-2xl ${synonymsStatus[index] ? "bg-green-500" : ""}
                        ${index === currentSynonymIndex ? "border-4 border-blue-500" : ""}`}
                      onClick={() => { setCurrentSynonymIndex(index); setCurrentSyn(synonym); handleClick(index); }}
                      disabled={synonymsStatus[index]}>
                      {synonym}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {message !== "" && <p className='text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>{message}</p>}
        {match === 5 ? <><p className='text-2xl font-semibold bg-gradient-to-r from-purple-500 via-red-500 to-pink-500'>Congratulations You have matched all the words</p></> : ""}
        {score !== 0 && <p className='text-2xl font-semibold'>Your score is <span className='text-rose-600'>{correct}</span> out of <span>5</span></p>}
      </div>
      <button id="generate-button" onClick={generateWords} className="text-2xl italic mt-4 py-2 px-4 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded">
        Generate
      </button>
    </div>
  );
}

export default RandomWords;