import React, { useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import '../App.css';
import axios from "axios";

function English() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const { speak, voices } = useSpeechSynthesis();
  const Detailkey = 'K9FXjqV8LORr5nbSHEcfWg==nTRRi3RShes9aSyO';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const [result] = response.data;

    setDefinition(result.meanings[0].definitions[0].definition);
    setExample(result.meanings[0].definitions[0].example);
    console.log(example)
    // Check if example is empty and iterate through the definitions to find the first non-empty example
    if (!example) {
      for (let i = 0; i < result.meanings[0].definitions.length; i++) {
        const example = result.meanings[0].definitions[i].example;
        if (example) {
          setExample(example);
          console.log(example)
          break;
        }
      }
    }
    Synonym(word);
  };

  const Synonym = async (word) => {
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
        headers: {
          'X-Api-Key': Detailkey
        }
      });
      // handle the API response here
      console.log(response)
      const synonym = response.data.synonyms.slice(0, 5);
      const antonym = response.data.antonyms.slice(0, 5);
      setSynonyms(synonym);
      setAntonyms(antonym);
      console.log(synonyms)
      console.log(antonyms)
    } catch (error) {
      console.log(error);
    }
  };

  //Speaking function
  const handleSpeak = () => {
    const data = `Word, ${word}. Definition, ${definition}. Example, ${example}`;
    speak({
      text: data,
      voice: voices.find(voice => voice.name === 'Google US English'),
      rate: 0.75,
      volume: 1
    });
  };

  return (
    <>
      <div className="bg-image w-screen h-screen">{/*header*/}
        <section className="flex w-full flex-col py-8 space-y-12 items-center text-center">
          <span className="text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
          <span className="text-2xl bg-gradient-to-r from-violet-800 via-yellow-700 to-red-600 inline-block text-transparent bg-clip-text font-bold">ENGLISH DICTIONARY</span>
        </section>
        <div className="flex flex-col w-full items-center content-center justify-center">
          <form onSubmit={handleSubmit} className="flex w-1/5 flex-col space-y-4 text-center items-center justify-center">
            <label className="text-2xl font-bold text-black font-sans italic">Enter a word:</label>
            <input type="text" className="text-xl font-sans italic w-full py-2 rounded-lg border-2 border-indigo-500 focus:outline-none pl-2" placeholder="Enter the word" value={word} onChange={(e) => setWord(e.target.value)} />
            <button className="bg-violet-300 px-5 font-sans italic font-semibold text-xl py-3 rounded-lg hover:bg-pink-300 hover:border-2 hover:border-black" type="submit">Submit</button>
          </form>
          {word && <div className="h-80 w-4/5 mt-5 bg-slate-50 border-4 border-pink-300 flex flex-col items-center justify-center font-sans italic text-3xl text-violet-700 space-y-2">
            {word && <div><span className="text-black">Word:</span><span> {word}</span></div>}
            {definition && <div><span className="text-black">Definition:</span><span> {definition}</span></div>}
            {example && <div><span className="text-black">Example:</span><span> {example}</span></div>}
            {synonyms.length > 0 && <div><span className="text-black">Synonyms:</span><span> {synonyms.join(", ")}</span></div>}
            {antonyms.length > 0 && <div><span className="text-black">Antonyms:</span><span> {antonyms.join(", ")}</span></div>}
            <button className="h-10 w-24 text-xl text-black font-sans italic flex items-center justify-center font-bold bg-red-300" onClick={handleSpeak}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </svg>
              Speak</button>
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default English;
