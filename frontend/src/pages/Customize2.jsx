import React, { useState } from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';


export default function Customize2() {
    const { userData, backEndImage, selectdImage, ServerURL, setUserData } = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const headingStyle = { textShadow: '1px 1px 6px rgba(0, 0, 0, 1.0)' };

    const handleUpdateAssistant = async () => {
        setLoading(true)
        try {
            if (!assistantName.trim()) {
                alert('Please enter an assistant name');
                return;
            }

            const formData = new FormData();
            formData.append("assistantName", assistantName.trim());

            // If we have a file, append it as 'assistantImage'
            if (backEndImage && backEndImage instanceof File) {
                formData.append("assistantImage", backEndImage);
            }
            // If we have a selected image URL (not 'input'), append it as 'imageUrl'
            else if (selectdImage && selectdImage !== 'input') {
                formData.append("imageUrl", selectdImage);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            };

            const result = await axios.put(`${ServerURL}/api/user/update`, formData, config);
            setLoading(false);
            if (result.data) {
                setUserData(result.data);
            }
            console.log(result.data);
            navigate("/")

        } catch (error) {
            setLoading(false)
            console.error('Update assistant failed:', error?.response?.status, error?.response?.data || error?.message);
            alert(error.response?.data?.message || 'Failed to update assistant. Please try again.');
        }
    };
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[#000725] to-[#001d35] flex justify-center items-center
    //  to-[#184269bb] 
    '>
            <GrLinkPrevious className='text-white absolute top-[30px] left-[30px] w-[20px] h-[20px] cursor-pointer' onClick={() => navigate("/customize")} />
            <div className='flex flex-col items-center justify-center w-full'>

                <h1 style={headingStyle} className='textShadow-h1 text-white text-center text-[30px]'>
                    Enter Your <span className='text-blue-300'>Assistant Name</span>
                </h1>

                <input type='text' placeholder='Eg. Sifra'
                    className=' w-full h-[60px] max-w-[600px] px-4 border-2 border-gray-300 rounded-2xl outline-none
            bg-transparent text-white placeholder-gray-200 focus:border-white focus:ring-2
            focus:ring-white/30 transition duration-300'
                    required onChange={(e) => setAssistantName(e.target.value)} value={assistantName}
                />
                {assistantName && <button className='mt-6 px-6 py-2 text-black bg-white 
                    rounded-4xl hover:px-8  transition cursor-pointer duration-800 shadow-lg font-bold'
                    onClick={() => { handleUpdateAssistant() }} disabled={loading}>
                    {!loading ? "Finally Create Your Assistant" : "Loading..."}
                </button>}
            </div>
        </div>
    )
}
