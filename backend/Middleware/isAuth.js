import { errorMessages } from "../constants/errorMessages.js";
import jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: errorMessages.AUTH.TOKEN_NOT_FOUND });
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.error(error);
    }
}

export default isAuth;