import '../App.css';
import Footer from '../Components/Footer';
import book from '../images/book.gif';
import words from '../images/words.gif';
import children from '../images/children.gif';
import { useNavigate } from 'react-router-dom';

function EngTopics () {
  const navigate = useNavigate();
    return (
        <div className="bg-image w-screen h-screen overflow-auto">
          <section className="flex w-full flex-col py-14 space-y-14 items-center text-center bg-fixed">
            <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
            <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE TOPIC</span>
          </section>
          <section className="flex flex-col items-center space-y-10 mb-12">
             <div className="flex flex-row h-40 space-x-28">
                <div className="flex flex-row justify-center space-x-5 w-80 h-40 rounded-xl bg-cyan-100 border-4 border-orange-500 shadow-xl font-bold text-3xl text-black cursor-pointer" onClick={()=>{navigate(`/Eng`)}}>
                    <img className="h-40 w-40" src={book} alt="addition"/>
                    <div className='pt-8'>
                      <span className='w-44 h-12 text-3xl'>Search Words</span>
                    </div>
                </div>
                <div className="flex flex-row justify-center pt-3 space-x-3 w-80 h-40 rounded-xl bg-cyan-100 border-4 border-orange-500 shadow-xl font-bold text-3xl cursor-pointer text-black" onClick={()=>{navigate(`/RandomWord`)}}>
                    <img className="h-32 w-32" src={words} alt="subract"/>
                    <div className='pt-6'>
                       <span className='w-44 h-12'>Word of the Day</span>
                    </div>
                </div>
                <div className="flex flex-row justify-center pl-3 space-x-3 w-80 h-40 rounded-xl bg-cyan-100 border-4 border-orange-500 shadow-xl font-bold text-3xl text-black">
                    <img className="h-40 w-36" src={children} alt="subract"/>
                    <div className='pt-10'>
                       <span className='w-44 h-12'>Parts of Speech</span>
                    </div>
                </div>
             </div>
          </section>
          <Footer/>
        </div>
    );
}

export default EngTopics;