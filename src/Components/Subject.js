import '../App.css';
import astronaut from '../images/astronat.png';
import english from '../images/english.gif';
import tamil from '../images/tamil.gif';
import maths from '../images/maths.gif';
import Footer from './Footer.js';
import { useNavigate } from 'react-router-dom';

function Subject() {
  const navigate = useNavigate();
  return (
    <div className="bg-image w-screen h-screen">{/*header*/}
      <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE SUBJECT TO LEARN</span>
      </section>
      <section className="flex items-center space-x-20 pl-36 mb-1">
        <div className="pt pr-3"> <img className="hover:animate-bounce h-52" src={astronaut} alt="astronaut"/>
        </div>{/*  Astronaut */}
        <div className="flex flex-col items-center space-y-9">{/*Buttons*/}
          <div className="flex space-x-14 items-center">
            <img className="h-40 w-52 rounded-xl border-4 border-orange-400 object-cover shadow-xl cursor-pointer" src={english} alt="English" onClick={()=>{navigate(`/english`)}}/>
            <img className="h-40 w-52 rounded-xl border-4 border-orange-400 object-cover shadow-xl cursor-pointer" src={tamil} alt="tamil" onClick={()=>{navigate(`/TamilTopics`)}}/>
            <img className="h-40 w-52 rounded-xl border-4 border-orange-400 object-cover shadow-xl cursor-pointer" src={maths} alt="maths" onClick={()=>{navigate(`/maths`)}}/>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Subject;
