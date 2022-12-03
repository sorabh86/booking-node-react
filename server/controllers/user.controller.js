import bycrypt from "bcryptjs"
import { newError } from "../lib/utils.js";
import User from "../models/User.model.js"

export const createUser = async (req, res, next) => {
    try {
        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isAdmin:req.body.isAdmin
        })
        const savedUser = await newUser.save()
        const {password, isAdmin, ...other} = savedUser._doc;
        res.status(201).json(other)
    } catch(e) {
        next(e)
    }
}

export const getAllUsers = async (req, res, next) => {   
    try{
        const users =  await User.find();
        res.status(200).json(users);
    } catch(e) {
        next(e)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        let {password, ...others} = req.body;
        console.log("passowrd", password);
        if(password) {
            const salt = bycrypt.genSaltSync(10);
            password = bycrypt.hashSync(password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            { $set: {...others, password} }, { new:true })
        res.status(200).json(updatedUser)
    } catch(e) {
        next(e)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        if(req.user && req.user.id === req.params.id) {
            next(newError(500, "You cannot delete your account yourself"));
            return;
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({status:"User has been delete."})
    } catch(e) {
        next(e)
    }
}
