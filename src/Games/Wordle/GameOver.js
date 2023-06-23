import React, { useContext } from "react";
import { AppContext } from "../Wordle/Main";

function GameOver() {
  const {
    currAttempt,
    gameOver,
    correctWord,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <p>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </p>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <p>You guessed in {currAttempt.attempt} attempts</p>
      )}
    </div>
  );
}

export default GameOver;
