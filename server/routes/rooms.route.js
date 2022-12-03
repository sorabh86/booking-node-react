import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.controller.js";
import { isAdmin } from "../lib/verify-token.js";

const router = express.Router();

// Create Room
router.post("/:hotelId", isAdmin, createRoom);

// Get Rooms
router.get("/", getAllRooms);

// Get Room
router.get("/:id", getRoom);

// Update Room
router.put("/:id", isAdmin, updateRoom);

// Delete Room 
router.delete("/:id/:hotelId", isAdmin, deleteRoom);

export default router;