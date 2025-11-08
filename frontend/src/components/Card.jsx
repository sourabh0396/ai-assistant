import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx';

export default function Card({ image }) {

  const {
    ServerURL, userData, setUserData, authChecked, frontEndImage, setFrontEndImage,
    backEndImage, setBackEndImage, selectedImage, setSelectedImage } = useContext(userDataContext);
  return (
    <div className={`w-[80px] h-[160px] lg:w-[150px] lg:h-[250px] bg-[#161212e1] border-2
     border-[#0000ff80] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-gray-900
      cursor-pointer hover:border-4 hover:border-white 
      ${selectedImage == image ? "border-4 border-white shadow-2xl shadow-gray-900" : null}`}
      onClick={() => {
        setSelectedImage(image)
        setBackEndImage(null)
        setFrontEndImage(null)
      }}>
      <img src={image} className='h-full object-cover w-full' />
    </div>
  )
}
