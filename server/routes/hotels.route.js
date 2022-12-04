import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.controller.js";
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

// Count hotel by city
router.get("/count/city", countByCity);

// count hotel by type
router.get("/count/type", countByType);

export default router;