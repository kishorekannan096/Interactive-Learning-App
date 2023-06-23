import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Thirukkural() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [verse, setVerse] = useState({});

  const fetchVerse = async (kuralNumber) => {
    const response = await axios.get(`https://api-thirukkural.vercel.app/api?num=${kuralNumber}`);
    const verseData = response.data;
    setVerse(verseData);
  }

  useEffect(() => {
    fetchVerse(currentVerse);
  }, [currentVerse]);

  const handleNextKural = () => {
    const nextVerse = currentVerse + 1;

    if (nextVerse % 10 === 1) {
      setCurrentChapter(currentChapter + 1);
    }

    if (nextVerse > 1330) {
      setCurrentChapter(1);
      setCurrentVerse(1);
      fetchVerse(1);
      return;
    }

    setCurrentVerse(nextVerse);
    fetchVerse(nextVerse);
  };



  const handleNextChapter = () => {
    const nextChapter = currentChapter + 1;
    const nextKural = (nextChapter - 1) * 10 + 1;
    if (nextChapter <= 133) {
      setCurrentChapter(nextChapter);
      setCurrentVerse(nextKural);
      fetchVerse(nextKural);
    }
    else {
      setCurrentChapter(1);
      setCurrentVerse(1);
      fetchVerse(1);
    }
  }


  return (
    <>
      <div className="bg-image w-screen h-screen">{/*header*/}
        <section className="flex w-full flex-col py-12 space-y-14 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">THIRUKKURAL</span>
        </section>
        <div className='flex flex-col items-center justify-center space-y-8'>
          <div className="h-96 w-11/12 border-2 border-blue-800 bg-emerald-500 shadow-inner shadow-blue-400 font-semibold flex flex-col items-center justify-center space-y-4 text-2xl font-sans text-justify">
            {verse.sect_tam && verse.chapgrp_tam && <div className='flex flex-row space-x-14'><p> பால் : <span className='text-gray-50'>{verse.sect_tam}</span> </p> <p>இயல் : <span className='text-cyan-50'>{verse.chapgrp_tam}</span></p></div>}
            {verse.chap_tam && <div className='flex flex-row space-x-5'><p>அதிகாரம்  எண் : <span className='text-cyan-50'>{currentChapter}</span></p> <p>அதிகாரம் : <span className='text-cyan-50'>{verse.chap_tam}</span></p></div>}
            {<p>குறள் எண் : <span className='text-cyan-50'>{currentVerse}</span></p>}
            {verse.line1 &&
              <div>
                <p>குறள் : <span className='text-yellow-300 font-semibold'> {verse.line1}</span></p>
              </div>}
            {verse.line2 && <p className='text-yellow-300 font-semibold'> {verse.line2} </p>}
            {verse.tam_exp && <p>விளக்கம் : <span className='text-cyan-50'>{verse.tam_exp} </span> </p>}
          </div>
          <div className='space-x-28'>
            <button className='h-12 w-48 rounded-md bg-yellow-400 shadow-md shadow-violet-400 hover:border-2 hover:border-black text-2xl font-sans font-semibold' onClick={handleNextKural}>அடுத்த குறள்</button>
            <button className='h-12 w-64 rounded-md bg-yellow-400 shadow-md shadow-violet-400 hover:border-2 hover:border-black text-2xl font-sans font-semibold'onClick={handleNextChapter}>அடுத்த அதிகாரம்</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Thirukkural;
