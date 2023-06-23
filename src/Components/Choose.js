import '../App.css';
import study from '../images/study.gif';
import puzzle from '../images/puzzle.gif';
import astronaut from '../images/astronat.png';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Choice () {
  const navigate = useNavigate();
  return (
    <div className="bg-image w-screen h-screen">{/* Header */}
      <section className="flex w-full flex-col py-12 space-y-12 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-2xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE WHAT DO YOU LIKE TO DO TODAY</span>
      </section>  
      <section className="flex flex-row pl-44" >
        <div className="pt-3 pr-28"> <img className="hover:animate-bounce" src={astronaut} alt="astronaut"/>
        </div>
        <div className="flex flex-row space-x-44">
          {/* Learning */}
            <div className="group h-60 w-64 [perspective:1000px]">
              <div className="relative h-full w-full rounded-lg shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img className="h-full w-full rounded-xl border-4 border-amber-400 object-cover shadow-xl shadow-black/40" src={study} alt="study" />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl border-4 border-amber-400 bg-black/80 px-12 text-center text-slate-50 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col items-center justify-center cursor-pointer" onClick={()=>{navigate(`/subject`)}}>
                  <h1 className="text-3xl border-4 border-orange-600 font-bold">LEARNING</h1>
                </div>
                </div>
              </div>      
            </div>{/* Learning End */}
            {/* Games */}
            <div className="group h-60 w-64 [perspective:1000px]">
              <div className="relative h-full w-full rounded-lg shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img className="h-full w-full rounded-xl border-4 border-amber-400 object-cover shadow-xl shadow-black/40" src={puzzle} alt="study" />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl border-4 border-amber-400 bg-black/80 px-12 text-center text-slate-50 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="flex min-h-full flex-col items-center justify-center" onClick={()=>{navigate(`/games`)}}>
                  <h1 className="text-3xl border-4 border-orange-600 font-bold cursor-pointer">GAMES</h1>
                </div>
                </div>
              </div>      
            </div>{/* Games End */}
          </div>
      </section> 
      <Footer/>
    </div>
  );
}

export default Choice;