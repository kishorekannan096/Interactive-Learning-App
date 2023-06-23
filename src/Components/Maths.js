import '../App.css';
import add from '../images/Addition.png';
import subract from '../images/Subraction.png';
import multiply from '../images/multiplication.png';
import division from '../images/Division.png';
import { useNavigate } from 'react-router-dom';

function Maths () {
  const navigate = useNavigate();
    return (
        <div className="bg-image w-screen h-screen">
          <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
            <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
            <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">MATHS</span>
          </section>
          <section className="flex flex-col items-center space-y-10">
             <div className="flex flex-row h-40 space-x-44">
                <div className="flex flex-row justify-center pt-3 space-x-5 w-96 h-40 rounded-xl border-4 border-amber-400 bg-teal-100 shadow-xl font-bold text-3xl text-black">
                    <img className="h-32 w-32" src={add} alt="addition"/>
                    <div className='pt-10'>
                      <button className='rounded-xl bg-amber-400 w-52 h-12 hover:bg-orange-500' onClick={()=>{navigate(`/AddMain`)}}>ADDITION</button>
                    </div>
                </div>
                <div className="flex flex-row justify-center pt-3 space-x-3 w-96 h-40 rounded-xl border-4 border-amber-400 bg-teal-100 shadow-xl font-bold text-3xl text-black">
                    <img className="h-32 w-32" src={subract} alt="subract"/>
                    <div className='pt-10'>
                      <button className='rounded-xl bg-amber-400 w-52 h-12 hover:bg-orange-500' onClick={()=>{navigate(`/SubMain`)}}>SUBRACTION</button>
                    </div>
                </div>
             </div>
             <div className="flex flex-row h- space-x-44">
                <div className="flex flex-row justify-center pt-3 space-x-7 w-96 h-40 rounded-xl border-4 border-amber-400 bg-teal-100 shadow-xl font-bold text-3xl text-black">
                    <img className="h-32 w-32" src={multiply} alt="multiply"/>
                    <div className='pt-10'>
                       <button className='rounded-xl bg-amber-400 w-40 h-12 hover:bg-orange-500' onClick={()=>{navigate(`/MulMain`)}}>MULTIPLY</button>
                    </div>
                </div>
                <div className="flex flex-row justify-center pt-3 space-x-7 w-96 h-40 rounded-xl border-4 border-amber-400 bg-teal-100 shadow-xl font-bold text-3xl text-black">
                    <img className="h-32 w-32" src={division} alt="division"/>
                    <div className='pt-10'>
                       <button className='rounded-xl bg-amber-400 w-40 h-12 hover:bg-orange-500' onClick={()=>{navigate(`/DivMain`)}}>DIVISION</button>
                    </div>
                </div>
             </div>
          </section>
        </div>
    );
}

export default Maths;