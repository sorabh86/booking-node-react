import mongoose from "mongoose";

const HotelSchema= new mongoose.Schema({
    username:{ type:String, required:true, unique:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required: true },
    isAdmin: { type:Boolean, default:false }, 
}, {timestamps:true}) // add created and updated time

export default mongoose.model("User", HotelSchema)