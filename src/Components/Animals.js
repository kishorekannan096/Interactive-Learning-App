import React from 'react';
import '../App.css';

function Animals() {
    return (
        <div className="bg-image w-screen h-screen">
          <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
            <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
            <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">CHOOSE SUBJECT TO LEARN</span>
          </section>
          <section>
             <div className="h-96 mx-20 rounded-xl border-4 border-amber-400 shadow-xl bg-slate-400">

             </div>
          </section>
        </div>
    );
}

export default Animals;