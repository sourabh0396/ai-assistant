// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { userDataContext } from '../context/UserContext';
// import axios from 'axios';

// export default function Home() {
//     const { userData, ServerURL, setUserData, geminiResponse } = useContext(userDataContext);
//     const navigate = useNavigate();

//     const handleLogOut = async () => {
//         try {
//             await axios.get(`${ServerURL}/api/auth/logout`, { withCredentials: true });
//             setUserData(null);
//             navigate("/signin");
//         } catch (error) {
//             console.error('Logout error:', error);
//         }
//     };

//     useEffect(() => {
//         if (!userData?.assistantName) return;

//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (!SpeechRecognition) {
//             alert('Speech Recognition not supported in your browser');
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;
//         recognition.lang = 'en-US';

//         recognition.onresult = async (e) => {
//             const transcript = e.results[e.results.length - 1][0].transcript.trim();
//             console.log("Heard:", transcript);

//             if (!transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//                 return;
//             }

//             try {
//                 const response = await geminiResponse(transcript);
//                 const responseText = response?.data?.response || response?.response || "I didn't get that";

//                 const utterance = new SpeechSynthesisUtterance(responseText);
//                 window.speechSynthesis.speak(utterance);

//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         };

//         recognition.start();
//         return () => recognition.stop();
//     }, [userData?.assistantName]);

//     if (!userData) return <div>Loading...</div>;

//     return (
//         <div className='w-full h-[100vh] bg-gradient-to-t from-[#001d35] to-[#00072560] flex justify-center items-center'>
//             <button 
//                 onClick={handleLogOut}
//                 className='bg-white text-black rounded-full h-[60px] min-w-[150px] text-[19px] font-bold m-5 absolute top-[20px] right-[20px]'
//             >
//                 Log Out
//             </button>
//             <button 
//                 onClick={() => navigate("/customize")}
//                 className='bg-white text-black rounded-full h-[60px] min-w-[150px] text-[19px] font-bold m-5 absolute top-[100px] right-[20px] px-2'
//             >
//                 Customize Assistant
//             </button>
//             <div className='flex flex-col items-center'>
//                 <div className='w-[300px] h-[400px] overflow-hidden rounded-4xl shadow-lg'>
//                     <img 
//                         src={userData.assistantImage} 
//                         alt='Assistant' 
//                         className='h-full w-full object-cover' 
//                     />
//                 </div>
//                 <h1 className='text-white mt-4 text-xl font-semibold'>
//                     I'm {userData.assistantName}
//                 </h1>
//             </div>
//         </div>
//     );
// }
import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
    const { userData, ServerURL, setUserData, geminiResponse } = useContext(userDataContext);
    const navigate = useNavigate();

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
        window.speechSynthesis.speak(uterance)
    }

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleCommand = (data) => {
        console.log('Command data:', data);
        
        // Extract response data from different possible structures
        let responseData = data;
        if (data && data.data) {
            responseData = data.data;
        }

        // If it's a string, just speak it
        if (typeof responseData === 'string') {
            speak(responseData);
            return;
        }

        const { type, userInput, response, userinput } = responseData || {};
        const query = userInput || userinput || '';
        
        // Speak the response if available
        if (response) {
            const utterance = new SpeechSynthesisUtterance(response);
            window.speechSynthesis.speak(utterance);
        }

        // Process the command
        if (type === 'google_search' && query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
        else if (type === 'calculator_open') {
            window.open('https://www.google.com/search?q=calculator', '_blank');
        }
        else if (type === 'instagram_open') {
            window.open('https://www.instagram.com/', '_blank');
        }
        else if (type === 'facebook_open') {
            window.open('https://www.facebook.com/', '_blank');
        }
        else if (type === 'weather_show') {
            window.open('https://www.google.com/search?q=weather', '_blank');
        }
        else if (type === 'youtube_search' || type === 'youtube_play') {
            // If no specific query or just 'youtube', open YouTube homepage
            if (!query || query.toLowerCase().includes('youtube')) {
                window.open('https://www.youtube.com', '_blank');
            } else {
                // For search queries, clean and encode the query
                const cleanQuery = query.replace(/^(search|play|find|look up|show me|open|on youtube|in youtube|youtube|you tube)\s*/i, '').trim();
                if (cleanQuery) {
                    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(cleanQuery)}`, '_blank');
                } else {
                    window.open('https://www.youtube.com', '_blank');
                    
                }
            }
        }
    }


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
                    const response = await geminiResponse(cleanTranscript);
                    console.log('Gemini response:', response);
                    
                    // Handle the command with the response
                    handleCommand(response);
                    
                } catch (error) {
                    console.error('Error processing command:', error);
                    speak("Sorry, I encountered an error processing your request.");
                }
            }
            },
            recognition.start()
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
