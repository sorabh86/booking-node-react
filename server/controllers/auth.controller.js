import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { newError } from "../lib/utils.js";
import { ONE_HOUR } from "../lib/verify-token.js";
import User from "../models/User.model.js";

export const register = async (req,res,next) => {
    try {
        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        });

        const savedUser = await newUser.save();
        const {password, isAdmin, ...other} = savedUser._doc;
        // Code 201: Data Created
        res.status(201).send(other)
    } catch (e) {
        next(e)
    }
}
export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(newError(404, "User not found!"))

        const isPasswordMatched = await bycrypt.compare(req.body.password, user.password)
        if(!isPasswordMatched) return next(newError(400, "Wrong password or Username!"))
        
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.jwt)

        const {password, isAdmin, ...others} = user._doc;
        res.cookie("access_token", token, {
            // expires: new Date(Date.now() + (2*ONE_HOUR)),
            httpOnly:true,
        }).status(200).json(others)
    } catch (e) {
        next(e)
    }
}

export const logout = (req, res, next) => {
    if(!req.cookies.access_token) 
        next(newError(200, "You are not logged in.")); 
    else 
        res.clearCookie('access_token')
        .json({message:"Your are successfully logged out."}); 
}