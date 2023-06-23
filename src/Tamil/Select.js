import React from 'react';
import '../App.css';
import Footer from '../Components/Footer';
import Tamil from '../images/Tamil.png';
import valluvar from '../images/valluvar.jpg';
import { useNavigate } from 'react-router-dom';

function Select() {
    const navigate = useNavigate();
    return (
        <div className="bg-image w-screen h-screen">
          <section className="flex w-full flex-col py-14 space-y-14 items-center text-center bg-fixed">
            <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
            <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE TOPIC</span>
          </section>
          <section className="flex flex-col items-center space-y-11 mb-12">
             <div className="flex flex-row h-40 space-x-28">
                <div className="flex flex-row justify-center items-center pl-3 space-x-5 w-80 h-40 rounded-xl bg-cyan-100 border-4 border-orange-500 shadow-xl font-bold text-3xl text-black cursor-pointer" onClick={()=>{navigate(`/TamilWords`)}}>
                    <img className="-mt-3 h-20 w-28" src={Tamil} alt="addition"/>
                    <div className='-mt-3'>
                      <span>தமிழ் அகராதி</span>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center pl-2 w-80 h-40 rounded-xl bg-cyan-100 border-4 border-orange-500 shadow-xl font-bold text-3xl cursor-pointer text-black" onClick={()=>{navigate(`/Thirukkural`)}}>
                    <img className="h-32 w-32" src={valluvar} alt="subract"/>
                    <div className='-mt-3'>
                       <span>திருக்குறள்</span>
                    </div>
                </div>
             </div>   
           </section> 
           <Footer />    
        </div>
    );        
}
export default Select;