import axios from "axios";
const geminiResponse = async (command, assistantName, userName) => {
    try {
        const gemini_Url = process.env.GEMINI_API_URL;
        const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
           "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
           "instagram_open" | "facebook_open" | "weather-show",
  "userinput": "<original user input> (only remove your name from userinput if exists) and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye",
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question.aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answerdena.
- "google_search": if user wants to search something on Google.
- "youtube_search": if user wants to search something on YouTube.
- "youtube_play": if user wants to directly play a video or song.
- "calculator_open": if user wants to open a calculator.
- "instagram_open": if user wants to open Instagram.
- "facebook_open": if user wants to open Facebook.
- "weather-show": if user wants to know weather.
- "get_time": if user asks for current time.
- "get_date": if user asks for today's date.
- "get_day": if user asks what day it is.
- "get_month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tumhe kisne banaya
- Only respond with the JSON object, nothing else.

now your userInput - ${command}
`;

        // result response
        const response = await axios.post(gemini_Url, {
            "contents": [{
                "parts": [{ "text": prompt }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Extract the response text from the Gemini API response
        const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            console.error('Invalid response format from Gemini API:', response.data);
            throw new Error('Invalid response format from Gemini API');
        }

        // Try to parse the response as JSON
        try {
            const jsonMatch = responseText.match(/\{.*\}/s);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            return {
                type: 'general',
                userInput: command,
                response: responseText
            };
        } catch (error) {
            console.error('Error parsing Gemini response:', error);
            return {
                type: 'general',
                userInput: command,
                response: responseText
            };
        }
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        throw error;
    }
}
export default geminiResponse;
