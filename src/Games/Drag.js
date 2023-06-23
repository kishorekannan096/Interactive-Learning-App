import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';
import axios from 'axios';
import '../App.css';
import correctGif from '../images/good.gif';
import wrongGif from '../images/try.gif';


function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function Drag() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [shuffledLetters, setShuffledLetters] = useState([]);
    const [shuffledword, setShuffledWord] = useState('');
    const [answer, setAnswer] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const [message, setMessage] = useState('');
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    function generateNewWord() {
        let randomWord = '';
        while (randomWord.length < 3 || randomWord.length > 5) {
            randomWord = randomWords();
        }
        const letters = randomWord.split('').map((letter, index) => ({
            value: letter,
            position: index
        }));
        const shuffled = shuffle(letters);
        const shuflet = shuffle(letters).map(letter => letter.value);
        setShuffledWord(shuflet);
        setWord(randomWord);
        setShuffledLetters(shuffled);
        setAnswer(letters);
        setIsCorrect(false);
        setRemainingTime(60);
        setAnswerSubmitted(false);
        setMessage("");
        GetDefinition(word);
        if (word) {
            axios.get(`https://api.datamuse.com/words?sp=${word}&md=d`)
                .then(response => {
                    const result = response.data[0];
                    const definition = result.defs[0];
                    setDefinition(definition);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const GetDefinition = async (word) => {
        await axios.get(`https://api.datamuse.com/words?sp=${word}&md=d`)
            .then(response => {
                const result = response.data[0];
                const definition = result.defs[0];
                setDefinition(definition);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        generateNewWord();
    }, []);

    useEffect(() => {
        if (word) {
            GetDefinition(word);
        }
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            setMessage(`Times Up!. The correct word was "${word}".`);
            setTimeout(() => {
                generateNewWord();
            }, 2500); // Wait for 2.5 seconds before generating new word
        }
    }, [remainingTime, word]);

    function handleDragStart(e, index) {
        e.dataTransfer.setData('text/plain', index);
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.4';
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e, targetIndex) {
        e.preventDefault();
        const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
        const newShuffledLetters = [...shuffledLetters];
        const sourceLetter = newShuffledLetters[sourceIndex];
        newShuffledLetters[sourceIndex] = { ...newShuffledLetters[targetIndex], position: sourceIndex };
        newShuffledLetters[targetIndex] = { ...sourceLetter, position: targetIndex };
        setShuffledLetters(newShuffledLetters);
        setAnswer(newShuffledLetters);
    }

    function handleSubmit() {
        const guessedWord = answer.map(letter => letter.value).join('');
        const isCorrectGuess = guessedWord === word;
        setIsCorrect(isCorrectGuess);
        if (isCorrectGuess) {
            setMessage("Correct! You have found the word");
            setTimeout(() => {
                generateNewWord();
            }, 2500); // Wait for 2.5 seconds before generating new word
        }
        else {
            setMessage(`Sorry, the correct word was "${word}". Try again!`);
            setTimeout(() => {
                generateNewWord();
            }, 2500); // Wait for 2.5 seconds before generating new word
        }
        setAnswerSubmitted(true);
    }

    return (
        <div className="bg-image w-screen h-screen flex flex-col items-center">
            <section className="flex w-full flex-col py-10 space-y-12 items-center text-center">
                <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
                <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">Unscramble the Word</span>
            </section>
            <div className='flex flex-col justify-center items-center h-4/5 w-4/5 bg-slate-100 border-4 border-amber-400 font-sans italic'>
                <p className="text-4xl font-semibold mb-2">Rearrange the letters to find the correct word</p>
                {answerSubmitted === false &&
                    <div className='flex flex-col items-center justify-center'>
                        <div className="text-center mb-5 space-y-5">
                            <p className="text-5xl font-bold">{shuffledword}</p>
                            <p className='text-3xl'>Hint : <span>{definition}</span></p>
                            <p className="text-2xl mt-4 font-bold text-indigo-600">Time left: <span className='text-red-500'>{remainingTime}</span> seconds</p>
                        </div>
                        <div className="flex">
                            {shuffledLetters.map((letter, index) => (
                                <div
                                    key={index}
                                    id={`box-${index}`}
                                    className="w-16 h-16 bg-yellow-300 border-2 border-black text-xl flex justify-center items-center mr-7 cursor-pointer"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                >
                                    <span className="text-4xl font-bold">{letter.value}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold italic py-2 px-4 rounded mt-8"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>}
                {message !== "" && <p className="text-3xl font-semibold text-red-500 mt-4">{message}</p>}
                {answerSubmitted && isCorrect && <img src={correctGif} alt="Correct" className="mt-4 h-64 w-64" />}
                {answerSubmitted && !isCorrect && <img src={wrongGif} alt="Wrong" className="mt-4 h-64 w-64" />}
            </div>
        </div>
    );
}

export default Drag;