import userModel from "../../../db/models/user.model.js"
import { AppError } from "../../../utils/classError.js";
import { asyncHandler } from './../../../utils/globalErrorHandler.js';
import  bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





// =========================SignUp=========================================
export const signUp = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    const userExist = await userModel.findOne({ userName: userName.toLowerCase() });

    if (userExist) {
        return next(new AppError("User already exists", 409));
    }

    const hash = bcrypt.hashSync(password, +process.env.saltRound);

    const user = new userModel({
        password: hash,
        userName: userName.toLowerCase()
    });

    const newUser = await user.save();
    if (newUser) {
        res.status(201).json({ msg: "User created successfully", user: newUser });
    } else {
        next(new AppError("User not created", 400));
    }
});


// // =========================SignIn=========================================
export const signIn = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;

    const user = await userModel.findOne({ userName: userName.toLowerCase() });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError("Username or password is incorrect", 400));
    }

    user.status = true; 
    await user.save();

    const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.signatureKey, { expiresIn: '1h' });

    res.status(200).json({ msg: "Sign-in successful", token });
});