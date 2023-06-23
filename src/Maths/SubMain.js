import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import example from '../images/example.gif';
import practice from '../images/practice.gif';
import Footer from '../Components/Footer';

function SubMain() {
    const navigate = useNavigate();
    return (
        <div className="bg-image w-screen h-screen">
        <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">SUBRACTION</span>
        </section>
        <section className="flex flex-col items-center space-y-10 mt-3 mb-10">
           <div className="flex flex-row h-40 space-x-44">
              <div className="flex flex-row justify-center pt-3 space-x-5 w-96 h-40 rounded-xl border-4 border-amber-400 bg-slate-50 shadow-xl font-bold text-3xl text-black">
                  <img className="h-32 w-32" src={example} alt="addition"/>
                  <div className='pt-10'>
                    <button className='rounded-xl bg-amber-400 w-44 h-12' onClick={()=>{navigate(`/Sub`)}}>EXAMPLE</button>
                  </div>
              </div>
              <div className="flex flex-row justify-center pt-3 space-x-5 w-96 h-40 rounded-xl border-4 border-amber-400 bg-slate-50 shadow-xl font-bold text-3xl text-black">
                  <img className="h-32 w-32" src={practice} alt="addition"/>
                  <div className='pt-10'>
                    <button className='rounded-xl bg-amber-400 w-44 h-12' onClick={()=>{navigate(`/SubPrac`)}} >PRACTICE</button>
                  </div>
              </div>
           </div>
        </section>
        <Footer/>
        </div>  
    );
}

export default SubMain;