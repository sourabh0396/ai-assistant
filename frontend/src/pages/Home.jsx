import React, { useContext, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  const { userData, ServerURL, setUserData, geminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synthesis = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${ServerURL}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.error(error)
    }
  }

  const speakToText = (text) => {
    const uterance = new SpeechSynthesisUtterance(text)
    synthesis.speak(uterance)
  }


  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if (!error.message.includes("start")) {
        console.error("Recognition Error:", error);

      }
    }
  }
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    // utterance.lang='mr-IN';
    const  voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) { utterance.voice = hindiVoice }


    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
      startRecognition()
      // recognitionRef.current?.start();
    }
    synthesis.speak(utterance);
  };


  const handleCommand = (data) => {
    console.log('Command data:', data);

    // Handle wrapped data from backend { success: true, data: { ... } }
    const responseData = data?.data || data;

    if (typeof responseData === 'string') {
      speak(responseData);
      return;
    }

    const { type, userinput, userInput, response } = responseData || {};
    const query = userinput || userInput || '';

    if (response) speak(response);

    // Delay slightly before navigation (bypasses popup blocker)
    setTimeout(() => {
      if (type === 'google_search') {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        openLink(url);
      } 
      else if (type === 'youtube_search') {
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        openLink(url);
      } 
      else if (type === 'youtube_play') {
        openLink('https://www.youtube.com');
      } 
      else if (type === 'instagram_open') {
        openLink('https://www.instagram.com');
      } 
      else if (type === 'facebook_open') {
        openLink('https://www.facebook.com');
      } 
      else if (type === 'weather_show') {
        openLink('https://www.google.com/search?q=weather');
      } 
      else if (type === 'calculator_open') {
        openLink('https://www.google.com/search?q=calculator');
      }
    }, 1000); // short delay helps avoid popup blocking
  };

  // A helper to handle browser popup restrictions
  const openLink = (url) => {
    const newTab = window.open(url, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      // Fallback: open in the same tab if popup blocked
      window.location.href = url;
    }
  };



  // Speech to text conversion
  useEffect(() => {
    // Check if speech recognition is available
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition
    const isRecognizingRef = { current: false }
    const safeRecognization = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start()
          console.log('Recognization request to start ');

        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.log('Recognition already started — skipping.');
          } else {
            console.error('Recognition start error:', error);
          }
        }

      }
    }

    recognition.onstart = () => {
      console.log('Recognization Started');
      isRecognizingRef.current = true;
      setListening(true)
    }

    recognition.onend = () => {
      console.log('Recognization Ended');
      isRecognizingRef.current = false;
      setListening(false)
      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognization()
        }, 1000);//delay for avoid rapid loops
      }
    }

    recognition.onerror = (event) => {
      console.warn("Recognition Error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== 'aborted' && !isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognization();
        }, 1500)
      }
    }
    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("Heard:", transcript);

      // Check if the assistant's name is mentioned
      if (userData?.assistantName &&
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {

        try {
          // Clean the transcript by removing the assistant's name
          const cleanTranscript = transcript
            .replace(new RegExp(userData.assistantName, 'i'), '')
            .trim();

          console.log('Processing command:', cleanTranscript);

          recognition.stop();
          recognitionRef.current = false;
          setListening(false);
          const response = await geminiResponse(cleanTranscript);
          console.log('Gemini response:', response);

          // Handle the command with the response
          handleCommand(response);

        } catch (error) {
          console.error('Error processing command:', error);
          speak("Sorry, I encountered an error processing your request.");
        }
      }
    };

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognization();
      }
    }, 10000)
    safeRecognization(); 
    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
    }
  }, [])
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#001d35] to-[#00072560] flex justify-center items-center'>
      <button className=' bg-white text-black rounded-full h-[60px] min-w-[150px] text-[19px] font-bold m-5 absolute top-[20px] right-[20px] cursor-pointer'
        onClick={handleLogOut}>Log Out</button>
      <button className=' bg-white text-black rounded-full h-[60px] min-w-[150px] text-[19px] font-bold m-5 absolute top-[100px] right-[20px] px-2 cursor-pointer'
        onClick={() => navigate("/customize")}
      > Customize your Assistant</button>
      <div className='flex flex-col items-center'>
        <div className='w-[300px] h-[400px] overflow-hidden rounded-4xl shadow-lg'>
          <img src={userData?.assistantImage} alt='Assistant' className='h-full w-full object-cover' />
        </div>
        <h1 className='text-white mt-4 text-xl font-semibold'>I&apos;m {userData.assistantName}</h1>
      </div>
    </div>
  )
}
