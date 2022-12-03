import express from "express"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import usersRoute from "./routes/users.route.js"
import hotelsRoute from "./routes/hotels.route.js"
import roomsRoute from "./routes/rooms.route.js"
import {app, connect} from "./config/config.js"
import { handleError } from "./lib/utils.js"

app.use(cookieParser())

// middlewares
// enable receive json request
app.use(express.json())
// configure endpoints|routes
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use(handleError)

// server configuration 
app.listen(3000, ()=>{
    console.log("Server is started...");
    connect();
})