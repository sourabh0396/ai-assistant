import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Config/Db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import geminiResponse from './gemini.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // List of allowed origins (add your production domain here when needed)
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            'https://ai-assistant-fe.onrender.com',
        ];

        if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || origin.startsWith('https://ai-assistant-fe.onrender.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//     res.send('Hello')
// })

app.get("/", async (req, res) => {
    let prompt = req.query.prompt
    let data = await geminiResponse(prompt)
    res.json(data)
})


// Determine if running in production (on Render)
const isRender = process.env.RENDER === 'true';
const isProduction = process.env.NODE_ENV === 'production' || isRender;

app.listen(port, () => {
    connectDb();
    
    const serverUrl = isProduction 
        ? 'https://virtual-assistant-00v4.onrender.com' 
        : `http://localhost:${port}`;
        
    console.log(`Server is running in ${isProduction ? 'production' : 'development'} mode`);
    console.log(`Server URL: ${serverUrl}`);
    if (!isProduction) {
        console.log(`Local development server: http://localhost:${port}`);
    }
})

// console.log(process.env.MONGODB_URL);