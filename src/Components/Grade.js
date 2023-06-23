import '../App.css';
import astronaut from '../images/astronat.png';
import Footer from './Footer.js';
import {useNavigate} from 'react-router-dom';

function Grade() {
  const navigate = useNavigate();
  return (
    <div className="bg-image w-screen overflow-x-hidden h-screen">{/*header*/}
      <section className="flex w-full flex-col py-12 space-y-12 items-center text-center">
        <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        <span className="text-2xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE YOUR GRADE OF LEARNING</span>
      </section>
      <section className="flex items-center space-x-20 pl-28">
        <div className="pt-4 pr-3"> <img className="hover:animate-bounce" src={astronaut} alt="astronaut"/>
        </div>{/*  Astronaut */}
        <div className="flex flex-col items-center justify-center space-y-12">{/*Buttons*/}
          <div className="flex justify-center space-x-14 items-center">
            <button className="w-64 h-16 bg-amber-400 hover:border-4 hover:border-teal-500 rounded-xl font-bold px-6 py-3 text-3xl text-black" value="Grade 1" onClick={() => {navigate(`/choose`)}}>Grade 1</button>
            <button className="w-64 h-16 bg-amber-400 hover:border-4 hover:border-teal-500 rounded-xl font-bold px-6 py-3 text-3xl text-black" value="Grade 2" onClick={() => {navigate(`/choose`)}}>Grade 2</button>
            <button className="w-64 h-16 bg-amber-400 hover:border-4 hover:border-teal-500 rounded-xl font-bold px-6 py-3 text-3xl text-black" value="Grade 3" onClick={() => {navigate(`/choose`)}}>Grade 3</button>
          </div>
          <div className="flex items-center justify-center space-x-14">
            <button className="w-64 h-16 bg-amber-400 hover:border-4 hover:border-teal-500 rounded-xl font-bold px-6 py-3 text-3xl text-black" value="Grade 4" onClick={() => {navigate(`/choose`)}}>Grade 4</button>
            <button className="w-64 h-16 bg-amber-400 hover:border-4 hover:border-teal-500 rounded-xl font-bold px-6 py-3 text-3xl text-black" value="Grade 5" onClick={() => {navigate(`/choose`)}}>Grade 5</button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Grade;