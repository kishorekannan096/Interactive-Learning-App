import React, { useState, createContext, useEffect } from "react";
import '../../App.css';
import Board from "../Wordle/Board";
import Keyboard from "../Wordle/Keyboard";
import { boardDefault, generateWordSet } from "../Wordle/Words";
import GameOver from "../Wordle/GameOver";

export const AppContext = createContext();

function Main() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.trim().toUpperCase());
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }
    if (currWord.trim().toLowerCase() === correctWord.trim().toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    console.log(currAttempt);
    if (currAttempt.attempt === 4) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="bg-image w-screen h-screen flex flex-col items-center overflow-x-hidden">
      <section className="flex w-full flex-col py-10 space-y-12 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">Guess the Word</span>
      </section>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="flex justify-center items-center h-4/5 w-4/5 pl-4 bg-slate-100 border-4 border-yellow-400">
            <Board />
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
      </AppContext.Provider>
    </div>
  );
}

export default Main;
