import React, { useContext, useRef, useState } from 'react';
import Card from '../components/Card';
import Assets from '../assets/assetsConstant.js';
import { LuImageUp } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import { GrLinkPrevious } from "react-icons/gr";

export default function Customize() {

  const {
    ServerURL,
    userData, setUserData,
    authChecked,
    frontEndImage, setFrontEndImage, backEndImage, setBackEndImage, selectedImage, setSelectedImage
  } = useContext(userDataContext);
  const navigate = useNavigate();
  // const [frontEndImage, setFrontEndImage] = useState(null);
  // const [backEndImage, setBackEndImage] = useState(null);
  const inputImage = useRef(null);

  const handleImage = (e) => {
    console.log('File input changed');
    console.log('Files:', e.target.files);

    const file = e.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('Selected file:', file.name, 'Type:', file.type, 'Size:', file.size);

    if (!file.type.startsWith('image/')) {
      const errorMsg = `Invalid file type: ${file.type}. Please select an image file (JPEG, PNG, etc.)`;
      console.error(errorMsg);
      alert(errorMsg);
      return;
    }

    // Revoke previous preview URL if present
    if (frontEndImage) {
      try {
        console.log('Revoking previous image URL');
        URL.revokeObjectURL(frontEndImage);
      } catch (error) {
        console.error('Error revoking URL:', error);
      }
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      console.log('Created preview URL:', previewUrl);

      // Set state updates in a batch
      Promise.resolve().then(() => {
        setBackEndImage(file);
        setFrontEndImage(previewUrl);
        setSelectedImage("input");
        console.log('State updated with new image');
      });
    } catch (error) {
      console.error('Error creating preview URL:', error);
      alert('Error processing the selected image. Please try another file.');
    }

    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };


  const headingStyle = { textShadow: '1px 1px 6px rgba(0, 0, 0, 1.0)' };
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#000000b7] to-[#aad9ff80] flex justify-center items-center
    //  to-[#184269bb] 
    '>
      <GrLinkPrevious className='text-white absolute top-[30px] left-[30px] w-[20px] h-[20px] cursor-pointer' onClick={() => navigate("/")} />
      <div className='flex flex-col items-center justify-center w-full'>

        <h1 style={headingStyle} className='textShadow-h1 text-white text-center text-[30px]'>
          Select Your <span className='text-blue-300'>Assistant Image</span>
        </h1>

        <div className='w-full max-w-[60%] flex justify-center items-center flex-wrap gap-3' >
          <Card image={Assets.IRONMAN} />
          <Card image={Assets.MACRO_ROBOTIC_INSECT} />
          <Card image={Assets.ROBO3} />
          <Card image={Assets.ROBO4} />
          <Card image={Assets.ROBO5} />
          <Card image={Assets.ROBO6} />
          <Card image={Assets.ROBO7} />

          <div
            className={`w-[80px] h-[160px] lg:w-[150px] lg:h-[250px] bg-[#161212e1] rounded-2xl overflow-hidden 
            cursor-pointer flex justify-center items-center relative
            ${selectedImage === 'input'
                ? 'border-4 border-white shadow-2xl shadow-gray-900'
                : 'border-2 border-[#0000ff80] hover:border-4 hover:border-white hover:shadow-2xl hover:shadow-gray-900'
              }`}
            onClick={() => {
              inputImage.current.click();
              setSelectedImage("input");
            }}
          >
            {!frontEndImage ? (
              <LuImageUp className='text-white h-[30px] w-[30px]' />
            ) : (
              <img
                src={frontEndImage}
                className='h-full w-full object-cover'
                alt="Uploaded preview"
              />
            )}
          </div>

          <input
            type='file'
            ref={inputImage}
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleImage}
          />
        </div>
        {selectedImage && (selectedImage !== "input" || backEndImage) ? <button
          className='mt-6 px-6 py-2 text-black bg-white rounded-4xl hover:px-8 transition cursor-pointer
          duration-800 shadow-lg font-bold' onClick={() => navigate("/customize2")}> Next </button> : null}
      </div>
    </div>
  )
}
