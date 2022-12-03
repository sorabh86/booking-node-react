import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { isAdmin, isUser, verifyToken } from "../lib/verify-token.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("You are authenticated")
// })
// router.get("/checkuser/:id", isUser, (req,res,next) => {
//     res.send("hello User, You can delete your account")
// });
// router.get("/checkadmin/:id", isAdmin, (req,res,next) => {
//     res.send("hello admin, You can delete any account")
// });

//CREATE
router.post("/", isAdmin, createUser);

//GET ALL
router.get("/", isAdmin, getAllUsers);

//GET
router.get("/:id", isUser, getUser);

//UPDATE
router.put("/:id", isUser, updateUser);

//DELETE
router.delete("/:id", isAdmin, deleteUser);
 
export default router;