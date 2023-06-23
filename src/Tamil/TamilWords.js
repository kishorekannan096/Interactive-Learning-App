import tamilWords from './Tamil.json';
import '../App.css';
// import { getAudioUrl } from 'google-tts-api';
import { useState } from 'react';

function TamilWords() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [tamilText, setTamilText] = useState('');

  function handleClick() {
    if (currentIndex < 50) {
      setCurrentIndex(currentIndex + 1);
    }
    else {
      setCurrentIndex(0);
    }
    console.log(currentIndex);
  }

  // const handleTextToSpeech = async () => {
  //   const url = getAudioUrl(tamilText, {
  //     lang: 'ta',
  //     slow: false,
  //     host: 'https://translate.google.com',
  //   });
  //   console.log(url);
  //   // const audio = new Audio(url);
  //   // console.log(audio);
  //   // audio.addEventListener('canplaythrough', () => {
  //   //   audio.play();
  //   // });
  // }

  // useEffect(() => {
  //   setTamilText(tamilWords.words[currentIndex].word);
  // }, [currentIndex])


  return (
    <>
      <div className="bg-image w-screen h-screen">{/*header*/}
        <section className="flex w-full flex-col py-14 space-y-14 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">தமிழ் அகராதி</span>
        </section>
        <div className='flex flex-col items-center justify-center space-y-10'>
          <div className="h-72 w-4/5 border-4 border-yellow-400 bg-emerald-500 shadow-lg shadow-orange-300 outline outline-offset-0 outline-zinc-600 flex flex-col items-center justify-center space-y-5 font-sans "> 
            <h2 className='text-3xl'>வார்த்தை : <span className='text-gray-50'> {tamilWords.words[currentIndex].word}</span></h2>
            <h2 className='text-3xl'>விளக்கம் : <span className='text-gray-50 text-center'> {tamilWords.words[currentIndex].meaning}</span></h2>
            {/* <button onClick={handleTextToSpeech}>Convert to Speech</button> */}
          </div>
          <button className='h-12 w-1/6 rounded-md bg-yellow-400 shadow-md shadow-violet-400 hover:border-2 hover:border-black text-2xl font-sans font-semibold' onClick={handleClick}>அடுத்த வார்த்தை</button>
        </div>
      </div>
    </>
  );
}

export default TamilWords;