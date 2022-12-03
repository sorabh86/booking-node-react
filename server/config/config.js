import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import logger from "../lib/logger.js"

dotenv.config();

export const app = express();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.mongourl);
        console.log("Connected to mongoDB.");
    } catch(e) {
        throw e;
    }
}
mongoose.connection.on("connected", () => logger("mongoDB connected!"))
mongoose.connection.on("disconnected", () => logger("mongoDB disconnected!"))

