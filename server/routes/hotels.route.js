import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.controller.js";
import { isAdmin } from "../lib/verify-token.js";

const router = express.Router();

//CREATE
router.post("/", isAdmin, createHotel);

//GET ALL
router.get("/", getAllHotels);

//GET
router.get("/:id", getHotel);

//UPDATE
router.put("/:id", isAdmin, updateHotel);

//DELETE
router.delete("/:id", isAdmin, deleteHotel);

export default router;