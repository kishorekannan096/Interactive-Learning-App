import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import '../App.css';
import axios from "axios";

const RandomWord = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { speak, voices } = useSpeechSynthesis();

  const Detailkey = 'K9FXjqV8LORr5nbSHEcfWg==nTRRi3RShes9aSyO';

  const getNewWord = () => {
    setIsLoading(true);
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then((response) => {
        setWord(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const GetDefinition = async (word) => {
    await axios.get(`https://api.datamuse.com/words?sp=${word}&md=d`)
      .then(response => {
        const result = response.data[0];
        const definition = result.defs[0];
        setDefinition(definition);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const GetExample = async (word) => {
    setIsLoading(true);
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [result] = response.data;
    let example = '';
    if (result.meanings[0]?.definitions[0]?.example) {
      example = result.meanings[0].definitions[0].example;
    } else {
      for (let i = 0; i < result.meanings[0].definitions.length; i++) {
        const ex = result.meanings[0].definitions[i].example;
        if (ex) {
          example = ex;
          break;
        }
      }
    }
    setExample(example);
    setIsLoading(false);

  };

  const getSynonymsAndAntonyms = async (word) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
        headers: {
          'X-Api-Key': Detailkey
        }
      });
      const synonym = response.data.synonyms.slice(0, 5);
      const antonym = response.data.antonyms.slice(0, 5);
      setSynonyms(synonym);
      setAntonyms(antonym);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //Speaking function
  const handleSpeak = () => {
    const data = `Word, ${word}. Definition, ${definition}`;
    speak({
      text: data,
      voice: voices.find(voice => voice.name === 'Google US English'),
      rate: 0.75,
      volume: 1
    });
  };

  useEffect(() => {
    if (word) {
      GetDefinition(word);
      getSynonymsAndAntonyms(word);
      GetExample(word);
    }
  }, [word]);

  return (
    <>
      <div className="bg-image w-screen h-screen">{/*header*/}
        <section className="flex w-full flex-col py-10 space-y-12 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-3xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">ENGLISH</span>
        </section>
        <div className="flex flex-col w-full items-center content-center justify-center space-y-7">
          <h1 className="text-3xl font-sans italic font-bold text-black">Word of the Day: {word}</h1>
          {word && <div className="h-80 w-4/5 mt-5 bg-slate-100 border-4 border-pink-300 flex flex-col items-center justify-center font-sans italic text-3xl text-violet-700 space-y-3">
            {isLoading && <p>Loading...</p>}
            {word && <div><span className="text-black">Word:</span><span> {word}</span></div>}
            {definition && <div><span className="text-black">Definition:</span><span> {definition}</span></div>}
            {example && <div><span className="text-black">Example:</span><span> {example}</span></div>}
            {synonyms.length > 0 && <div><span className="text-black">Synonyms:</span><span> {synonyms.join(", ")}</span></div>}
            {antonyms.length > 0 && <div><span className="text-black">Antonyms:</span><span> {antonyms.join(", ")}</span></div>}
            <button className="h-10 w-24 text-xl text-black font-sans italic flex items-center justify-center font-bold bg-red-300 hover:border-2 hover:border-black" onClick={handleSpeak}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
              Speak</button>
          </div>}
          <button className="bg-red-300 h-10 w-40 text-2xl font-bold font-sans italic hover:border-2 hover:border-black" onClick={getNewWord}>New Word</button>
        </div>
      </div>
    </>
  );
};

export default RandomWord;
