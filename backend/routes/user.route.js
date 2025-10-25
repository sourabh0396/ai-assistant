import express from "express";
import { askToAssistant, getCurruntUser, updateAssistant } from "../Controllers/user.controller.js";
import isAuth from "../Middleware/isAuth.js";
import upload from "../Middleware/Multer.js"

const userRouter = express.Router();
userRouter.get("/current", isAuth, getCurruntUser);
userRouter.put("/update", isAuth, upload.single("assistantImage"), updateAssistant);
userRouter.post("/asktoassistant", isAuth, askToAssistant);

export default userRouter;
