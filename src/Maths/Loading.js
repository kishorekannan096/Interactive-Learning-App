import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Loading() {
  const [countdown, setCountdown] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();

  const { from } = location.state || { from: '/' }; // get the previous pathname from the state object or default to '/'

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      const { from } = location.state || { from: '/' };
      if (from === '/Add') {
        navigate('/AddPrac');
      }
      else if (from === '/AddPrac') {
        navigate('/Add');
      }
      else if (from === '/Sub') {
        navigate('/SubPrac');
      }
      else if (from === '/SubPrac') {
        navigate('/Sub');
      }
      else if (from === '/Mul') {
        navigate('/MulPrac');
      }
      else if (from === '/MulPrac') {
        navigate('/Mul');
      }
      else if (from === '/Div') {
        navigate('/DivPrac');
      }
      else if (from === '/DivPrac') {
        navigate('/Div');
      }
      else {
        // default redirect if no match is found
        navigate('/');
      }
    }
  }, [countdown, from, location.state, navigate]);

  return (
    <>
      <div className="bg-image w-screen h-screen space-y-10">
        <section className="flex w-full flex-col py-14 space-y-12 items-center text-center">
          <span className="mt-5 text-4xl bg-gradient-to-r from-indigo-900 via-green-600 to-rose-400 inline-block text-transparent bg-clip-text font-bold">KONGU NATIONAL MATRICULATION HIGHER SECONDARY SCHOOL</span>
        </section>
        <div className='h-60 mt-10 mx-20 w-auto rounded-xl border-4 border-amber-400 shadow-xl bg-teal-100 flex flex-col justify-center items-center space-x-20 space-y-3'>
          <p className='text-4xl font-sans font-bold'>Loading...</p>
          <p className='text-4xl font-sans font-bold'>Redirecting to another page in <span className='text-red-600'>{countdown}</span> seconds.</p>
        </div>
      </div>
    </>
  );
}

export default Loading;
