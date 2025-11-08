import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create context for user data
export const userDataContext = createContext();

// Configure axios defaults
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.log('User not authenticated, redirecting to login');
            // You might want to clear user data here
        }
        return Promise.reject(error);
    }
);

/**
 * UserContext Provider Component
 * Manages user authentication state and provides it to child components
 */
export default function UserContext({ children }) {
    // API configuration
    const ServerURL = "http://localhost:5000";

    // Authentication state
    const [userData, setUserData] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    
    // UI state
    const [frontEndImage, setFrontEndImage] = useState(null);
    const [backEndImage, setBackEndImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetches the current user's data from the server
     */
    const fetchCurrentUser = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/user/current');
            setUserData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data
            });
            // Only set error if it's not a 401 (unauthorized) error
            if (err.response?.status !== 401) {
                setError(err.response?.data?.message || 'Failed to fetch user data');
            }
            setUserData(null);
        } finally {
            setIsLoading(false);
            setAuthChecked(true);
        }
    }, []);
    // const fetchCurrentUser = useCallback(async () => {
    //     setIsLoading(true);
    //     setError(null);

    //     try {
    //         // Check if we have a token in localStorage
    //         const token = localStorage.getItem('token');

    //         // If no token, don't make the request
    //         if (!token) {
    //             setUserData(null);
    //             setAuthChecked(true);
    //             setIsLoading(false);
    //             return;
    //         }

    //         // Set the authorization header
    //         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //         const response = await api.get('/user/current');
    //         setUserData(response.data);
    //     } catch (err) {
    //         // Handle 401/400 errors silently (no error message for missing/invalid token)
    //         if (err.response?.status === 401 || err.response?.status === 400) {
    //             console.log('No valid session found, please log in');
    //             localStorage.removeItem('token');
    //             delete api.defaults.headers.common['Authorization'];
    //             setUserData(null);
    //         } else {
    //             // Only show error for other types of errors
    //             console.error('Error fetching user data:', err);
    //             setError('Failed to fetch user data');
    //         }
    //     } finally {
    //         setIsLoading(false);
    //         setAuthChecked(true);
    //     }
    // }, []);

    /**
     * Sends a command to the Gemini assistant
     * @param {string} command - The command to send to the assistant
     * @returns {Promise<Object>} The assistant's response
     */
    const geminiResponse = useCallback(async (command) => {
        if (!command?.trim()) {
            throw new Error('Command cannot be empty');
        }

        try {
            const response = await api.post('/user/asktoassistant', {
                command: command.trim()
            });
            return response.data;
        } catch (error) {
            console.error('Gemini API Error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            throw error;
        }
    }, []);

    // Fetch user data on component mount
    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    // Context value to be provided to consumers
    const contextValue = {
        // Server configuration
        ServerURL,
        // User data and auth
        userData,
        setUserData,
        authChecked,
        setAuthChecked,
        // Image states
        frontEndImage,
        setFrontEndImage,
        backEndImage,
        setBackEndImage,
        selectedImage,
        setSelectedImage,
        // API functions
        geminiResponse,
        // Loading and error states
        isLoading,
        error
    };

    return (
        <userDataContext.Provider value={contextValue}>
            {children}
        </userDataContext.Provider>
    );
}
