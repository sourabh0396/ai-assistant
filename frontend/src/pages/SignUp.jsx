import React, { useContext, useState } from 'react'
import giphy from '../assets/giphy2.gif';
import Robo4 from '../assets/Robo4.jpeg';
import Assets from '../assets/assetsConstant';
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

export default function SignUp() {
  const { ServerURL, userData, setUserData } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    // Basic client-side validation to prevent avoidable 400s
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      alert('Name is required.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (trimmedPassword.length < 8 || trimmedPassword.length > 16) {
      alert('Password must be between 8 and 16 characters.');
      return;
    }
    try {
      let result = await axios.post(`${ServerURL}/api/auth/signup`, {

        name: trimmedName, email: trimmedEmail, password: trimmedPassword
      }, { withCredentials: true })
      setUserData(result.data)
      console.log(result);
      navigate("/customize");
    } catch (error) {
      console.error('Signup failed:', error?.response?.status, error?.response?.data || error?.message);
      // setErr(error,response.data.message);
      setUserData(null)
      try {
        const serverMessage = error?.response?.data?.message || error?.response?.data?.error || error?.message;
        if (serverMessage) {
          alert(`Signup failed: ${serverMessage}`);
        } else {
          alert('Signup failed. Please check your details and try again.');
        }
      } catch (_) {
        alert('Signup failed. Please check your details and try again.');

      }
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div className='w-full h-[100vh] bg-cover' style={{ backgroundImage: `url(${giphy}))` }}>

    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${Assets.HUNT_THE_TRUTH})` }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00127550] backdrop-blur-md shadow-lg
       shadow-amber-500 flex flex-col items-center justify-center gap-[20px] px-[20px]'
        onSubmit={handleSignUp}
      >
        <h1 className='text-white text-[30px] text-semibold mb-[30px]'>Register To
          <span className='text-gray-600 text-[30px] text-bold text-shadow-black-400'> Virtual Assistant</span>
        </h1>
        <input type='text' placeholder='Enter your Name'
          className=' w-full h-[60px] px-4 border-2 border-gray-300 rounded-2xl outline-none
            bg-transparent text-white placeholder-gray-200 focus:border-white focus:ring-2
            focus:ring-white/30 transition duration-300'
          required onChange={(e) => setName(e.target.value)} value={name} />

        <input type='email' placeholder='Email'
          className=' w-full h-[60px] px-4 border-2 border-gray-300 rounded-2xl outline-none
            bg-transparent text-white placeholder-gray-200 focus:border-white focus:ring-2
            focus:ring-white/30 transition duration-300'
          required onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className='relative w-full'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='w-full h-[60px] px-8 pr-12 border-2 border-gray-300 rounded-2xl 
            outline-none bg-transparent text-white placeholder-gray-200 focus:border-white focus:ring-2 focus:ring-white/30 transition duration-300'
            required onChange={(e) => setPassword(e.target.value)} value={password}
          />
          <button type='button' onClick={togglePassword}
            className='absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl focus:outline-none'
          >
            {showPassword ? <IoIosEyeOff /> : <IoEyeSharp />}
          </button>
        </div>

        <button className='bg-white text-black rounded-full h-[60px] min-w-[150px] text-[19px] font-bold m-5'>Sign Up</button>

        <p className='text-[white] text-[18px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an Account? <span className='text-gray-800 font-bold'>Sign In</span></p>
      </form>
    </div>
  )
}
