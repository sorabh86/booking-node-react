import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { isUser } from "../lib/verify-token.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout/:id", logout);

export default router; 