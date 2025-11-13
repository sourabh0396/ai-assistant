import { errorMessages } from "../constants/errorMessages.js";
import User from "../Models/user.model.js";
import uploadOnCloudinary from '../Config/cloudinary.js';
import geminiResponse from "../gemini.js";
import { json, response } from "express";
import moment from "moment/moment.js";

export const getCurruntUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: errorMessages.USER.NOT_FOUND })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: errorMessages.USER.INVALID_CREDENTIALS })
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        let assistantImage;
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        } else {
            assistantImage = imageUrl;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { assistantName, assistantImage },
            { new: true }
        ).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: errorMessages.USER.UNABLE_TO_UPDATE_ASSISTATANT })
    }
}


export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;
        if (!command || typeof command !== 'string' || !command.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Command is required and must be a non-empty string'
            });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: errorMessages.USER.NOT_FOUND
            });
        }
        user.history.push(command);
        user.save()
        const userName = user.name || 'User';
        const assistantName = user.assistantName || 'Assistant';

        console.log(`Processing command from ${userName} to ${assistantName}:`, command);

        const result = await geminiResponse(command, assistantName, userName);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'Empty response from Gemini API'
            });
        }

        console.log('Raw Gemini response:', result);

        // If the response is already an object, use it directly
        if (typeof result === 'object' && result !== null) {
            // Handle time-related responses immediately
            if (result.type === 'get_time') {
                return res.json({
                    success: true,
                    data: {
                        type: 'get_time',
                        userInput: result.userinput || command,
                        response: `The current time is ${moment().format('h:mm:ss A')}`
                    }
                });
            }
            
            return res.json({
                success: true,
                data: result
            });
        }

        // If it's a string, try to parse it as JSON
        if (typeof result === 'string') {
            try {
                const jsonMatch = result.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsedResult = JSON.parse(jsonMatch[0]);
                    return res.json({
                        success: true,
                        data: parsedResult
                    });
                }

            } catch (error) {
                console.error('Error parsing JSON response:', error);
            }
        }

        // If we get here, return the raw result as general response
       

        switch (type) {
            case 'get_date':
                return res.json({
                    type,
                    userInput: geminiResult.userinput,
                    response: `currunt date is ${moment().format("YYYY-MM-DD")}`
                });

            case 'get_time':
                return res.json({
                    type,
                    userInput: geminiResult.userinput,
                    response: `currunt time is ${moment().format("h:mm:ss a")}`
                });


            case 'get_day':
                return res.json({
                    type,
                    userInput: geminiResult.userinput,
                    response: `Todays day is ${moment().format("dddd")}`
                });

            case 'get_month':
                return res.json({
                    type,
                    userInput: geminiResult.userinput,
                    response: `currunt Month is ${moment().format("MMMM")}`
                });

            case "general":
            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather-show":
                return res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: geminiResult.response
                })
            default:
                return res.status(400).json({ response: "I Dident Understand command", message: errorMessages.ASSISTANT.DID_NOT_UNDERSTAND_THE_COMMAND })
        }


    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: errorMessages.ASSISTANT.UNABLE_TO_ASK_UPDATE_ASSISTATANT })
    }

}