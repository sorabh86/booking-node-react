import Hotel from "../models/Hotel.model.js";
import Room from "../models/Room.model.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room({...req.body, hotel_id:hotelId});

    try {
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}});

        res.status(200).json(savedRoom);
    } catch (e) {
        next(e);
    }
};

export const getAllRooms = async (req, res, next) => {   
    try{
        const rooms =  await Room.find();
        res.status(200).json(rooms);
    } catch(e) {
        next(e)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch(e) {
        next(e)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, { new:true })
        res.status(200).json(updatedRoom)
    } catch(e) {
        next(e)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        
        await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}});
        
        res.status(200).json({status:"Room has been delete."})
    } catch(e) {
        next(e)
    }
}
