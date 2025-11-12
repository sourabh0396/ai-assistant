import { errorMessages } from "../constants/errorMessages.js";
import { HttpSuccessMessage } from "../constants/HttpSuccessMessage.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import getToken from "../Config/Token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const EmailExist = await User.findOne({ email });
        if (EmailExist) {
            return res.status(400).json({ message: errorMessages.USER.ALREADY_EXISTS })
        }
        if ((password.length < 8) || (password.length > 16)) {
            return res.status(400).json({ message: errorMessages.VALIDATION.PASSWORD_MISMATCH })
        }

        const HashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, password: HashedPassword, email
        })

        const Token = await getToken(user._id)
        res.cookie("token", Token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
            secure: false,            
            domain: ".onrender.com"||"localhost"
        })
        res.status(201).json(user)


    } catch (error) {
        return res.status(500).json({ message: errorMessages.AUTH.SIGN_UP_ERROR, error })

    }
}



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: errorMessages.USER.EMAIL_NOT_EXISTS })
        }
        //
        if (!user.password) {
            return res.status(400).json({ message: errorMessages.AUTH.INVALID_CREDENTIALS })
        }
        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, user.password)
        } catch (e) {
            return res.status(400).json({ message: errorMessages.AUTH.INVALID_CREDENTIALS })
        }
        if (!isMatch) {
            return res.status(400).json({ message: errorMessages.VALIDATION.PASSWORD_MISMATCH })
        }

        const Token = await getToken(user._id)
        res.cookie("token", Token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })
        res.status(200).json(user)


    } catch (error) {
        return res.status(500).json({ message: errorMessages.AUTH.LOGIN_ERROR, error })
    }
}


export const LogOut = async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "lax", secure: false })
        res.status(200).json({ message: HttpSuccessMessage.LOGOUT_SUCCESS });
    } catch (error) {
        return res.status(500).json({ message: errorMessages.AUTH.LOGOUT_ERROR, error })
    }
}
