import React from "react";
import Letter from "../Wordle/Letter";

function Board() {
  return (
    <div className="flex flex-col justify-center items-center h-4/5 w-2/3 bg-gray-300 border-2 border-black">
      <div className="flex flex-row justify-center items-center h-40 w-5/6 p-2">
        <Letter letterPos={0} attemptVal={0} />
        <Letter letterPos={1} attemptVal={0} />
        <Letter letterPos={2} attemptVal={0} />
        <Letter letterPos={3} attemptVal={0} />
        <Letter letterPos={4} attemptVal={0} />
      </div>
      <div className="flex flex-row justify-center items-center h-40 w-5/6 p-2">
        <Letter letterPos={0} attemptVal={1} />
        <Letter letterPos={1} attemptVal={1} />
        <Letter letterPos={2} attemptVal={1} />
        <Letter letterPos={3} attemptVal={1} />
        <Letter letterPos={4} attemptVal={1} />
      </div>
      <div className="flex flex-row justify-center items-center h-40 w-5/6 p-2">
        <Letter letterPos={0} attemptVal={2} />
        <Letter letterPos={1} attemptVal={2} />
        <Letter letterPos={2} attemptVal={2} />
        <Letter letterPos={3} attemptVal={2} />
        <Letter letterPos={4} attemptVal={2} />
      </div>
      <div className="flex flex-row justify-center items-center h-40 w-5/6 p-2">
        <Letter letterPos={0} attemptVal={3} />
        <Letter letterPos={1} attemptVal={3} />
        <Letter letterPos={2} attemptVal={3} />
        <Letter letterPos={3} attemptVal={3} />
        <Letter letterPos={4} attemptVal={3} />
      </div>
      <div className="flex flex-row justify-center items-center h-40 w-5/6 p-2">
        <Letter letterPos={0} attemptVal={4} />
        <Letter letterPos={1} attemptVal={4} />
        <Letter letterPos={2} attemptVal={4} />
        <Letter letterPos={3} attemptVal={4} />
        <Letter letterPos={4} attemptVal={4} />
      </div>
    </div>
  );
}

export default Board;
