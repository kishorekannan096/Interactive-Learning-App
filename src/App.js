import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Choose from "./Components/Choose";
import Subject from './Components/Subject';
import Grade from "./Components/Grade";
import Maths from "./Components/Maths";
// import Animals from "./Components/Animals";
import Games from "./Components/Games";
import EngTopics from "./English/EngTopics";
//English
import English from './English/English';
import RandomWord from './English/RandomWord';
//Tamil
import TamilTopics from './Tamil/Select';
import TamilWords from './Tamil/TamilWords';
import Thirukkural from './Tamil/Thirukkural';
// Maths imports
import Loading from './Maths/Loading';
import AddMain from './Maths/AddMain';
import Addition from './Maths/Addition';
import AddPractice from './Maths/AddPractice';
import SubMain from './Maths/SubMain';
import Subract from './Maths/Subract';
import SubPractice from './Maths/SubPractice.js';
import MulMain from './Maths/MulMain';
import Multiplication from './Maths/Multiplication';
import MulPractice from './Maths/MulPractice';
import DivMain from './Maths/DivMain';
import Division from './Maths/Division';
import DivPractice from './Maths/DivPractice';
// Games
import Drag from './Games/Drag';
import SynonymMatch from './Games/Match/SynonymMatch';
import AntonymMatch from './Games/Match/AntonymMatch';
import Wordle from './Games/Wordle/Main';
import MathsQuiz from "./Games/MathsGame/MathsQuiz";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Grade />} />
          <Route exact path="/choose" element={<Choose />} />
          <Route exact path="/subject" element={<Subject />} />
          <Route exact path="/games" element={<Games />} />
          <Route exact path="/maths" element={<Maths />} />
          {/* English */}
          <Route exact path="/english" element={<EngTopics />} />
          <Route exact path="/Eng" element={<English />} />
          <Route exact path="/RandomWord" element={<RandomWord />} />
          {/* <Route exact path="/animals" element={<Animals />} /> */}
          {/* Tamil */}
          <Route exact path="/TamilTopics" element={<TamilTopics />} />
          <Route exact path="/TamilWords" element={<TamilWords />} />
          <Route exact path="/Thirukkural" element={<Thirukkural />} />
          {/* Loading Page in Maths */}
          <Route exact path="/Loading" element={<Loading />} />
          {/* Addition */}
          <Route exact path="/AddMain" element={<AddMain />} />
          <Route exact path="/Add" element={<Addition />} />
          <Route exact path="/AddPrac" element={<AddPractice />} />
          {/* Subraction */}
          <Route exact path="/SubMain" element={<SubMain />} />
          <Route exact path="/Sub" element={<Subract />} />
          <Route exact path="/SubPrac" element={<SubPractice />} />
          {/* Multiplication */}
          <Route exact path="/MulMain" element={<MulMain />} />
          <Route exact path="/Mul" element={<Multiplication />} />
          <Route exact path="/MulPrac" element={<MulPractice />} />
          {/* Division */}
          <Route exact path="/DivMain" element={<DivMain />} />
          <Route exact path="/Div" element={<Division />} />
          <Route exact path="/DivPrac" element={<DivPractice />} />
          {/* Games */}
          <Route exact path="/Drag" element={<Drag />} />
          <Route exact path="/Synonym" element={<SynonymMatch />} />
          <Route exact path="/Antonym" element={<AntonymMatch />} />
          <Route exact path="/Wordle" element={<Wordle/>} />
          <Route exact path="/MathsQuiz" element={<MathsQuiz/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;