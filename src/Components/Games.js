import '../App.css';
import WordPuzzle from '../images/WordPuzzle.gif';
import puzzles from '../images/puzzles.gif';
import numbers from '../images/numbers.gif';
import match from '../images/match.gif';
import quiz from '../images/quiz.gif';
import questions from '../images/questions.gif';
import { useNavigate } from 'react-router-dom';

function Games() {
  const navigate = useNavigate();
  return (
    <div className="bg-image w-screen h-screen overflow-auto">
      <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">GAMES</span>
      </section>
      <section className="flex flex-col items-center space-y-12 mb-20">
        <div className="flex flex-row h-40 space-x-44">
          <div className="flex flex-row items-center space-x-4 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-40 w-40" src={WordPuzzle} alt="addition" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='text-2xl'>JUMBLED WORD</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/Drag`) }}>PLAY NOW</button>
            </div>
          </div>
          <div className="flex flex-row items-center pl-5 space-x-8 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-32 w-32" src={questions} alt="subract" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='text-2xl'>WORD GUESS</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/Wordle`) }}>PLAY NOW</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-40 space-x-44">
          <div className="flex flex-row items-center pr-10 space-x-3 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-52 w-52 pr-5 pb-2" src={match} alt="addition" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='text-2xl text-center'>MATCH SYNONYMS</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/Synonym`) }}>PLAY NOW</button>
            </div>
          </div>
          <div className="flex flex-row items-center pl-5 space-x-12 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-32 w-32" src={puzzles} alt="addition" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='pl-3 text-2xl text-center'>MATCH ANTONYMS</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/Antonym`) }}>PLAY NOW</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-40 space-x-44">
          <div className="flex flex-row items-center pl-5 space-x-12 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-32 w-32" src={numbers} alt="addition" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='text-2xl'>MATHS</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/MathsQuiz`) }}>PLAY NOW</button>
            </div>
          </div>
          <div className="flex flex-row items-center pl-5 space-x-12 w-96 h-40 rounded-xl bg-cyan-100 border-4 border-orange-400 shadow-xl font-bold">
            <img className="h-32 w-32" src={quiz} alt="addition" />
            <div className='flex flex-col items-center space-y-3'>
              <span className='text-2xl'>QUIZ TIME</span>
              <button className='rounded-xl bg-amber-400 w-32 h-12 text-xl' onClick={() => { navigate(`/Drag`) }}>PLAY NOW</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Games;