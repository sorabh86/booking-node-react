import Hotel from "../models/Hotel.model.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch(e) {
        next(e)
    }
}

export const getAllHotels = async (req, res, next) => {   
    try{
        const hotels =  await Hotel.find();
        res.status(200).json(hotels);
    } catch(e) {
        next(e)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch(e) {
        next(e)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            // cities.map(city=>Hotel.find({city}).length)
            cities.map(city=>Hotel.countDocuments({city}))
        );
        res.status(200).json(hotel)
    } catch(e) {
        next(e)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch(e) {
        next(e)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, { new:true })
        res.status(200).json(updatedHotel)
    } catch(e) {
        next(e)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({status:"Hotel has been delete."})
    } catch(e) {
        next(e)
    }
}
