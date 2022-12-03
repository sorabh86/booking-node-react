import jwt from "jsonwebtoken";
import { newError } from "./utils.js";

export const ONE_HOUR = 3600 * 1000;

export const verifyToken = (req, res, next) => {
    const token = req.cookies['access_token'];
    if(!token)
        return next(newError(401, "You are not authenticated"))
    
    jwt.verify(token, process.env.jwt, (err, user) => {
        if(err) next(newError(403, "Token is not valid"))
        req.user = user;
        next();
    });
}

export const isUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user && (req.user.id === req.params.id 
            || req.user.isAdmin)) {
            next()
        } else {
            return next(newError(403, "You are not authorized"))
        }
    })
}
export const isAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user && req.user.isAdmin) {
            next()
        } else {
            return next(newError(403, "You are not authorized"))
        }
    })
}